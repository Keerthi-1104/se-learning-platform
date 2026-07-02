// VOLUME 6 — Mobile Architecture
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.teal, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.teal, space: 8 } },
      children: [new TextRun({ text: "VOLUME 6", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Mobile Architecture", size: 32, color: C.teal, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Clean Architecture · MVVM · MVC · Repository · Service Layer", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Dependency Injection · Feature-first · Modular · Foundation", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Offline-first · Server-Driven UI · Design Systems", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 6", "intro"));
body.push(P([{ t: "Architecture ", b: true }, "is what separates code that scales from code that ossifies. Volume 6 covers the patterns you're expected to know at senior/architect interviews: Clean Architecture, MVVM, Repository, DI, feature-first + modular structure, offline-first, SDUI, and design systems — each explained with the same 20-point pattern used across the series."]));
body.push(callout("note", [["Each topic ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["Senior-level questions rarely ask 'what is MVVM?' — they ask 'how would you structure this app?' Have a default answer that combines feature-first + Clean layers + repositories + DI + offline-first, and know when to deviate."]));

// 1. Clean Architecture
body.push(...topicToChapter(loadTopic("level_06", "clean"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// 2. MVVM
body.push(...topicToChapter(loadTopic("level_06", "mvvm"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. MVC
body.push(...topicToChapter(loadTopic("level_06", "mvc"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. Repository Pattern
body.push(...topicToChapter(loadTopic("level_06", "repository"),
  { chapterNumber: 4, bookmarkId: "ch4" }));
body.push(...miniproject(["Build an OrderRepository with local cache + remote sync exposing a Stream; test both online and offline paths."]));
body.push(...advanced(["Unit of Work, aggregate roots, and the distinction between DDD Repositories and DAOs."]));

// 5. Service Layer
body.push(...topicToChapter(loadTopic("level_06", "service_layer"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// 6. Dependency Injection
body.push(...topicToChapter(loadTopic("level_06", "di"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// 7. Feature-first Architecture
body.push(...topicToChapter(loadTopic("level_06", "feature_first"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. Modular
// 8. Modular Architecture
body.push(...topicToChapter(loadTopic("level_06", "modular"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// 9. Foundation Layer
body.push(...topicToChapter(loadTopic("level_06", "foundation"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Offline-first Architecture
body.push(...topicToChapter(loadTopic("level_06", "offline_first"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. Server-Driven UI
body.push(...topicToChapter(loadTopic("level_06", "sdui"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. Design Systems
body.push(...topicToChapter(loadTopic("level_06", "design_systems"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// Revision
body.push(H1("Volume 6 Revision Cheat Sheet", "cheat"));
body.push(H2("Default senior-interview answer"));
body.push(callout("note", ["'I'd start feature-first + Clean layers inside each feature; the domain depends only on interfaces; data implements them; UI is MVVM. I'd wire dependencies with a compile-safe DI (Riverpod/Hilt). Offline-first repositories with a local source of truth. A foundation module for network/errors/logging.'"]));
body.push(H2("Roles that get confused"));
body.push(callout("best", ["Repository = DATA of an aggregate. Service = a CAPABILITY. UseCase = one BUSINESS ACTION orchestrating both."]));
body.push(H2("Design decisions in one line"));
body.push(callout("perf", ["Modularize when build times or team size demand it. Adopt SDUI for high-churn UI only. Invest in a design system before you have 20 screens, not after 100."]));
body.push(rule(C.teal));
body.push(P([{ t: "End of Volume 6. ", b: true, color: C.navy }, "Next: Volume 7 — Backend Development (REST, GraphQL, gRPC, Spring Boot, Microservices, Kafka, Redis, Docker/K8s)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 6 — Mobile Architecture"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-6-Architecture.docx");
save(doc, out).then(() => console.log("WROTE", out));
