// VOLUME 3 — Android Development
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
body.push(H1("2. Activity Lifecycle", "ch2"));
body.push(callout("definition", ["The activity lifecycle is the ordered set of callbacks Android invokes as an Activity is created, shown, hidden and destroyed."]));
body.push(code([
  "onCreate -> onStart -> onResume   (visible & interactive)",
  "onPause -> onStop -> onDestroy    (leaving)",
  "onRestart -> onStart -> onResume  (returning)",
], "lifecycle"));
body.push(callout("mistake", ["Heavy work in onPause blocks the next screen. Keep onPause fast; persist in onStop. A rotation destroys & recreates the activity, losing in-memory state."]));
body.push(callout("tip", ["Survive config changes with a ViewModel for UI state and onSaveInstanceState for small bundles."]));
body.push(...summary([
  "Create→visible: onCreate → onStart → onResume.",
  "Rotation recreates the activity; save state to survive it.",
  "Persist important data in onStop; keep onPause fast.",
  "ViewModel is the modern way to retain UI state.",
]));
body.push(...interview([
  "Walk through the activity lifecycle.",
  "What happens on a configuration change?",
  "onSaveInstanceState vs ViewModel?",
  "Why must onPause be fast?",
  "How do activity leaks happen?",
]));
body.push(...coding([
  { level: "Easy", text: "Log every callback and rotate to see the sequence." },
  { level: "Medium", text: "Preserve form text across rotation with onSaveInstanceState." },
  { level: "Hard", text: "Move UI state into a ViewModel to survive config changes." },
  { level: "Expert", text: "Find and fix an activity leak from a long-lived handler." },
]));
body.push(...realworld(["A rotating checkout screen that loses the cart is a real bug; ViewModel + saved state keep it intact through configuration changes."]));
body.push(...miniproject(["Build a timer screen that keeps running and shows correct state across rotation and process death."]));
body.push(...advanced(["android:configChanges (and why to avoid it), saved-state ViewModel, process death vs config change."]));

// 3. Fragments
body.push(H1("3. Fragments", "ch3"));
body.push(callout("definition", ["A Fragment is a reusable, modular piece of UI hosted inside an Activity (or another Fragment), enabling adaptive layouts and single-activity navigation."]));
body.push(callout("mistake", ["Observing LiveData with the fragment's lifecycle instead of viewLifecycleOwner causes duplicate observers and crashes when the view is recreated. Always use viewLifecycleOwner in onViewCreated."]));
body.push(...summary([
  "Fragments are reusable UI hosted by an activity/fragment.",
  "A fragment has both an instance lifecycle and a view lifecycle.",
  "Use viewLifecycleOwner for LiveData/Flow in fragments.",
  "Single-activity + Navigation component is the modern pattern.",
]));
body.push(...interview([
  "What is a Fragment and why use it?",
  "Fragment lifecycle vs view lifecycle?",
  "Why viewLifecycleOwner?",
  "How do fragments communicate?",
  "Single-activity vs multi-activity architecture?",
]));
body.push(...coding([
  { level: "Easy", text: "Host and swap two fragments with a FragmentTransaction." },
  { level: "Medium", text: "Share state via an activity-scoped ViewModel." },
  { level: "Hard", text: "Build an adaptive master-detail layout." },
  { level: "Expert", text: "Reproduce and fix a fragment view leak." },
]));
body.push(...realworld(["Tablet apps show a list and detail side-by-side using two fragments, reusing the same fragments the phone shows on separate screens."]));
body.push(...miniproject(["Build a single-activity app with the Navigation component, 3 fragments, and a shared ViewModel."]));
body.push(...advanced(["Fragment Result API, child fragment managers, transition animations."]));

// 4. Intents
body.push(H1("4. Intents", "ch4"));
body.push(callout("definition", ["An Intent is a messaging object that requests an action — start a component, broadcast an event, or ask another app to handle something."]));
body.push(table(["Type", "Target", "Example"], [
  ["Explicit", "A named component", "Open DetailActivity"],
  ["Implicit", "Any capable app", "ACTION_VIEW a URL; share text"],
], [1800, 3500, 4060]));
body.push(callout("note", ["Implicit intents match intent filters in other apps' manifests. A PendingIntent lets the system/another app run your intent later (notifications, alarms)."]));
body.push(...summary([
  "Explicit intents name a component; implicit declare an action.",
  "Intent filters declare what implicit intents a component handles.",
  "PendingIntent wraps an intent for deferred execution.",
  "Use registerForActivityResult for results (not the old API).",
]));
body.push(...interview([
  "Explicit vs implicit intents?",
  "What is an intent filter?",
  "What is a PendingIntent and when needed?",
  "How do you pass data between components?",
  "How do you get a result back (modern API)?",
]));
body.push(...coding([
  { level: "Easy", text: "Start an activity with an extra and read it." },
  { level: "Medium", text: "Share text/an image via ACTION_SEND." },
  { level: "Hard", text: "Return a result with registerForActivityResult." },
  { level: "Expert", text: "Add an intent filter so your app appears in the share sheet." },
]));
body.push(...realworld(["The system share sheet, 'open with' dialogs, and deep links all run on implicit intents + intent filters."]));
body.push(...miniproject(["Build a share-target app that accepts shared text via an intent filter and saves it."]));
body.push(...advanced(["App Links verification, deep linking with the Navigation component, intent extras size limits."]));

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
body.push(H1("9. Jetpack Components", "ch9"));
body.push(callout("definition", ["Jetpack is a suite of libraries handling boilerplate and best practices: lifecycle-aware components, navigation, persistence, background work, and the Compose UI toolkit."]));
body.push(table(["Library", "Solves"], [
  ["ViewModel", "Hold UI state across config changes"],
  ["LiveData / Flow", "Lifecycle-aware observable data"],
  ["Navigation", "Single-activity navigation"],
  ["Room", "SQLite with compile-time checks"],
  ["Compose", "Declarative UI"],
], [3200, 6160]));
body.push(callout("interview", ["ViewModel survives configuration changes, exposing state via LiveData/StateFlow the UI observes — the backbone of MVVM. Compose makes UI a function of state, recomposing only what changed."]));
body.push(...summary([
  "Jetpack = best-practice libraries that snap together.",
  "ViewModel retains UI state across rotation.",
  "Compose is declarative: UI = f(state).",
  "Recommended architecture: UI → ViewModel → Repository → data.",
]));
body.push(...interview([
  "What is Android Jetpack?",
  "Why use a ViewModel? How does it survive rotation?",
  "LiveData vs StateFlow?",
  "What is Compose and how does recomposition work?",
  "Describe the recommended architecture.",
]));
body.push(...coding([
  { level: "Easy", text: "ViewModel exposing a counter via StateFlow." },
  { level: "Medium", text: "Navigation component screen with arguments." },
  { level: "Hard", text: "MVVM screen: UI → ViewModel → Repository." },
  { level: "Expert", text: "Rebuild the screen in Compose with state hoisting." },
]));
body.push(...realworld(["Modern Android apps (and Google's own) are built on Jetpack: ViewModel + Flow + Navigation + Room + Compose is the default stack."]));
body.push(...miniproject(["Build a small notes app: Compose UI + ViewModel + Room, fully reactive."]));
body.push(...advanced(["SavedStateHandle, Paging 3, Compose performance (stability, keys), Navigation 3."]));

// 10. Room
body.push(H1("10. Room Database", "ch10"));
body.push(callout("definition", ["Room is a Jetpack persistence library over SQLite giving compile-time-verified SQL, less boilerplate, and reactive Flow/LiveData queries."]));
body.push(code([
  "@Entity data class User(@PrimaryKey val id: Int, val name: String)",
  "@Dao interface UserDao {",
  "  @Query(\"SELECT * FROM User\") fun all(): Flow<List<User>>",
  "  @Insert suspend fun insert(u: User)",
  "}",
], "room"));
body.push(callout("mistake", ["Changing the schema without a Migration throws at runtime. Provide a Migration and bump the version (use destructive migration only in dev)."]));
body.push(...summary([
  "Room = @Entity + @Dao + @Database over SQLite.",
  "SQL is verified at compile time.",
  "Flow queries are reactive — UI auto-updates.",
  "Schema changes need migrations + version bumps.",
]));
body.push(...interview([
  "What is Room and why over raw SQLite?",
  "Explain @Entity, @Dao, @Database.",
  "How do reactive queries work?",
  "How do you handle migrations?",
  "How do you keep DB access off the main thread?",
]));
body.push(...coding([
  { level: "Easy", text: "Define entity/DAO/database; insert and read." },
  { level: "Medium", text: "Expose a Flow query and update the UI reactively." },
  { level: "Hard", text: "Write and test a Migration adding a column." },
  { level: "Expert", text: "Model a one-to-many relation with @Relation + a transaction." },
]));
body.push(...realworld(["Offline-first apps cache server data in Room and observe it with Flow, so the UI works without network and updates when sync completes."]));
body.push(...miniproject(["Build an offline-first list backed by Room, synced from a fake API."]));
body.push(...advanced(["TypeConverters, FTS search, multi-map relations, Room + Paging."]));

// 11. Hilt
body.push(H1("11. Hilt — Dependency Injection", "ch11"));
body.push(callout("definition", ["Hilt is a DI library on Dagger that generates wiring for you. DI means objects receive their dependencies instead of creating them — improving testability and decoupling."]));
body.push(callout("interview", ["DI inverts control: instead of UserRepository() creating an Api, the Api is injected; tests inject a fake Api with no real network. This is the Dependency Inversion Principle applied."]));
body.push(...summary([
  "Hilt automates Dagger DI on Android.",
  "@Inject, @Module/@Provides, @Binds describe how to build types.",
  "@AndroidEntryPoint enables injection in Android classes.",
  "Scope intentionally — over-scoping to @Singleton leaks.",
]));
body.push(...interview([
  "What is DI and why use it?",
  "How does Hilt relate to Dagger?",
  "Explain @Inject/@Module/@Provides/@Binds.",
  "What are Hilt scopes?",
  "How does DI improve testing?",
]));
body.push(...coding([
  { level: "Easy", text: "Inject a repository into an Activity." },
  { level: "Medium", text: "Provide a Retrofit Api via @Module/@Provides." },
  { level: "Hard", text: "Bind an interface to an impl with @Binds + scope it." },
  { level: "Expert", text: "Swap a real dep for a fake in a Hilt instrumented test." },
]));
body.push(...realworld(["Large Android apps wire dozens of dependencies (network, DB, analytics) through Hilt so features depend on abstractions, not concretions."]));
body.push(...miniproject(["Wire a small app end-to-end with Hilt: Api → Repository → ViewModel, with a fake Api for tests."]));
body.push(...advanced(["Custom components & scopes, @EntryPoint for non-Android classes, assisted injection."]));

// 12. Coroutines
body.push(H1("12. Coroutines", "ch12"));
body.push(callout("definition", ["Kotlin coroutines are lightweight suspendable computations that make async code read sequentially. A suspend function pauses without blocking a thread."]));
body.push(code([
  "viewModelScope.launch {                      // structured concurrency",
  "  val user = withContext(Dispatchers.IO) { api.getUser() }",
  "  _state.value = user                        // back on main",
  "}",
], "coroutines"));
body.push(callout("interview", ["Structured concurrency ties coroutines to a scope (viewModelScope/lifecycleScope); when the scope ends they're cancelled — no leaked work. Collect StateFlow with repeatOnLifecycle(STARTED) so collection pauses off-screen."]));
body.push(...summary([
  "suspend functions pause without blocking threads.",
  "Dispatchers: Main (UI), IO (network/disk), Default (CPU).",
  "Structured concurrency auto-cancels scoped coroutines.",
  "Flow/StateFlow are the coroutine-native reactive streams.",
]));
body.push(...interview([
  "What are coroutines and suspend functions?",
  "Explain dispatchers.",
  "What is structured concurrency?",
  "Flow vs LiveData vs StateFlow?",
  "How do you collect a Flow safely on Android?",
]));
body.push(...coding([
  { level: "Easy", text: "Call a suspend function from viewModelScope and update state." },
  { level: "Medium", text: "Run two calls in parallel with async/await and combine." },
  { level: "Hard", text: "Expose StateFlow; collect with repeatOnLifecycle(STARTED)." },
  { level: "Expert", text: "Debounced search with debounce + flatMapLatest." },
]));
body.push(...realworld(["Coroutines replaced callback hell and RxJava in most Android apps; a network + DB flow that once needed nested callbacks is now a few sequential lines."]));
body.push(...miniproject(["Build a search screen: type → debounce → query API on IO → show results, all with Flow + coroutines."]));
body.push(...advanced(["SupervisorJob, exception handling (CoroutineExceptionHandler), cold vs hot flows, channels."]));

// 13. Kotlin
body.push(H1("13. Native Java & Kotlin", "ch13"));
body.push(callout("definition", ["Kotlin is the official Android language — concise, null-safe, and fully interoperable with Java (both compile to JVM bytecode)."]));
body.push(code([
  "var nick: String? = null      // nullable type",
  "val len = nick?.length ?: 0   // safe call + Elvis",
  "data class User(val id: Int, val name: String)  // equals/copy free",
  "fun String.shout() = uppercase() + \"!\"          // extension",
], "kotlin"));
body.push(callout("interview", ["Null safety is Kotlin's biggest win: separating String from String? eliminates most NullPointerExceptions at compile time. Avoid !! — it reintroduces NPEs."]));
body.push(...summary([
  "Kotlin null safety catches NPEs at compile time.",
  "data classes generate equals/hashCode/toString/copy.",
  "Extension & scope functions make code concise.",
  "Kotlin and Java interoperate freely.",
]));
body.push(...interview([
  "How does Kotlin handle null safety?",
  "data class vs regular class?",
  "Extension functions & scope functions?",
  "How do Kotlin and Java interoperate?",
  "val vs var vs const?",
]));
body.push(...coding([
  { level: "Easy", text: "Convert a Java POJO to a Kotlin data class." },
  { level: "Medium", text: "Use extension and scope functions." },
  { level: "Hard", text: "Refactor null-heavy Java to null-safe Kotlin." },
  { level: "Expert", text: "Call Kotlin suspend functions from Java interop." },
]));
body.push(...realworld(["Google recommends Kotlin-first; most new Android code and samples are Kotlin, with Java kept only for legacy modules."]));
body.push(...miniproject(["Port a small Java feature module to idiomatic Kotlin and measure the line-count reduction."]));
body.push(...advanced(["Sealed classes & when-exhaustiveness, inline/reified functions, delegated properties, Kotlin Multiplatform."]));

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
const out = require("path").join(__dirname, "Volume-3-Android.docx");
save(doc, out).then(() => console.log("WROTE", out));
