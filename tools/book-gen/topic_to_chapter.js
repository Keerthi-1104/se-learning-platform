// topic_to_chapter.js
// Reads one topic JSON (the same file the Flutter app uses) and returns
// an array of docx paragraphs/tables/etc. so the book and the app stay
// in perfect sync. When we expand a topic's JSON, running any volumeN.js
// picks up the new content automatically.
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const {
  C, P, H1, H2, H3, bullet, num, callout, code, table, chip, runs,
  Paragraph, TextRun,
} = L;

function loadTopic(levelFolder, filenameNoExt) {
  const p = path.join(__dirname, "..", "..", "app", "assets", "content", levelFolder, `${filenameNoExt}.json`);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

// The variants used in JSON map to the callout theme names in lib.js
const CALLOUT_VARIANT_MAP = {
  definition: "definition",
  analogy: "analogy",
  tip: "tip",
  best: "best",
  mistake: "mistake",
  interview: "interview",
  perf: "perf",
  note: "note",
};

function renderSection(s) {
  if (!s || !s.type) return [];
  switch (s.type) {
    case "theory": {
      return markdownToParagraphs(s.markdown || "");
    }
    case "callout": {
      const variant = CALLOUT_VARIANT_MAP[s.variant] || "note";
      const lines = (s.markdown || "").split("\n").map((line) => parseInlineMarkdown(line));
      return [callout(variant, lines)];
    }
    case "code": {
      const arr = (s.code || "").split("\n");
      return [code(arr, s.language || "")];
    }
    case "table": {
      const headers = s.headers || [];
      const rows = s.rows || [];
      const n = headers.length || 1;
      const widths = Array(n).fill(Math.floor(9360 / n));
      widths[widths.length - 1] += 9360 - widths.reduce((a, b) => a + b, 0);
      return [table(headers, rows, widths)];
    }
    case "diagram": {
      return [P([{ t: `[Diagram] ${s.caption || ""}`, i: true, color: C.grayText }])];
    }
    case "divider": {
      return [L.rule(C.blue)];
    }
    default:
      return markdownToParagraphs(s.markdown || "");
  }
}

// Turn a markdown-lite blob (with headings, bullets, bold, inline code) into
// docx Paragraphs. Handles: ##/### headings, - / • bullets, blank line = spacer.
function markdownToParagraphs(md) {
  const out = [];
  const lines = md.split("\n");
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      out.push(new Paragraph({ children: [new TextRun(" ")] }));
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(H3(line.substring(4).trim()));
    } else if (line.startsWith("## ")) {
      out.push(H2(line.substring(3).trim()));
    } else if (line.startsWith("# ")) {
      out.push(H1(line.substring(2).trim()));
    } else if (line.trimStart().startsWith("- ") || line.trimStart().startsWith("• ")) {
      const t = line.trimStart().substring(2);
      out.push(bullet(parseInlineMarkdown(t)));
    } else {
      out.push(P(parseInlineMarkdown(line)));
    }
  }
  return out;
}

// Turn "**bold** and normal and `code`" into an array of runs {t,b,code}
// that lib.js's runs() can render.
function parseInlineMarkdown(text) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.substring(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      parts.push({ t: tok.substring(2, tok.length - 2), b: true });
    } else {
      parts.push({ t: tok.substring(1, tok.length - 1), code: true, color: C.purple });
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.substring(last));
  return parts.length ? parts : [""];
}

// The per-topic closer blocks (Summary / Interview / Coding / etc)
// use the same style as previous volumes so the book stays consistent.
function summary(pts) { return [chip("✅ SUMMARY", C.green), ...pts.map((p) => bullet(p))]; }
function interviewQs(qs) {
  return [
    chip("🎯 INTERVIEW QUESTIONS & ANSWERS", C.amber),
    ...qs.flatMap((q, i) => {
      // Each entry may be:
      //   a plain string  (just a question),
      //   or a markdown "Q...\n\nA..." blob (question + answer we can render).
      // The JSON's interviewQuestions field is a list of strings; the
      // detailed Q&A also lives in `sections` as callout(interview). We
      // include the short list here for review.
      return [num(q)];
    }),
  ];
}
function coding(items) {
  return [
    chip("💻 CODING PROBLEMS", C.purple),
    ...items.map((it) => bullet([
      { t: `[${it.level}] `, b: true, color: it.level === "Expert" ? C.red : it.level === "Hard" ? C.amber : it.level === "Medium" ? C.blue : C.green },
      it.text,
    ])),
  ];
}
function realworld(topic) {
  // Real-world content is now embedded in the expanded sections themselves.
  // Nothing to add here for topics using the new format; kept for the older
  // volumes that still write it inline.
  return [];
}
function flashcards(cards) {
  if (!cards || cards.length === 0) return [];
  return [
    chip("🎴 FLASHCARDS", C.teal),
    ...cards.flatMap((c) => [
      P([{ t: "Q: ", b: true, color: C.teal }, c.front]),
      P([{ t: "A: ", b: true, color: C.green }, c.back]),
    ]),
  ];
}

// The main function: read a topic JSON and produce a full book chapter.
function topicToChapter(topic, opts = {}) {
  const out = [];
  const titlePrefix = opts.chapterNumber != null ? `${opts.chapterNumber}. ` : "";
  out.push(H1(`${titlePrefix}${topic.title}`, opts.bookmarkId));

  if (topic.objectives && topic.objectives.length) {
    out.push(callout("note", [
      [{ t: "Learning objectives", b: true }],
      ...topic.objectives.map((o) => `• ${o}`),
    ]));
  }

  // Render every section from the JSON in order.
  for (const s of (topic.sections || [])) {
    out.push(...renderSection(s));
  }

  // Closers
  if (topic.flashcards && topic.flashcards.length) out.push(...flashcards(topic.flashcards));
  if (topic.challenges && topic.challenges.length) out.push(...coding(topic.challenges));
  if (topic.interviewQuestions && topic.interviewQuestions.length) out.push(...interviewQs(topic.interviewQuestions));

  return out;
}

module.exports = { loadTopic, topicToChapter };
