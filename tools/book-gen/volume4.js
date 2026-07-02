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

// 5. Widget Tree
body.push(...topicToChapter(loadTopic("level_04", "widget_tree"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// 6. Element Tree
body.push(...topicToChapter(loadTopic("level_04", "element_tree"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// 7. Render Tree
body.push(...topicToChapter(loadTopic("level_04", "render_tree"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. Rendering Pipeline
body.push(...topicToChapter(loadTopic("level_04", "rendering_pipeline"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// 9. Navigation
body.push(...topicToChapter(loadTopic("level_04", "navigation"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Forms
body.push(...topicToChapter(loadTopic("level_04", "forms"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. State Management
body.push(...topicToChapter(loadTopic("level_04", "state"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. Animations
body.push(...topicToChapter(loadTopic("level_04", "animations"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// 11 Slivers
body.push(...chapter({
  id: "ch13", title: "13. Slivers",
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
  id: "ch14", title: "14. CustomPainter",
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
  id: "ch15", title: "15. Platform Channels",
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
  id: "ch16", title: "16. Flutter Engine",
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
  id: "ch17", title: "17. Impeller",
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
  id: "ch18", title: "18. FFI (Foreign Function Interface)",
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
  id: "ch19", title: "19. Package Development",
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
