// VOLUME 7 — Backend Development
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.red, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.red, space: 8 } },
      children: [new TextRun({ text: "VOLUME 7", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Backend Development", size: 32, color: C.red, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "REST · GraphQL · gRPC · API Security", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Spring Boot · Spring Security · JWT · OAuth2", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Microservices · Docker · Kubernetes · Kafka · RabbitMQ · Redis", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 7", "intro"));
body.push(P([{ t: "Backend engineering ", b: true }, "is where mobile turns into product. This volume covers the interfaces (REST/GraphQL/gRPC), the framework (Spring Boot), the security layer (JWT/OAuth2), the operations (Docker/K8s) and the messaging/caching layer (Kafka/RabbitMQ/Redis) — enough to hold your own in backend or full-stack interviews."]));
body.push(callout("note", [["Each topic ends with ", { t: "✅ Summary · 🎯 Interview · 💻 Coding · 🏭 Real-world · 🛠 Mini Project · 🚀 Advanced.", b: true }]]));
body.push(callout("interview", ["Senior backend interviews rarely test one topic in isolation. Expect: 'Design a rate-limited REST API on Spring Boot with JWT auth, deployed to K8s, using Redis for the cache and Kafka for async events.' Volume 7 gives you the vocabulary for that whole answer."]));

// 1. REST APIs
body.push(...topicToChapter(loadTopic("level_07", "rest"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// 2. GraphQL
body.push(...topicToChapter(loadTopic("level_07", "graphql"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. gRPC
body.push(...topicToChapter(loadTopic("level_07", "grpc"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. Spring Boot
body.push(...topicToChapter(loadTopic("level_07", "spring_boot"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// 5. Spring Security
body.push(...topicToChapter(loadTopic("level_07", "spring_security"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// 6. JWT
body.push(...topicToChapter(loadTopic("level_07", "jwt"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// 7. OAuth2
body.push(...topicToChapter(loadTopic("level_07", "oauth2"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. Microservices
body.push(...topicToChapter(loadTopic("level_07", "microservices"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// 9. Docker
body.push(...topicToChapter(loadTopic("level_07", "docker"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Kubernetes
body.push(...topicToChapter(loadTopic("level_07", "kubernetes"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. Kafka
body.push(H1("11. Kafka", "ch11"));
body.push(callout("definition", ["Distributed append-only log. Producers write to topics split across partitions; consumer groups read at their own pace via offsets. Retention is by time/size — records don't disappear on read."]));
body.push(code([
  "topic 'orders' with 3 partitions:",
  "  P0: [r0 r1 r2 r3 ...]  offset per consumer group",
  "  P1: [r0 r1 r2 r3 ...]",
  "  P2: [r0 r1 r2 r3 ...]",
  "Producer records key=userId → same partition → per-user order",
  "Consumer group 'billing' has 3 consumers → each owns 1 partition",
], "kafka"));
body.push(callout("interview", ["Ordering is per-partition, not per-topic. Pick a partition key so related records go to the same partition (e.g., userId). More consumers than partitions = idle consumers."]));
body.push(callout("mistake", ["Committing offsets before processing succeeds — you'll skip records on crash. Commit AFTER success; use idempotent processing to handle duplicates."]));
body.push(...summary([
  "Log semantics enable replay and multiple independent consumers.",
  "At-least-once by default; exactly-once needs transactional producer + read-committed consumer.",
  "Compacted topics for state per key; tiered storage for long retention.",
  "Consumer lag is the top-line SLI.",
]));
body.push(...interview([
  "How does Kafka guarantee ordering?",
  "Why partition by key?",
  "How do consumer groups work?",
  "At-least-once vs exactly-once?",
  "How do you monitor Kafka?",
]));
body.push(...coding([
  { level: "Easy", text: "Produce & consume on a 3-partition topic." },
  { level: "Medium", text: "Partition-key design for per-user order." },
  { level: "Hard", text: "At-least-once + idempotent DB upserts." },
  { level: "Expert", text: "Transactional producer + read-committed consumer." },
]));
body.push(...realworld(["LinkedIn (Kafka's origin), Netflix, Uber, banks — anywhere with event-driven systems, analytics pipelines, or CDC (change data capture) uses Kafka."]));
body.push(...miniproject(["Emit 'order.placed' events from the Orders API to Kafka; consume them in a billing service with idempotent processing."]));
body.push(...advanced(["Kafka Streams / ksqlDB, Schema Registry (Avro/Protobuf), tiered storage (KRaft), MirrorMaker for multi-region."]));

// 12. RabbitMQ
body.push(H1("12. RabbitMQ", "ch12"));
body.push(callout("definition", ["AMQP message broker. Producers send to an exchange; bindings route to queues; consumers ack messages. Great for task queues + flexible routing."]));
body.push(code([
  "Producer -> exchange('orders', type: topic)",
  "                       │  routing key: 'orders.eu.paid'",
  "                       ▼",
  "           binding 'orders.*.paid' → queue.billing",
  "           binding 'orders.eu.*'    → queue.eu_dashboard",
  "Consumer acks message → removed from queue",
  "Nack no-requeue → sent to DLX (dead letter exchange)",
], "rabbitmq"));
body.push(callout("interview", ["Kafka = ordered log for streaming/replay. RabbitMQ = flexible routing + per-message ack + task queues. Different tools for different jobs."]));
body.push(callout("mistake", ["Auto-ack — a crash loses in-flight work. Use manual acks + prefetch + DLX for poisoned messages."]));
body.push(...summary([
  "Exchange types: direct, fanout, topic, headers.",
  "Manual acks + prefetch + DLX for safe processing.",
  "Delayed exchange plugin for backoff retries.",
  "Mirrored queues / quorum queues for HA.",
]));
body.push(...interview([
  "Producer → exchange → queue?",
  "Kafka vs RabbitMQ?",
  "What is a DLX?",
  "Manual vs auto ack?",
  "How to handle retries and idempotency?",
]));
body.push(...coding([
  { level: "Easy", text: "Publish/consume via direct exchange." },
  { level: "Medium", text: "Add a topic exchange with two queues." },
  { level: "Hard", text: "Retry with exponential backoff via delayed exchange + DLX." },
  { level: "Expert", text: "Set up an HA cluster; test failover." },
]));
body.push(...realworld(["Task queues at Instagram, background jobs in countless Rails/Django apps, financial-messaging systems — RabbitMQ has been the boring, reliable choice for over a decade."]));
body.push(...miniproject(["Add async email/notifications to the Orders API via RabbitMQ; DLQ + retries + prefetch tuning."]));
body.push(...advanced(["Quorum queues, streams, plugins (shovel/federation), MQTT/STOMP bridges."]));

// 13. Redis
body.push(...topicToChapter(loadTopic("level_07", "redis"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

// 14. API Security
body.push(...topicToChapter(loadTopic("level_07", "api_security"),
  { chapterNumber: 14, bookmarkId: "ch14" }));

// Revision
body.push(H1("Volume 7 Revision Cheat Sheet", "cheat"));
body.push(H2("Comms cheat"));
body.push(callout("note", ["Public API? REST (or GraphQL if clients need flexibility). Internal service-to-service? gRPC. Async / streaming? Kafka or RabbitMQ."]));
body.push(H2("Security stack"));
body.push(callout("best", ["HTTPS + HSTS + JWT (RS256, JWKS) + PKCE for public clients + per-user rate limits + server-side ownership checks + audit logs + secret scanning in CI."]));
body.push(H2("Ops path"));
body.push(callout("perf", ["Docker (multi-stage, non-root, distroless) → Kubernetes (Deployment + Service + probes + HPA) → GitOps (Argo CD) → Actuator + Prometheus + OTel. Redis for cache + rate limits."]));
body.push(rule(C.red));
body.push(P([{ t: "End of Volume 7. ", b: true, color: C.navy }, "Next: Volume 8 — Databases (MySQL, Postgres, Mongo, SQLite, Hive, Drift, Isar, indexing, query optimization, transactions)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 7 — Backend Development"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-7-Backend.docx");
save(doc, out).then(() => console.log("WROTE", out));
