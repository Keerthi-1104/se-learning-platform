// VOLUME 8 — Databases
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.navy, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.navy, space: 8 } },
      children: [new TextRun({ text: "VOLUME 8", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Databases", size: 32, color: C.navy, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "MySQL · PostgreSQL · MongoDB · SQLite", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Hive · Drift · Isar · ObjectBox · Realm", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Indexing · Query Optimization · Transactions", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 8", "intro"));
body.push(P([{ t: "Data is the product. ", b: true }, "This volume covers the server databases you'll be asked about (MySQL, Postgres, Mongo, SQLite), the mobile-first stores (Hive, Drift, Isar, ObjectBox, Realm), and the cross-cutting skills that separate 'has queried a DB' from 'can operate a DB' — indexing, query optimization, and transactions."]));
body.push(callout("note", [["Each topic ends with ", { t: "✅ Summary · 🎯 Interview · 💻 Coding · 🏭 Real-world · 🛠 Mini Project · 🚀 Advanced.", b: true }]]));
body.push(callout("interview", ["Backend interviews test 3 database themes hard: (a) how the DB is structured (clustered index, MVCC), (b) how to read an execution plan, (c) ACID and isolation. This volume drills all three across engines."]));

// 1. MySQL
body.push(...topicToChapter(loadTopic("level_08", "mysql"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

body.push(...topicToChapter(loadTopic("level_08", "postgresql"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

body.push(...topicToChapter(loadTopic("level_08", "mongodb"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

body.push(...topicToChapter(loadTopic("level_08", "sqlite"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

body.push(...topicToChapter(loadTopic("level_08", "hive"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

body.push(...topicToChapter(loadTopic("level_08", "drift"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

body.push(...topicToChapter(loadTopic("level_08", "isar"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

body.push(...topicToChapter(loadTopic("level_08", "objectbox"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

body.push(...topicToChapter(loadTopic("level_08", "realm"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

body.push(...topicToChapter(loadTopic("level_08", "indexing"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

body.push(...topicToChapter(loadTopic("level_08", "query_optimization"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

body.push(...topicToChapter(loadTopic("level_08", "transactions"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// Revision
body.push(H1("Volume 8 Revision Cheat Sheet", "cheat"));
body.push(H2("Pick-the-DB flowchart"));
body.push(callout("note", ["Rich queries + strong consistency + open source → Postgres. Massive read-heavy web + huge community → MySQL. Flexible docs / high write throughput → MongoDB. On-device / mobile → SQLite (via Drift) or Isar/ObjectBox for object stores."]));
body.push(H2("Performance stack"));
body.push(callout("best", ["Right index (matching top query) → right query (no OFFSET, no N+1) → covering when possible → materialized view / cache for really hot aggregates. EXPLAIN ANALYZE is the diagnostic."]));
body.push(H2("Transactions rule"));
body.push(callout("perf", ["Keep them small. Choose isolation by anomaly you can't tolerate. Retry on deadlocks. In microservices, prefer sagas over 2PC."]));
body.push(rule(C.navy));
body.push(P([{ t: "End of Volume 8. ", b: true, color: C.navy }, "Next: Volume 9 — Firebase (Auth, Firestore, Storage, Crashlytics, Analytics, Remote Config, FCM)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 8 — Databases"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-8-Databases.docx");
save(doc, out).then(() => console.log("WROTE", out));
