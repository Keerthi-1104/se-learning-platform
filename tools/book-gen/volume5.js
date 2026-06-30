// VOLUME 5 — State Management
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.purple, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.purple, space: 8 } },
      children: [new TextRun({ text: "VOLUME 5", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "State Management in Flutter", size: 32, color: C.purple, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Provider · BLoC · Cubit · Riverpod · GetX · Redux · MobX", size: 22, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Compared head-to-head, with best practices and when to use which", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 5", "intro"));
body.push(P([{ t: "'Which state management do you use?' ", b: true }, "is one of the most common Flutter interview questions — and the wrong answer is naming one and calling it 'the best'. This volume teaches all seven major approaches and, crucially, when to use each, so you can reason about fit instead of reciting dogma."]));
body.push(callout("note", [["Each chapter ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["The split that frames everything: ephemeral (local) state belongs in setState; shared/app state belongs in a state-management solution. Always separate logic from UI and rebuild only what changed — that's true for every tool below."]));

// 1 Provider
body.push(...chapter({
  id: "ch1", title: "1. Provider",
  def: "Provider is a lightweight wrapper around InheritedWidget that simplifies dependency injection and state propagation, rebuilding listeners when the provided value changes.",
  blocks: [
    code(["class Counter extends ChangeNotifier {",
      "  int value = 0; void inc(){ value++; notifyListeners(); }",
      "}",
      "context.watch<Counter>().value;  // rebuilds",
      "context.read<Counter>().inc();   // no rebuild"], "dart"),
    table(["API", "Rebuilds?", "Use"], [
      ["watch / Consumer", "Yes", "Read + rebuild"],
      ["read", "No", "Callbacks / one-off"],
      ["Selector", "Only on selected change", "Granular rebuilds"]], [2600, 2400, 4360]),
    callout("mistake", ["watch in callbacks (rebuild loops) or a Consumer around a huge subtree. Use read() in callbacks and Selector for granular rebuilds."]),
  ],
  summary: ["Provider wraps InheritedWidget for DI + state.", "watch rebuilds; read is one-off; Selector is granular.", "Great for small/medium apps; official baseline.", "Riverpod is its compile-safe successor."],
  interview: ["What is Provider built on?", "watch vs read vs Selector?", "How does it avoid prop drilling?", "When does a Consumer rebuild?", "Provider vs Riverpod?"],
  coding: [
    { level: "Easy", text: "Counter with ChangeNotifier + Provider." },
    { level: "Medium", text: "Selector to rebuild one label of many." },
    { level: "Hard", text: "ProxyProvider dependency between providers." },
    { level: "Expert", text: "Profile and remove over-rebuilds in a Provider list." }],
  realworld: ["Many production apps start with Provider for shared state like theme, auth and cart — simple and officially supported."],
  miniproject: ["Build a shopping cart with Provider: add/remove items, a badge count, and a total that rebuilds granularly."],
  advanced: ["MultiProvider composition, ProxyProvider, Provider vs InheritedModel."],
}));

// 2 BLoC
body.push(...chapter({
  id: "ch2", title: "2. BLoC",
  def: "BLoC (Business Logic Component) maps a stream of input events to a stream of output states, enforcing strict separation of UI and logic.",
  blocks: [
    code(["class CounterBloc extends Bloc<CounterEvent,int> {",
      "  CounterBloc() : super(0) { on<Increment>((e,emit)=>emit(state+1)); }",
      "}",
      "BlocBuilder<CounterBloc,int>(builder:(c,s)=>Text('$s'));"], "dart"),
    table(["Widget", "Purpose"], [
      ["BlocProvider", "Create/provide a bloc"],
      ["BlocBuilder", "Rebuild on state"],
      ["BlocListener", "Side effects (snackbar/nav)"],
      ["BlocConsumer", "Builder + Listener"]], [3000, 6160]),
    callout("interview", ["BLoC's strength is explicitness + testability: every transition is an event handler unit-testable with bloc_test, and unidirectional event→state flow makes complex flows predictable and observable."]),
  ],
  summary: ["BLoC maps events → immutable states (streams).", "UI: BlocProvider/Builder/Listener/Consumer.", "Highly testable; great for large, event-driven teams.", "More boilerplate — Cubit is the lighter sibling."],
  interview: ["Explain the BLoC data flow.", "Builder vs Listener vs Consumer?", "Why immutable states?", "How do you test a BLoC?", "BLoC vs Cubit?"],
  coding: [
    { level: "Easy", text: "Counter BLoC with Increment/Decrement." },
    { level: "Medium", text: "Network request with loading/success/error states." },
    { level: "Hard", text: "Search BLoC with debounce + cancellation transformers." },
    { level: "Expert", text: "Full bloc_test coverage of a complex BLoC." }],
  realworld: ["Large team apps (banking, enterprise) favor BLoC because its explicit, observable transitions are auditable and easy to onboard onto."],
  miniproject: ["Build a weather app: a BLoC fetching by city with loading/error/data states and a retry."],
  advanced: ["Event transformers (concurrent/sequential/restartable), HydratedBloc persistence, bloc observer."],
}));

// 3 Cubit
body.push(...chapter({
  id: "ch3", title: "3. Cubit",
  def: "A Cubit is a lighter BLoC from the same package: you call methods that emit states directly (no events), with the same immutability and testability.",
  blocks: [
    code(["class CounterCubit extends Cubit<int> {",
      "  CounterCubit():super(0);",
      "  void increment()=>emit(state+1);",
      "}"], "dart"),
    table(["", "Cubit", "BLoC"], [
      ["Trigger", "Method calls", "Events"],
      ["Boilerplate", "Less", "More"],
      ["Best for", "Simple/medium state", "Complex event flows"]], [1700, 3830, 3830]),
    callout("interview", ["Use Cubit by default; switch to BLoC when you need the explicit event trail (auditing) or transformers (debounce/throttle/concurrency). They share widgets and tests, so migration is easy."]),
  ],
  summary: ["Cubit emits states from method calls.", "Less boilerplate than BLoC, same model.", "Shares widgets/tests with BLoC.", "Upgrade to BLoC for event trails/transformers."],
  interview: ["Cubit vs BLoC?", "When prefer BLoC?", "How do you test a Cubit?", "Can you migrate Cubit → BLoC?", "Why immutable states?"],
  coding: [
    { level: "Easy", text: "Counter Cubit." },
    { level: "Medium", text: "Settings/toggle screen Cubit." },
    { level: "Hard", text: "Convert a Cubit to BLoC, keep tests green." },
    { level: "Expert", text: "Paginated list Cubit (load-more + error)." }],
  realworld: ["Teams often build most features as Cubits and reserve full BLoCs for the few flows that truly need event semantics."],
  miniproject: ["Build a paginated infinite-scroll list with a Cubit (initial/loading/loaded/error/loadingMore)."],
  advanced: ["Cubit + freezed states, HydratedCubit, equatable for state equality."],
}));

// 4 Riverpod
body.push(...chapter({
  id: "ch4", title: "4. Riverpod",
  def: "Riverpod is a compile-safe reactive state + DI framework (by Provider's author) that removes Provider's limits: no BuildContext needed, multiple same-type providers, and easy testing.",
  blocks: [
    code(["final counter = StateProvider<int>((ref)=>0);",
      "ref.watch(counter);            // subscribe",
      "ref.read(counter.notifier).state++;",
      "final user = FutureProvider((ref)=>api.getUser()); // AsyncValue"], "dart"),
    table(["Provider type", "Use"], [
      ["Provider", "Value/service"],
      ["StateProvider", "Simple mutable state"],
      ["NotifierProvider", "Complex state + logic"],
      ["FutureProvider/StreamProvider", "Async (loading/error/data)"]], [3600, 5560]),
    callout("interview", ["Riverpod's wins over Provider: no BuildContext to read state, multiple providers of the same type, compile-time safety (no runtime ProviderNotFound), trivial test overrides, and AsyncValue.when() for async UI."]),
  ],
  summary: ["Compile-safe DI + reactive state, no BuildContext needed.", "Provider/State/Notifier/Future/Stream types.", "AsyncValue models loading/error/data.", "autoDispose + codegen reduce boilerplate/leaks."],
  interview: ["How does Riverpod improve on Provider?", "Main provider types?", "What is AsyncValue?", "watch vs read vs listen?", "How does autoDispose help?"],
  coding: [
    { level: "Easy", text: "Counter with StateProvider." },
    { level: "Medium", text: "FutureProvider + AsyncValue.when()." },
    { level: "Hard", text: "NotifierProvider with complex state + actions." },
    { level: "Expert", text: "Override providers with fakes in widget tests." }],
  realworld: ["Riverpod is the default choice for many new production apps (and is used in this very learning platform) thanks to compile-time safety and testability."],
  miniproject: ["Build a paginated search app with Riverpod: a NotifierProvider + FutureProvider, AsyncValue UI, and provider overrides in tests."],
  advanced: ["@riverpod codegen, family + autoDispose, ref.listen for side effects, keepAlive."],
}));

// 5 GetX
body.push(...chapter({
  id: "ch5", title: "5. GetX",
  def: "GetX is an all-in-one package combining state management, dependency injection and routing with minimal boilerplate; reactive .obs state + Obx auto-rebuild.",
  blocks: [
    code(["class C extends GetxController { var count = 0.obs; void inc()=>count++; }",
      "final c = Get.put(C());",
      "Obx(()=>Text('${c.count}'));",
      "Get.to(NextPage());  // no context"], "dart"),
    callout("interview", ["GetX's appeal is velocity — reactive state, DI and navigation without BuildContext in very little code. Its criticism: it encourages global singletons/tight coupling and hidden 'magic', which hurts testability and clarity at scale."]),
  ],
  summary: ["GetX bundles state + DI + routing.", ".obs + Obx give reactive rebuilds.", "Fast to write; navigation without context.", "Risks global coupling/testability at scale."],
  interview: ["What does GetX combine?", "How does reactive GetX work?", "Criticisms of GetX?", "When is GetX a good fit?", "GetX vs Riverpod/BLoC?"],
  coding: [
    { level: "Easy", text: "Reactive counter with GetxController + Obx." },
    { level: "Medium", text: "Routing + DI across two screens." },
    { level: "Hard", text: "Refactor GetX app for explicit, testable injection." },
    { level: "Expert", text: "Compare a feature in GetX vs Riverpod; discuss trade-offs." }],
  realworld: ["GetX is popular for rapid MVPs and solo projects where development speed outweighs long-term architectural concerns."],
  miniproject: ["Build a small notes app entirely in GetX (state + routes + DI), then list what you'd change for a large team."],
  advanced: ["GetX bindings & lazyPut, workers (ever/debounce), why some teams avoid GetX in large codebases."],
}));

// 6 Redux
body.push(...chapter({
  id: "ch6", title: "6. Redux",
  def: "Redux is a predictable state container with a single immutable store: the UI dispatches actions, pure reducers compute the next state, and the UI rebuilds from it.",
  blocks: [
    code(["int reducer(int state, action) => action is Increment ? state+1 : state;",
      "final store = Store<int>(reducer, initialState: 0);",
      "store.dispatch(Increment());"], "dart"),
    table(["Piece", "Role"], [
      ["Store", "Single state tree"],
      ["Action", "Describes what happened"],
      ["Reducer", "Pure (state,action)→state"],
      ["Middleware", "Side effects (async/logging)"]], [2600, 6560]),
    callout("interview", ["Redux's three principles: single source of truth, read-only state (change only via actions), changes by pure reducers. This makes state predictable, traceable, and time-travel-debuggable."]),
  ],
  summary: ["Single immutable store; actions → pure reducers → state.", "Reducers must be pure; side effects in middleware.", "Most ceremony of all approaches.", "Best for very large, auditable state."],
  interview: ["Explain the Redux flow.", "The three Redux principles?", "Why must reducers be pure?", "Where do side effects go?", "When is Redux worth it?"],
  coding: [
    { level: "Easy", text: "Counter store + action + reducer." },
    { level: "Medium", text: "Async loading via thunk middleware." },
    { level: "Hard", text: "Combine reducers for a multi-feature tree." },
    { level: "Expert", text: "Time-travel debugging by replaying actions." }],
  realworld: ["Teams migrating from React/Redux web apps sometimes use Redux in Flutter to keep one mental model across platforms."],
  miniproject: ["Build a todo app with flutter_redux: actions, combined reducers, and thunk for persistence."],
  advanced: ["Redux middleware (thunk/epics), reselect-style memoized selectors, devtools time travel."],
}));

// 7 MobX
body.push(...chapter({
  id: "ch7", title: "7. MobX",
  def: "MobX is a reactive library built on observables (tracked state), actions (mutations) and reactions (auto-run on change), with transparent dependency tracking.",
  blocks: [
    code(["@observable int count = 0;",
      "@action void increment() => count++;",
      "Observer(builder: (_) => Text('$count'));  // auto-tracks count"], "dart"),
    callout("interview", ["MobX's magic is transparent reactive tracking: an Observer rebuilds when any observable it READ during build changes — no manual listeners. Low boilerplate, but it relies on build_runner codegen."]),
  ],
  summary: ["Observables + actions + reactions.", "Observer auto-rebuilds on read observables.", "Computed values are cached derivations.", "Low boilerplate but needs codegen."],
  interview: ["MobX core concepts?", "How does transparent tracking work?", "What is a computed?", "Why mutate only in actions?", "MobX vs BLoC/Riverpod?"],
  coding: [
    { level: "Easy", text: "Counter with observable/action/Observer." },
    { level: "Medium", text: "Add a @computed derived value." },
    { level: "Hard", text: "Async loading with ObservableFuture." },
    { level: "Expert", text: "Use a reaction to persist on change." }],
  realworld: ["Developers from the JS/MobX or Vue world adopt MobX.dart for its familiar transparent reactivity."],
  miniproject: ["Build a cart with MobX: observable items, computed total, and a reaction that saves to storage."],
  advanced: ["Reactions (autorun/when/reaction), strict mode, store composition."],
}));

// 8 Comparison
body.push(...chapter({
  id: "ch8", title: "8. Comparison & Best Practices",
  def: "There is no universally best state manager — only the best fit for your app size, team and complexity. The goal is always: separate UI from logic, rebuild granularly, keep state testable.",
  blocks: [
    table(["Approach", "Boilerplate", "Testability", "Best for"], [
      ["setState", "None", "Low", "Local widget state"],
      ["Provider", "Low", "Medium", "Small/medium shared"],
      ["Riverpod", "Low-Med", "High", "Most apps; compile-safe"],
      ["BLoC/Cubit", "Medium", "High", "Large event-driven teams"],
      ["GetX", "Very low", "Low-Med", "Prototypes/small"],
      ["Redux", "High", "High", "Very large/auditable"],
      ["MobX", "Low (codegen)", "Medium", "Reactive-tracking fans"]], [2100, 1900, 2000, 3360]),
    callout("interview", ["Strong answer to 'which one?': 'It depends — setState for local UI; Riverpod or BLoC for most production apps; I avoid one-size-fits-all and always separate logic from UI and rebuild granularly regardless of the tool.'"]),
    callout("best", ["Universal rules: logic out of widgets; immutable state; rebuild only what changed; model async as loading/error/data; make state unit-testable without the widget tree."]),
  ],
  summary: ["No universal winner — match the tool to the app.", "Riverpod/BLoC are the safe production defaults.", "GetX for speed; Redux for very large auditable state.", "Universal best practices beat tool choice."],
  interview: ["Which do you prefer and why?", "How do you choose for a new app?", "Compare BLoC, Riverpod, Provider.", "Best practices across ALL approaches?", "Can you mix approaches?"],
  coding: [
    { level: "Easy", text: "Pick approaches for 3 scenarios with justification." },
    { level: "Medium", text: "Same feature in Provider and Riverpod; compare." },
    { level: "Hard", text: "One feature in BLoC and Redux; compare." },
    { level: "Expert", text: "Write a team decision guide mapping app traits → approach." }],
  realworld: ["Mature apps mix: setState for trivial local bits, Riverpod/BLoC for shared domain state. Consistency within a feature matters more than a single global winner."],
  miniproject: ["Build one app (a todo or notes feature) implemented three ways — Provider, Riverpod, BLoC — and write a comparison memo."],
  advanced: ["Server-state libraries (e.g. query caching), state restoration, performance profiling of rebuilds across approaches."],
}));

// Revision
body.push(H1("Volume 5 Revision Cheat Sheet", "cheat"));
body.push(H2("Pick by fit"));
body.push(callout("note", ["Local UI → setState. Small/medium shared → Provider. Most production apps → Riverpod or BLoC. Prototype fast → GetX. Very large auditable → Redux. Transparent reactivity → MobX."]));
body.push(H2("Universal rules"));
body.push(callout("best", ["Separate logic from UI. Immutable state. Rebuild only what changed (Selector/select/Consumer/Builder). Model async as loading/error/data. Keep logic unit-testable without widgets."]));
body.push(H2("Interview soundbite"));
body.push(callout("interview", ["'There's no single best — it depends on app size, team and complexity. I default to Riverpod/BLoC for production for testability and scalability, and always separate logic from UI.'"]));
body.push(rule(C.purple));
body.push(P([{ t: "End of Volume 5. ", b: true, color: C.navy }, "Next: Volume 6 — Mobile Architecture (Clean Architecture, MVVM, Repository, DI, offline-first, SDUI)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 5 — State Management"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "Volume-5-State-Management.docx");
save(doc, out).then(() => console.log("WROTE", out));
