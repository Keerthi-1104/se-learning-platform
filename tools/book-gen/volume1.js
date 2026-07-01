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
body.push(...topicToChapter(loadTopic("level_01", "complexity"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

// ============ 14. OOP ============
body.push(...topicToChapter(loadTopic("level_01", "oop"),
  { chapterNumber: 14, bookmarkId: "ch14" }));

// ============ 15. SOLID ============
body.push(...topicToChapter(loadTopic("level_01", "solid"),
  { chapterNumber: 15, bookmarkId: "ch15" }));

// ============ 16. DESIGN PATTERNS ============
body.push(...topicToChapter(loadTopic("level_01", "design_patterns"),
  { chapterNumber: 16, bookmarkId: "ch16" }));

// ============ 17. SDLC ============
body.push(...topicToChapter(loadTopic("level_01", "sdlc"),
  { chapterNumber: 17, bookmarkId: "ch17" }));

// ============ 18. GIT FUNDAMENTALS ============
body.push(...topicToChapter(loadTopic("level_01", "git"),
  { chapterNumber: 18, bookmarkId: "ch18" }));

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
