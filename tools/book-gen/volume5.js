// VOLUME 5 — State Management
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.purple, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.purple, space: 8 } },
      children: [new TextRun({ text: "VOLUME 5", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "State Management in Flutter", size: 32, color: C.purple, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Provider · BLoC · Cubit · Riverpod · GetX · Redux · MobX", size: 22, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Compared head-to-head, with best practices and when to use which", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 5", "intro"));
body.push(P([{ t: "'Which state management do you use?' ", b: true }, "is one of the most common Flutter interview questions — and the wrong answer is naming one and calling it 'the best'. This volume teaches all seven major approaches and, crucially, when to use each, so you can reason about fit instead of reciting dogma."]));
body.push(callout("note", [["Each chapter ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["The split that frames everything: ephemeral (local) state belongs in setState; shared/app state belongs in a state-management solution. Always separate logic from UI and rebuild only what changed — that's true for every tool below."]));

// 1. Provider
body.push(...topicToChapter(loadTopic("level_05", "provider"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// 2. BLoC
body.push(...topicToChapter(loadTopic("level_05", "bloc"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. Cubit
body.push(...topicToChapter(loadTopic("level_05", "cubit"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. Riverpod
body.push(...topicToChapter(loadTopic("level_05", "riverpod"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// 5. GetX
body.push(...topicToChapter(loadTopic("level_05", "getx"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// 6. Redux
body.push(...topicToChapter(loadTopic("level_05", "redux"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// 7. MobX
body.push(...topicToChapter(loadTopic("level_05", "mobx"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. Comparison & Decision Framework
body.push(...topicToChapter(loadTopic("level_05", "comparison"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// Revision
body.push(H1("Volume 5 Revision Cheat Sheet", "cheat"));
body.push(H2("Pick by fit"));
body.push(callout("note", ["Local UI → setState. Small/medium shared → Provider. Most production apps → Riverpod or BLoC. Prototype fast → GetX. Very large auditable → Redux. Transparent reactivity → MobX."]));
body.push(H2("Universal rules"));
body.push(callout("best", ["Separate logic from UI. Immutable state. Rebuild only what changed (Selector/select/Consumer/Builder). Model async as loading/error/data. Keep logic unit-testable without widgets."]));
body.push(H2("Interview soundbite"));
body.push(callout("interview", ["'There's no single best — it depends on app size, team and complexity. I default to Riverpod/BLoC for production for testability and scalability, and always separate logic from UI.'"]));
body.push(rule(C.purple));
body.push(P([{ t: "End of Volume 5. ", b: true, color: C.navy }, "Next: Volume 6 — Mobile Architecture (Clean Architecture, MVVM, Repository, DI, offline-first, SDUI)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 5 — State Management"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-5-State-Management.docx");
save(doc, out).then(() => console.log("WROTE", out));
