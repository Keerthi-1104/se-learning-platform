// VOLUME 3 — Android Development
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.green, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.green, space: 8 } },
      children: [new TextRun({ text: "VOLUME 3", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Android Development", size: 32, color: C.green, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Components · Activity Lifecycle · Fragments · Intents · Services", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Broadcasts · Providers · WorkManager · Jetpack · Room · Hilt", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Coroutines · Kotlin · Performance Optimization", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 3", "intro"));
body.push(P([{ t: "Native Android ", b: true }, "knowledge is expected even from Flutter engineers — platform channels, lifecycle, and background work all touch it, and many MNC roles are still native-first. This volume covers the framework from components to Jetpack, Coroutines and performance, using the same teaching pattern as Volumes 1–2."]));
body.push(callout("note", [["Each topic ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["The most-asked Android interview themes: the activity lifecycle, why background work is restricted, ViewModel surviving rotation, Coroutines/structured concurrency, and memory leaks. This volume drills all of them."]));

// 1. Fundamentals
body.push(H1("1. Android Fundamentals", "ch1"));
body.push(callout("definition", ["An Android app is a set of components (Activities, Services, BroadcastReceivers, ContentProviders) declared in a manifest, compiled to an APK/AAB, and run on the ART runtime atop a customized Linux kernel."]));
body.push(table(["Component", "Purpose"], [
  ["Activity", "A single screen / UI entry point"],
  ["Service", "Background work without UI"],
  ["BroadcastReceiver", "Responds to system/app events"],
  ["ContentProvider", "Shares data across apps"],
], [3200, 6160]));
body.push(callout("note", ["Apps run on ART (AOT + JIT), each in its own process and Linux-user sandbox. Ship an AAB so Play generates optimized per-device APKs."]));
body.push(...summary([
  "Four components: Activity, Service, BroadcastReceiver, ContentProvider.",
  "The manifest declares components, permissions and SDK levels.",
  "ART runs app code; each app is sandboxed in its own process.",
  "Prefer AAB over a raw APK for smaller downloads.",
]));
body.push(...interview([
  "What are the four app components?",
  "What is the role of the manifest?",
  "What is ART vs the JVM/Dalvik?",
  "APK vs AAB?",
  "How does the Android security sandbox work?",
]));
body.push(...coding([
  { level: "Easy", text: "Create an app with one Activity and inspect its manifest entry." },
  { level: "Medium", text: "Add a runtime permission flow for the camera." },
  { level: "Hard", text: "Configure product flavors and build types in Gradle." },
  { level: "Expert", text: "Cut app size with R8 + resource shrinking; analyze the AAB." },
]));
body.push(...realworld(["Every Play Store app is an AAB; Play's dynamic delivery ships only the resources each device needs, often halving install size."]));
body.push(...miniproject(["Scaffold a multi-screen app, declare all components in the manifest, and add a permission request flow."]));
body.push(...advanced(["The Zygote process and app forking; SELinux policies; Scoped Storage."]));

// 2. Activity Lifecycle
body.push(...topicToChapter(loadTopic("level_03", "activity_lifecycle"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. Fragments
body.push(...topicToChapter(loadTopic("level_03", "fragments"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. Intents
body.push(...topicToChapter(loadTopic("level_03", "intents"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// 5. Services
body.push(H1("5. Services", "ch5"));
body.push(callout("definition", ["A Service performs work without a UI. It does NOT create its own thread — heavy work must be offloaded or it blocks the main thread (ANR)."]));
body.push(table(["Type", "Use", "Notes"], [
  ["Foreground", "User-visible ongoing work", "Needs a persistent notification"],
  ["Background", "Short work, no UI", "Restricted since Android 8"],
  ["Bound", "Client-server", "Lives while clients are bound"],
], [1800, 3500, 4060]));
body.push(callout("interview", ["Since Android 8, background services are restricted to save battery. For deferrable guaranteed work use WorkManager; for ongoing user-visible work use a foreground service."]));
body.push(...summary([
  "Services run on the main thread by default — offload heavy work.",
  "Foreground services need a persistent notification.",
  "Background services are restricted since Android 8.",
  "Prefer WorkManager/coroutines unless work is truly ongoing.",
]));
body.push(...interview([
  "Types of services and when use each?",
  "Does a Service run on its own thread?",
  "Why were background services restricted in Android 8?",
  "Service vs WorkManager vs coroutine?",
  "How does a bound service work?",
]));
body.push(...coding([
  { level: "Easy", text: "Create a foreground service with a notification." },
  { level: "Medium", text: "Implement a bound service exposing a method." },
  { level: "Hard", text: "Offload service work onto a coroutine to avoid ANR." },
  { level: "Expert", text: "Build a location-tracking foreground service handling process death." },
]));
body.push(...realworld(["Music players and navigation apps use foreground services with a notification so the system keeps them alive while in use."]));
body.push(...miniproject(["Build a step-counter foreground service that survives the app being backgrounded."]));
body.push(...advanced(["Foreground service types (Android 14), startForeground timing limits, JobScheduler under the hood."]));

// 6. Broadcast Receivers
body.push(H1("6. Broadcast Receivers", "ch6"));
body.push(callout("definition", ["A BroadcastReceiver responds to system or app events (connectivity, boot, battery) using a publish-subscribe model."]));
body.push(callout("interview", ["Since Android 8 most implicit broadcasts can't be declared in the manifest (battery). Register them at runtime, or use WorkManager/observers instead."]));
body.push(callout("mistake", ["onReceive runs on the main thread and the receiver is killed soon after returning — hand long work to WorkManager/coroutine."]));
body.push(...summary([
  "Receivers are a pub-sub mechanism for events.",
  "Manifest receivers persist; context receivers live while registered.",
  "Android 8 restricted manifest-declared implicit broadcasts.",
  "Keep onReceive fast; defer real work.",
]));
body.push(...interview([
  "What is a BroadcastReceiver?",
  "Manifest vs context-registered receivers?",
  "What changed for broadcasts in Android 8?",
  "Why must onReceive be fast?",
  "Alternatives for in-app events?",
]));
body.push(...coding([
  { level: "Easy", text: "Register a connectivity-change receiver and log changes." },
  { level: "Medium", text: "Tie a context-registered receiver to an activity lifecycle." },
  { level: "Hard", text: "Trigger work from BOOT_COMPLETED via WorkManager." },
  { level: "Expert", text: "Replace a LocalBroadcastManager flow with a shared Flow." },
]));
body.push(...realworld(["Apps that resume sync after reboot register a BOOT_COMPLETED receiver that enqueues WorkManager jobs."]));
body.push(...miniproject(["Build a 'charging logger' that records when the device is plugged/unplugged."]));
body.push(...advanced(["Ordered broadcasts, protected broadcasts, the exported flag and security."]));

// 7. Content Providers
body.push(H1("7. Content Providers", "ch7"));
body.push(callout("definition", ["A ContentProvider exposes structured app data to other apps via content:// URIs with a uniform CRUD interface and per-URI permissions."]));
body.push(callout("interview", ["You mainly need a ContentProvider to share data across apps or feed platform features (search, widgets, sync). For in-app storage, use Room directly. FileProvider shares files securely via content URIs."]));
body.push(...summary([
  "Providers expose data across apps via content URIs.",
  "Accessed through the ContentResolver.",
  "Needed for cross-app sharing / platform integration, not in-app DBs.",
  "FileProvider replaces file:// for sharing files since Android 7.",
]));
body.push(...interview([
  "What is a ContentProvider and why use it?",
  "How do you query one?",
  "When is it necessary vs over-engineering?",
  "What is FileProvider and why required?",
  "How are provider permissions enforced?",
]));
body.push(...coding([
  { level: "Easy", text: "Query the contacts provider and list names." },
  { level: "Medium", text: "Share an image via FileProvider." },
  { level: "Hard", text: "Implement a simple provider backed by Room." },
  { level: "Expert", text: "Add per-URI permissions and a sync adapter." },
]));
body.push(...realworld(["The system contacts, media and calendar are all ContentProviders that any app can query (with permission)."]));
body.push(...miniproject(["Build a small notes provider that another app can read with permission."]));
body.push(...advanced(["Sync adapters, ContentObserver, document providers (SAF)."]));

// 8. WorkManager
body.push(H1("8. WorkManager", "ch8"));
body.push(callout("definition", ["WorkManager is the recommended API for persistent, deferrable background work that must run even across restarts and reboots, picking the best underlying scheduler per OS."]));
body.push(callout("interview", ["Use WorkManager for guaranteed deferrable work (upload, sync, backup). Don't use it for exact-time or immediate in-process tasks — use AlarmManager (exact) or coroutines (immediate)."]));
body.push(...summary([
  "WorkManager guarantees deferrable work survives reboots.",
  "Supports constraints, backoff retries, and chaining.",
  "Not for exact timing — it batches for battery.",
  "Coroutines for immediate work; AlarmManager for exact alarms.",
]));
body.push(...interview([
  "What problem does WorkManager solve?",
  "WorkManager vs coroutine vs AlarmManager vs foreground service?",
  "How do constraints and backoff work?",
  "How do you chain workers and pass data?",
  "Does it guarantee exact timing?",
]));
body.push(...coding([
  { level: "Easy", text: "Create a Worker and enqueue it once." },
  { level: "Medium", text: "Add a network constraint + exponential backoff." },
  { level: "Hard", text: "Chain compress → upload → notify with data passing." },
  { level: "Expert", text: "Periodic unique sync; observe via WorkInfo LiveData." },
]));
body.push(...realworld(["Photo-backup apps enqueue uploads constrained to Wi-Fi + charging; WorkManager resumes them after reboots automatically."]));
body.push(...miniproject(["Build an offline outbox: queue messages and sync them with WorkManager when network returns."]));
body.push(...advanced(["Expedited work, foreground-service workers, custom WorkerFactory + Hilt injection."]));

// 9. Jetpack
body.push(...topicToChapter(loadTopic("level_03", "jetpack"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Room
body.push(...topicToChapter(loadTopic("level_03", "room"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. Hilt
body.push(...topicToChapter(loadTopic("level_03", "hilt"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. Coroutines
body.push(...topicToChapter(loadTopic("level_03", "coroutines"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// 13. Kotlin for Android
body.push(...topicToChapter(loadTopic("level_03", "kotlin"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

// 14. Performance
body.push(H1("14. Performance Optimization", "ch14"));
body.push(callout("definition", ["Android performance means rendering each frame within ~16ms (60fps), using memory efficiently, and starting fast. Jank usually means too much work on the main thread."]));
body.push(table(["Problem", "Cause", "Fix"], [
  ["Jank", "Work on main thread", "Move to coroutine/background"],
  ["Memory leak", "Long-lived Context/View refs", "App context, clear refs"],
  ["Overdraw", "Stacked backgrounds", "Flatten layout"],
  ["Slow startup", "Heavy onCreate", "Defer, lazy init"],
], [2200, 3200, 3960]));
body.push(callout("interview", ["The classic leak: an Activity Context held in a static field or singleton can't be GC'd after the activity is destroyed. Use application Context for long-lived needs; detect with LeakCanary."]));
body.push(...summary([
  "Keep the main thread free to hit the 16ms frame budget.",
  "Leaks come from long-lived Context/View references.",
  "Downsample images; use Glide/Coil to avoid OOM.",
  "Measure with the Profiler before optimizing.",
]));
body.push(...interview([
  "What causes jank and how to fix it?",
  "How do Android memory leaks happen?",
  "How do you handle large images?",
  "What profiling tools do you use?",
  "How do you improve startup time?",
]));
body.push(...coding([
  { level: "Easy", text: "Profile a janky screen and move work off the main thread." },
  { level: "Medium", text: "Add LeakCanary, reproduce and fix a leak." },
  { level: "Hard", text: "Reduce overdraw with the Layout Inspector." },
  { level: "Expert", text: "Cut startup time with Macrobenchmark + lazy init." },
]));
body.push(...realworld(["Apps obsess over cold-start time and scroll smoothness because both directly affect retention; teams gate releases on Macrobenchmark metrics."]));
body.push(...miniproject(["Take a deliberately janky list screen and optimize it to a stable 60fps; document each fix with profiler numbers."]));
body.push(...advanced(["Baseline Profiles, R8 full mode, StrictMode, systrace/Perfetto, ANR triage."]));

// Revision
body.push(H1("Volume 3 Revision Cheat Sheet", "cheat"));
body.push(H2("Background work decision"));
body.push(callout("note", ["Immediate in-process → coroutine. Deferrable guaranteed → WorkManager. Ongoing user-visible → foreground service. Exact time → AlarmManager (sparingly)."]));
body.push(H2("Lifecycle & state"));
body.push(callout("best", ["onCreate→onStart→onResume; persist in onStop; keep onPause fast. Survive rotation with ViewModel + SavedState. Use viewLifecycleOwner in fragments."]));
body.push(H2("Modern stack"));
body.push(callout("perf", ["UI (Compose) → ViewModel (StateFlow) → Repository → Room/Retrofit, wired with Hilt, async with Coroutines. Profile leaks with LeakCanary, startup with Macrobenchmark."]));
body.push(rule(C.green));
body.push(P([{ t: "End of Volume 3. ", b: true, color: C.navy }, "Next: Volume 4 — Flutter & Dart (engine, trees, rendering pipeline, Impeller, FFI)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 3 — Android"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-3-Android.docx");
save(doc, out).then(() => console.log("WROTE", out));
