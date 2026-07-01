// VOLUME 2 — Java (Java 8 to Latest LTS)
const L = require("./lib");
// Bridge that reads the same topic JSON the Flutter app uses.
const { loadTopic, topicToChapter } = require("./topic_to_chapter");
const {
  C, P, H1, H2, H3, bullet, num, callout, code, table, rule, chip,
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
      children: [new TextRun({ text: "VOLUME 2", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Java — Core to Modern (Java 8 → Latest LTS)", size: 30, color: C.amber, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "JVM · JDK · JRE · Memory · Garbage Collection · Multithreading", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Collections · Generics · Streams · Lambdas · Functional · Reflection", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Records · Sealed Classes · Pattern Matching · Virtual Threads", size: 20, color: C.grayText })] }),
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

// Intro
body.push(H1("How to Use Volume 2", "intro"));
body.push(P([{ t: "Java is the backbone of enterprise software ", b: true }, "and the most common interview language at MNCs (TCS, Infosys, Accenture) and product companies alike. This volume takes you from the JVM up to the newest LTS features (records, sealed classes, virtual threads), with the same 20-point teaching pattern and per-topic closers used in Volume 1."]));
body.push(callout("note", [["Each topic ends with: ", { t: "✅ Summary · 🎯 Interview Questions · 💻 Coding Problems · 🏭 Real-world Example · 🛠 Mini Project · 🚀 Advanced Notes.", b: true }]]));
body.push(callout("interview", ["A huge fraction of Java interviews are 'which version added X?' and 'how does HashMap/GC/the JVM work internally?'. This volume drills exactly those."]));

// 1. Core Java
body.push(...topicToChapter(loadTopic("level_02", "core"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

body.push(...topicToChapter(loadTopic("level_02", "collections"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

body.push(...topicToChapter(loadTopic("level_02", "exceptions"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

body.push(...topicToChapter(loadTopic("level_02", "generics"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

body.push(...topicToChapter(loadTopic("level_02", "multithreading"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

body.push(...topicToChapter(loadTopic("level_02", "jvm"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

body.push(...topicToChapter(loadTopic("level_02", "gc"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

body.push(H1("8. Streams API", "ch8"));
body.push(callout("definition", ["The Streams API (Java 8) processes sequences of elements declaratively through a pipeline — filter, map, reduce — instead of explicit loops."]));
body.push(code([
  "List<String> names = people.stream()",
  "    .filter(p -> p.age() >= 18)     // intermediate (lazy)",
  "    .map(Person::name)              // intermediate (lazy)",
  "    .sorted()",
  "    .collect(Collectors.toList());  // terminal (runs the pipeline)",
], "stream pipeline"));
body.push(callout("interview", ["Streams are lazy: intermediate ops don't run until a terminal op is called, enabling operation fusion and short-circuiting (findFirst stops at the first match)."]));
body.push(callout("mistake", ["Reusing a consumed stream (IllegalStateException), or reaching for parallelStream() blindly — it adds overhead and breaks on shared mutable state; it rarely helps small or I/O-bound work."]));
body.push(...summary([
  "Pipelines = source → intermediate (lazy) → terminal (eager).",
  "Laziness enables fusion + short-circuiting.",
  "Collectors aggregate (toList, groupingBy, joining).",
  "Parallel streams only help CPU-bound work on large data.",
]));
body.push(...interview([
  "Intermediate vs terminal operations?",
  "Why are streams lazy?",
  "map vs flatMap?",
  "When NOT to use parallel streams?",
  "reduce vs collect?",
]));
body.push(...coding([
  { level: "Easy", text: "Sum even numbers with a stream." },
  { level: "Medium", text: "Group people by department with groupingBy." },
  { level: "Hard", text: "Top-3 by frequency using streams." },
  { level: "Expert", text: "Write a custom Collector and benchmark parallel vs sequential." },
]));
body.push(...realworld(["Data transformation pipelines (ETL, report generation, request mapping) read far clearer as streams than nested loops, and compose naturally."]));
body.push(...miniproject(["Build a CSV analytics tool: load rows, then answer aggregate questions (group, average, top-N) entirely with streams + collectors."]));
body.push(...advanced(["Spliterators & custom sources, teeing collector, primitive streams (IntStream) to avoid boxing."]));

// 9. Lambdas & Functional
body.push(H1("9. Lambdas & Functional Programming", "ch9"));
body.push(callout("definition", ["A lambda is an anonymous function implementing a functional interface (one abstract method). Functional programming favors pure functions, immutability and functions as values."]));
body.push(code([
  "Runnable r = () -> System.out.println(\"hi\");",
  "Comparator<String> byLen = (a, b) -> a.length() - b.length();",
  "list.forEach(System.out::println);   // method reference",
  "Optional<User> u = repo.findById(id);",
  "String name = u.map(User::name).orElse(\"guest\");",
], "lambdas & optional"));
body.push(table(["Interface", "Signature", "Use"], [
  ["Function<T,R>", "R apply(T)", "Transform"],
  ["Predicate<T>", "boolean test(T)", "Filter"],
  ["Consumer<T>", "void accept(T)", "Side effect"],
  ["Supplier<T>", "T get()", "Produce"],
], [2400, 3000, 3960]));
body.push(callout("mistake", ["Calling Optional.get() without checking — it throws and recreates the NPE you avoided. Use map/filter/orElse. Don't use Optional for fields or parameters."]));
body.push(...summary([
  "Lambdas target single-method functional interfaces.",
  "Function/Predicate/Consumer/Supplier are the core SAM types.",
  "Pure functions + immutability simplify testing and concurrency.",
  "Optional models maybe-absent return values, not nulls everywhere.",
]));
body.push(...interview([
  "What is a functional interface?",
  "Lambda vs anonymous class (including this)?",
  "What does 'effectively final' mean?",
  "How does Optional improve on null?",
  "What is a higher-order function?",
]));
body.push(...coding([
  { level: "Easy", text: "Sort strings by length with a lambda comparator." },
  { level: "Medium", text: "Compose Functions with andThen/compose." },
  { level: "Hard", text: "Refactor a null-check chain to Optional.map/orElse." },
  { level: "Expert", text: "Implement memoization for a pure expensive function." },
]));
body.push(...realworld(["Modern Java codebases lean functional: streams + lambdas + Optional replace loops and null checks, making intent obvious and reducing bugs."]));
body.push(...miniproject(["Build a tiny rules engine where each rule is a Predicate and actions are Consumers, composed at runtime."]));
body.push(...advanced(["Closures & capture semantics, currying/partial application, the cost of megamorphic lambda call sites."]));

// 10. Reflection
body.push(H1("10. Reflection", "ch10"));
body.push(callout("definition", ["Reflection inspects and manipulates classes, methods and fields at runtime — even private ones — without compile-time knowledge of them."]));
body.push(code([
  "Class<?> c = Class.forName(\"com.app.User\");",
  "Object u = c.getDeclaredConstructor().newInstance();",
  "Method m = c.getMethod(\"setName\", String.class);",
  "m.invoke(u, \"Ada\");",
], "reflection"));
body.push(callout("interview", ["Reflection + annotations power frameworks: Spring (@Autowired/@Component), JUnit (@Test discovery), Jackson (JSON mapping), Hibernate (ORM). Understanding it demystifies framework 'magic'."]));
body.push(callout("mistake", ["Reaching for reflection in ordinary app code — it's slower, loses compile-time safety, breaks encapsulation, and can fail under the module system. Prefer interfaces and direct calls."]));
body.push(...summary([
  "Reflection enables runtime inspection/invocation, including private members.",
  "It underpins DI, testing, serialization and ORM frameworks.",
  "It costs performance and compile-time safety.",
  "Cache lookups or use MethodHandles in hot paths.",
]));
body.push(...interview([
  "What is reflection and when is it used?",
  "How do Spring/JUnit use it?",
  "Downsides of reflection?",
  "What does setAccessible(true) do, and the risk?",
  "Reflection vs MethodHandles?",
]));
body.push(...coding([
  { level: "Easy", text: "Print all methods and fields of a class." },
  { level: "Medium", text: "Instantiate by name and invoke a setter reflectively." },
  { level: "Hard", text: "Build a tiny @Inject dependency injector." },
  { level: "Expert", text: "Write a mini JSON serializer using field reflection." },
]));
body.push(...realworld(["When you write @Autowired or @Test, reflection is what wires and discovers it at runtime — every Java framework relies on it."]));
body.push(...miniproject(["Build a minimal annotation-driven DI container that scans for @Component and injects @Inject fields."]));
body.push(...advanced(["MethodHandles & VarHandles, the module system's effect on deep reflection, annotation processing (compile-time vs runtime)."]));

// 11. Records
body.push(H1("11. Records (Java 16+)", "ch11"));
body.push(callout("definition", ["A record is a concise, immutable data carrier. The compiler generates the constructor, private final fields, accessors, equals, hashCode and toString."]));
body.push(code([
  "record Point(int x, int y) {}   // full data class in one line",
  "record Range(int lo, int hi) {",
  "  Range { if (lo > hi) throw new IllegalArgumentException(\"lo>hi\"); }",
  "}",
], "records"));
body.push(callout("tip", ["Records pair beautifully with sealed types and pattern matching to form algebraic data types — closed, exhaustively-checkable data models."]));
body.push(...summary([
  "Records remove data-class boilerplate.",
  "They are final and immutable with value semantics.",
  "Compact constructors add validation.",
  "Great for DTOs, map keys and value objects.",
]));
body.push(...interview([
  "What does a record generate?",
  "Can records be extended or mutated?",
  "Record vs Lombok @Data vs a plain class?",
  "How do you validate record inputs?",
  "Why are records ideal as map keys?",
]));
body.push(...coding([
  { level: "Easy", text: "Replace a boilerplate DTO with a record." },
  { level: "Medium", text: "Add validation via a compact constructor." },
  { level: "Hard", text: "Use a record as a HashMap key." },
  { level: "Expert", text: "Model an expression tree with sealed interface + record nodes." },
]));
body.push(...realworld(["APIs and event payloads are increasingly modeled as records — immutable, self-documenting, and safe to share across threads."]));
body.push(...miniproject(["Model a small domain (Order, LineItem, Money) entirely with records and write value-based tests."]));
body.push(...advanced(["Record patterns for deconstruction, serialization of records, local records inside methods."]));

// 12. Sealed + Pattern Matching
body.push(H1("12. Sealed Classes & Pattern Matching (Java 17–21)", "ch12"));
body.push(callout("definition", ["A sealed type lists exactly which classes may extend it. Pattern matching tests a value's shape and binds its parts in one step (instanceof, switch, record deconstruction)."]));
body.push(code([
  "sealed interface Shape permits Circle, Square {}",
  "record Circle(double r) implements Shape {}",
  "record Square(double s) implements Shape {}",
  "",
  "double area(Shape sh) => switch (sh) {        // exhaustive, no default",
  "  case Circle(double r) -> Math.PI * r * r;   // record deconstruction",
  "  case Square(double s) -> s * s;",
  "};",
], "sealed + pattern matching"));
body.push(callout("interview", ["Sealed + records + pattern matching give Java algebraic data types: a fixed set of cases the compiler checks exhaustively, eliminating the 'forgot a case' bug and the visitor-pattern boilerplate."]));
body.push(callout("note", ["instanceof pattern: 'if (o instanceof String s)' tests and binds s in one step. Guards ('case Circle c when c.r() > 10') refine a case."]));
body.push(...summary([
  "Sealed types close a hierarchy via a permits list.",
  "Permitted subtypes are final, sealed, or non-sealed.",
  "Pattern matching removes instanceof-and-cast and visitor boilerplate.",
  "Sealed + switch = exhaustive, no default needed.",
]));
body.push(...interview([
  "What are sealed classes and why use them?",
  "How do sealed types enable exhaustive switches?",
  "What is pattern matching for instanceof?",
  "What are record patterns / deconstruction?",
  "Sealed types vs enums?",
]));
body.push(...coding([
  { level: "Easy", text: "Rewrite an instanceof-and-cast chain with pattern matching." },
  { level: "Medium", text: "Exhaustive switch over a sealed Shape with no default." },
  { level: "Hard", text: "Model Result = Success | Failure and handle both." },
  { level: "Expert", text: "Evaluate a nested AST with nested record patterns." },
]));
body.push(...realworld(["State machines, parsers and result types become compiler-checked and concise — a major readability win over enum+switch or visitor classes."]));
body.push(...miniproject(["Build a small calculator: a sealed Expr (Num, Add, Mul) evaluated with a pattern-matching switch."]));
body.push(...advanced(["Exhaustiveness & dominance rules, nested/var patterns, the future of deconstruction patterns."]));

// 13. Virtual Threads
body.push(...topicToChapter(loadTopic("level_02", "virtual_threads"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

body.push(H1("14. Java 8 → Latest LTS: Version Guide", "ch14"));
body.push(callout("definition", ["Since Java 9, a feature release ships every 6 months and a Long-Term Support (LTS) release every ~2–3 years (8, 11, 17, 21). Most teams target LTS versions."]));
body.push(table(["Version", "Year", "Headline features"], [
  ["8 (LTS)", "2014", "Lambdas, Streams, Optional, default methods"],
  ["11 (LTS)", "2018", "var in lambdas, HttpClient, run single file"],
  ["17 (LTS)", "2021", "Sealed classes, records (16), pattern switch (preview)"],
  ["21 (LTS)", "2023", "Virtual threads, record patterns, sequenced collections"],
], [1500, 1200, 6660]));
body.push(table(["Feature", "Introduced"], [
  ["Modules (JPMS)", "Java 9"],
  ["var (local inference)", "Java 10"],
  ["Switch expressions", "Java 14"],
  ["Text blocks", "Java 15"],
  ["Records", "Java 16"],
  ["Sealed classes", "Java 17"],
  ["Virtual threads", "Java 21"],
], [4680, 4680]));
body.push(callout("interview", ["Anchor the timeline: 8 = functional Java; 11 = first modern LTS; 17 = records/sealed; 21 = virtual threads. 'Which version added X?' is one of the most common Java screening questions."]));
body.push(callout("mistake", ["Migrating off Java 8 and tripping on removed Java EE/JAXB modules (gone in 11), internal sun.* APIs, and the module system. Run jdeps and upgrade dependencies first."]));
body.push(...summary([
  "LTS versions: 8, 11, 17, 21.",
  "8 = lambdas/streams; 17 = records/sealed; 21 = virtual threads.",
  "New features ship every 6 months; LTS every 2–3 years.",
  "Plan migrations with jdeps and dependency upgrades.",
]));
body.push(...interview([
  "Which Java versions are LTS and why does it matter?",
  "Key features of 8, 11, 17, 21?",
  "Challenges migrating off Java 8?",
  "What is the module system (JPMS)?",
  "Switch statement vs switch expression?",
]));
body.push(...coding([
  { level: "Easy", text: "Convert anonymous classes to lambdas across a Java 8 codebase." },
  { level: "Medium", text: "Adopt switch expressions and text blocks." },
  { level: "Hard", text: "Refactor a visitor design to records + sealed + pattern matching." },
  { level: "Expert", text: "Execute a Java 8 → 17 migration: jdeps, fix removed APIs, update build." },
]));
body.push(...realworld(["Teams budget real time to jump LTS versions (8 → 17 → 21); knowing what changed and what breaks is exactly what makes a migration smooth."]));
body.push(...miniproject(["Take a small Java 8 project and modernize it to 21: lambdas→records, switches→switch expressions, threads→virtual threads; document each change."]));
body.push(...advanced(["Preview features & --enable-preview, multi-release JARs, the 6-month release train and how to keep up."]));

// Revision
body.push(H1("Volume 2 Revision Cheat Sheet", "cheat"));
body.push(H2("Which version added what"));
body.push(callout("note", ["8: lambdas/streams/Optional · 9: modules · 10: var · 14: switch expr · 15: text blocks · 16: records · 17: sealed · 21: virtual threads."]));
body.push(H2("Internals in one breath"));
body.push(callout("perf", ["HashMap treeifies buckets >8 (O(log n)). Heap holds objects; stacks are per-thread. Generational GC collects the young gen cheaply; G1 is default. JIT compiles hot methods after warm-up."]));
body.push(H2("Concurrency rules"));
body.push(callout("best", ["volatile = visibility, not atomicity. Use atomics/locks for compound updates. Prefer executors & virtual threads. Avoid pinning. Establish happens-before."]));
body.push(rule(C.amber));
body.push(P([{ t: "End of Volume 2. ", b: true, color: C.navy }, "Next: Volume 3 — Android Development (lifecycle, Jetpack, Room, Hilt, Coroutines)."], { align: AlignmentType.CENTER }));

// Assemble
const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 2 — Java"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-2-Java.docx");
save(doc, out).then(() => console.log("WROTE", out));
