// VOLUME 9 — Firebase
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.amber, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.amber, space: 8 } },
      children: [new TextRun({ text: "VOLUME 9", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Firebase", size: 32, color: C.amber, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Auth · Firestore · Realtime DB · Storage", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Crashlytics · Analytics · Remote Config · FCM", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "App Distribution · Performance Monitoring", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 9", "intro"));
body.push(P([{ t: "Firebase ", b: true }, "is the fastest path from idea to shipped app. This volume covers the 10 services you'll actually reach for — Auth, Firestore, Realtime Database, Storage, Crashlytics, Analytics, Remote Config, FCM, App Distribution, and Performance Monitoring — with the same 20-point pattern and per-topic closers."]));
body.push(callout("note", [["Each topic ends with ", { t: "✅ Summary · 🎯 Interview · 💻 Coding · 🏭 Real-world · 🛠 Mini Project · 🚀 Advanced.", b: true }]]));
body.push(callout("interview", ["Interviewers use Firebase to test system-thinking, not just SDK calls: 'How would you architect a chat app / paginated feed / feature flag rollout / crash-alerting pipeline on Firebase?' Volume 9 gives you the vocabulary for every one of those."]));

// 1. Auth
body.push(H1("1. Firebase Authentication", "ch1"));
body.push(callout("definition", ["Managed identity service: email/password, phone OTP, social (Google/Apple/Facebook/…), anonymous, and custom-token sign-in. Issues short-lived JWTs that other Firebase services trust automatically."]));
body.push(code([
  "final auth = FirebaseAuth.instance;",
  "auth.userChanges().listen((u) => setState(() => user = u));",
  "await auth.signInWithEmailAndPassword(email: e, password: p);",
  "final idToken = await auth.currentUser?.getIdToken();  // JWT for your backend",
], "flutter"));
body.push(callout("interview", ["Custom claims (set via Admin SDK) let you store roles/tenants directly in the token. Combined with Security Rules you enforce authorization declaratively — no per-endpoint code."]));
body.push(callout("mistake", ["Trusting auth.currentUser on the client for authorization decisions. Enforce access in Security Rules or on the server — the app is untrusted."]));
body.push(...summary([
  "Multiple sign-in providers; unified user object.",
  "Short-lived JWT propagates identity to other services.",
  "Custom claims + Security Rules = declarative authZ.",
  "Enable App Check to block abuse.",
]));
body.push(...interview([
  "How does Firebase Auth propagate identity to Firestore/Storage?",
  "What are custom claims?",
  "How do you support Apple Sign-In?",
  "How do token refresh + revocation work?",
  "When link anonymous accounts?",
]));
body.push(...coding([
  { level: "Easy", text: "Email/password sign-up + sign-in." },
  { level: "Medium", text: "Google Sign-In, merged with existing email account." },
  { level: "Hard", text: "Set custom claims via Cloud Function; refresh token." },
  { level: "Expert", text: "Enable App Check across clients." },
]));
body.push(...realworld(["Nearly every Firebase-powered app authenticates through this — from small side projects to Duolingo, Alibaba, and countless MNC internal tools."]));
body.push(...miniproject(["Add multi-provider auth to your app: email + Google + anonymous → link accounts → set roles via custom claims."]));
body.push(...advanced(["Multi-factor auth, blocking functions (deny sign-up), federated identity to Firebase from your own IdP."]));

// 2. Firestore
body.push(H1("2. Cloud Firestore", "ch2"));
body.push(callout("definition", ["Serverless, real-time, globally-distributed NoSQL document DB. Collections of documents (≤1 MiB); queries return snapshots or Streams; access enforced by Security Rules."]));
body.push(code([
  "final db = FirebaseFirestore.instance;",
  "db.collection('orders').where('userId', isEqualTo: uid)",
  "  .orderBy('createdAt', descending: true).limit(20)",
  "  .snapshots()   // real-time stream",
  "  .listen(...);",
], "firestore"));
body.push(callout("interview", ["Firestore charges per document read — that shapes design. Denormalize aggressively; paginate with cursors; use FieldValue.increment/arrayUnion for concurrent updates."]));
body.push(callout("mistake", ["Sequential inserts to a monotonic doc ID → write hotspot on one range → 500ms tail latency. Add high-cardinality prefix or shard the ID."]));
body.push(...summary([
  "Docs in collections; subcollections for hierarchies.",
  "Query = snapshot or Stream; Security Rules enforce authZ.",
  "Design for read count; denormalize hot fields.",
  "Batched writes / transactions up to 500 ops.",
]));
body.push(...interview([
  "Firestore data + cost model?",
  "How do you avoid hotspots?",
  "When do you need composite indexes?",
  "How do Security Rules work?",
  "Transactions vs batched writes?",
]));
body.push(...coding([
  { level: "Easy", text: "CRUD a users collection." },
  { level: "Medium", text: "Real-time snapshot query with a composite index." },
  { level: "Hard", text: "Enforce ownership via Rules + role via custom claims." },
  { level: "Expert", text: "Refactor a hot write path to eliminate a monotonic-key hotspot." },
]));
body.push(...realworld(["Firebase's flagship DB — used by NYT games, Duolingo Push, retail catalogs, and countless Flutter startups because it's ready-made real-time + offline."]));
body.push(...miniproject(["Build a paginated feed with cursors, ownership Rules, and reactive Streams; then instrument its cost."]));
body.push(...advanced(["Multi-region eventual consistency, TTL policies, aggregation queries, Firestore in Datastore mode for high-write ingestion."]));

// 3. Realtime Database
body.push(H1("3. Realtime Database", "ch3"));
body.push(callout("definition", ["Firebase's original DB: single JSON tree, sub-ms sync over WebSocket, presence via onDisconnect(). Superpower is ultra-low-latency chat/presence."]));
body.push(callout("interview", ["Firestore is the default for new apps. Reach for RTDB when you need ultra-low-latency presence/chat, or you're maintaining an RTDB codebase. RTDB charges by data volume, not doc count — very different cost model."]));
body.push(callout("mistake", ["Deep nesting → whole-subtree reads → huge bills. Flatten data and read narrow subtrees."]));
body.push(...summary([
  "One JSON tree; real-time WebSocket sync.",
  "Presence via onDisconnect().",
  "Flatten data to keep reads narrow.",
  "Different cost model + Rules syntax vs Firestore.",
]));
body.push(...interview([
  "RTDB vs Firestore — when use each?",
  "How does presence work?",
  "Rules differences from Firestore?",
  "How to avoid huge reads?",
  "RTDB scaling model?",
]));
body.push(...coding([
  { level: "Easy", text: "Write and stream chat messages." },
  { level: "Medium", text: "Online/offline presence via onDisconnect()." },
  { level: "Hard", text: "Flatten a deep tree; measure read savings." },
  { level: "Expert", text: "Shard across DB instances for a large user base." },
]));
body.push(...realworld(["Old-school chat apps, live dashboards, and multiplayer game lobbies still love RTDB's sub-ms sync; new apps typically default to Firestore."]));
body.push(...miniproject(["Build a room-based chat with typing indicators and online presence using RTDB."]));
body.push(...advanced(["Multiple RTDB instances per project, Emulator Suite for tests, structured logging via Rules."]));

// 4. Storage
body.push(H1("4. Cloud Storage", "ch4"));
body.push(callout("definition", ["Wrapper around Google Cloud Storage with a mobile SDK: resumable uploads/downloads, progress events, Firebase Auth-aware Security Rules."]));
body.push(code([
  "final ref = FirebaseStorage.instance.ref('users/$uid/avatar.jpg');",
  "final task = ref.putFile(file);",
  "task.snapshotEvents.listen((s) => print('${s.bytesTransferred}/${s.totalBytes}'));",
  "final url = await ref.getDownloadURL();",
], "storage"));
body.push(callout("interview", ["Storage Rules validate not just paths and auth, but also metadata (contentType, size) BEFORE the file lands — reject huge uploads/wrong types at the edge instead of paying for bandwidth."]));
body.push(callout("mistake", ["Storing download URLs in your DB as 'permanent.' They're revocable/rotatable. Prefer short-lived signed URLs or a CDN with your own token."]));
body.push(...summary([
  "GCS underneath with mobile SDK.",
  "Rules can enforce path, contentType, and size.",
  "Serve images at scale: resize + CDN + client cache.",
  "Prefer signed URLs over long-lived download URLs.",
]));
body.push(...interview([
  "How do you secure uploads?",
  "Download URLs vs signed URLs?",
  "How to serve images at scale?",
  "How do resumable uploads work?",
  "How do you audit storage usage?",
]));
body.push(...coding([
  { level: "Easy", text: "Upload a file with progress." },
  { level: "Medium", text: "Rules restricting path to signed-in user's UID." },
  { level: "Hard", text: "Add contentType + size validation; test failing uploads." },
  { level: "Expert", text: "Resize-images extension + CDN + client cache." },
]));
body.push(...realworld(["User avatars, product photos, receipts — anywhere binary blobs meet a mobile-first app, Firebase Storage is the shortcut."]));
body.push(...miniproject(["Ship an avatar uploader with size/type Rules, resize extension, and cached thumbnails."]));
body.push(...advanced(["Object lifecycle policies (cold storage), custom metadata for indexing, background CDN warm-up."]));

// 5. Crashlytics
body.push(H1("5. Crashlytics", "ch5"));
body.push(callout("definition", ["Automatically captures crashes and non-fatal errors, groups by stack signature, reports crash-free-users / sessions — the industry-standard mobile stability KPIs."]));
body.push(code([
  "FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;",
  "PlatformDispatcher.instance.onError = (e, s) {",
  "  FirebaseCrashlytics.instance.recordError(e, s, fatal: true);",
  "  return true;",
  "};",
  "FirebaseCrashlytics.instance.setCustomKey('screen', 'home');",
], "crashlytics"));
body.push(callout("interview", ["Wire Crashlytics AND set custom keys (screen, feature flag, tenant). When something breaks, filter by those keys to find the exact context — not just 'NullPointerException in some list'."]));
body.push(callout("mistake", ["Missing dSYM/mapping uploads → obfuscated stack traces = useless. Automate uploads in CI on every release build."]));
body.push(...summary([
  "Fatal + non-fatal (recordError) reporting.",
  "Custom keys/attributes give context.",
  "Symbolication requires dSYM/ProGuard uploads.",
  "SLO: crash-free-users > 99.5% pre-release.",
]));
body.push(...interview([
  "What are crash-free users/sessions?",
  "Fatal vs non-fatal reports?",
  "Why upload dSYM/mapping?",
  "How to attribute crashes to a release?",
  "How to triage a crash spike?",
]));
body.push(...coding([
  { level: "Easy", text: "Wire Crashlytics; force a test crash." },
  { level: "Medium", text: "Add custom keys; filter dashboards by them." },
  { level: "Hard", text: "Automate dSYM/mapping uploads in CI." },
  { level: "Expert", text: "SLO with velocity alerts + Slack notifications." },
]));
body.push(...realworld(["Every major mobile team tracks crash-free-users daily. Regression triggers a rollback or hotfix pipeline within minutes."]));
body.push(...miniproject(["Add Crashlytics with custom keys; simulate a bad release; verify velocity alerts fire and can gate rollout."]));
body.push(...advanced(["Multi-flavor mapping, on-device symbolication, ANR reporting on Android, log breadcrumbs from Analytics."]));

// 6. Analytics
body.push(H1("6. Analytics", "ch6"));
body.push(callout("definition", ["Event-based product analytics (formerly Google Analytics for Firebase). You log events + parameters; Firebase computes retention/funnels/audiences and pipes raw events to BigQuery for SQL."]));
body.push(code([
  "final a = FirebaseAnalytics.instance;",
  "await a.logEvent(name: 'add_to_cart',",
  "  parameters: {'item_id': '42', 'currency': 'INR', 'value': 199});",
  "await a.setUserProperty(name: 'plan', value: 'pro');",
], "analytics"));
body.push(callout("interview", ["Instrument once, keep the schema. Stable event names (snake_case) + small documented parameter set. Renaming later breaks funnels and BigQuery reports."]));
body.push(callout("mistake", ["Ignoring consent (GDPR / DPDPA). Log analytics only after explicit consent or via Consent Mode. Never log PII (emails/phone/tokens) in parameters."]));
body.push(...summary([
  "Events + parameters + user properties define the model.",
  "Enable BigQuery export on day one for SQL access.",
  "Set audiences + conversions for growth work.",
  "Respect consent + never log PII.",
]));
body.push(...interview([
  "How does event-based analytics work?",
  "Why is event naming so important?",
  "How to compute retention?",
  "How do you handle PII and consent?",
  "Why enable BigQuery export?",
]));
body.push(...coding([
  { level: "Easy", text: "Log a custom event with params; see it in DebugView." },
  { level: "Medium", text: "Create a purchase funnel + conversion." },
  { level: "Hard", text: "Enable BigQuery export; write a retention SQL query." },
  { level: "Expert", text: "Implement full Consent Mode for GDPR + DPDPA." },
]));
body.push(...realworld(["Growth teams live in Analytics. Combined with BigQuery, it powers everything from LTV modeling to A/B test analysis to marketing attribution."]));
body.push(...miniproject(["Instrument a small commerce flow end-to-end; build a funnel + retention dashboard; export raw events to BigQuery and answer 3 product questions in SQL."]));
body.push(...advanced(["GA4 modeling in BigQuery, sessionization, cohort retention, revenue attribution."]));

// 7. Remote Config
body.push(H1("7. Remote Config", "ch7"));
body.push(callout("definition", ["Managed feature-flag + configuration service. Defaults in the app, overrides in the console (with conditions targeting audiences); client fetches + activates the latest values."]));
body.push(code([
  "await rc.setDefaults({'home_variant': 'A', 'max_items': 20});",
  "await rc.fetchAndActivate();",
  "final variant = rc.getString('home_variant');",
], "remote config"));
body.push(callout("interview", ["Release code once, roll out gradually: ship dark, enable 1% → 10% → 100% via console. Combined with Crashlytics/Analytics you can auto-roll-back on regression."]));
body.push(callout("mistake", ["Fetching on every screen — flakes and burns quota. Fetch once per launch with a throttle; activate; let UI observe active values."]));
body.push(...summary([
  "Managed feature flags + config with targeting.",
  "Set defaults so first launch never breaks.",
  "Roll out gradually; keep a kill switch.",
  "Fetch sparingly (once per launch, throttled).",
]));
body.push(...interview([
  "How does Remote Config work?",
  "How do you gradually roll out a feature?",
  "Why set defaults?",
  "How do you run A/B tests?",
  "Remote Config vs LaunchDarkly/Optimizely?",
]));
body.push(...coding([
  { level: "Easy", text: "Gate a UI change behind a boolean flag with a default." },
  { level: "Medium", text: "Roll out a home layout to 10% of users; measure with Analytics." },
  { level: "Hard", text: "Add a kill switch tied to Crashlytics alerts." },
  { level: "Expert", text: "Run an A/B test with Analytics conversions and choose the winner." },
]));
body.push(...realworld(["Growth and infra teams use Remote Config for kill switches (bad deploy? flip a flag) and gradual rollouts (never 100% on day one)."]));
body.push(...miniproject(["Add Remote Config to your app: kill switch + variant flag + audience targeting; verify rollback behavior."]));
body.push(...advanced(["Personalization (RC + ML), server-side Remote Config (Cloud Functions), condition-composition strategies."]));

// 8. FCM
body.push(H1("8. Cloud Messaging (FCM)", "ch8"));
body.push(callout("definition", ["Push notifications and data messages to Android/iOS/web. Each device gets a registration token; server sends via HTTP v1 API to tokens, groups, or topics."]));
body.push(code([
  "await FirebaseMessaging.instance.requestPermission();",
  "final token = await FirebaseMessaging.instance.getToken();",
  "FirebaseMessaging.onMessage.listen((m) { /* foreground */ });",
  "FirebaseMessaging.onBackgroundMessage((m) async { /* isolate */ });",
], "fcm"));
body.push(callout("interview", ["Android Doze / iOS background restrictions mean you can't rely on background messages for silent work. For guaranteed background code, trigger WorkManager / BGTasks from a data message."]));
body.push(callout("mistake", ["Treating FCM tokens as durable identity. Tokens rotate; refresh on onTokenRefresh and dedupe (userId, token) rows."]));
body.push(...summary([
  "Notification vs data messages have different behavior.",
  "Refresh tokens; don't use them as user IDs.",
  "HTTP v1 API + OAuth (legacy server keys deprecated).",
  "Trigger scheduled work from data messages for reliability.",
]));
body.push(...interview([
  "Notification vs data messages?",
  "How do tokens work; when do they rotate?",
  "How do you handle background restrictions?",
  "How would you send to a segment?",
  "Legacy server key vs HTTP v1?",
]));
body.push(...coding([
  { level: "Easy", text: "Receive a foreground notification; log it." },
  { level: "Medium", text: "Handle a background data message; update local state." },
  { level: "Hard", text: "Subscribe/unsubscribe to topics; send targeted campaigns." },
  { level: "Expert", text: "Guaranteed background sync: data message → WorkManager job." },
]));
body.push(...realworld(["From chat apps to e-commerce reminders to airline delays — most of the notifications on your phone leave Google's servers via FCM."]));
body.push(...miniproject(["Add topics + rich notifications; wire a background handler that syncs pending outbox items."]));
body.push(...advanced(["Notification channels / interruption levels, image + action buttons, quiet hours, priority tuning."]));

// 9. App Distribution
body.push(H1("9. App Distribution", "ch9"));
body.push(callout("definition", ["Ships APK/AAB/IPA builds to invited testers by email — no store review. Great for fast internal QA loops."]));
body.push(code([
  "firebase appdistribution:distribute app-release.apk \\",
  "  --app 1:1234:android:abcd \\",
  "  --release-notes-file notes.txt \\",
  "  --groups qa,internal",
], "CI upload"));
body.push(callout("interview", ["Typical setup: daily builds → App Distribution for internal QA, weekly → Play Internal / TestFlight for wider beta, release → production tracks. Fast iteration without waiting for review."]));
body.push(...summary([
  "Ship builds to testers via email; no store review.",
  "Automate uploads in CI (fastlane / codemagic / gh-actions).",
  "In-app 'new build available' via Testers SDK.",
  "Layer with Play Internal / TestFlight for wider beta.",
]));
body.push(...interview([
  "App Distribution vs Play Internal vs TestFlight?",
  "How to automate uploads?",
  "How do testers get notified?",
  "What's in release notes?",
  "How to deprecate old testers?",
]));
body.push(...coding([
  { level: "Easy", text: "Upload one APK to a tester group via CLI." },
  { level: "Medium", text: "Automate distribution from GitHub Actions on push to main." },
  { level: "Hard", text: "In-app update prompt via Testers SDK." },
  { level: "Expert", text: "Multi-stage pipeline: nightly → weekly → production." },
]));
body.push(...realworld(["Every mobile team runs a distribution pipeline. Firebase App Distribution is the fastest to bootstrap; larger teams pair it with Play/TestFlight."]));
body.push(...miniproject(["Set up a CI pipeline that uploads a nightly Firebase App Distribution build and a weekly Play Internal build with commit-SHA release notes."]));
body.push(...advanced(["Signed artifact reproducibility, test-lab integration, feature-branch preview builds."]));

// 10. Performance Monitoring
body.push(H1("10. Performance Monitoring", "ch10"));
body.push(callout("definition", ["Auto-collects app-start, foreground/background, screen render, and network request timings. Custom traces let you time any business flow; console shows p50/p95 per app version."]));
body.push(code([
  "final t = FirebasePerformance.instance.newTrace('checkout');",
  "await t.start();",
  "// ... your work ...",
  "t.setMetric('items', cart.length);",
  "t.putAttribute('paymentMethod', 'card');",
  "await t.stop();",
], "custom trace"));
body.push(callout("interview", ["Pick 2–3 top-line SLIs (cold start p95, checkout trace p95, home network p95). Alert when they regress by > 20% between two releases. Turns 'the app feels slow' into an SLO that ships or blocks."]));
body.push(callout("mistake", ["Instrumenting everything → noise. Trace flows that matter to users + revenue; slice with custom attributes."]));
body.push(...summary([
  "Auto: app_start, screen render, network requests.",
  "Custom traces measure any flow with attributes/metrics.",
  "Pick 2–3 SLIs and alert on regressions.",
  "Combine with Analytics + Crashlytics for release quality.",
]));
body.push(...interview([
  "What does Perf auto-collect?",
  "How do you add a custom trace?",
  "Which SLIs to alert on?",
  "How to compare p95 across releases?",
  "Perf vs Macrobenchmark vs Impeller telemetry?",
]));
body.push(...coding([
  { level: "Easy", text: "Turn on Perf; observe app_start and network signals." },
  { level: "Medium", text: "Custom trace around checkout with attributes." },
  { level: "Hard", text: "Compare p95 across releases; gate rollouts on regression." },
  { level: "Expert", text: "Correlate Perf + Analytics + Crashlytics for release quality." },
]));
body.push(...realworld(["Perf is where 'a release feels slower' becomes a number. Teams block promotion to production if key SLIs regress by >X%."]));
body.push(...miniproject(["Set 2 SLIs on your app (cold-start p95 + a business trace p95) and wire alerts on regression."]));
body.push(...advanced(["Anomaly detection on custom traces, distributed traces across Firebase + backend via OTel, session-level breadcrumbs."]));

// Revision
body.push(H1("Volume 9 Revision Cheat Sheet", "cheat"));
body.push(H2("Firebase system-design starter kit"));
body.push(callout("note", ["Auth → propagate JWT to Firestore/Storage → Rules enforce ownership + custom claims → FCM for engagement → Remote Config for rollouts → Crashlytics + Analytics + Performance for quality signals → App Distribution for pre-release."]));
body.push(H2("Pick-the-DB (Firebase edition)"));
body.push(callout("best", ["General app data → Firestore. Chat + presence + sub-ms sync → Realtime Database. Big BLOBs → Cloud Storage. Ephemeral flags/config → Remote Config."]));
body.push(H2("Release-quality SLIs"));
body.push(callout("perf", ["Crash-free-users > 99.5% · cold-start p95 stable ±20% · key custom trace p95 stable ±20% · analytics event volume within expected band. Any two red? hold or roll back."]));
body.push(rule(C.amber));
body.push(P([{ t: "End of Volume 9. ", b: true, color: C.navy }, "Next: Volume 10 — Flutter Plugins (every key plugin, native impl, best practices, real usage)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 9 — Firebase"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-9-Firebase.docx");
save(doc, out).then(() => console.log("WROTE", out));
