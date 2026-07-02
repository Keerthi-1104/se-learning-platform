#!/usr/bin/env node
// tools/publish_content.js
//
// Scans app/assets/content/**/*.json, hashes each file, emits content_manifest.json,
// and mirrors everything into content_publish/ ready to `git push` to the CDN repo.
//
// Manifest schema (v1):
// {
//   "manifestVersion": 1,
//   "generatedAt": "2026-07-02T12:00:00Z",
//   "roadmap": { "path": "roadmap.json", "sha": "<sha256-hex>", "size": <bytes> },
//   "topics": {
//     "cs.oop":   { "level": 1, "path": "level_01/oop.json", "sha": "<sha256-hex>", "size": <bytes> },
//     "java.streams": { "level": 2, "path": "level_02/streams.json", "sha": "...", "size": ... },
//     ...
//   }
// }
//
// jsDelivr URLs the app will fetch:
//   https://cdn.jsdelivr.net/gh/<user>/<repo>@main/content_manifest.json
//   https://cdn.jsdelivr.net/gh/<user>/<repo>@main/level_01/oop.json
//
// Usage:  node tools/publish_content.js [--outDir ../content_publish]

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const REPO_ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(REPO_ROOT, "app", "assets", "content");

const argOut = process.argv.indexOf("--outDir");
const OUT_DIR = argOut !== -1 && process.argv[argOut + 1]
  ? path.resolve(process.argv[argOut + 1])
  : path.resolve(REPO_ROOT, "..", "se-learning-content");

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

// 1. Roadmap ---------------------------------------------------------------
const roadmapSrc = path.join(SRC_DIR, "roadmap.json");
if (!fs.existsSync(roadmapSrc)) {
  console.error("ERROR: roadmap.json not found at", roadmapSrc);
  process.exit(1);
}
const roadmapBuf = fs.readFileSync(roadmapSrc);
const roadmap = JSON.parse(roadmapBuf.toString("utf8"));

// Build id -> level map from the roadmap so we can validate topic files.
const idToLevel = {};
for (const level of roadmap.levels ?? []) {
  for (const t of level.topics ?? []) {
    idToLevel[t.id] = level.id;
  }
}

// 2. Topic files -----------------------------------------------------------
const topics = {};
let bundledBytes = 0;
let missing = 0;

for (const [id, levelId] of Object.entries(idToLevel)) {
  const folder = `level_${String(levelId).padStart(2, "0")}`;
  const file = id.includes(".") ? id.split(".").pop() : id;
  const relPath = `${folder}/${file}.json`;
  const abs = path.join(SRC_DIR, relPath);

  if (!fs.existsSync(abs)) {
    missing++;
    continue;                      // stub topics that aren't authored yet
  }
  const buf = fs.readFileSync(abs);
  // sanity check — must be valid JSON with an id
  try {
    const parsed = JSON.parse(buf.toString("utf8"));
    if (!parsed.id) throw new Error("missing id");
  } catch (e) {
    console.error(`SKIP ${relPath} — invalid JSON: ${e.message}`);
    continue;
  }
  topics[id] = {
    level: levelId,
    path: relPath,
    sha: sha256(buf),
    size: buf.length,
  };
  bundledBytes += buf.length;
}

// 3. Emit manifest ---------------------------------------------------------
// NOTE: we intentionally hard-code a version stamp instead of Date.now() so
// re-runs on the same content produce identical manifests (clean git diffs).
const manifest = {
  manifestVersion: 1,
  contentVersion: process.env.CONTENT_VERSION || sha256(
    Buffer.from(JSON.stringify(topics))
  ).slice(0, 12),
  roadmap: {
    path: "roadmap.json",
    sha: sha256(roadmapBuf),
    size: roadmapBuf.length,
  },
  topics,
};

// 4. Mirror files into OUT_DIR --------------------------------------------
ensureDir(OUT_DIR);
copyFile(roadmapSrc, path.join(OUT_DIR, "roadmap.json"));
for (const meta of Object.values(topics)) {
  copyFile(
    path.join(SRC_DIR, meta.path),
    path.join(OUT_DIR, meta.path),
  );
}
fs.writeFileSync(
  path.join(OUT_DIR, "content_manifest.json"),
  JSON.stringify(manifest, null, 2),
);

// 5. Summary --------------------------------------------------------------
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
console.log("");
console.log("PUBLISHED to", OUT_DIR);
console.log(`  contentVersion:   ${manifest.contentVersion}`);
console.log(`  topics:           ${Object.keys(topics).length}`);
console.log(`  roadmap:          ${kb(roadmapBuf.length)}`);
console.log(`  bundled content:  ${kb(bundledBytes)}`);
console.log(`  stubs (skipped):  ${missing}`);
console.log("");
console.log("Next:");
console.log(`  cd ${OUT_DIR}`);
console.log("  git add -A && git commit -m \"content update\" && git push");
console.log("");
console.log("jsDelivr will pick up the push in ~10 min:");
console.log("  https://cdn.jsdelivr.net/gh/<user>/se-learning-content@main/content_manifest.json");
