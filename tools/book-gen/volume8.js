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

body.push(H1("9. Realm", "ch9"));
body.push(callout("definition", ["MongoDB's object-oriented mobile database with live objects — query results stay in sync with the DB — and optional Atlas Device Sync."]));
body.push(callout("interview", ["Live-object model is Realm's superpower: writes make all held references reflect changes immediately. Combined with Device Sync, this makes real-time collaborative apps unusually simple."]));
body.push(...summary([
  "Live objects auto-refresh with the DB.",
  "Realm Query Language (RQL) + type-safe API.",
  "Atlas Device Sync for multi-device conflict resolution.",
  "Per-isolate Realms; frozen for cross-isolate reads.",
]));
body.push(...interview([
  "What are live objects?",
  "How does Atlas Device Sync work?",
  "Realm vs Isar/ObjectBox?",
  "Threading rules in Realm?",
  "How do you handle conflicts?",
]));
body.push(...coding([
  { level: "Easy", text: "Local Realm CRUD." },
  { level: "Medium", text: "RQL filter + observe changes." },
  { level: "Hard", text: "One-to-many relation + query across it." },
  { level: "Expert", text: "Prototype Device Sync with two devices + a conflict." },
]));
body.push(...realworld(["Retail POS systems, field service, and healthcare apps use Realm because Device Sync eliminates a huge amount of custom sync code."]));
body.push(...miniproject(["Build a shared shopping list with Realm + Device Sync between two accounts; explore conflict rules."]));
body.push(...advanced(["Sync permissions, flexible sync queries, breaking-change schema migrations."]));

// 10. Indexing
body.push(H1("10. Indexing", "ch10"));
body.push(callout("definition", ["An index maps lookup keys to row positions, turning O(n) scans into O(log n) lookups — at the cost of extra storage and slower writes."]));
body.push(table(["Type", "Idea", "Use"], [
  ["Single-column B-tree", "Ordered on one column", "Equality + range"],
  ["Composite", "Ordered on multiple columns", "Left-prefix queries"],
  ["Covering", "All queried columns included", "Index-only scan"],
  ["Partial", "WHERE predicate", "Small hot subsets"],
  ["Unique", "Enforces uniqueness", "Emails, natural keys"],
], [1800, 3400, 4160]));
body.push(callout("interview", ["Leftmost-prefix rule: (A, B, C) serves queries filtering by A, or A+B, or A+B+C — never B alone. Design composites to match your top queries in that order."]));
body.push(callout("mistake", ["Indexing everything 'just in case.' Each index slows writes and eats storage. Add indexes to real hot queries only."]));
body.push(...summary([
  "Indexes trade write speed + storage for read speed.",
  "Leftmost-prefix rule governs composites.",
  "Covering indexes enable index-only scans.",
  "EXPLAIN to confirm; watch for bloat.",
]));
body.push(...interview([
  "How does a B-tree index work?",
  "Explain the leftmost-prefix rule.",
  "What is a covering index?",
  "When use partial indexes?",
  "Why is over-indexing bad?",
]));
body.push(...coding([
  { level: "Easy", text: "Add single-column index; EXPLAIN plan." },
  { level: "Medium", text: "Composite matching a top query; test with/without." },
  { level: "Hard", text: "Convert a query to an index-only scan (covering)." },
  { level: "Expert", text: "Detect bloat; rebuild without downtime." },
]));
body.push(...realworld(["Every product outage story about 'the DB is slow' is really 'we forgot an index.' Interviewers love index design questions because the impact is huge and the reasoning is simple."]));
body.push(...miniproject(["Take a slow endpoint; add correct indexes and prove 100× improvement with pg_stat_statements or a benchmark."]));
body.push(...advanced(["Function/expression indexes, hash and BRIN internals, bloom filters as pre-indexes, inverted indexes in search engines."]));

// 11. Query Optimization
body.push(H1("11. Query Optimization", "ch11"));
body.push(callout("definition", ["Shape SQL + schema so the planner picks efficient plans: index scans over seq scans, streaming aggregates over sorts, hash joins with right build sides."]));
body.push(code([
  "EXPLAIN (ANALYZE, BUFFERS)",
  "SELECT o.id, u.name",
  "FROM orders o JOIN users u ON u.id = o.user_id",
  "WHERE o.status = 'PAID' AND o.created_at > now() - interval '7 days'",
  "ORDER BY o.created_at DESC",
  "LIMIT 20;",
  "",
  "-- Fix: index (status, created_at DESC) on orders",
], "explain analyze"));
body.push(callout("interview", ["Slow query drill: EXPLAIN ANALYZE → look for Seq Scan on hot tables, Sort without an ordered index, and 'Rows Removed by Filter' (predicate not pushed down). Rewrites often beat re-indexes."]));
body.push(callout("mistake", ["OFFSET pagination on large tables — the DB scans and discards N rows for each page. Use keyset (cursor) pagination: `WHERE (created_at, id) < (?, ?) ORDER BY ... LIMIT 20`."]));
body.push(...summary([
  "EXPLAIN ANALYZE is the entry point.",
  "Kill Seq Scan / OFFSET / N+1 patterns.",
  "Push filters into the query; select specific columns.",
  "Materialized views or caches for hot aggregates.",
]));
body.push(...interview([
  "Walk through reading an EXPLAIN ANALYZE plan.",
  "How to fix an N+1?",
  "Why is OFFSET pagination bad?",
  "How to find slow queries in production?",
  "When use a materialized view?",
]));
body.push(...coding([
  { level: "Easy", text: "EXPLAIN a query; identify Seq Scan vs Index Scan." },
  { level: "Medium", text: "Convert OFFSET to keyset pagination." },
  { level: "Hard", text: "Rewrite subquery → JOIN; confirm faster plan." },
  { level: "Expert", text: "Materialized view + refresh strategy for a heavy aggregate." },
]));
body.push(...realworld(["Nearly every 'API is slow' postmortem involves a bad query plan. Being fluent in EXPLAIN reads and rewriting queries is a real senior-engineer differentiator."]));
body.push(...miniproject(["Take a real slow endpoint (or seed one); progressively fix it with indexes, rewrites, and pagination changes; document each round with plan diffs."]));
body.push(...advanced(["Planner hints, prepared statement plans, parallel query, extended statistics, HypoPG for what-if analysis."]));

// 12. Transactions
body.push(H1("12. Transactions", "ch12"));
body.push(callout("definition", ["Groups of operations that succeed or fail together. ACID — Atomicity, Consistency, Isolation, Durability — guarantees correctness under concurrency and crashes."]));
body.push(table(["Isolation", "Prevents", "Allows"], [
  ["READ UNCOMMITTED", "—", "Dirty reads"],
  ["READ COMMITTED", "Dirty reads", "Non-repeatable + phantoms"],
  ["REPEATABLE READ", "Dirty + non-repeatable", "Phantoms (some engines)"],
  ["SERIALIZABLE", "All", "Aborts on conflict"],
], [2400, 3400, 3560]));
body.push(code([
  "BEGIN;",
  "SELECT balance FROM accounts WHERE id=1 FOR UPDATE;",
  "UPDATE accounts SET balance = balance-100 WHERE id=1;",
  "UPDATE accounts SET balance = balance+100 WHERE id=2;",
  "COMMIT;",
], "transfer"));
body.push(callout("interview", ["Classic proof of atomicity: without a transaction, a crash between the two updates leaves money missing. Combined with isolation, you also avoid seeing half-applied transfers from other users."]));
body.push(callout("mistake", ["Long transactions across UI clicks/API calls. They block others, hold locks, and (in Postgres) prevent VACUUM. Keep transactions small and fast."]));
body.push(...summary([
  "ACID gives all-or-nothing + safe concurrency + durability.",
  "Choose isolation by anomaly you can't tolerate.",
  "Retry on deadlocks; keep transactions short.",
  "Distributed = sagas / outbox, not 2PC.",
]));
body.push(...interview([
  "Explain ACID.",
  "Isolation levels + anomalies each prevents?",
  "How to handle deadlocks?",
  "Optimistic vs pessimistic locking?",
  "Why avoid distributed transactions?",
]));
body.push(...coding([
  { level: "Easy", text: "Wrap a transfer in a transaction." },
  { level: "Medium", text: "Reproduce lost-update; fix with SELECT FOR UPDATE." },
  { level: "Hard", text: "Trigger a deadlock; fix with consistent lock ordering + retry." },
  { level: "Expert", text: "Saga across two services with compensations." },
]));
body.push(...realworld(["Bank ledgers, ticketing, e-commerce checkout — anywhere money or scarce inventory changes hands relies on transactions to stay correct under load."]));
body.push(...miniproject(["Build a ledger service with correct isolation, deadlock retry, and property-based tests that money is never lost or duplicated."]));
body.push(...advanced(["Serializable Snapshot Isolation (SSI), 2PC pitfalls, Percolator/TrueTime, deterministic databases (FaunaDB, YugabyteDB)."]));

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
