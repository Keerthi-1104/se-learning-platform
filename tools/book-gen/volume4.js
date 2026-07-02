// VOLUME 4 — Flutter & Dart
const L = require("./lib");
const { loadTopic, topicToChapter } = require("./topic_to_chapter");
const {
  C, P, H1, H2, bullet, num, callout, code, table, rule, chip,
  makeDoc, pageProps, save, Paragraph, TextRun, PageBreak, AlignmentType,
  TableOfContents, runs,
} = L;

function cover() {
  const blank = (n = 1) => Array(n).fill(new Paragraph({ children: [new TextRun(" ")] }));
  return [
    ...blank(3),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
      children: [new TextRun({ text: "THE ULTIMATE", bold: true, size: 40, color: C.blue })] }),
    new Paragraph({ style: "Title", children: [new TextRun("Software Engineer")] }),
    new Paragraph({ style: "Title", children: [new TextRun("Roadmap")] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 240 },
      children: [new TextRun({ text: "From Beginner to FAANG / MNC Interview-Ready", italics: true, size: 26, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 },
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.blue, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.blue, space: 8 } },
      children: [new TextRun({ text: "VOLUME 4", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Flutter & Dart — Engine to Expert", size: 30, color: C.blue, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Dart · Widgets · Lifecycle · BuildContext · Widget/Element/Render Trees", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Rendering Pipeline · Navigation · State · Animations · Slivers · CustomPainter", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Platform Channels · Flutter Engine · Impeller · FFI · Package Development", size: 20, color: C.grayText })] }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function toc() {
  return [
    new Paragraph({ style: "Title", spacing: { after: 200 }, children: [new TextRun("Table of Contents")] }),
    new TableOfContents("Contents", { hyperlink: true, headingStyleRange: "1-3" }),
    new Paragraph({ spacing: { before: 160 }, children: runs([{ t: "Tip: ", b: true, color: C.green }, "In Microsoft Word, press Ctrl+A then F9 (Cmd+A, fn+F9 on Mac) to refresh this Table of Contents."]) }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

const summary = (pts) => [chip("✅ SUMMARY", C.green), ...pts.map((p) => bullet(p))];
const interview = (qs) => [chip("🎯 INTERVIEW QUESTIONS", C.amber), ...qs.map((q) => num(q))];
const coding = (items) => [chip("💻 CODING PROBLEMS", C.purple),
  ...items.map((it) => bullet([{ t: `[${it.level}] `, b: true, color: it.level === "Expert" ? C.red : it.level === "Hard" ? C.amber : it.level === "Medium" ? C.blue : C.green }, it.text]))];
const realworld = (lines) => [chip("🏭 REAL-WORLD EXAMPLE", C.teal), ...lines.map((l) => P(l))];
const miniproject = (lines) => [chip("🛠 MINI PROJECT", C.blue), ...lines.map((l) => (typeof l === "string" ? bullet(l) : l))];
const advanced = (lines) => [chip("🚀 ADVANCED NOTES", C.navy), ...lines.map((l) => bullet(l))];

// Compact chapter helper for shorter topics: title, defn, extras[], closers
function chapter(opts) {
  const out = [H1(opts.title, opts.id)];
  if (opts.def) out.push(callout("definition", [opts.def]));
  (opts.blocks || []).forEach((b) => out.push(b));
  out.push(...summary(opts.summary));
  out.push(...interview(opts.interview));
  out.push(...coding(opts.coding));
  out.push(...realworld(opts.realworld));
  out.push(...miniproject(opts.miniproject));
  out.push(...advanced(opts.advanced));
  return out;
}

const body = [];

body.push(H1("How to Use Volume 4", "intro"));
body.push(P([{ t: "Flutter is the centerpiece of this roadmap. ", b: true }, "This is the deepest volume: it goes past 'how to build a screen' into how Flutter actually works — the three trees, the rendering pipeline, the engine, Impeller and FFI. That internal knowledge is exactly what separates senior Flutter engineers in interviews."]));
body.push(callout("note", [["Each topic ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["The signature senior Flutter question: 'Explain the difference between the Widget, Element and RenderObject trees.' If you can answer that and walk a frame through the rendering pipeline, you're ahead of most candidates."]));

// 1. Dart Language
body.push(...topicToChapter(loadTopic("level_04", "dart"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// 2. Widgets
body.push(...topicToChapter(loadTopic("level_04", "widgets"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. Widget Lifecycle
body.push(...topicToChapter(loadTopic("level_04", "widget_lifecycle"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. BuildContext
body.push(...topicToChapter(loadTopic("level_04", "buildcontext"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// 5. Widget Tree
body.push(...topicToChapter(loadTopic("level_04", "widget_tree"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// 6. Element Tree
body.push(...topicToChapter(loadTopic("level_04", "element_tree"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// 7. Render Tree
body.push(...topicToChapter(loadTopic("level_04", "render_tree"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. Rendering Pipeline
body.push(...topicToChapter(loadTopic("level_04", "rendering_pipeline"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// 9. Navigation
body.push(...topicToChapter(loadTopic("level_04", "navigation"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Forms
body.push(...topicToChapter(loadTopic("level_04", "forms"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. State Management
body.push(...topicToChapter(loadTopic("level_04", "state"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. Animations
body.push(...topicToChapter(loadTopic("level_04", "animations"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// 13. Slivers
body.push(...topicToChapter(loadTopic("level_04", "slivers"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

// 14. CustomPainter
body.push(...topicToChapter(loadTopic("level_04", "custompainter"),
  { chapterNumber: 14, bookmarkId: "ch14" }));

// 15. Platform Channels
body.push(...topicToChapter(loadTopic("level_04", "platform_channels"),
  { chapterNumber: 15, bookmarkId: "ch15" }));

// 16. Flutter Engine
body.push(...topicToChapter(loadTopic("level_04", "engine"),
  { chapterNumber: 16, bookmarkId: "ch16" }));

// 15 Impeller
body.push(...chapter({
  id: "ch17", title: "17. Impeller",
  def: "Impeller is Flutter's modern rendering engine replacing the Skia-based renderer, designed to eliminate 'shader compilation jank' by precompiling shaders at build time.",
  blocks: [
    table(["", "Skia (old)", "Impeller"], [
      ["Shaders", "Compiled at runtime (jank)", "Precompiled at build"],
      ["Backend", "GL/Metal/Vulkan via Skia", "Metal (iOS), Vulkan (Android)"]], [1700, 3830, 3830]),
    callout("interview", ["The old problem: Skia compiled shaders the first time an effect appeared, causing a one-time stutter. Impeller precompiles a fixed shader set ahead of time, so first-run animations are smooth."]),
  ],
  summary: ["Impeller fixes shader compilation jank.", "Shaders precompiled at build, not runtime.", "Metal on iOS, Vulkan on Android.", "Default on iOS; rolling out on Android."],
  interview: ["What is Impeller and why created?", "What is shader jank?", "Impeller vs Skia?", "Which backends?", "Platform status?"],
  coding: [
    { level: "Easy", text: "Explain shader jank and Impeller's fix." },
    { level: "Medium", text: "Compare first-run smoothness with Impeller on/off." },
    { level: "Hard", text: "Profile a complex animation on each renderer." },
    { level: "Expert", text: "Adapt a custom shader that differs on Impeller." }],
  realworld: ["Teams that battled first-run jank with SkSL warm-up scripts now get it for free with Impeller — a major DX/UX win."],
  miniproject: ["Build an animation-heavy screen and document first-run smoothness across renderers."],
  advanced: ["Impeller's tessellation, FragmentProgram support, platform rollout caveats."],
}));

// 16 FFI
body.push(...chapter({
  id: "ch18", title: "18. FFI (Foreign Function Interface)",
  def: "dart:ffi lets Dart call C functions and use C structures directly — no serialization — ideal for existing C/C++/Rust libraries (crypto, codecs, ML, SQLite).",
  blocks: [
    code(["final lib = DynamicLibrary.open('libnative.so');",
      "final add = lib.lookupFunction<Int32 Function(Int32,Int32),",
      "  int Function(int,int)>('add');"], "dart"),
    callout("interview", ["Use FFI to call C libraries or move lots of data cheaply; use platform channels for platform services in Kotlin/Swift. FFI is synchronous, so still offload heavy work to an isolate."]),
    callout("mistake", ["Leaking native memory — malloc'd memory must be freed; mismatched struct layouts crash. Use ffigen to generate bindings."]),
  ],
  summary: ["FFI calls C ABI libraries directly, no serialization.", "FFI = C libs; channels = platform code.", "FFI is synchronous — offload heavy work.", "Manage native memory; use ffigen."],
  interview: ["What is dart:ffi and when use it?", "FFI vs channels?", "Manage native memory?", "Is FFI sync? Avoid blocking?", "What is ffigen?"],
  coding: [
    { level: "Easy", text: "Call C add(int,int) from a shared lib." },
    { level: "Medium", text: "Pass/read a C struct, freeing memory." },
    { level: "Hard", text: "Generate bindings with ffigen." },
    { level: "Expert", text: "Wrap a Rust function and run it off-isolate." }],
  realworld: ["High-performance packages (sqlite3, image codecs, crypto) use FFI to reuse battle-tested C libraries instead of reimplementing in Dart."],
  miniproject: ["Bind a small C math/crypto library and expose a safe typed Dart API over it."],
  advanced: ["NativeFinalizer for cleanup, isolates + FFI callbacks, ffigen + native assets."],
}));

// 17 Packages
body.push(...chapter({
  id: "ch19", title: "19. Package Development",
  def: "A package is reusable code on pub.dev. A pure Dart package has no platform code; a plugin adds native (channel or FFI) implementations per platform.",
  blocks: [
    table(["Type", "Contains", "Example"], [
      ["Dart package", "Pure Dart", "intl, collection"],
      ["Plugin (federated)", "Dart + native per platform", "camera, geolocator"],
      ["FFI plugin", "Dart + C/C++", "sqlite3"]], [2100, 3500, 3760]),
    callout("interview", ["Modern plugins are 'federated': a platform-interface package defines the contract and each platform provides its own implementation, so third parties can add support without touching the core."]),
  ],
  summary: ["Package = pure Dart; plugin = + native.", "Federated = interface + per-platform impls.", "Use semantic versioning (MAJOR breaks).", "Ship example, tests, docs for adoption."],
  interview: ["Package vs plugin vs FFI plugin?", "What is a federated plugin?", "How version and publish?", "Design a good public API?", "What earns pub.dev points?"],
  coding: [
    { level: "Easy", text: "Pure Dart package with a tested utility." },
    { level: "Medium", text: "Plugin exposing one native method." },
    { level: "Hard", text: "Make it federated with platform interface." },
    { level: "Expert", text: "Publish to pub.dev with example, tests, CI." }],
  realworld: ["Companies extract shared widgets/clients into internal packages so many apps reuse one tested implementation."],
  miniproject: ["Extract a reusable component from an app into a published (or local) package with tests and an example app."],
  advanced: ["Melos monorepos, platform-interface design, native assets, pub scoring."],
}));

// Revision
body.push(H1("Volume 4 Revision Cheat Sheet", "cheat"));
body.push(H2("The three trees"));
body.push(callout("note", ["Widget = immutable config (rebuilt often). Element = living instance + State (reused when runtimeType+key match). RenderObject = layout/paint/hit-test. BuildContext IS the Element."]));
body.push(H2("A frame"));
body.push(callout("perf", ["vsync → Build → Layout (constraints down, sizes up) → Paint (record layers) → Composite → Rasterize (GPU). UI thread vs raster thread. ~16ms budget; jank = overrun."]));
body.push(H2("Engine stack"));
body.push(callout("best", ["App → Framework (Dart widgets) → Engine (C++: Dart VM + Impeller/Skia + text) → Embedder → OS. Flutter draws every pixel itself. Impeller precompiles shaders to kill first-run jank."]));
body.push(rule(C.blue));
body.push(P([{ t: "End of Volume 4. ", b: true, color: C.navy }, "Next: Volume 5 — State Management (Provider, BLoC, Cubit, Riverpod, GetX, Redux, MobX compared)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 4 — Flutter & Dart"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-4-Flutter.docx");
save(doc, out).then(() => console.log("WROTE", out));
