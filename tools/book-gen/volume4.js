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

// 17. Impeller
body.push(...topicToChapter(loadTopic("level_04", "impeller"),
  { chapterNumber: 17, bookmarkId: "ch17" }));

// 18. FFI
body.push(...topicToChapter(loadTopic("level_04", "ffi"),
  { chapterNumber: 18, bookmarkId: "ch18" }));

// 19. Packages
body.push(...topicToChapter(loadTopic("level_04", "packages"),
  { chapterNumber: 19, bookmarkId: "ch19" }));

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
