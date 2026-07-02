// VOLUME 2 — Java (Java 8 to Latest LTS)
const L = require("./lib");
// Bridge that reads the same topic JSON the Flutter app uses.
const { loadTopic, topicToChapter } = require("./topic_to_chapter");
const {
  C, P, H1, H2, H3, bullet, num, callout, code, table, rule, chip,
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.amber, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.amber, space: 8 } },
      children: [new TextRun({ text: "VOLUME 2", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Java — Core to Modern (Java 8 → Latest LTS)", size: 30, color: C.amber, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "JVM · JDK · JRE · Memory · Garbage Collection · Multithreading", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Collections · Generics · Streams · Lambdas · Functional · Reflection", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Records · Sealed Classes · Pattern Matching · Virtual Threads", size: 20, color: C.grayText })] }),
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

const body = [];

// Intro
body.push(H1("How to Use Volume 2", "intro"));
body.push(P([{ t: "Java is the backbone of enterprise software ", b: true }, "and the most common interview language at MNCs (TCS, Infosys, Accenture) and product companies alike. This volume takes you from the JVM up to the newest LTS features (records, sealed classes, virtual threads), with the same 20-point teaching pattern and per-topic closers used in Volume 1."]));
body.push(callout("note", [["Each topic ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["A huge fraction of Java interviews are 'which version added X?' and 'how does HashMap/GC/the JVM work internally?'. This volume drills exactly those."]));

// 1. Core Java
body.push(...topicToChapter(loadTopic("level_02", "core"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

body.push(...topicToChapter(loadTopic("level_02", "collections"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

body.push(...topicToChapter(loadTopic("level_02", "exceptions"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

body.push(...topicToChapter(loadTopic("level_02", "generics"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

body.push(...topicToChapter(loadTopic("level_02", "multithreading"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

body.push(...topicToChapter(loadTopic("level_02", "jvm"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

body.push(...topicToChapter(loadTopic("level_02", "gc"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. Streams API
body.push(...topicToChapter(loadTopic("level_02", "streams"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// 9. Lambdas
body.push(...topicToChapter(loadTopic("level_02", "lambdas"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Functional Programming
body.push(...topicToChapter(loadTopic("level_02", "functional"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. Reflection
body.push(...topicToChapter(loadTopic("level_02", "reflection"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. Records
body.push(...topicToChapter(loadTopic("level_02", "records"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// 13. Sealed Classes
body.push(...topicToChapter(loadTopic("level_02", "sealed"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

// 14. Pattern Matching
body.push(...topicToChapter(loadTopic("level_02", "pattern_matching"),
  { chapterNumber: 14, bookmarkId: "ch14" }));

// 15. Virtual Threads
body.push(...topicToChapter(loadTopic("level_02", "virtual_threads"),
  { chapterNumber: 15, bookmarkId: "ch15" }));

// 16. Version Guide
body.push(...topicToChapter(loadTopic("level_02", "versions"),
  { chapterNumber: 16, bookmarkId: "ch16" }));

// Revision
body.push(H1("Volume 2 Revision Cheat Sheet", "cheat"));
body.push(H2("Which version added what"));
body.push(callout("note", ["8: lambdas/streams/Optional · 9: modules · 10: var · 14: switch expr · 15: text blocks · 16: records · 17: sealed · 21: virtual threads."]));
body.push(H2("Internals in one breath"));
body.push(callout("perf", ["HashMap treeifies buckets >8 (O(log n)). Heap holds objects; stacks are per-thread. Generational GC collects the young gen cheaply; G1 is default. JIT compiles hot methods after warm-up."]));
body.push(H2("Concurrency rules"));
body.push(callout("best", ["volatile = visibility, not atomicity. Use atomics/locks for compound updates. Prefer executors & virtual threads. Avoid pinning. Establish happens-before."]));
body.push(rule(C.amber));
body.push(P([{ t: "End of Volume 2. ", b: true, color: C.navy }, "Next: Volume 3 — Android Development (lifecycle, Jetpack, Room, Hilt, Coroutines)."], { align: AlignmentType.CENTER }));

// Assemble
const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 2 — Java"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-2-Java.docx");
save(doc, out).then(() => console.log("WROTE", out));
