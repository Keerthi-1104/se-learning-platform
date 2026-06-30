// VOLUME 2 — Java (Java 8 to Latest LTS)
const L = require("./lib");
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
body.push(H1("1. Core Java — JVM, JDK, JRE", "ch1"));
body.push(callout("definition", ["Core Java is the language plus its runtime: the JVM executes bytecode, the JRE bundles the JVM with libraries to run apps, and the JDK adds the compiler and tools to build them."]));
body.push(H2("Write once, run anywhere"));
body.push(code([
  ".java  --(javac)-->  .class bytecode  --(JVM)-->  native execution",
  "JDK = JRE + javac + tools (build apps)",
  "JRE = JVM + standard libraries (run apps)",
  "JVM = the engine that runs bytecode on any OS",
], "java toolchain"));
body.push(callout("analogy", ["Bytecode is like sheet music: the same score (your .class files) plays on any instrument (any OS) as long as it has a musician who can read it (the JVM)."]));
body.push(H2("Primitives vs objects"));
body.push(table(["", "Primitive", "Object / reference"], [
  ["Examples", "int, double, boolean", "String, List, your classes"],
  ["Stored", "Value directly (stack)", "Reference to a heap object"],
  ["Default", "0 / false", "null"],
  ["Compared with", "==", "equals()"],
], [1700, 3830, 3830]));
body.push(callout("mistake", ["Comparing objects with ==. It compares references, not content: new String(\"a\") == new String(\"a\") is false. Use .equals() for value equality, and always override equals() and hashCode() together."]));
body.push(callout("note", ["Java is always pass-by-value. For objects the reference is copied by value — you can mutate the pointed-to object, but reassigning the parameter does not affect the caller."]));
body.push(...summary([
  "JVM runs bytecode; JRE = JVM + libs; JDK = JRE + compiler/tools.",
  "Primitives hold values; objects hold references to the heap.",
  "Use equals()/hashCode() for value equality, not ==.",
  "Java is pass-by-value (the reference value is copied for objects).",
]));
body.push(...interview([
  "Difference between JDK, JRE and JVM?",
  "Is Java pass-by-value or pass-by-reference?",
  "Explain the equals()/hashCode() contract.",
  "Why are Strings immutable, and what is the String pool?",
  "What lives on the stack vs the heap?",
]));
body.push(...coding([
  { level: "Easy", text: "Show == vs equals() differ for two new Strings with equal content." },
  { level: "Medium", text: "Write an immutable Money class with value-based equals/hashCode." },
  { level: "Hard", text: "Demonstrate pass-by-value by mutating vs reassigning an object parameter." },
  { level: "Expert", text: "Implement an immutable generic Pair<A,B> with correct equals/hashCode/toString." },
]));
body.push(...realworld(["Every Spring/Android backend starts here: value objects (DTOs), correct equality for map keys, and immutability for thread-safety. Getting equals/hashCode wrong silently breaks HashMap lookups in production."]));
body.push(...miniproject(["Build a small in-memory 'bank' with immutable Account value objects, demonstrating equality, the String pool, and pass-by-value with a transfer() method."]));
body.push(...advanced([
  "String interning and compact strings (Java 9+).",
  "Autoboxing pitfalls and the Integer cache (-128..127).",
  "Escape analysis letting the JIT stack-allocate short-lived objects.",
]));

// 2. Collections
body.push(H1("2. Java Collections Framework", "ch2"));
body.push(callout("definition", ["The Collections Framework is a unified set of interfaces (List, Set, Map, Queue) and implementations for storing and manipulating groups of objects efficiently."]));
body.push(table(["Type", "Impl", "Order", "Lookup"], [
  ["List", "ArrayList", "Insertion", "O(1) index"],
  ["List", "LinkedList", "Insertion", "O(n)"],
  ["Set", "HashSet", "None", "O(1)"],
  ["Set", "TreeSet", "Sorted", "O(log n)"],
  ["Map", "HashMap", "None", "O(1)"],
  ["Map", "TreeMap", "Sorted by key", "O(log n)"],
], [1300, 2700, 2700, 2660]));
body.push(H2("How HashMap works"));
body.push(code([
  "bucket = hash(key) & (capacity - 1)",
  "collision -> linked list, then a RED-BLACK TREE if a bucket > 8 (Java 8+)",
  "load factor 0.75 reached -> resize (double capacity) & rehash",
], "hashmap internals"));
body.push(callout("interview", ["Java 8 changed HashMap buckets from linked lists to red-black trees once a bucket passes 8 entries, improving worst-case lookup from O(n) to O(log n). This is a very common interview detail."]));
body.push(callout("mistake", ["Using a mutable object (or one without proper equals/hashCode) as a map key. If the key's hash changes after insertion, you can never find it again."]));
body.push(...summary([
  "Pick by workload: ArrayList for index access, HashMap for O(1) lookup.",
  "HashMap chains collisions and treeifies long buckets (Java 8+).",
  "TreeMap/TreeSet give sorted order at O(log n).",
  "Use ConcurrentHashMap (not Hashtable) for concurrency.",
]));
body.push(...interview([
  "ArrayList vs LinkedList — when use each?",
  "How does HashMap work internally? What changed in Java 8?",
  "HashMap vs Hashtable vs ConcurrentHashMap?",
  "Why must keys override equals and hashCode?",
  "Fail-fast vs fail-safe iterators?",
]));
body.push(...coding([
  { level: "Easy", text: "Count word frequencies with a HashMap." },
  { level: "Medium", text: "Build an LRU cache using LinkedHashMap accessOrder." },
  { level: "Hard", text: "Implement a custom key class and verify HashMap behavior." },
  { level: "Expert", text: "Benchmark ArrayList vs LinkedList vs ArrayDeque as a queue." },
]));
body.push(...realworld(["Caches, request de-duplication, and counting are everywhere; choosing HashMap vs TreeMap vs LinkedHashMap is a daily design decision in backend code."]));
body.push(...miniproject(["Build a 'leaderboard' service: a TreeMap for ranked scores + a HashMap for O(1) player lookup, supporting top-N queries."]));
body.push(...advanced([
  "ConcurrentHashMap's bucket-level striping and CAS.",
  "Immutable collections (List.of, Map.of) and defensive copies.",
  "CopyOnWriteArrayList for read-heavy concurrent lists.",
]));

// 3. Exceptions
body.push(H1("3. Exception Handling", "ch3"));
body.push(callout("definition", ["Exceptions are objects representing abnormal conditions. Throwable splits into Error (fatal — don't catch) and Exception, which splits into checked exceptions and unchecked RuntimeExceptions."]));
body.push(table(["", "Checked", "Unchecked"], [
  ["Base", "Exception (not Runtime)", "RuntimeException"],
  ["Compiler", "Must catch or declare", "Not enforced"],
  ["Examples", "IOException, SQLException", "NullPointer, IllegalArgument"],
  ["Means", "Recoverable / expected", "Programming bug"],
], [1500, 3930, 3930]));
body.push(code([
  "try (var in = new FileInputStream(\"f\")) {   // auto-closes",
  "    return in.read();",
  "} catch (IOException e) {",
  "    throw new AppException(\"read failed\", e);  // wrap, keep cause",
  "}",
], "try-with-resources"));
body.push(callout("mistake", ["Swallowing exceptions with an empty catch block hides real bugs. Never catch-and-ignore; never catch Throwable/Error; always preserve the cause when rethrowing."]));
body.push(...summary([
  "Checked = compiler-enforced, recoverable; unchecked = bugs.",
  "try-with-resources auto-closes AutoCloseable resources.",
  "Wrap-and-rethrow preserving the cause; fail fast.",
  "Catch specific exceptions; never swallow.",
]));
body.push(...interview([
  "Checked vs unchecked exceptions?",
  "What problem does try-with-resources solve?",
  "final vs finally vs finalize()?",
  "Why is catching and ignoring exceptions bad?",
  "How and when do you create custom exceptions?",
]));
body.push(...coding([
  { level: "Easy", text: "Create a custom checked and a custom unchecked exception." },
  { level: "Medium", text: "Refactor finally-close blocks to try-with-resources." },
  { level: "Hard", text: "Write a retry wrapper with backoff on specific exceptions." },
  { level: "Expert", text: "Demonstrate suppressed exceptions and read them." },
]));
body.push(...realworld(["Robust services wrap low-level exceptions (SQL, IO) into domain errors and map them to HTTP status codes — clean error contracts start with disciplined exception handling."]));
body.push(...miniproject(["Build a file-processing CLI that validates input, wraps IO errors into a domain AppException, retries transient failures, and exits with meaningful codes."]));
body.push(...advanced([
  "Exception chaining and suppressed exceptions.",
  "Why checked exceptions are debated (and avoided in many modern APIs).",
  "Result/Either types as an alternative to exceptions.",
]));

// 4. Generics
body.push(H1("4. Generics", "ch4"));
body.push(callout("definition", ["Generics parameterize types over other types, giving compile-time type safety and removing casts."]));
body.push(code([
  "class Box<T> { T value; T get() { return value; } }",
  "// PECS: Producer Extends, Consumer Super",
  "void copy(List<? extends Number> src, List<? super Number> dst) { ... }",
], "generics"));
body.push(callout("interview", ["PECS — Producer Extends, Consumer Super. Read from a ? extends T (producer); write to a ? super T (consumer)."]));
body.push(callout("note", ["Generics use type erasure: type parameters exist at compile time and are erased at runtime. So no new T(), no generic arrays, and no instanceof List<String>."]));
body.push(...summary([
  "Generics add compile-time type safety and remove casts.",
  "Bounded wildcards follow PECS.",
  "Type erasure removes generic info at runtime.",
  "Avoid raw types — they disable generic checks.",
]));
body.push(...interview([
  "What problem do generics solve?",
  "Explain PECS with an example.",
  "What is type erasure and its consequences?",
  "Why are raw types discouraged?",
  "Can you create a generic array? Why not?",
]));
body.push(...coding([
  { level: "Easy", text: "Generic max() over Comparable<T>." },
  { level: "Medium", text: "Generic Stack<T> with push/pop/peek." },
  { level: "Hard", text: "A copy method using PECS wildcards correctly." },
  { level: "Expert", text: "Type-safe heterogeneous container keyed by Class<T>." },
]));
body.push(...realworld(["The entire Collections API is generic; well-designed library APIs use bounded wildcards so callers pass the widest possible types safely."]));
body.push(...miniproject(["Build a generic, type-safe event bus where publishers and subscribers are checked at compile time."]));
body.push(...advanced(["Reifiable vs non-reifiable types; bridge methods; recursive generic bounds (Enum<E extends Enum<E>>)."]));

// 5. Multithreading
body.push(H1("5. Multithreading & Concurrency", "ch5"));
body.push(callout("definition", ["Multithreading runs multiple threads concurrently within one process to use multiple cores and stay responsive. Threads share memory, so coordination is required."]));
body.push(code([
  "ExecutorService pool = Executors.newFixedThreadPool(4);",
  "Future<Integer> f = pool.submit(() -> compute());",
  "int result = f.get();",
  "pool.shutdown();",
], "executors"));
body.push(table(["Tool", "Purpose"], [
  ["synchronized", "Mutual exclusion on a monitor"],
  ["volatile", "Visibility only — NOT atomicity"],
  ["AtomicInteger", "Lock-free atomic updates (CAS)"],
  ["ReentrantLock", "tryLock, fairness, flexibility"],
  ["ExecutorService", "Thread pools & task submission"],
], [3000, 6360]));
body.push(callout("mistake", ["Assuming volatile makes count++ thread-safe. It guarantees visibility, not atomicity — the read-modify-write still races. Use AtomicInteger or synchronized."]));
body.push(callout("interview", ["The Java Memory Model defines happens-before: synchronized, volatile and Thread.start/join establish ordering so one thread's writes are visible to another. Without it, the JVM may reorder or cache values."]));
body.push(...summary([
  "Prefer executors/CompletableFuture over raw threads.",
  "volatile = visibility; synchronized = mutual exclusion + visibility.",
  "Atomics give lock-free updates via CAS.",
  "Avoid deadlock with lock ordering; minimize shared mutable state.",
]));
body.push(...interview([
  "volatile vs synchronized vs Atomic?",
  "What is the Java Memory Model / happens-before?",
  "Thread lifecycle and states?",
  "How do you prevent deadlock?",
  "Runnable vs Callable vs Future vs CompletableFuture?",
]));
body.push(...coding([
  { level: "Easy", text: "Show a counter race, then fix with AtomicInteger." },
  { level: "Medium", text: "Run two calls in parallel and combine with CompletableFuture." },
  { level: "Hard", text: "Producer-consumer with a BlockingQueue." },
  { level: "Expert", text: "Implement a bounded thread pool from scratch." },
]));
body.push(...realworld(["Every server handles concurrent requests; misused locks cause deadlocks and latency spikes that only appear under production load."]));
body.push(...miniproject(["Build a multithreaded web-page downloader with a fixed pool, a work queue, and aggregated results via CompletableFuture."]));
body.push(...advanced(["Lock-free structures and the ABA problem; ForkJoinPool & work-stealing; StampedLock; false sharing."]));

// 6. JVM internals
body.push(H1("6. JVM Internals", "ch6"));
body.push(callout("definition", ["The JVM loads, verifies and executes bytecode, manages memory, and JIT-compiles hot code to native instructions."]));
body.push(code([
  "Heap        -> objects (GC-managed): Young (Eden+Survivors) + Old",
  "Metaspace   -> class metadata (native; replaced PermGen in Java 8)",
  "Stack       -> per thread: frames, locals, partial results",
  "PC register -> current instruction per thread",
], "jvm memory areas"));
body.push(callout("interview", ["JIT: the JVM interprets bytecode first, profiles hot methods, then compiles them to optimized native code (C1/C2 tiers). This is why long-running JVMs speed up after warm-up."]));
body.push(callout("note", ["OutOfMemoryError flavors point to the cause: 'Java heap space' (too many live objects), 'Metaspace' (too many classes), 'unable to create native thread' (OS/thread limit)."]));
body.push(...summary([
  "Heap holds objects; each thread has its own stack.",
  "Metaspace (native) replaced PermGen for class metadata.",
  "Class loading: load → link (verify/prepare/resolve) → init, with parent delegation.",
  "Tiered JIT compiles hot methods to native code.",
]));
body.push(...interview([
  "Describe the JVM memory areas.",
  "Stack vs heap — what lives where?",
  "Explain class loading and parent delegation.",
  "What is the JIT and tiered compilation?",
  "Types of OutOfMemoryError and how to debug each?",
]));
body.push(...coding([
  { level: "Easy", text: "Trigger and read a StackOverflowError." },
  { level: "Medium", text: "Force and diagnose a heap-space OOM with -Xmx." },
  { level: "Hard", text: "Inspect a live JVM with jstack/jmap/jcmd." },
  { level: "Expert", text: "Write a custom ClassLoader that loads a class from bytes." },
]));
body.push(...realworld(["Diagnosing a production OOM or latency spike requires reading heap dumps and GC logs — JVM internals are a senior-engineer differentiator."]));
body.push(...miniproject(["Build a tiny plugin loader using a custom ClassLoader to load and run classes dropped into a folder at runtime."]));
body.push(...advanced(["Bytecode (javap), invokedynamic, escape analysis, AppCDS for faster startup."]));

// 7. Garbage Collection
body.push(H1("7. Garbage Collection", "ch7"));
body.push(callout("definition", ["GC automatically reclaims memory held by unreachable objects, freeing developers from manual free()."]));
body.push(P("Most objects die young (the weak generational hypothesis), so the heap is generational: a Young generation (Eden + two Survivor spaces) collected by fast, frequent minor GCs, and an Old generation collected by slower major/full GCs."));
body.push(table(["Collector", "Optimized for", "Notes"], [
  ["Parallel", "Throughput", "Stop-the-world, batch jobs"],
  ["G1 (default)", "Balanced, predictable pauses", "Region-based, since Java 9"],
  ["ZGC / Shenandoah", "Ultra-low pause (<1ms)", "Large heaps, concurrent"],
], [2300, 3700, 3360]));
body.push(callout("mistake", ["Believing GC means no leaks. You still leak by keeping references alive: static collections, unremoved listeners, unbounded caches. Reachable ≠ needed."]));
body.push(callout("tip", ["Never call System.gc() in production. Tune the collector and heap, and profile with GC logs / heap dumps instead of guessing."]));
body.push(...summary([
  "GC reclaims unreachable objects automatically.",
  "Generational GC: cheap minor GCs for the young gen, costlier major GCs for old.",
  "G1 is the default; ZGC/Shenandoah target ultra-low pauses.",
  "You can still leak via long-lived references.",
]));
body.push(...interview([
  "How does generational GC work?",
  "Minor vs major vs full GC?",
  "Compare G1, ZGC and Parallel.",
  "Can Java leak memory? Examples?",
  "Why avoid System.gc()?",
]));
body.push(...coding([
  { level: "Easy", text: "Observe minor GCs with -verbose:gc." },
  { level: "Medium", text: "Create a static-collection leak and find it in a heap dump." },
  { level: "Hard", text: "Compare Parallel vs G1 pause times on one workload." },
  { level: "Expert", text: "Tune flags to keep p99 GC pause under a target under load." },
]));
body.push(...realworld(["Latency-sensitive services (trading, ads) pick ZGC/Shenandoah and tune heaps so GC pauses stay sub-millisecond — a core SRE skill."]));
body.push(...miniproject(["Build a load generator that allocates at a controlled rate and charts GC pause times across collectors."]));
body.push(...advanced(["Reference types (soft/weak/phantom), TLABs, string deduplication, GC ergonomics."]));

// 8. Streams
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
body.push(H1("13. Virtual Threads (Java 21)", "ch13"));
body.push(callout("definition", ["Virtual threads (Project Loom) are lightweight threads scheduled by the JVM, not the OS. Millions can run at once, so simple blocking code scales like async — without callbacks."]));
body.push(table(["", "Platform thread", "Virtual thread"], [
  ["Backed by", "An OS thread", "JVM-scheduled on a carrier"],
  ["Cost", "~1MB, thousands max", "~few KB, millions"],
  ["Blocking I/O", "Wastes an OS thread", "Unmounts the carrier — cheap"],
  ["Best for", "CPU-bound work", "High-concurrency I/O"],
], [1700, 3830, 3830]));
body.push(code([
  "try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {",
  "    for (var req : requests) exec.submit(() -> handle(req));",
  "}   // blocking code is fine; the JVM unmounts on I/O",
], "virtual threads"));
body.push(callout("mistake", ["Pinning: blocking inside a synchronized block (or some native calls) pins the virtual thread to its carrier, killing the benefit. Prefer ReentrantLock in hot I/O paths."]));
body.push(...summary([
  "Virtual threads make thread-per-request scale to millions.",
  "They're cheap and unmount on blocking I/O.",
  "They don't speed up CPU-bound work.",
  "Avoid pinning (synchronized/native blocking).",
]));
body.push(...interview([
  "What problem do virtual threads solve?",
  "Platform vs virtual threads?",
  "What is pinning and how to avoid it?",
  "Do virtual threads help CPU-bound work?",
  "How do they change thread-per-request design?",
]));
body.push(...coding([
  { level: "Easy", text: "Launch 1,000,000 sleeping virtual threads; compare memory to platform threads." },
  { level: "Medium", text: "Rewrite a pool-based server to one-virtual-thread-per-request." },
  { level: "Hard", text: "Detect pinning with -Djdk.tracePinnedThreads and fix it." },
  { level: "Expert", text: "Benchmark reactive vs virtual-thread blocking under load." },
]));
body.push(...realworld(["Frameworks (Spring 6+, Helidon) now run requests on virtual threads, letting teams write straightforward blocking code that scales — a major shift away from reactive complexity."]));
body.push(...miniproject(["Build a high-concurrency port/health checker that fans out thousands of blocking checks on virtual threads and aggregates results."]));
body.push(...advanced(["Structured concurrency (JEP 453), scoped values, carrier-thread tuning."]));

// 14. Versions
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
const out = require("path").join(__dirname, "Volume-2-Java.docx");
save(doc, out).then(() => console.log("WROTE", out));
