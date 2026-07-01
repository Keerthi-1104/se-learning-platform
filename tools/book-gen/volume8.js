// VOLUME 8 — Databases
const L = require("./lib");
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
body.push(H1("1. MySQL", "ch1"));
body.push(callout("definition", ["World's most-deployed open-source RDBMS. InnoDB engine gives ACID transactions, row-level locking, foreign keys, and a clustered index — rows physically stored in PK order."]));
body.push(table(["Isolation", "Reads", "Note"], [
  ["READ UNCOMMITTED", "Dirty reads", "Rarely used"],
  ["READ COMMITTED", "No dirty reads", "Non-repeatable possible"],
  ["REPEATABLE READ", "Snapshot per tx (default)", "MVCC prevents non-repeatable"],
  ["SERIALIZABLE", "Full serial order", "Highest lock contention"],
], [2200, 3700, 3460]));
body.push(callout("interview", ["Clustered index = pick your PK carefully. Random UUIDs cause random inserts + page splits + bloat. Prefer AUTO_INCREMENT or time-ordered UUIDs (UUIDv7/ULID) on hot tables."]));
body.push(...summary([
  "InnoDB is the default; ACID + row locks + FKs.",
  "Clustered index = rows in PK order.",
  "Default isolation: REPEATABLE READ via MVCC.",
  "UTF8MB4, covering indexes, connection pool, read replicas.",
]));
body.push(...interview([
  "What is InnoDB's clustered index?",
  "MySQL isolation levels and default?",
  "Why avoid random UUID PKs?",
  "MyISAM vs InnoDB?",
  "How does replication work?",
]));
body.push(...coding([
  { level: "Easy", text: "Users table + covering index; EXPLAIN it." },
  { level: "Medium", text: "Show REPEATABLE READ preventing non-repeatable reads." },
  { level: "Hard", text: "Reproduce a deadlock; fix with lock ordering." },
  { level: "Expert", text: "Primary + read replica via ProxySQL/Vitess." },
]));
body.push(...realworld(["WordPress, Wikipedia, Slack, Uber (Vitess), Airbnb — much of the web runs on MySQL/MariaDB. Vitess turns MySQL into a horizontally sharded system used at YouTube scale."]));
body.push(...miniproject(["Build a small MySQL-backed API; prove index effectiveness with EXPLAIN before/after."]));
body.push(...advanced(["Vitess sharding, Group Replication, GTIDs, binlog CDC (Debezium)."]));

// 2. PostgreSQL
body.push(H1("2. PostgreSQL", "ch2"));
body.push(callout("definition", ["Standards-compliant, ACID, feature-rich RDBMS with JSONB, window functions, CTEs, arrays, and a rich extension ecosystem (PostGIS, pg_trgm, TimescaleDB)."]));
body.push(table(["Index type", "Best for"], [
  ["B-tree (default)", "Equality + range on scalars"],
  ["GIN", "JSONB, arrays, full-text"],
  ["GiST", "PostGIS geometry, fuzzy"],
  ["BRIN", "Huge naturally-ordered tables"],
], [1800, 7560]));
body.push(callout("interview", ["MVCC + VACUUM: writers create new row versions, readers see snapshots. Dead versions accumulate → VACUUM reclaims them. Long transactions block vacuum and cause bloat — classic performance trap."]));
body.push(callout("note", ["JSONB `->>` for text, `->` for JSONB. Index specific paths (expression index) or GIN for arbitrary keys. Don't stuff everything into JSONB — schema still wins for common access patterns."]));
body.push(...summary([
  "ACID + MVCC + rich features (JSONB, CTE, windows).",
  "Pick the right index type per workload.",
  "EXPLAIN (ANALYZE, BUFFERS) is your friend.",
  "Watch long transactions → bloat.",
]));
body.push(...interview([
  "How does MVCC work in Postgres?",
  "What is VACUUM/autovacuum?",
  "Index types and when use each?",
  "JSONB `->>` vs `->`?",
  "How do you find slow queries?",
]));
body.push(...coding([
  { level: "Easy", text: "Query JSONB with `->>` and an expression index." },
  { level: "Medium", text: "Window function for per-user running total." },
  { level: "Hard", text: "Diagnose + fix a slow query with EXPLAIN ANALYZE." },
  { level: "Expert", text: "Detect + fix table bloat (VACUUM FULL / pg_repack)." },
]));
body.push(...realworld(["Postgres is the go-to for startups and enterprises: Instagram, Reddit, Robinhood, most fintech. TimescaleDB and Citus extend it to time-series and horizontal scale."]));
body.push(...miniproject(["Build an analytics query workload using window functions + JSONB payloads; optimize with the right indexes."]));
body.push(...advanced(["Logical replication + Debezium, WAL streaming, foreign data wrappers, pgvector for embeddings."]));

// 3. MongoDB
body.push(H1("3. MongoDB", "ch3"));
body.push(callout("definition", ["Document DB: JSON-like BSON documents in collections, flexible schema, secondary indexes, aggregation pipelines, sharding. Multi-doc ACID on replica sets since 4.0."]));
body.push(code([
  "// Aggregation pipeline",
  "db.orders.aggregate([",
  "  { $match: { status: 'paid' } },",
  "  { $group: { _id: '$userId', total: { $sum: '$amount' } } },",
  "  { $sort:  { total: -1 } },",
  "  { $limit: 10 }",
  "]);",
], "mongo"));
body.push(callout("interview", ["Schema is driven by read patterns, not normalization. Embed for data read together and bounded; reference for independent or unbounded. Follow the ESR rule (Equality → Sort → Range) when designing compound indexes."]));
body.push(...summary([
  "Documents (BSON), flexible schema, aggregations.",
  "Design schema for how you query.",
  "ESR rule for compound indexes.",
  "Replica sets for HA, shards for scale.",
]));
body.push(...interview([
  "Embed vs reference — how decide?",
  "What is the ESR rule?",
  "How do Mongo transactions work?",
  "Replica set vs sharded cluster?",
  "How to find a slow query?",
]));
body.push(...coding([
  { level: "Easy", text: "Insert/find/update; add single-field index." },
  { level: "Medium", text: "Top-10 users by spend via aggregation." },
  { level: "Hard", text: "Compound indexes following ESR." },
  { level: "Expert", text: "Shard a collection; pick key; verify balance." },
]));
body.push(...realworld(["Content platforms (Forbes), IoT ingest, and countless SaaS backends. Mongo Atlas has become a default managed offering; consider it before rolling your own."]));
body.push(...miniproject(["Model a small blog CMS with mixed embed/reference; build an aggregation-based top-authors query."]));
body.push(...advanced(["Change streams for CDC, Atlas Search (Lucene), time-series collections, Atlas Vector Search."]));

// 4. SQLite
body.push(H1("4. SQLite", "ch4"));
body.push(callout("definition", ["Serverless, embedded, single-file SQL database — the most-deployed database on Earth. ACID, small, fast, no separate process."]));
body.push(code([
  "PRAGMA journal_mode = WAL;",
  "PRAGMA synchronous  = NORMAL;",
  "PRAGMA foreign_keys = ON;   -- off by default!",
  "",
  "CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT NOT NULL);",
  "CREATE INDEX idx_users_name ON users(name);",
], "sqlite pragmas"));
body.push(callout("interview", ["WAL mode = huge mobile win: concurrent readers don't block a single writer. Often doubles hot-screen read throughput vs the default DELETE journal."]));
body.push(callout("mistake", ["Forgetting `PRAGMA foreign_keys = ON` — FKs are OFF by default. And relying on strict column types — SQLite uses type affinity unless you use STRICT tables (3.37+)."]));
body.push(...summary([
  "Embedded serverless SQL; ACID; the DB is a file.",
  "Enable WAL for concurrency; FKs are OFF by default.",
  "Batch writes in a single transaction.",
  "STRICT tables (3.37+) for real column typing.",
]));
body.push(...interview([
  "Why is SQLite so widely deployed?",
  "What is WAL mode?",
  "Why are FKs off by default?",
  "How do you migrate schemas safely?",
  "How to batch writes fast?",
]));
body.push(...coding([
  { level: "Easy", text: "Create tables + indexes; enable FKs and WAL." },
  { level: "Medium", text: "Benchmark commit-per-row vs batched transaction." },
  { level: "Hard", text: "Migration adding a column with default + backfill." },
  { level: "Expert", text: "Corruption detection via integrity_check + recovery from backup." },
]));
body.push(...realworld(["Inside every browser (IndexedDB via SQLite), every phone (system data), and inside apps like Signal, WhatsApp, and Firefox. SQLite is the invisible workhorse of consumer software."]));
body.push(...miniproject(["Ship a small offline mobile app on plain SQLite: WAL, indexes, batched transactions, and manual migrations."]));
body.push(...advanced(["LiteFS/Litestream for replication, sqlite-vss for vector search, SQLite as an application-file format."]));

// 5. Hive
body.push(H1("5. Hive", "ch5"));
body.push(callout("definition", ["Pure-Dart lightweight NoSQL key-value store: data in boxes (like Maps), no native code, no query engine — just fast get/put."]));
body.push(code([
  "await Hive.initFlutter();",
  "final box = await Hive.openBox('settings');",
  "await box.put('theme', 'dark');",
  "final t = box.get('theme', defaultValue: 'light');",
], "hive"));
body.push(callout("interview", ["Hive shines for app preferences, small caches, and simple lookups where SQLite/Isar are overkill. For any structured data with queries or joins, reach for Drift or Isar."]));
body.push(...summary([
  "Pure-Dart key-value store; boxes are files.",
  "TypeAdapters + build_runner for custom classes.",
  "Encrypt sensitive boxes with HiveAesCipher.",
  "Not a query engine — reach for Drift/Isar when needed.",
]));
body.push(...interview([
  "When choose Hive over SQLite?",
  "How do TypeAdapters work?",
  "How to encrypt Hive data?",
  "Lazy box vs box?",
  "When have you outgrown Hive?",
]));
body.push(...coding([
  { level: "Easy", text: "Persist a theme setting with Hive." },
  { level: "Medium", text: "Store a User class via a TypeAdapter." },
  { level: "Hard", text: "Encrypt a box; rotate the key." },
  { level: "Expert", text: "Migrate from Hive to Isar/Drift as data outgrows KV." },
]));
body.push(...realworld(["Tons of Flutter apps use Hive for settings, tokens, and small caches — including this very SE Learning Platform for progress/XP."]));
body.push(...miniproject(["Add Hive-backed favorites/bookmarks to a small app; export/import boxes as JSON."]));
body.push(...advanced(["Hive vs Hive-CE, Isar migration paths, secure enclave for cipher keys."]));

// 6. Drift
body.push(H1("6. Drift", "ch6"));
body.push(callout("definition", ["Reactive typed persistence layer over SQLite for Flutter/Dart. Tables in Dart or .drift SQL files; generated type-safe APIs; Streams that emit on table changes."]));
body.push(code([
  "class Users extends Table {",
  "  IntColumn get id => integer().autoIncrement()();",
  "  TextColumn get name => text()();",
  "}",
  "Stream<List<User>> watchAll() =>",
  "  (select(users)..orderBy([(u) => OrderingTerm.desc(u.id)])).watch();",
], "drift"));
body.push(callout("interview", ["Drift = full SQL power + compile-time type safety. Scales from a small table to complex joins; streams make offline-first UIs trivial (query re-emits when tables change)."]));
body.push(...summary([
  "SQLite under the hood + typed Dart DSL + Streams.",
  ".drift files for complex SQL you want reviewed as SQL.",
  "Background isolate for heavy work.",
  "Versioned migrations + Drift's schema tests.",
]));
body.push(...interview([
  "Drift vs Isar vs Hive?",
  "How does Drift give type safety?",
  "How do reactive queries work?",
  "How to handle migrations?",
  "When move Drift to a background isolate?",
]));
body.push(...coding([
  { level: "Easy", text: "Users table + watch stream." },
  { level: "Medium", text: "Migration adding a column with default backfill." },
  { level: "Hard", text: "Complex JOIN in a .drift file with typed API." },
  { level: "Expert", text: "Background isolate; measure UI jank." },
]));
body.push(...realworld(["Drift is popular for offline-first apps with rich schemas — inventory apps, field-service tools, reader apps with sync."]));
body.push(...miniproject(["Ship a reactive Notes app in Drift with categories + tags + full-text search."]));
body.push(...advanced(["Drift on Web via WASM SQLite, ffi vs Moor bridges, custom types, virtual columns."]));

// 7. Isar
body.push(H1("7. Isar", "ch7"));
body.push(callout("definition", ["Fast cross-platform NoSQL DB for Flutter/Dart. Schema by Dart classes with codegen; native binaries; rich query + full-text + relations."]));
body.push(code([
  "@collection",
  "class User {",
  "  Id id = Isar.autoIncrement;",
  "  @Index(caseSensitive: false) late String name;",
  "}",
  "final adas = await isar.users.filter().nameEqualTo('Ada').findAll();",
], "isar"));
body.push(callout("interview", ["Isar's edge: write speed and native perf without SQL migrations. Great for mobile-first apps with lots of local data. Downside: smaller community/tooling than SQLite-backed Drift."]));
body.push(...summary([
  "NoSQL document model + indexes + FTS + relations.",
  "Batch writes inside writeTxn().",
  "One index per query; design indexes for top queries.",
  "watch() for reactive Streams.",
]));
body.push(...interview([
  "Isar vs Drift vs Hive?",
  "How does Isar achieve high write throughput?",
  "How do transactions work?",
  "How to index a query?",
  "How to handle schema changes?",
]));
body.push(...coding([
  { level: "Easy", text: "Collection + put/find." },
  { level: "Medium", text: "Index + filter().equalTo() query." },
  { level: "Hard", text: "One-to-many with links." },
  { level: "Expert", text: "Full-text search + reactive Stream." },
]));
body.push(...realworld(["Isar is chosen for consumer apps with heavy local data (bookmarks, chat history, offline media caches) where raw speed matters."]));
body.push(...miniproject(["Build an offline library reader with Isar: 10k books, index title/author, full-text over descriptions."]));
body.push(...advanced(["Isar v4 changes, custom types, encryption, running Isar in a background isolate."]));

// 8. ObjectBox
body.push(H1("8. ObjectBox", "ch8"));
body.push(callout("definition", ["Very fast native embedded object database (C++ core) with clients in Dart/Flutter, Java/Kotlin, Swift, Go. Objects in, objects out."]));
body.push(callout("interview", ["ObjectBox is the choice for raw local speed with typed objects and no SQL boilerplate. Its optional Sync product is a differentiator for offline-first collaborative apps."]));
body.push(...summary([
  "C++ core with language bindings.",
  "Relations via ToOne / ToMany.",
  "Very fast writes; small footprint.",
  "Optional Sync for multi-device data sync.",
]));
body.push(...interview([
  "What differentiates ObjectBox?",
  "How do relations work?",
  "ObjectBox vs Isar vs Drift?",
  "How to handle model migrations?",
  "What is ObjectBox Sync?",
]));
body.push(...coding([
  { level: "Easy", text: "User entity, put/find." },
  { level: "Medium", text: "ToMany + query across it." },
  { level: "Hard", text: "Benchmark 100k inserts vs Isar." },
  { level: "Expert", text: "Prototype ObjectBox Sync across two clients." },
]));
body.push(...realworld(["Used in high-performance IoT, industrial, and mobile apps where every millisecond of write latency matters."]));
body.push(...miniproject(["Offline-first inventory app: ObjectBox local, optional Sync between two devices with conflict handling."]));
body.push(...advanced(["Vector search in ObjectBox, encryption, backups, migration strategies."]));

// 9. Realm
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
