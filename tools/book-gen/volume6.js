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

// 9. Foundation
body.push(H1("9. Foundation Layer", "ch9"));
body.push(callout("definition", ["The Foundation layer is the bedrock of the app: logging, error types, network client, storage, config, DI, feature flags — used by every feature but owning no domain rules."]));
body.push(table(["Belongs", "Does NOT belong"], [
  ["Result/Failure types, logger", "User/Order/Cart entities"],
  ["Configured HTTP client", "Auth business rules"],
  ["Storage helpers (Hive/secure)", "Feature-specific state"],
  ["Feature-flag reader, env config", "UI screens"],
], [4680, 4680]));
body.push(callout("interview", ["A stable foundation is why features can move fast. When network, error handling, DI, config and logging are solved once and centrally, every new feature reuses them and looks the same shape — code review becomes easier."]));
body.push(...summary([
  "Foundation is cross-cutting, framework-agnostic infra.",
  "It knows nothing about specific domains.",
  "It accelerates every new feature.",
  "Keep it reusable across apps if possible.",
]));
body.push(...interview([
  "What is the foundation layer?",
  "What does NOT belong there?",
  "How does a good foundation speed up features?",
  "How to keep foundation reusable across apps?",
  "Foundation vs core vs shared — naming?",
]));
body.push(...coding([
  { level: "Easy", text: "Add a shared Result<T> + Failure type to foundation." },
  { level: "Medium", text: "Move a duplicated Dio setup into a foundation NetworkClient." },
  { level: "Hard", text: "Extract logging behind an abstraction; use a fake in tests." },
  { level: "Expert", text: "Ship the foundation as a separate package adopted by two apps." },
]));
body.push(...realworld(["Every mature product team has a 'platform' or 'foundation' team whose sole job is to make the app's infrastructure boring, standard, and delightful to use."]));
body.push(...miniproject(["Refactor a real app to depend on a foundation module for network/logging/errors; verify feature code shrinks."]));
body.push(...advanced(["Foundation as a versioned internal package, standardized error taxonomies, distributed tracing IDs from client to server."]));

// 10. Offline-first
body.push(H1("10. Offline-first Architecture", "ch10"));
body.push(callout("definition", ["Offline-first treats the local database as the source of truth. The UI reads and writes locally; a background sync layer talks to the server. Users get instant feedback and the app keeps working with no connection."]));
body.push(code([
  "UI --(observe)--> Local DB (source of truth)",
  "         |",
  "         v",
  "    Sync engine <---> Network",
  "    - read-through:   fetch → cache → emit",
  "    - write-through:  write local → enqueue outbox → push",
], "offline-first"));
body.push(callout("interview", ["Offline-first isn't 'add caching' — it's a different mental model. The UI never blocks on the network. That flips the architecture: repositories emit Streams from the local store, and network is a background concern that eventually syncs."]));
body.push(callout("mistake", ["Silently dropping user writes when offline. Enqueue them in a durable outbox and surface pending/failed state; never lie to the user."]));
body.push(...summary([
  "Local DB is the source of truth.",
  "Read-through and write-through via repositories.",
  "Sync + retries run in the background.",
  "Choose a conflict resolution policy explicitly.",
]));
body.push(...interview([
  "What does offline-first mean at the architecture level?",
  "Why is the local DB the source of truth?",
  "How do you handle offline writes safely?",
  "Conflict resolution strategies?",
  "How do you surface sync/failure state?",
]));
body.push(...coding([
  { level: "Easy", text: "Add read-through caching to one repository." },
  { level: "Medium", text: "Implement a durable outbox with retries on connectivity." },
  { level: "Hard", text: "Add optimistic UI with rollback on server rejection." },
  { level: "Expert", text: "Design a merge/CRDT strategy for concurrent edits from two devices." },
]));
body.push(...realworld(["Google Docs, Trello, and every serious mobile CRM/field app are offline-first because their users work in tunnels, warehouses, or flaky-connection areas — losing writes is unacceptable."]));
body.push(...miniproject(["Build a Notes app that is fully offline-first: local Hive/Room store, write-through outbox, background sync, pending badges in the UI."]));
body.push(...advanced(["CRDTs (Automerge, Yjs), event sourcing, sync engines (PowerSync, Ditto), and vector clocks."]));

// 11. SDUI
body.push(H1("11. Server-Driven UI", "ch11"));
body.push(callout("definition", ["Server-Driven UI (SDUI) means the server sends a JSON description of a screen — a tree of typed components with props and actions — that the client renders with pre-built widgets. UI changes without a new app release."]));
body.push(code([
  "{",
  "  \"type\": \"Column\",",
  "  \"children\": [",
  "    { \"type\": \"Text\", \"text\": \"Welcome!\", \"style\": \"h1\" },",
  "    { \"type\": \"Button\", \"label\": \"Continue\",",
  "      \"action\": { \"type\": \"navigate\", \"route\": \"/home\" } }",
  "  ]",
  "}",
], "sdui payload"));
body.push(callout("interview", ["Airbnb, Instagram, Zomato, and other consumer giants use SDUI for feeds and promo modules so growth teams ship UI daily. The client is a strict renderer: unknown components are ignored or degraded, never executed as code."]));
body.push(callout("mistake", ["Letting the server ship logic — arbitrary conditionals or 'run this expression' payloads. That's an app-store violation risk (native code from a server) and a security hole."]));
body.push(...summary([
  "Server sends UI as data; client renders whitelisted components.",
  "Enables A/B, promos, personalization without releases.",
  "Whitelist actions; version the schema; degrade unknowns.",
  "Never execute server-sent code.",
]));
body.push(...interview([
  "What is SDUI and what does it ship?",
  "When SDUI vs a native screen?",
  "How do you keep SDUI safe?",
  "Handling schema versioning?",
  "Who uses SDUI in production?",
]));
body.push(...coding([
  { level: "Easy", text: "Define a schema for Text/Column/Button and render it." },
  { level: "Medium", text: "Add actions (navigate, api_call) with a whitelist." },
  { level: "Hard", text: "Add versioning + graceful degradation for unknown components." },
  { level: "Expert", text: "A/B route layout variants per user segment from the server." },
]));
body.push(...realworld(["Airbnb's Epoxy/BloxUI, Instagram's IGDS, and Zomato's home feed are SDUI — the reason those apps can change layout multiple times a day without you updating the app."]));
body.push(...miniproject(["Build a mini SDUI renderer supporting 6 components + 3 actions with schema version negotiation."]));
body.push(...advanced(["Compose/Flutter dynamic layouts, hydrating SDUI with local data, and A/B measurement built into the payload."]));

// 12. Design Systems
body.push(H1("12. Design Systems", "ch12"));
body.push(callout("definition", ["A design system is the shared vocabulary of a product: tokens (colors, typography, spacing), components (buttons, inputs, cards), and patterns (empty states, error banners). It makes many screens feel like one product."]));
body.push(code([
  "class AppTokens {",
  "  static const spaceSm = 8.0;",
  "  static const spaceMd = 16.0;",
  "  static const radiusMd = 12.0;",
  "}",
  "class AppTheme {",
  "  static ThemeData light() => ThemeData(",
  "    colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),",
  "  );",
  "}",
], "tokens + theme"));
body.push(table(["Layer", "Defines", "Example"], [
  ["Tokens", "Primitive values", "Colors, spacing, radii, type"],
  ["Themes", "Semantic groupings", "ThemeData, ThemeExtensions"],
  ["Components", "Reusable widgets", "AppButton, AppCard, AppTextField"],
  ["Patterns", "Composed UX flows", "Empty state, loading skeletons"],
], [1600, 3400, 4360]));
body.push(callout("interview", ["In Flutter, use Material 3 ColorScheme.fromSeed for a coherent palette and ThemeExtension for tokens Material doesn't cover. Wire dark mode through the same theme — light and dark differ by values, not by if/else in widgets."]));
body.push(callout("mistake", ["Hard-coding colors, sizes and radii everywhere. Later you can't rebrand or theme; changes need find-and-replace. Read through Theme.of(context) and extensions."]));
body.push(...summary([
  "Layers: tokens, themes, components, patterns.",
  "Read tokens/theme via context; no literals in widgets.",
  "Dark mode = different values, same widgets.",
  "Ship the DS as a package for multi-app consistency.",
]));
body.push(...interview([
  "What is a design system and its layers?",
  "Tokens vs components?",
  "How do you implement theming/dark mode in Flutter?",
  "What is ThemeExtension?",
  "How do you evolve a DS without breaking apps?",
]));
body.push(...coding([
  { level: "Easy", text: "Extract spacing/radii/colors into an AppTokens class and use them." },
  { level: "Medium", text: "Build AppButton/AppCard that consume tokens/theme." },
  { level: "Hard", text: "Add a ThemeExtension for success/warn semantic tokens." },
  { level: "Expert", text: "Ship the DS as a package used by two apps with different brands." },
]));
body.push(...realworld(["Material, Cupertino, Ant, IBM Carbon, Shopify Polaris — every serious product has a design system. It's why the app looks like one product even when 40 engineers work on it."]));
body.push(...miniproject(["Extract the SE Learning Platform's colors/typography/spacing into a design_system package and swap the app onto it."]));
body.push(...advanced(["Design tokens as JSON (W3C spec), style-dictionary pipelines, semantic vs primitive tokens, and Figma → code sync."]));

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
