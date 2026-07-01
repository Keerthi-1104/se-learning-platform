// VOLUME 1 — Computer Science Fundamentals
const L = require("./lib");
const {
  C, P, H1, H2, H3, bullet, num, callout, code, table, rule, chip,
  makeDoc, pageProps, save, Paragraph, TextRun, PageBreak, AlignmentType,
  TableOfContents, runs,
} = L;
// Bridge that reads the same topic JSON the Flutter app uses, so any
// expansion of a topic's JSON automatically shows up in the book.
const { loadTopic, topicToChapter } = require("./topic_to_chapter");

// ---------- Cover page ----------
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
      children: [new TextRun({ text: "VOLUME 1", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Computer Science Fundamentals", size: 32, color: C.teal, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Computer Architecture  •  Operating Systems  •  Networking", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "HTTP/HTTPS  •  DNS  •  TCP/UDP  •  SSL/TLS  •  Auth  •  JWT  •  OAuth", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Encryption  •  Hashing  •  Data Structures  •  Algorithms  •  Big-O", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [new TextRun({ text: "OOP  •  SOLID  •  Design Patterns", size: 20, color: C.grayText })] }),
    ...blank(3),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Target companies: Google · Microsoft · Amazon · Atlassian · Walmart · Adobe", size: 18, color: C.grayText, italics: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Oracle · Zoho · Freshworks · TCS · Infosys · Accenture · Capgemini · Cognizant · Deloitte", size: 18, color: C.grayText, italics: true })] }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ---------- TOC ----------
function toc() {
  return [
    new Paragraph({ style: "Title", spacing: { after: 200 }, children: [new TextRun("Table of Contents")] }),
    new TableOfContents("Contents", { hyperlink: true, headingStyleRange: "1-3" }),
    new Paragraph({ spacing: { before: 160 }, children: runs([{ t: "Tip: ", b: true, color: C.green }, "In Microsoft Word, press Ctrl+A then F9 (Cmd+A, then fn+F9 on Mac) to refresh page numbers in this Table of Contents."]) }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ---------- Reusable per-topic closer blocks ----------
function summary(points) {
  return [chip("✅ SUMMARY", C.green), ...points.map((p) => bullet(p))];
}
function interview(qs) {
  return [chip("🎯 INTERVIEW QUESTIONS", C.amber), ...qs.map((q, i) => num(q))];
}
function coding(items) {
  // items: [{level, text}]
  return [chip("💻 CODING PROBLEMS", C.purple),
    ...items.map((it) => bullet([{ t: `[${it.level}] `, b: true, color: it.level === "Expert" ? C.red : it.level === "Hard" ? C.amber : it.level === "Medium" ? C.blue : C.green }, it.text]))];
}
function realworld(lines) {
  return [chip("🏭 REAL-WORLD EXAMPLE", C.teal), ...lines.map((l) => P(l))];
}
function miniproject(lines) {
  return [chip("🛠 MINI PROJECT", C.blue), ...lines.map((l) => (typeof l === "string" ? bullet(l) : l))];
}
function advanced(lines) {
  return [chip("🚀 ADVANCED NOTES", C.navy), ...lines.map((l) => bullet(l))];
}

// =====================================================================
// CONTENT
// =====================================================================
const body = [];

// ----- How to use this book -----
body.push(H1("How to Use This Book", "intro"));
body.push(P([{ t: "Welcome. ", b: true }, "This is Volume 1 of a multi-volume series that takes you from fundamentals to interview-ready for top product companies and MNCs. Every topic is taught the same way so your brain learns a repeatable mental model."]));
body.push(H2("The 20-point teaching pattern"));
body.push(P("Each major concept is explained through: (1) Definition, (2) Why it exists, (3) Real-world analogy, (4) Internal working, (5) Architecture, (6) Memory, (7) Performance, (8) Pros, (9) Cons, (10) Common mistakes, (11) Best practices, (12) Production examples, (13) Interview questions, (14) Code, (15) Beginner mistakes, (16) Senior tips, (17) FAQs, (18) Diagram, (19) Flowchart, (20) Cheat sheet."));
body.push(callout("note", [["Every topic ends with six fixed sections: ", { t: "✅ Summary, 🎯 Interview Questions, 💻 Coding Problems, 🏭 Real-world Example, 🛠 Mini Project, 🚀 Advanced Notes.", b: true }]]));
body.push(H2("How to read the callout boxes"));
body.push(callout("definition", ["Blue box = a precise definition you can quote in an interview."]));
body.push(callout("analogy", ["Orange box = an everyday analogy to lock the idea into memory."]));
body.push(callout("tip", ["Green box = what a senior engineer actually does in production."]));
body.push(callout("mistake", ["Red box = a trap that fails interviews or breaks production."]));
body.push(callout("interview", ["Yellow box = exactly how this shows up in interviews."]));
body.push(H2("Suggested 12-week study plan for Volume 1"));
body.push(table(
  ["Weeks", "Focus", "Outcome"],
  [
    ["1–2", "Computer Architecture + OS", "Explain how a program runs end to end"],
    ["3–4", "Networking, HTTP/HTTPS, DNS, TCP/UDP", "Trace a request from URL to bytes on the wire"],
    ["5", "SSL/TLS, Encryption, Hashing, Encoding", "Secure data in transit and at rest"],
    ["6", "Auth, Authorization, JWT, OAuth", "Design a login + token system"],
    ["7–9", "Data Structures + Algorithms + Big-O", "Solve LeetCode Easy/Medium confidently"],
    ["10", "OOP + SOLID", "Design clean, extensible classes"],
    ["11–12", "Design Patterns + revision", "Recognize patterns and ace system design basics"],
  ],
  [1400, 4200, 3760],
));

// ============ 1. COMPUTER ARCHITECTURE ============
// Chapter now sources from the SAME JSON the Flutter app uses.
// When the JSON is expanded (analogies, sample programs, Q&A with answers),
// re-running this script picks it up automatically. No manual sync needed.
body.push(...topicToChapter(loadTopic("level_01", "computer_architecture"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// ============ 2. OPERATING SYSTEMS ============
body.push(...topicToChapter(loadTopic("level_01", "operating_systems"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// ============ 3. NETWORKING ============
body.push(...topicToChapter(loadTopic("level_01", "networking"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// ============ 4. HTTP & HTTPS ============
body.push(...topicToChapter(loadTopic("level_01", "http_https"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// ============ 5. DNS ============
body.push(...topicToChapter(loadTopic("level_01", "dns"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// ============ 6. TCP vs UDP ============
body.push(...topicToChapter(loadTopic("level_01", "tcp_udp"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// ============ 7. SSL / TLS ============
body.push(...topicToChapter(loadTopic("level_01", "ssl_tls"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// ============ 8. AUTHENTICATION & AUTHORIZATION ============
body.push(...topicToChapter(loadTopic("level_01", "auth"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// ============ 9. JWT & OAUTH ============
body.push(...topicToChapter(loadTopic("level_01", "jwt_oauth"),
  { chapterNumber: 9, bookmarkId: "ch9_jwt" }));

// ============ 10. ENCRYPTION, HASHING, ENCODING ============
body.push(...topicToChapter(loadTopic("level_01", "encryption_hashing"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// ============ 11. DATA STRUCTURES ============
body.push(...topicToChapter(loadTopic("level_01", "data_structures"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// ============ 12. ALGORITHMS ============
body.push(...topicToChapter(loadTopic("level_01", "algorithms"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// ============ 13. TIME & SPACE COMPLEXITY ============
body.push(H1("13. Time & Space Complexity (Big-O)", "ch12"));
body.push(callout("definition", ["Big-O notation describes how an algorithm's running time or memory grows as the input size n grows, ignoring constants and lower-order terms. It is the language of efficiency."]));
body.push(H2("The growth-rate ladder (best → worst)"));
body.push(table(
  ["Big-O", "Name", "n=1000 roughly", "Example"],
  [
    ["O(1)", "Constant", "1", "Hash lookup, array index"],
    ["O(log n)", "Logarithmic", "~10", "Binary search"],
    ["O(n)", "Linear", "1,000", "Scan an array"],
    ["O(n log n)", "Linearithmic", "~10,000", "Merge/Quick sort"],
    ["O(n²)", "Quadratic", "1,000,000", "Nested loops"],
    ["O(2ⁿ)", "Exponential", "astronomical", "Naive recursion"],
    ["O(n!)", "Factorial", "impossible", "Brute-force permutations"],
  ],
  [1400, 1900, 2160, 3900],
));
body.push(callout("analogy", ["Big-O is about how a recipe scales, not how fast your stove is. O(n²) means doubling guests quadruples the work — regardless of how fast any single step runs. Constants (a faster stove) don't change the shape of the curve."]));
body.push(H2("Big-O, Big-Ω, Big-Θ"));
body.push(bullet([{ t: "O (upper bound): ", b: true }, "worst case — 'no slower than'."]));
body.push(bullet([{ t: "Ω (lower bound): ", b: true }, "best case — 'no faster than'."]));
body.push(bullet([{ t: "Θ (tight bound): ", b: true }, "both — the true growth rate."]));
body.push(H2("How to analyze code"));
body.push(code([
  "for i in 0..n:          # O(n)",
  "    for j in 0..n:      # O(n) nested -> O(n^2)",
  "        work()          # O(1)",
  "# total: O(n^2)",
  "",
  "Rules:  drop constants  (O(2n)  -> O(n))",
  "        drop lower terms (O(n^2+n) -> O(n^2))",
  "        nested loops multiply, sequential loops add",
], "complexity analysis"));
body.push(callout("mistake", ["Forgetting space complexity. A recursive solution may be O(n) time but O(n) stack space; an interviewer will ask 'can you do it in O(1) space?' Always state both."]));
body.push(callout("interview", ["Always give the complexity unprompted: 'This is O(n) time, O(1) space.' It signals seniority. Then mention whether it's worst/average and if a better bound is possible."]));
body.push(...summary([
  "Big-O describes growth as n→∞, ignoring constants and lower terms.",
  "Memorize the ladder: 1 < log n < n < n log n < n² < 2ⁿ < n!.",
  "Nested loops multiply; sequential loops add; drop constants.",
  "Always report both time AND space complexity, worst vs average.",
]));
body.push(...interview([
  "Difference between O, Ω and Θ?",
  "What's the complexity of binary search and why?",
  "Average vs worst case for quicksort and hash-table lookup?",
  "What is amortized complexity? (dynamic array push)",
  "Reduce a given O(n²) solution to O(n log n) or O(n).",
  "Why do we ignore constants in Big-O — and when do constants actually matter?",
]));
body.push(...coding([
  { level: "Easy", text: "Given several code snippets, state the time & space complexity of each." },
  { level: "Medium", text: "Take an O(n²) duplicate-finder and rewrite it as O(n) with a hash set." },
  { level: "Hard", text: "Find the k-th largest element in O(n) average with quickselect." },
  { level: "Expert", text: "Solve a problem in O(1) extra space that you first solved with O(n) (e.g., Floyd cycle detection)." },
]));
body.push(...realworld([
  "At scale, complexity is money. An O(n²) check that's fine for 100 users melts the server at 1,000,000 users — that's billions of operations per request. Companies like Amazon reject designs on Big-O alone because constants can't save a bad growth rate.",
]));
body.push(...miniproject([
  "Build a 'Complexity Lab': implement the same task (e.g., contains-duplicate) in O(n²) and O(n), run them on inputs of growing size, and plot the measured times against the theoretical curves to see Big-O made visible.",
]));
body.push(...advanced([
  "Master theorem for divide-and-conquer recurrences.",
  "Amortized analysis (aggregate, accounting, potential methods).",
  "Space-time trade-offs (memoization, precomputation, lookup tables).",
  "Cache-aware complexity: two O(n) loops can differ 10× due to memory access patterns.",
]));

// ============ 14. OOP ============
body.push(H1("14. Object-Oriented Programming", "ch13"));
body.push(callout("definition", ["OOP organizes software as objects — bundles of data (fields) and behavior (methods) — interacting through well-defined interfaces. It's the dominant paradigm in Java, Kotlin, C# and Dart."]));
body.push(H2("The four pillars"));
body.push(table(
  ["Pillar", "Meaning", "Benefit"],
  [
    ["Encapsulation", "Hide internal state behind methods", "Safe, controlled change"],
    ["Abstraction", "Expose what, hide how", "Simpler mental model"],
    ["Inheritance", "Reuse via 'is-a' relationships", "Share behavior"],
    ["Polymorphism", "One interface, many implementations", "Extensible, flexible code"],
  ],
  [1900, 4200, 3260],
));
body.push(callout("analogy", ["A car is an object: you use the steering wheel and pedals (public interface) without knowing the engine internals (encapsulation). A sports car and a truck are both 'Vehicles' (inheritance) and both respond to drive() differently (polymorphism)."]));
body.push(H2("Polymorphism in code"));
body.push(code([
  "abstract class Shape { abstract double area(); }",
  "class Circle extends Shape { double area() => 3.14*r*r; }",
  "class Square extends Shape { double area() => s*s; }",
  "",
  "double total(List<Shape> shapes) =>",
  "    shapes.fold(0, (sum, s) => sum + s.area());",
  "// works for ANY Shape, present or future -> open for extension",
], "polymorphism (dart)"));
body.push(H2("Key relationships"));
body.push(bullet([{ t: "Association: ", b: true }, "objects use each other (Driver uses Car)."]));
body.push(bullet([{ t: "Composition (has-a, strong): ", b: true }, "part dies with the whole (House has Rooms)."]));
body.push(bullet([{ t: "Aggregation (has-a, weak): ", b: true }, "part outlives the whole (Team has Players)."]));
body.push(bullet([{ t: "Inheritance (is-a): ", b: true }, "Dog is an Animal."]));
body.push(callout("mistake", ["Overusing inheritance. Deep hierarchies are fragile (the 'banana–gorilla–jungle' problem: you wanted a banana but inherited the whole jungle). Prefer composition over inheritance."]));
body.push(callout("tip", ["Senior engineers 'program to an interface, not an implementation'. Depend on abstractions so you can swap implementations (e.g., a Repository interface backed by SQL today, an API tomorrow) without touching callers."]));
body.push(H2("Overloading vs overriding"));
body.push(table(
  ["", "Overloading", "Overriding"],
  [
    ["What", "Same name, different parameters", "Subclass redefines parent method"],
    ["When resolved", "Compile time (static)", "Runtime (dynamic dispatch)"],
    ["Polymorphism type", "Compile-time", "Runtime"],
  ],
  [1900, 3730, 3730],
));
body.push(...summary([
  "OOP bundles data + behavior into objects with clear interfaces.",
  "Four pillars: encapsulation, abstraction, inheritance, polymorphism.",
  "Prefer composition over inheritance; program to interfaces.",
  "Overloading is compile-time; overriding is runtime dynamic dispatch.",
]));
body.push(...interview([
  "Explain the four pillars with examples.",
  "Composition vs inheritance — why prefer composition?",
  "Overloading vs overriding? Which is runtime polymorphism?",
  "Abstract class vs interface — when use which?",
  "What is the diamond problem and how do languages resolve it?",
  "What does 'program to an interface' mean in practice?",
]));
body.push(...coding([
  { level: "Easy", text: "Model a Shape hierarchy with area() and compute total area polymorphically." },
  { level: "Medium", text: "Design a payment system with a PaymentMethod interface (Card, UPI, Wallet)." },
  { level: "Hard", text: "Refactor a deep inheritance tree into composition with injected behaviors (strategy)." },
  { level: "Expert", text: "Implement a plugin system where new types register at runtime via a common interface." },
]));
body.push(...realworld([
  "Flutter's entire widget system is OOP polymorphism: every widget extends Widget and implements build(); the framework treats them uniformly. Java's Collections framework programs to interfaces (List, Map) so you can swap ArrayList for LinkedList freely.",
]));
body.push(...miniproject([
  "Build a 'Shape Drawing App' (CLI or Flutter): a base Shape with subclasses, a renderer that draws any shape polymorphically, and a feature where adding a new shape requires zero changes to existing code — proving the Open/Closed principle.",
]));
body.push(...advanced([
  "The Liskov Substitution Principle formalizes correct inheritance (next chapter).",
  "Mixins (Dart/Kotlin) and traits for horizontal reuse without deep hierarchies.",
  "Value objects & immutability to avoid shared-mutable-state bugs.",
  "The Law of Demeter ('don't talk to strangers') to reduce coupling.",
]));

// ============ 15. SOLID ============
body.push(H1("15. SOLID Principles", "ch14"));
body.push(callout("definition", ["SOLID is five object-oriented design principles (Robert C. Martin) that make code easier to extend, test and maintain by reducing coupling and increasing cohesion."]));
body.push(table(
  ["Letter", "Principle", "One-line meaning"],
  [
    ["S", "Single Responsibility", "A class should have one reason to change"],
    ["O", "Open/Closed", "Open for extension, closed for modification"],
    ["L", "Liskov Substitution", "Subtypes must be usable as their base type"],
    ["I", "Interface Segregation", "Many small interfaces beat one fat one"],
    ["D", "Dependency Inversion", "Depend on abstractions, not concretions"],
  ],
  [900, 3400, 5060],
));
body.push(H2("S — Single Responsibility"));
body.push(callout("mistake", ["A 'God class' UserManager that validates input, hits the database, sends emails AND formats reports. Any change risks breaking unrelated features. Split into Validator, Repository, Mailer, Reporter."]));
body.push(H2("O — Open/Closed"));
body.push(code([
  "// BAD: must edit this every time a new shape appears",
  "double area(Shape s) {",
  "  if (s is Circle) ...; else if (s is Square) ...;",
  "}",
  "// GOOD: add a new Shape subclass; this code never changes",
  "double area(Shape s) => s.area();",
], "open/closed"));
body.push(H2("L — Liskov Substitution"));
body.push(callout("mistake", ["The classic violation: Square extends Rectangle, but setting width on a Square also changes height, breaking code that expected a Rectangle. If a subtype surprises callers, it violates LSP — model it differently."]));
body.push(H2("I — Interface Segregation"));
body.push(P("Don't force a class to implement methods it doesn't need. A Printer interface with print(), scan(), and fax() forces a simple printer to stub fax(). Split into Printable, Scannable, Faxable."));
body.push(H2("D — Dependency Inversion"));
body.push(code([
  "// High-level OrderService depends on an abstraction, not a concrete DB",
  "class OrderService {",
  "  final Repository repo;          // interface",
  "  OrderService(this.repo);        // injected",
  "}",
  "// Swap SqlRepository <-> ApiRepository <-> FakeRepository (tests)",
], "dependency inversion"));
body.push(callout("tip", ["SOLID is the foundation of Clean Architecture and testable code. Dependency Inversion + injection is what lets you unit-test business logic with fake repositories instead of a real database."]));
body.push(...summary([
  "SOLID = SRP, OCP, LSP, ISP, DIP — five rules for maintainable OOP.",
  "SRP: one reason to change. OCP: extend without editing.",
  "LSP: subtypes must honor the base contract. ISP: small focused interfaces.",
  "DIP: depend on abstractions + inject dependencies → testable, swappable code.",
]));
body.push(...interview([
  "Name the SOLID principles and give an example of violating each.",
  "How does the Square/Rectangle example violate LSP?",
  "How does Dependency Inversion enable unit testing?",
  "Difference between Dependency Inversion and Dependency Injection?",
  "How do SOLID principles relate to Clean Architecture?",
]));
body.push(...coding([
  { level: "Easy", text: "Refactor a God class into single-responsibility classes." },
  { level: "Medium", text: "Add a new feature to a system by extension only (prove OCP)." },
  { level: "Hard", text: "Introduce a repository interface + DI so business logic is testable with a fake." },
  { level: "Expert", text: "Redesign an LSP-violating hierarchy and write tests that pass for every subtype." },
]));
body.push(...realworld([
  "Spring (Java) is built on Dependency Inversion: you @Autowire interfaces and Spring injects implementations. Flutter apps use get_it/injectable for the same reason — so screens depend on abstract repositories, not concrete API clients.",
]));
body.push(...miniproject([
  "Refactor a deliberately messy 'NotificationService' (one class that emails, SMSs, validates, and logs) into a SOLID design: a Notifier interface, channel implementations, injected dependencies, and unit tests using fakes. Document which principle each change satisfies.",
]));
body.push(...advanced([
  "SOLID vs GRASP and other design-principle families.",
  "Cohesion & coupling metrics; the Stable Dependencies Principle for packages.",
  "How over-applying SOLID causes needless abstraction ('astronaut architecture') — balance matters.",
]));

// ============ 16. DESIGN PATTERNS ============
body.push(H1("16. Design Patterns", "ch15"));
body.push(callout("definition", ["Design patterns are reusable, named solutions to recurring design problems (from the 'Gang of Four'). They are a shared vocabulary — saying 'use a Factory here' communicates a whole design in two words."]));
body.push(H2("The three families"));
body.push(table(
  ["Family", "Solves", "Patterns"],
  [
    ["Creational", "How objects are created", "Singleton, Factory, Builder, Prototype, Abstract Factory"],
    ["Structural", "How objects are composed", "Adapter, Decorator, Facade, Proxy, Composite, Bridge"],
    ["Behavioral", "How objects interact", "Observer, Strategy, Command, State, Iterator, Template"],
  ],
  [1700, 2700, 4960],
));
body.push(H2("Patterns you'll actually use & be asked"));
body.push(H3("Singleton"));
body.push(P("Ensures one instance with a global access point (e.g., a logger, config, DB connection pool)."));
body.push(callout("mistake", ["Overusing Singletons — they're global state in disguise, hurt testability, and can cause threading bugs. Prefer dependency injection of a single instance over a hard Singleton."]));
body.push(H3("Factory"));
body.push(code([
  "Widget buildButton(Platform p) {",
  "  switch (p) {",
  "    case ios:     return CupertinoButton();",
  "    case android: return MaterialButton();",
  "  }",
  "}   // callers ask for a button; the factory decides the concrete type",
], "factory method"));
body.push(H3("Observer"));
body.push(P("A subject notifies many observers of state changes. This is the heart of reactive UI: Streams, ChangeNotifier, BLoC, and RxJS are all Observer."));
body.push(H3("Strategy"));
body.push(P("Encapsulate interchangeable algorithms behind a common interface and swap them at runtime — e.g., different sorting or pricing strategies injected into a context."));
body.push(H3("Decorator"));
body.push(P("Wrap an object to add behavior without changing its class — e.g., Flutter's Padding/Container wrapping a child widget, or Java's BufferedReader wrapping a Reader."));
body.push(table(
  ["Pattern", "Use when", "Real example"],
  [
    ["Singleton", "Exactly one shared instance", "Logger, AppConfig"],
    ["Factory", "Hide which subclass to create", "Platform-specific widgets"],
    ["Builder", "Build complex objects step by step", "Flutter's widget builders, StringBuilder"],
    ["Adapter", "Make incompatible APIs work together", "Wrapping a 3rd-party SDK"],
    ["Decorator", "Add behavior dynamically", "Padding/Container; BufferedReader"],
    ["Observer", "Notify many on change", "Streams, BLoC, ChangeNotifier"],
    ["Strategy", "Swap algorithms at runtime", "Pricing/sorting policies"],
    ["Repository", "Abstract data sources", "Clean Architecture data layer"],
  ],
  [1700, 3700, 3960],
));
body.push(callout("tip", ["Patterns are tools, not goals. Don't force a pattern to look clever — reach for one only when it removes real duplication or coupling. The best engineers name the pattern after recognizing the problem, not before."]));
body.push(...summary([
  "Patterns are named, reusable solutions giving teams a shared vocabulary.",
  "Three families: Creational (creation), Structural (composition), Behavioral (interaction).",
  "Most-used: Singleton, Factory, Builder, Adapter, Decorator, Observer, Strategy, Repository.",
  "Apply patterns to remove real pain — not for their own sake.",
]));
body.push(...interview([
  "What problem does the Singleton solve and what are its downsides?",
  "Factory vs Abstract Factory vs Builder?",
  "How is the Observer pattern used in reactive UI / state management?",
  "Strategy vs State pattern — how do they differ?",
  "Decorator vs inheritance for adding behavior?",
  "Where have you used the Repository pattern?",
]));
body.push(...coding([
  { level: "Easy", text: "Implement a thread-safe Singleton logger." },
  { level: "Medium", text: "Build a notification Factory that returns Email/SMS/Push senders." },
  { level: "Hard", text: "Implement Observer from scratch (subject + observers) and drive a UI counter." },
  { level: "Expert", text: "Design a payment pipeline combining Strategy (gateway) + Decorator (logging/retry) + Factory." },
]));
body.push(...realworld([
  "Flutter is a pattern catalog: widgets use Composite (trees) and Decorator (wrappers); state management is Observer; navigation uses Command; get_it is a Service Locator; repositories abstract data sources. Recognizing them makes large codebases readable instantly.",
]));
body.push(...miniproject([
  "Build a 'Coffee Shop Ordering System': use Factory to create drinks, Decorator to add toppings (milk, sugar, syrup) that adjust price/description, Strategy for payment methods, and Observer to update an order-status display. One project, five patterns.",
]));
body.push(...advanced([
  "Anti-patterns: God object, spaghetti code, golden hammer, premature optimization.",
  "Architectural patterns: MVC, MVVM, MVI, Clean Architecture, Hexagonal (covered in the Flutter & Backend volumes).",
  "Concurrency patterns: producer-consumer, thread pool, future/promise, actor model.",
  "Dependency Injection as a pattern and how frameworks (Spring, get_it, Hilt) automate it.",
]));

// ============ Revision cheat sheet ============
body.push(H1("Volume 1 Revision Cheat Sheet", "cheat"));
body.push(P([{ t: "Print this page. ", b: true }, "It compresses Volume 1 into a one-glance review before interviews."]));
body.push(H2("Networking stack in one line"));
body.push(callout("note", ["URL → DNS (name→IP) → TCP handshake → TLS handshake → HTTP request → response. Know what each step does and what can go wrong at each."]));
body.push(H2("Security: which tool for which job"));
body.push(table(
  ["Need", "Use"],
  [
    ["Transport data safely (format)", "Encoding (Base64) — not security"],
    ["Store passwords", "Salted slow hash (bcrypt/argon2)"],
    ["Verify integrity", "Hash / HMAC"],
    ["Confidential data at rest", "Symmetric encryption (AES-GCM)"],
    ["Key exchange / signatures", "Asymmetric (RSA/ECC)"],
    ["Secure channel", "TLS 1.3"],
    ["Prove identity", "Authentication (MFA)"],
    ["Grant scoped access", "OAuth 2.0 + RBAC"],
  ],
  [4680, 4680],
));
body.push(H2("Big-O ladder"));
body.push(callout("perf", ["O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!). If your solution is O(n²) on big input, look for a hash map, sorting + two pointers, or DP."]));
body.push(H2("Design principles in one breath"));
body.push(callout("best", ["Encapsulate. Program to interfaces. Prefer composition over inheritance. Follow SOLID. Inject dependencies. Use a pattern only when it removes real pain."]));
body.push(H2("Final words for Volume 1"));
body.push(P([{ t: "You now have the foundation. ", b: true }, "Volume 2 covers Java in depth (Java 8 → latest LTS, JVM, memory, concurrency, collections, streams, records, virtual threads). Practice the coding problems here until they're automatic — fundamentals are what separate candidates who 'know frameworks' from engineers who understand systems."]));
body.push(rule(C.blue));
body.push(P([{ t: "End of Volume 1. ", b: true, color: C.navy }, "Next: Volume 2 — Java (Complete, Java 8 to Latest LTS)."], { align: AlignmentType.CENTER }));

// ---------- Assemble ----------
const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 1 — CS Fundamentals"),
    children: [...toc(), ...body] },
]);

const out = require("path").join(__dirname, "../../docs/books/Volume-1-CS-Fundamentals.docx");
save(doc, out).then(() => console.log("WROTE", out));
