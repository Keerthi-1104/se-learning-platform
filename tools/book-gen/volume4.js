// VOLUME 4 — Flutter & Dart
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.blue, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.blue, space: 8 } },
      children: [new TextRun({ text: "VOLUME 4", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Flutter & Dart — Engine to Expert", size: 30, color: C.blue, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Dart · Widgets · Lifecycle · BuildContext · Widget/Element/Render Trees", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Rendering Pipeline · Navigation · State · Animations · Slivers · CustomPainter", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Platform Channels · Flutter Engine · Impeller · FFI · Package Development", size: 20, color: C.grayText })] }),
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

// Compact chapter helper for shorter topics: title, defn, extras[], closers
function chapter(opts) {
  const out = [H1(opts.title, opts.id)];
  if (opts.def) out.push(callout("definition", [opts.def]));
  (opts.blocks || []).forEach((b) => out.push(b));
  out.push(...summary(opts.summary));
  out.push(...interview(opts.interview));
  out.push(...coding(opts.coding));
  out.push(...realworld(opts.realworld));
  out.push(...miniproject(opts.miniproject));
  out.push(...advanced(opts.advanced));
  return out;
}

const body = [];

body.push(H1("How to Use Volume 4", "intro"));
body.push(P([{ t: "Flutter is the centerpiece of this roadmap. ", b: true }, "This is the deepest volume: it goes past 'how to build a screen' into how Flutter actually works — the three trees, the rendering pipeline, the engine, Impeller and FFI. That internal knowledge is exactly what separates senior Flutter engineers in interviews."]));
body.push(callout("note", [["Each topic ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["The signature senior Flutter question: 'Explain the difference between the Widget, Element and RenderObject trees.' If you can answer that and walk a frame through the rendering pipeline, you're ahead of most candidates."]));

// 1. Dart Language
body.push(...topicToChapter(loadTopic("level_04", "dart"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// 2. Widgets
body.push(...topicToChapter(loadTopic("level_04", "widgets"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. Widget Lifecycle
body.push(...topicToChapter(loadTopic("level_04", "widget_lifecycle"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. BuildContext
body.push(...topicToChapter(loadTopic("level_04", "buildcontext"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// 5 The three trees
body.push(...chapter({
  id: "ch5", title: "5. The Three Trees: Widget · Element · Render",
  def: "Flutter maintains three parallel trees: the Widget tree (immutable config), the Element tree (living instances + state), and the RenderObject tree (layout, paint, hit-test).",
  blocks: [
    code(["Widget (config) --inflate--> Element (instance, holds State)",
      "                                 |  creates/updates",
      "                                 v",
      "                            RenderObject (layout + paint)"], "the three trees"),
    table(["Tree", "Mutable?", "Job"], [
      ["Widget", "No (rebuilt often)", "Describe the UI"],
      ["Element", "Yes (long-lived)", "Hold state, reconcile, bridge"],
      ["RenderObject", "Yes", "Layout, paint, hit-test"]], [2200, 3000, 4160]),
    callout("interview", ["On rebuild, Element.updateChild reuses the existing Element (and its State + RenderObject) when the new widget has the same runtimeType and key; otherwise it unmounts and recreates. This is why type/key stability drives performance, and why keys preserve state when widgets reorder."]),
    callout("mistake", ["Reordering stateful list items without keys mixes up state. Use ValueKey/ObjectKey so elements follow their data."]),
  ],
  summary: ["Widget = config, Element = instance+state, RenderObject = layout/paint.", "Elements are reused when runtimeType + key match.", "Keys preserve identity during reconciliation.", "BuildContext is an Element."],
  interview: ["Explain the Widget/Element/RenderObject trees.", "When does Flutter reuse vs recreate an Element?", "What problem do keys solve?", "Where is State stored?", "ValueKey vs GlobalKey?"],
  coding: [
    { level: "Easy", text: "Add prints to observe element reuse on rebuild." },
    { level: "Medium", text: "Reproduce a list state mix-up; fix with ValueKey." },
    { level: "Hard", text: "Use a GlobalKey to read a child's state; note the cost." },
    { level: "Expert", text: "Write a custom RenderBox with performLayout + paint." }],
  realworld: ["Animated reorderable lists and shared-element transitions rely on correct keys so the framework moves elements instead of rebuilding them."],
  miniproject: ["Build a reorderable, animated list where each item keeps its own expand/collapse state correctly via keys."],
  advanced: ["RenderObject protocols, the layout boundary & relayout boundaries, the Flutter inspector's three-tree view."],
}));

// 6 Rendering pipeline
body.push(...chapter({
  id: "ch6", title: "6. Rendering Pipeline",
  def: "The rendering pipeline is the per-frame sequence — Build → Layout → Paint → Composite → Rasterize — that turns your widget tree into pixels, driven by vsync.",
  blocks: [
    code(["vsync -> Build -> LAYOUT -> PAINT -> COMPOSITE -> RASTERIZE(GPU)",
      "UI thread: build/layout/paint (records layers)",
      "Raster thread: turns layers into pixels"], "frame"),
    callout("interview", ["Flutter targets ~16ms/frame (60fps). Work splits across the UI thread (build/layout/paint) and the raster thread (GPU). Jank occurs when either overruns the budget. Layout is single-pass: constraints down, sizes up, parent positions — making it O(n)."]),
    callout("tip", ["Cut per-frame work: minimize rebuilt subtrees (const, selectors), RepaintBoundary around animations, avoid expensive paint (big blurs/saveLayer) in hot paths."]),
  ],
  summary: ["Phases: Build → Layout → Paint → Composite → Rasterize.", "UI thread records layers; raster thread rasterizes on GPU.", "Layout is single-pass: constraints down, sizes up.", "Jank = either thread exceeds the frame budget."],
  interview: ["Walk through the rendering pipeline.", "UI vs raster thread?", "What causes jank and how to diagnose?", "Explain constraints down, sizes up.", "How reduce per-frame work?"],
  coding: [
    { level: "Easy", text: "Read UI vs raster timings on the performance overlay." },
    { level: "Medium", text: "Find and fix a jank source with the DevTools timeline." },
    { level: "Hard", text: "Reduce rebuilds with const + a selector; measure." },
    { level: "Expert", text: "Eliminate a costly saveLayer/shadow in a scrolling list." }],
  realworld: ["Smooth 60/120fps scrolling in production apps comes from profiling this pipeline and trimming rebuilds/repaints — a core senior skill."],
  miniproject: ["Take a janky screen and bring it to a stable 60fps, documenting each fix with DevTools numbers."],
  advanced: ["Layer trees, RepaintBoundary metrics, raster cache, shader warm-up."],
}));

// 7 Navigation
body.push(...chapter({
  id: "ch7", title: "7. Navigation",
  def: "Navigation moves between screens (routes) — imperatively with Navigator (a route stack) or declaratively with a router (go_router) mapping URLs/state to screens.",
  blocks: [
    code(["final r = await Navigator.push(context, MaterialPageRoute(builder: ...));",
      "context.go('/product/42');   // declarative (go_router)"], "dart"),
    callout("interview", ["Navigator 2.0 made routing declarative so the back stack can be derived from app state — essential for web URLs and deep links. go_router is the recommended wrapper over its complexity."]),
    callout("tip", ["Pass IDs through routes and refetch, not whole objects — so deep links and state restoration work."]),
  ],
  summary: ["Navigator = imperative stack; routers = declarative URL/state.", "Navigator 2.0 enables web URLs + deep links.", "push returns a Future completed by pop(result).", "Prefer typed named routes; pass IDs not objects."],
  interview: ["Imperative vs declarative navigation?", "Pass and return data between routes?", "Why Navigator 2.0?", "How do deep links work?", "How guard routes (auth)?"],
  coding: [
    { level: "Easy", text: "Push a detail screen with an argument." },
    { level: "Medium", text: "Return a selected value from a picker." },
    { level: "Hard", text: "go_router with nested routes + path params." },
    { level: "Expert", text: "Deep links + auth redirect guards with go_router." }],
  realworld: ["E-commerce apps map URLs like /product/42 to screens so links shared on social media open the right page — only possible with declarative routing."],
  miniproject: ["Build a 3-tab app with go_router, nested routes, deep links and an auth guard."],
  advanced: ["Router/RouteInformationParser internals, shell routes, restorable state."],
}));

// 8 Forms
body.push(...chapter({
  id: "ch8", title: "8. Forms & Validation",
  def: "Flutter forms group inputs under a Form widget with a GlobalKey<FormState>, enabling collective validation, saving and reset.",
  blocks: [
    code(["final _key = GlobalKey<FormState>();",
      "TextFormField(validator: (v) => v!.isEmpty ? 'Required' : null);",
      "if (_key.currentState!.validate()) { /* submit */ }"], "dart"),
    callout("mistake", ["Not disposing TextEditingControllers/FocusNodes (leak). And: client validation is UX only — always validate on the server too."]),
  ],
  summary: ["Validate via GlobalKey<FormState>.validate().", "Dispose controllers and focus nodes.", "Use autovalidateMode onUserInteraction.", "Always revalidate server-side."],
  interview: ["How does Form/FormState validation work?", "Managing controllers and focus?", "When use autovalidateMode?", "Why isn't client validation enough?", "Async/server validation?"],
  coding: [
    { level: "Easy", text: "Login form with required + email validation." },
    { level: "Medium", text: "Focus traversal + submit on done." },
    { level: "Hard", text: "Cross-field validation (password == confirm)." },
    { level: "Expert", text: "Reactive form with async server validation." }],
  realworld: ["Signup flows combine client validation for instant feedback with server validation for security and uniqueness checks."],
  miniproject: ["Build a multi-step signup wizard with per-step validation and a review screen."],
  advanced: ["reactive_forms / form_builder, debounced async validators, accessibility for errors."],
}));

// 9 State Management
body.push(...chapter({
  id: "ch9", title: "9. State Management",
  def: "State management is how you store, update and share UI-affecting data: ephemeral (local) state via setState, and app/shared state via Provider/Riverpod/BLoC.",
  blocks: [
    table(["Approach", "Best for"], [
      ["setState", "Single-widget state"],
      ["Provider", "Simple shared state"],
      ["Riverpod", "Most apps; testable DI"],
      ["BLoC/Cubit", "Event-driven, complex flows"]], [3200, 6160]),
    callout("interview", ["No single 'best' — it's about fit. setState for local UI; Provider/Riverpod for most shared state; BLoC for explicit, testable event→state flows. Volume 5 compares them all in depth."]),
    callout("mistake", ["One giant global store rebuilding the whole screen. Scope state to where it's used; rebuild granularly with Consumer/Selector/select."]),
  ],
  summary: ["Ephemeral (setState) vs app state (Provider/Riverpod/BLoC).", "Choose by fit, not hype.", "Keep business logic out of widgets.", "Rebuild granularly to avoid waste."],
  interview: ["Ephemeral vs app state?", "Compare setState/Provider/Riverpod/BLoC.", "Avoid unnecessary rebuilds?", "Where should logic live?", "How test state logic?"],
  coding: [
    { level: "Easy", text: "Counter with setState, then Provider." },
    { level: "Medium", text: "Share auth state with Riverpod." },
    { level: "Hard", text: "Search feature as a Cubit with loading/error/data." },
    { level: "Expert", text: "Refactor to rebuild only changed parts; measure rebuilds." }],
  realworld: ["Large apps mix approaches: local setState for tiny UI bits and Riverpod/BLoC for shared domain state — covered fully in Volume 5."],
  miniproject: ["Build the same todo app twice (Provider and BLoC) and compare boilerplate, testability and rebuilds."],
  advanced: ["Riverpod codegen & AsyncNotifier, BLoC hydration, selector granularity."],
}));

// 10 Animations
body.push(...chapter({
  id: "ch10", title: "10. Animations",
  def: "Animations interpolate values over time. Implicit animations (AnimatedFoo) handle simple cases; explicit animations (AnimationController + Tween) give full control.",
  blocks: [
    code(["final c = AnimationController(vsync: this, duration: 1.s)..forward();",
      "final fade = CurvedAnimation(parent: c, curve: Curves.easeIn);",
      "@override void dispose(){ c.dispose(); super.dispose(); }"], "dart"),
    callout("mistake", ["Missing the vsync mixin or not disposing the controller (leaks). Animating layout for many widgets janks — prefer transform/opacity."]),
  ],
  summary: ["Implicit = set a target; explicit = drive a controller.", "Controllers need a vsync and must be disposed.", "Animate transform/opacity (cheap), not layout for many widgets.", "Use AnimatedBuilder + RepaintBoundary to isolate work."],
  interview: ["Implicit vs explicit animations?", "Why does the controller need vsync + dispose?", "Tween vs Curve?", "Keep animations at 60fps?", "AnimatedBuilder vs full rebuild?"],
  coding: [
    { level: "Easy", text: "Animate size/color with AnimatedContainer." },
    { level: "Medium", text: "Fade+slide intro with controller + Tween." },
    { level: "Hard", text: "Staggered animations with Intervals." },
    { level: "Expert", text: "Custom Hero-like transition at 60fps." }],
  realworld: ["Polished apps use coordinated motion (shared element transitions, micro-interactions) built on explicit controllers, isolated with RepaintBoundary."],
  miniproject: ["Build an onboarding flow with staggered, choreographed animations across 3 pages."],
  advanced: ["Implicit animation internals, physics simulations, rive/lottie, AnimatedSwitcher."],
}));

// 11 Slivers
body.push(...chapter({
  id: "ch11", title: "11. Slivers",
  def: "A sliver is a scrollable area that renders itself given the viewport's scroll position. Slivers compose in a CustomScrollView for advanced scroll effects.",
  blocks: [
    code(["CustomScrollView(slivers: [",
      "  SliverAppBar(expandedHeight: 200, pinned: true),",
      "  SliverList(delegate: SliverChildBuilderDelegate(builder, childCount: 100)),",
      "]);"], "dart"),
    callout("interview", ["ListView is a CustomScrollView with one lazy SliverList. Slivers give lazy building (only visible items built) plus effects like collapsing/pinned headers you can't get by nesting normal widgets."]),
    callout("mistake", ["Nesting scrollables badly instead of composing slivers — unbounded-height errors or double scrollbars. Use one CustomScrollView with multiple slivers."]),
  ],
  summary: ["Slivers render based on scroll offset, composed in CustomScrollView.", "ListView = CustomScrollView + lazy SliverList.", "Use builder delegates for long lists (lazy).", "Compose effects: SliverAppBar, SliverPersistentHeader."],
  interview: ["What is a sliver?", "How does ListView relate to slivers?", "Build a collapsing app bar?", "Lazy vs eager sliver children?", "Avoid nested-scroll problems?"],
  coding: [
    { level: "Easy", text: "CustomScrollView with SliverAppBar + SliverList." },
    { level: "Medium", text: "Mix SliverGrid and SliverList." },
    { level: "Hard", text: "Pinned sticky header with SliverPersistentHeader." },
    { level: "Expert", text: "Collapsing parallax header with custom behavior." }],
  realworld: ["News and profile screens use collapsing headers + mixed lists/grids in a single CustomScrollView for smooth, lazy scrolling."],
  miniproject: ["Build a profile screen with a parallax collapsing header, a pinned tab bar, and a lazy mixed feed."],
  advanced: ["Custom RenderSliver, SliverPersistentHeaderDelegate, nested scroll coordination."],
}));

// 12 CustomPainter
body.push(...chapter({
  id: "ch12", title: "12. CustomPainter",
  def: "CustomPainter draws directly on a Canvas — shapes, paths, text, gradients — for visuals awkward or impossible with standard widgets (charts, gauges, signatures).",
  blocks: [
    code(["class RingPainter extends CustomPainter {",
      "  void paint(Canvas c, Size s) { c.drawCircle(s.center(Offset.zero), s.width/2, paint); }",
      "  bool shouldRepaint(old) => false;",
      "}"], "dart"),
    callout("mistake", ["Returning true from shouldRepaint unnecessarily repaints every frame. Return true ONLY when drawing inputs changed. Wrap CustomPaint in RepaintBoundary."]),
  ],
  summary: ["Draw via paint(Canvas, Size) with Paint.", "Repaint only when shouldRepaint returns true.", "Isolate with RepaintBoundary.", "Use it when widgets can't express the visual."],
  interview: ["When use CustomPainter?", "How does shouldRepaint affect perf?", "Animate a CustomPainter?", "Isolate a painter's repaints?", "Canvas vs widget composition?"],
  coding: [
    { level: "Easy", text: "Draw a circle and a line." },
    { level: "Medium", text: "Progress ring that fills by value." },
    { level: "Hard", text: "Simple line chart from points." },
    { level: "Expert", text: "Efficient signature pad." }],
  realworld: ["Charting libraries (fl_chart) and custom progress/gauge widgets are built on CustomPainter for full control over pixels."],
  miniproject: ["Build a mini charts library: line, bar and donut charts via CustomPainter."],
  advanced: ["Canvas saveLayer cost, Path metrics, custom shaders (FragmentProgram)."],
}));

// 13 Platform Channels
body.push(...chapter({
  id: "ch13", title: "13. Platform Channels",
  def: "Platform channels bridge Dart and native code (Kotlin/Java, Swift/Obj-C). Messages are serialized and passed asynchronously by channel name.",
  blocks: [
    table(["Channel", "Use"], [
      ["MethodChannel", "Call a native method, get a result"],
      ["EventChannel", "Stream native events to Dart (sensors)"],
      ["BasicMessageChannel", "Arbitrary messages both ways"]], [3000, 6160]),
    callout("interview", ["Channels are async with a standard codec (numbers/strings/lists/maps/bytes). Heavy byte transfers are better via FFI than serialized per call. Do long native work off the platform main thread and return via the result callback."]),
  ],
  summary: ["Channels bridge Dart ↔ native via named async messages.", "MethodChannel = call; EventChannel = stream.", "Calls are always asynchronous.", "Use FFI for heavy byte transfer."],
  interview: ["What are platform channels?", "Method vs Event vs Basic channel?", "Are calls sync or async?", "Avoid blocking the UI from native?", "When use FFI instead?"],
  coding: [
    { level: "Easy", text: "Native method returning the battery level." },
    { level: "Medium", text: "Stream accelerometer via EventChannel." },
    { level: "Hard", text: "Run heavy native work off the main thread." },
    { level: "Expert", text: "Wrap a native SDK in a typed plugin." }],
  realworld: ["Plugins like camera and geolocator are platform channels wrapping native APIs behind a clean Dart interface."],
  miniproject: ["Build a plugin exposing device battery + charging stream via Method and Event channels."],
  advanced: ["Pigeon for type-safe channels, background isolates + channels, codec customization."],
}));

// 14 Engine
body.push(...chapter({
  id: "ch14", title: "14. Flutter Engine",
  def: "The Flutter Engine (C++) provides the runtime: the Dart VM, graphics (Impeller/Skia), text layout and platform plumbing. The Dart framework runs on top.",
  blocks: [
    code(["Your app -> Framework (widgets) [Dart]",
      "  -> Engine (Dart VM, Impeller/Skia, text) [C++]",
      "    -> Embedder (Android/iOS/desktop) -> OS surface"], "architecture"),
    callout("interview", ["Unlike React Native, Flutter does NOT use native UI widgets — it draws every pixel itself on a canvas the OS provides. That's why Flutter UIs look identical across platforms and OS versions."]),
    table(["Thread", "Role"], [["Platform", "OS msgs, plugins"], ["UI (Dart)", "Build/layout/paint"], ["Raster", "GPU rasterize"], ["IO", "Asset/image decode"]], [2200, 6960]),
  ],
  summary: ["Engine (C++) hosts Dart VM + graphics + text.", "Flutter draws its own pixels (no native widgets).", "The embedder hosts the engine per platform.", "Threads: platform, UI, raster, IO."],
  interview: ["What does the engine provide?", "Flutter vs React Native at render level?", "What is the embedder?", "Engine threads and roles?", "How does one codebase target many platforms?"],
  coding: [
    { level: "Easy", text: "Diagram engine/framework/embedder layers." },
    { level: "Medium", text: "Map frame phases to threads." },
    { level: "Hard", text: "Trace setState() to pixels." },
    { level: "Expert", text: "Write up a custom embedder for an embedded target." }],
  realworld: ["Flutter on cars, kiosks and smart displays works because the engine is portable C++ with a thin platform embedder."],
  miniproject: ["Write a deep-dive doc tracing a button tap from gesture → setState → frame → pixels, naming each layer/thread."],
  advanced: ["Custom embedders, the engine's C++ shell, platform views (hybrid composition)."],
}));

// 15 Impeller
body.push(...chapter({
  id: "ch15", title: "15. Impeller",
  def: "Impeller is Flutter's modern rendering engine replacing the Skia-based renderer, designed to eliminate 'shader compilation jank' by precompiling shaders at build time.",
  blocks: [
    table(["", "Skia (old)", "Impeller"], [
      ["Shaders", "Compiled at runtime (jank)", "Precompiled at build"],
      ["Backend", "GL/Metal/Vulkan via Skia", "Metal (iOS), Vulkan (Android)"]], [1700, 3830, 3830]),
    callout("interview", ["The old problem: Skia compiled shaders the first time an effect appeared, causing a one-time stutter. Impeller precompiles a fixed shader set ahead of time, so first-run animations are smooth."]),
  ],
  summary: ["Impeller fixes shader compilation jank.", "Shaders precompiled at build, not runtime.", "Metal on iOS, Vulkan on Android.", "Default on iOS; rolling out on Android."],
  interview: ["What is Impeller and why created?", "What is shader jank?", "Impeller vs Skia?", "Which backends?", "Platform status?"],
  coding: [
    { level: "Easy", text: "Explain shader jank and Impeller's fix." },
    { level: "Medium", text: "Compare first-run smoothness with Impeller on/off." },
    { level: "Hard", text: "Profile a complex animation on each renderer." },
    { level: "Expert", text: "Adapt a custom shader that differs on Impeller." }],
  realworld: ["Teams that battled first-run jank with SkSL warm-up scripts now get it for free with Impeller — a major DX/UX win."],
  miniproject: ["Build an animation-heavy screen and document first-run smoothness across renderers."],
  advanced: ["Impeller's tessellation, FragmentProgram support, platform rollout caveats."],
}));

// 16 FFI
body.push(...chapter({
  id: "ch16", title: "16. FFI (Foreign Function Interface)",
  def: "dart:ffi lets Dart call C functions and use C structures directly — no serialization — ideal for existing C/C++/Rust libraries (crypto, codecs, ML, SQLite).",
  blocks: [
    code(["final lib = DynamicLibrary.open('libnative.so');",
      "final add = lib.lookupFunction<Int32 Function(Int32,Int32),",
      "  int Function(int,int)>('add');"], "dart"),
    callout("interview", ["Use FFI to call C libraries or move lots of data cheaply; use platform channels for platform services in Kotlin/Swift. FFI is synchronous, so still offload heavy work to an isolate."]),
    callout("mistake", ["Leaking native memory — malloc'd memory must be freed; mismatched struct layouts crash. Use ffigen to generate bindings."]),
  ],
  summary: ["FFI calls C ABI libraries directly, no serialization.", "FFI = C libs; channels = platform code.", "FFI is synchronous — offload heavy work.", "Manage native memory; use ffigen."],
  interview: ["What is dart:ffi and when use it?", "FFI vs channels?", "Manage native memory?", "Is FFI sync? Avoid blocking?", "What is ffigen?"],
  coding: [
    { level: "Easy", text: "Call C add(int,int) from a shared lib." },
    { level: "Medium", text: "Pass/read a C struct, freeing memory." },
    { level: "Hard", text: "Generate bindings with ffigen." },
    { level: "Expert", text: "Wrap a Rust function and run it off-isolate." }],
  realworld: ["High-performance packages (sqlite3, image codecs, crypto) use FFI to reuse battle-tested C libraries instead of reimplementing in Dart."],
  miniproject: ["Bind a small C math/crypto library and expose a safe typed Dart API over it."],
  advanced: ["NativeFinalizer for cleanup, isolates + FFI callbacks, ffigen + native assets."],
}));

// 17 Packages
body.push(...chapter({
  id: "ch17", title: "17. Package Development",
  def: "A package is reusable code on pub.dev. A pure Dart package has no platform code; a plugin adds native (channel or FFI) implementations per platform.",
  blocks: [
    table(["Type", "Contains", "Example"], [
      ["Dart package", "Pure Dart", "intl, collection"],
      ["Plugin (federated)", "Dart + native per platform", "camera, geolocator"],
      ["FFI plugin", "Dart + C/C++", "sqlite3"]], [2100, 3500, 3760]),
    callout("interview", ["Modern plugins are 'federated': a platform-interface package defines the contract and each platform provides its own implementation, so third parties can add support without touching the core."]),
  ],
  summary: ["Package = pure Dart; plugin = + native.", "Federated = interface + per-platform impls.", "Use semantic versioning (MAJOR breaks).", "Ship example, tests, docs for adoption."],
  interview: ["Package vs plugin vs FFI plugin?", "What is a federated plugin?", "How version and publish?", "Design a good public API?", "What earns pub.dev points?"],
  coding: [
    { level: "Easy", text: "Pure Dart package with a tested utility." },
    { level: "Medium", text: "Plugin exposing one native method." },
    { level: "Hard", text: "Make it federated with platform interface." },
    { level: "Expert", text: "Publish to pub.dev with example, tests, CI." }],
  realworld: ["Companies extract shared widgets/clients into internal packages so many apps reuse one tested implementation."],
  miniproject: ["Extract a reusable component from an app into a published (or local) package with tests and an example app."],
  advanced: ["Melos monorepos, platform-interface design, native assets, pub scoring."],
}));

// Revision
body.push(H1("Volume 4 Revision Cheat Sheet", "cheat"));
body.push(H2("The three trees"));
body.push(callout("note", ["Widget = immutable config (rebuilt often). Element = living instance + State (reused when runtimeType+key match). RenderObject = layout/paint/hit-test. BuildContext IS the Element."]));
body.push(H2("A frame"));
body.push(callout("perf", ["vsync → Build → Layout (constraints down, sizes up) → Paint (record layers) → Composite → Rasterize (GPU). UI thread vs raster thread. ~16ms budget; jank = overrun."]));
body.push(H2("Engine stack"));
body.push(callout("best", ["App → Framework (Dart widgets) → Engine (C++: Dart VM + Impeller/Skia + text) → Embedder → OS. Flutter draws every pixel itself. Impeller precompiles shaders to kill first-run jank."]));
body.push(rule(C.blue));
body.push(P([{ t: "End of Volume 4. ", b: true, color: C.navy }, "Next: Volume 5 — State Management (Provider, BLoC, Cubit, Riverpod, GetX, Redux, MobX compared)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 4 — Flutter & Dart"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-4-Flutter.docx");
save(doc, out).then(() => console.log("WROTE", out));
