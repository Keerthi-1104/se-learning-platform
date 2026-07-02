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
body.push(H1("5. Spring Security", "ch5"));
body.push(callout("definition", ["Plug-in security as a chain of servlet filters: authentication, authorization, session/CSRF/CORS, common attack defense out of the box."]));
body.push(code([
  "@Bean SecurityFilterChain chain(HttpSecurity http) throws Exception {",
  "  return http",
  "    .csrf(c -> c.disable())",
  "    .authorizeHttpRequests(a -> a",
  "       .requestMatchers(\"/public/**\").permitAll()",
  "       .requestMatchers(\"/admin/**\").hasRole(\"ADMIN\")",
  "       .anyRequest().authenticated())",
  "    .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))",
  "    .build();",
  "}",
], "security filter chain"));
body.push(callout("interview", ["For stateless JWT APIs: wire OAuth2 Resource Server + JWT decoder. Use @PreAuthorize for method-level rules. WebSecurityConfigurerAdapter is deprecated — use the lambda DSL."]));
body.push(callout("mistake", ["Disabling CSRF for a session-based browser app. Only disable CSRF for stateless API clients that don't use cookies for auth."]));
body.push(...summary([
  "Filter chain intercepts every request.",
  "For JWT APIs: oauth2ResourceServer().jwt().",
  "@PreAuthorize for method-level rules.",
  "BCrypt passwords, HSTS, minimal headers, no logged tokens.",
]));
body.push(...interview([
  "How does the filter chain work?",
  "How do you protect a REST API with JWTs?",
  "@PreAuthorize vs URL rules?",
  "When to disable CSRF?",
  "How do you hash passwords?",
]));
body.push(...coding([
  { level: "Easy", text: "Secure /admin/** for role ADMIN; leave /public open." },
  { level: "Medium", text: "Validate JWTs via Resource Server; map scopes → roles." },
  { level: "Hard", text: "BCrypt + UserDetailsService with a JPA-backed user repo." },
  { level: "Expert", text: "Per-method rules via @PreAuthorize + SpEL touching request attributes." },
]));
body.push(...realworld(["Every Spring Boot API in production has Spring Security in front of it — from banking to CRUD internal tools."]));
body.push(...miniproject(["Secure the Orders API: JWT resource server, roles, method-level rules, BCrypt, security headers, no cleartext logs."]));
body.push(...advanced(["OAuth2 Client + Login server side, OIDC userinfo, custom AuthenticationEntryPoint, saved requests."]));

// 6. JWT
body.push(H1("6. JWT (Backend)", "ch6"));
body.push(callout("definition", ["Self-contained signed tokens issued at login, validated on every request. Stateless — no session store — but revocation is harder."]));
body.push(code([
  "Login:  verify creds -> access token (15 min) + refresh token (7 days)",
  "Request:  parse Authorization: Bearer <token>",
  "          verify signature + exp/iss/aud; extract sub + scopes",
  "Refresh: validate + rotate refresh; issue new access",
], "JWT flow"));
body.push(callout("interview", ["For multi-service systems, RS256/ES256 + JWKS wins: services verify with a public key — no shared secret. Always pin the expected alg; reject alg:none and algorithm-confusion attempts."]));
body.push(...summary([
  "HS256 for single-service; RS256/ES256 + JWKS for many services.",
  "Short access tokens; refresh tokens with rotation.",
  "Include iss/aud/exp/nbf/jti; blocklist jti in Redis for revocation.",
  "Pin the algorithm server-side.",
]));
body.push(...interview([
  "HS256 vs RS256?",
  "How to revoke JWTs?",
  "What is JWKS?",
  "Algorithm confusion attack?",
  "Access vs refresh vs ID token?",
]));
body.push(...coding([
  { level: "Easy", text: "Issue + verify HS256 JWT with exp/sub." },
  { level: "Medium", text: "Switch to RS256 + JWKS; validate in a resource server." },
  { level: "Hard", text: "Refresh rotation + Redis jti blocklist." },
  { level: "Expert", text: "Key rotation with 2 keys published in JWKS." },
]));
body.push(...realworld(["Auth0, Okta, AWS Cognito all serve JWTs signed via RS256 with rotating keys published in JWKS — the reference pattern."]));
body.push(...miniproject(["Add JWT auth to the Orders API: RS256 signing, JWKS endpoint, refresh rotation, revocation, integration tests."]));
body.push(...advanced(["Sender-constrained tokens (DPoP/mTLS-bound), PASETO/branca as JWT alternatives, encrypted JWTs (JWE) trade-offs."]));

// 7. OAuth2
body.push(H1("7. OAuth2 (Backend)", "ch7"));
body.push(callout("definition", ["OAuth 2.0 delegates scoped access without sharing passwords. OpenID Connect layers identity via an ID token."]));
body.push(table(["Flow", "Use for"], [
  ["Authorization Code + PKCE", "Web/mobile/SPA (default)"],
  ["Client Credentials", "Service-to-service"],
  ["Device Code", "TVs / CLIs / IoT"],
  ["Refresh Token", "Silent renewal"],
], [3400, 5960]));
body.push(callout("interview", ["Modern answer: 'Authorization Code + PKCE for user-facing apps, Client Credentials for machine-to-machine.' Implicit and Password grants are deprecated. PKCE prevents auth-code interception on public clients."]));
body.push(...summary([
  "Roles: Resource Owner, Client, Auth Server, Resource Server.",
  "Use PKCE for public clients; secrets only for confidential clients.",
  "OIDC adds an ID token identifying the user.",
  "Use a mature IdP (Auth0/Okta/Keycloak/Cognito).",
]));
body.push(...interview([
  "OAuth2 roles?",
  "Flow for mobile/SPA and why?",
  "What does PKCE prevent?",
  "OAuth2 vs OIDC?",
  "How to detect stolen refresh tokens?",
]));
body.push(...coding([
  { level: "Easy", text: "Configure a Resource Server accepting your IdP's JWTs." },
  { level: "Medium", text: "'Sign in with Google' via Authorization Code + PKCE." },
  { level: "Hard", text: "Service-to-service via Client Credentials + audience-scoped tokens." },
  { level: "Expert", text: "Refresh rotation with reuse detection." },
]));
body.push(...realworld(["'Sign in with Google/Apple/GitHub' is OAuth+OIDC in action. Any app you 'connect' to Slack/Notion/Zoom uses it too."]));
body.push(...miniproject(["Add Google login to the Orders API via OIDC; use scopes for per-tenant access; add a fake IdP for CI tests."]));
body.push(...advanced(["OAuth 2.1 consolidation, PAR (pushed auth requests), FAPI profiles, DPoP, token exchange."]));

// 8. Microservices
body.push(H1("8. Microservices", "ch8"));
body.push(callout("definition", ["Small, independently deployable services owning their own data. Trade in-process for distributed complexity — teams ship independently, but every call is a network call."]));
body.push(table(["Wins", "Costs"], [
  ["Independent deploys per team", "Distributed debugging"],
  ["Per-service tech choice", "Cross-service consistency"],
  ["Scale hot services alone", "Network latency + failures"],
  ["Contained blast radius", "Ops overhead"],
], [4680, 4680]));
body.push(callout("interview", ["'Cross-service transactions?' → Sagas: local transactions + compensating actions. Choreography (event-driven) vs orchestration (a coordinator). Both valid — pick by team preference and observability needs."]));
body.push(callout("mistake", ["Splitting too early. Start with a well-modularized monolith; split when team/domain boundaries demand it."]));
body.push(...summary([
  "One service owns its DB; publish events via Outbox for consistency.",
  "Sync: REST/gRPC. Async: Kafka/RabbitMQ. Edge: API gateway.",
  "Resilience: timeouts, retries, circuit breakers, bulkheads.",
  "Observability: logs + metrics + distributed traces with propagated traceId.",
]));
body.push(...interview([
  "When would you NOT choose microservices?",
  "How do you handle cross-service transactions?",
  "Sync vs async communication?",
  "What is the Outbox pattern?",
  "What is a circuit breaker?",
]));
body.push(...coding([
  { level: "Easy", text: "Split a monolith into users + orders with REST." },
  { level: "Medium", text: "Timeouts + retries + circuit breaker with Resilience4j." },
  { level: "Hard", text: "Saga: order → payment → shipping with compensations." },
  { level: "Expert", text: "Outbox + Kafka relay so events are never lost." },
]));
body.push(...realworld(["Netflix, Amazon, Uber, PhonePe run thousands of microservices. Their org structure and their architecture look the same — Conway's Law at scale."]));
body.push(...miniproject(["Build a 3-service system (users, orders, payments) with sagas, outbox, and a distributed trace end-to-end."]));
body.push(...advanced(["Domain-driven design (bounded contexts), event sourcing, CQRS, service mesh (Istio/Linkerd) for mTLS + traffic policy."]));

// 9. Docker
body.push(H1("9. Docker", "ch9"));
body.push(callout("definition", ["Package apps + deps into a portable image that runs as an isolated container (Linux namespaces + cgroups). Solves 'works on my machine' by making the environment part of the artifact."]));
body.push(code([
  "FROM eclipse-temurin:21-jdk AS build",
  "WORKDIR /src",
  "COPY . .",
  "RUN ./gradlew bootJar",
  "",
  "FROM eclipse-temurin:21-jre-alpine",
  "WORKDIR /app",
  "COPY --from=build /src/build/libs/*.jar app.jar",
  "USER 1000",
  "EXPOSE 8080",
  "ENTRYPOINT [\"java\",\"-jar\",\"/app/app.jar\"]",
], "multi-stage dockerfile"));
body.push(callout("interview", ["Layer caching is Dockerfile performance. Copy pom.xml/package.json and install deps BEFORE copying source, so a code change doesn't reinstall dependencies."]));
body.push(callout("mistake", ["Running as root, huge JDK-in-runtime images, secrets baked in. Use multi-stage + small base + non-root USER + external secrets."]));
body.push(...summary([
  "Image = read-only template; Container = running instance.",
  "Multi-stage builds keep images small.",
  ".dockerignore, HEALTHCHECK, non-root, image scanning.",
  "Never bake secrets into images.",
]));
body.push(...interview([
  "Image vs container?",
  "How does Docker isolate processes?",
  "What is layer caching and how do you exploit it?",
  "How do you keep images small and secure?",
  "Where should secrets live?",
]));
body.push(...coding([
  { level: "Easy", text: "Dockerfile for a Spring Boot app." },
  { level: "Medium", text: "Multi-stage build with a distroless runtime." },
  { level: "Hard", text: "docker-compose for app + Postgres + Redis." },
  { level: "Expert", text: "HEALTHCHECK, non-root USER, Trivy scanning in CI." },
]));
body.push(...realworld(["Every modern CI/CD pipeline builds Docker images. Every major cloud can run containers directly (ECS/Fargate, Cloud Run, App Service)."]));
body.push(...miniproject(["Dockerize the Orders API; run app + Postgres + Redis with compose; add HEALTHCHECK, scanning, and multi-arch build."]));
body.push(...advanced(["BuildKit + secrets, buildx multi-arch, distroless/wolfi images, rootless containers, SBOM generation."]));

// 10. Kubernetes
body.push(H1("10. Kubernetes", "ch10"));
body.push(callout("definition", ["Container orchestrator: you declare the desired state; controllers converge toward it — self-healing pods, rolling updates, autoscaling included."]));
body.push(code([
  "apiVersion: apps/v1",
  "kind: Deployment",
  "metadata: { name: api }",
  "spec:",
  "  replicas: 3",
  "  selector: { matchLabels: { app: api } }",
  "  template:",
  "    metadata: { labels: { app: api } }",
  "    spec:",
  "      containers:",
  "      - name: api",
  "        image: registry/api:1.2.0",
  "        readinessProbe: { httpGet: { path: /health, port: 8080 } }",
  "        resources:",
  "          requests: { cpu: 100m, memory: 128Mi }",
  "          limits:   { cpu: 500m, memory: 512Mi }",
], "deployment"));
body.push(callout("interview", ["Liveness = restart wedged pods; Readiness = remove from LB when not ready. Missing readiness = 500s during deploys. Set requests/limits correctly or the scheduler misplaces pods."]));
body.push(callout("mistake", ["Hand-editing YAML across envs. Use Helm/Kustomize + GitOps (Argo CD/Flux) so cluster state is version-controlled."]));
body.push(...summary([
  "Objects: Pod, Deployment, Service, Ingress, ConfigMap/Secret, StatefulSet, HPA.",
  "Liveness/readiness/startup probes are non-negotiable.",
  "Templatize with Helm/Kustomize; deploy with GitOps.",
  "Secrets via Vault/SOPS/Sealed Secrets, not raw K8s Secrets.",
]));
body.push(...interview([
  "Pod vs Deployment vs Service vs StatefulSet?",
  "Liveness vs readiness?",
  "How do rolling updates work?",
  "How do you keep secrets safe?",
  "What is GitOps?",
]));
body.push(...coding([
  { level: "Easy", text: "Deploy an app to kind/minikube with Deployment + Service." },
  { level: "Medium", text: "Add readiness/liveness probes + rolling update." },
  { level: "Hard", text: "HPA on CPU + PodDisruptionBudget." },
  { level: "Expert", text: "Deploy via Argo CD from Git with Kustomize overlays." },
]));
body.push(...realworld(["Google, Spotify, Airbnb, Netflix (partially), and most Fortune-500 IT departments run K8s. Cloud providers offer managed K8s (GKE/EKS/AKS)."]));
body.push(...miniproject(["Deploy the Orders API to a local K8s cluster with 3 replicas, probes, HPA, and Kustomize dev/prod overlays."]));
body.push(...advanced(["Operators (CRDs + reconcilers), service mesh, Karpenter/cluster autoscaler, admission controllers, cost/policy (OPA/Gatekeeper)."]));

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
body.push(H1("13. Redis", "ch13"));
body.push(callout("definition", ["In-memory data store with rich types: strings, hashes, lists, sets, sorted sets, streams, pubsub. Sub-ms reads make it the default cache + session + rate-limit store."]));
body.push(code([
  "// Cache-aside",
  "value = GET user:42",
  "if not: value = db.load(); SET user:42 <value> EX 60",
  "",
  "// Distributed lock (single instance)",
  "SET lock:jobA <token> NX PX 30000",
], "redis"));
body.push(callout("interview", ["Cache patterns: cache-aside (app-managed, default), write-through, write-behind. Watch stampedes on hot keys — mitigate with request coalescing + TTL jitter."]));
body.push(callout("mistake", ["SETNX-only distributed locks without a token/release check — someone else's expired lock can be released by you. Use SET NX PX + fencing tokens; use Redlock for multi-node."]));
body.push(...summary([
  "Rich types: strings/hashes/lists/sets/sorted sets/streams/pubsub.",
  "Cache-aside is the default; add TTL and consider stampede protection.",
  "Sorted sets power leaderboards + rate-limit windows.",
  "Pick eviction (allkeys-lru); persist with RDB+AOF if used as a DB.",
]));
body.push(...interview([
  "Which cache pattern and why?",
  "How to prevent stampedes?",
  "Eviction policies?",
  "How to build a rate limiter?",
  "Trade-offs using Redis as primary DB?",
]));
body.push(...coding([
  { level: "Easy", text: "Cache-aside on a hot GET endpoint with TTL." },
  { level: "Medium", text: "Token-bucket rate limiter with a Lua script." },
  { level: "Hard", text: "Leaderboard with sorted sets (top-K, user rank)." },
  { level: "Expert", text: "Redlock-style distributed lock." },
]));
body.push(...realworld(["Twitter's timelines, Uber's ETA, Instagram's counters — Redis is behind almost every product feature that needs to be fast."]));
body.push(...miniproject(["Add caching + rate limiting to the Orders API with Redis; measure p50/p99 latency before and after."]));
body.push(...advanced(["Redis Cluster sharding + resharding, keyspace notifications, RedisJSON/Search modules, RedisTimeSeries, Redis Streams as light Kafka."]));

// 14. API Security
body.push(H1("14. API Security", "ch14"));
body.push(callout("definition", ["A stack: HTTPS everywhere, strong authN (JWT/OAuth/mTLS), granular authZ per endpoint, input validation, rate limiting, and monitoring for abuse."]));
body.push(table(["Risk (OWASP API Top 10)", "Cause", "Fix"], [
  ["BOLA / IDOR", "Trusting client IDs", "Server-side ownership checks"],
  ["Broken authentication", "Weak tokens / passwords", "OAuth/OIDC + bcrypt"],
  ["Excessive data exposure", "Returning whole objects", "Response DTOs / allowlists"],
  ["No rate limiting", "Unbounded requests", "Token bucket / sliding window"],
  ["Mass assignment", "Binding raw input", "Input DTOs + allowlists"],
  ["Improper asset mgmt", "Old versions alive", "Retire endpoints; inventory"],
], [2200, 3200, 3960]));
body.push(callout("interview", ["The #1 API bug is BOLA/IDOR: `GET /orders/42` returns any order because the server trusts the URL id. Always check that the requester owns/can-access the resource — not just that they're logged in."]));
body.push(callout("mistake", ["Client-only validation. Attackers bypass your app entirely; the server must revalidate every input. Never put tokens or secrets in URLs — they leak via logs and Referer."]));
body.push(...summary([
  "HTTPS + HSTS everywhere; short-lived JWTs; rotate refresh tokens.",
  "Per-endpoint authZ checks with ownership enforced server-side.",
  "Rate limits keyed per user/IP; strict CORS allowlist.",
  "Secret scanning in CI; audit logging with request IDs.",
]));
body.push(...interview([
  "Name the OWASP API Top 10.",
  "What is BOLA/IDOR?",
  "How do you rate-limit an API?",
  "How do you store secrets?",
  "How do you monitor API security?",
]));
body.push(...coding([
  { level: "Easy", text: "Add HTTPS + HSTS." },
  { level: "Medium", text: "Per-user token-bucket rate limiter with 429 + Retry-After." },
  { level: "Hard", text: "Fix BOLA: enforce ownership on GET /orders/:id." },
  { level: "Expert", text: "Short-lived JWTs + refresh rotation + revocation list." },
]));
body.push(...realworld(["Every API leak in the news is one of the OWASP Top 10. Studying it isn't optional if you build APIs professionally."]));
body.push(...miniproject(["Run OWASP ZAP against the Orders API, list findings, fix each and add regression tests."]));
body.push(...advanced(["mTLS between services, sender-constrained tokens (DPoP), API-firewall/WAF rules, hCaptcha/Turnstile for bots."]));

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
