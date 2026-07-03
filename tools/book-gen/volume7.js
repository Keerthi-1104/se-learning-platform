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
body.push(...topicToChapter(loadTopic("level_07", "kafka"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. RabbitMQ
body.push(...topicToChapter(loadTopic("level_07", "rabbitmq"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

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
