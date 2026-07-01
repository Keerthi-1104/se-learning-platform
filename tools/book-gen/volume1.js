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
body.push(H1("2. Operating Systems", "ch2"));
body.push(callout("definition", ["An operating system (OS) is software that manages hardware and provides services — processes, memory, files, devices, and security — to application programs through system calls."]));
body.push(H2("Why it exists"));
body.push(P("Without an OS, every program would have to talk to hardware directly and could trample each other. The OS provides isolation, fair scheduling, and a clean API so developers write portable code."));
body.push(callout("analogy", ["An OS is like an airport control tower: many planes (processes) want the same runways (CPU/memory). The tower schedules them safely so no two collide and everyone eventually takes off."]));
body.push(H2("Process vs Thread"));
body.push(table(
  ["Aspect", "Process", "Thread"],
  [
    ["Memory", "Own isolated address space", "Shares the process's memory"],
    ["Creation cost", "Heavy", "Light"],
    ["Communication", "IPC (pipes, sockets)", "Shared variables (needs locks)"],
    ["Crash impact", "Isolated — one crash ≠ all", "Can take down the whole process"],
    ["Use case", "Isolation, security", "Parallelism, low-latency tasks"],
  ],
  [1700, 3830, 3830],
));
body.push(H2("Process states & scheduling"));
body.push(code([
  "  new ──> ready ──> running ──> terminated",
  "             ^         |  |",
  "             |         |  └──> waiting (I/O)",
  "             └─────────┘   (back to ready when I/O done)",
], "process state machine"));
body.push(P("The scheduler decides which ready process runs next. Common policies:"));
body.push(table(
  ["Scheduler", "Idea", "Trade-off"],
  [
    ["FCFS", "First come first served", "Simple; convoy effect"],
    ["Round Robin", "Fixed time slice each", "Fair; context-switch overhead"],
    ["SJF", "Shortest job first", "Optimal wait; can starve long jobs"],
    ["Priority", "Highest priority first", "Starvation; needs aging"],
    ["MLFQ", "Multi-level feedback queues", "Used by real OSes; tunable"],
  ],
  [1700, 3830, 3830],
));
body.push(H2("Memory management"));
body.push(bullet([{ t: "Virtual memory: ", b: true }, "each process sees a private contiguous address space; the MMU maps virtual → physical pages."]));
body.push(bullet([{ t: "Paging: ", b: true }, "memory split into fixed-size pages; a page table maps them. Page faults bring pages from disk."]));
body.push(bullet([{ t: "TLB: ", b: true }, "a cache of recent virtual→physical translations to avoid walking the page table every access."]));
body.push(bullet([{ t: "Swapping/thrashing: ", b: true }, "too little RAM ⇒ constant paging to disk ⇒ system grinds to a halt."]));
body.push(H2("Concurrency: the hard part"));
body.push(callout("mistake", ["Race condition: two threads read-modify-write shared state without synchronization, so the result depends on timing. The classic bug: two threads both read balance=100, both add 50, final balance is 150 instead of 200."]));
body.push(code([
  "// Deadlock: each thread holds one lock and waits for the other",
  "Thread A: lock(X); lock(Y);   // waits for Y",
  "Thread B: lock(Y); lock(X);   // waits for X   ->  DEADLOCK",
  "",
  "// Fix: always acquire locks in a global order (X then Y).",
], "deadlock"));
body.push(callout("note", ["Four Coffman conditions for deadlock: mutual exclusion, hold-and-wait, no preemption, circular wait. Break any one to prevent deadlock."]));
body.push(callout("tip", ["Prefer higher-level concurrency primitives (thread pools, channels, async/await) over raw locks. Senior engineers minimize shared mutable state — the cheapest lock is the one you never take."]));
body.push(H2("System calls — the user/kernel boundary"));
body.push(P("Applications run in user mode and request privileged operations (open a file, send a packet) via system calls that trap into kernel mode. The boundary is what keeps a buggy app from crashing the machine."));
body.push(...summary([
  "An OS manages processes, memory, files, devices and security behind system calls.",
  "Processes are isolated; threads share memory and need synchronization.",
  "Schedulers (RR, SJF, MLFQ) trade fairness vs throughput vs starvation.",
  "Virtual memory + paging give each process a private address space.",
  "Concurrency bugs — races, deadlocks — come from unsynchronized shared state.",
]));
body.push(...interview([
  "Difference between process and thread? When choose each?",
  "What is a context switch and why is it expensive?",
  "Explain virtual memory, paging and the role of the TLB.",
  "What is a deadlock? List the four conditions and how to prevent them.",
  "Mutex vs semaphore vs spinlock — when use which?",
  "What is a race condition? Show how you'd fix one.",
  "User mode vs kernel mode — what crosses the boundary?",
  "What causes thrashing and how do you detect it?",
]));
body.push(...coding([
  { level: "Easy", text: "Spawn N threads that each increment a shared counter; show the wrong result, then fix it with a mutex." },
  { level: "Medium", text: "Implement the producer–consumer problem with a bounded buffer using condition variables." },
  { level: "Hard", text: "Implement the dining philosophers without deadlock (resource ordering or an arbitrator)." },
  { level: "Expert", text: "Build a tiny round-robin scheduler simulator that reports average wait & turnaround time." },
]));
body.push(...realworld([
  "Docker containers are an OS feature, not a VM: they use Linux namespaces (isolation) and cgroups (resource limits) so processes feel alone on the machine while sharing one kernel. This is why containers start in milliseconds versus seconds for VMs.",
]));
body.push(...miniproject([
  "Build a 'Mini Shell' in C/Java that supports running commands, piping (cmd1 | cmd2), background jobs (&), and Ctrl-C handling using fork/exec/wait and signals.",
]));
body.push(...advanced([
  "Copy-on-write (COW) makes fork() cheap and powers Redis snapshots.",
  "Memory-mapped files (mmap) for zero-copy I/O.",
  "Lock-free data structures using atomic compare-and-swap (CAS).",
  "The C10K / C10M problem and why epoll/kqueue/io_uring beat thread-per-connection.",
]));

// ============ 3. NETWORKING ============
body.push(H1("3. Networking Fundamentals", "ch3"));
body.push(callout("definition", ["Computer networking is the practice of connecting devices so they can exchange data using agreed protocols organized in layers (the OSI and TCP/IP models)."]));
body.push(H2("The layered model"));
body.push(table(
  ["OSI layer", "TCP/IP", "Job", "Examples"],
  [
    ["7 Application", "Application", "App data & semantics", "HTTP, DNS, SMTP"],
    ["6 Presentation", "Application", "Encoding, encryption", "TLS, JPEG, UTF-8"],
    ["5 Session", "Application", "Sessions", "Sockets"],
    ["4 Transport", "Transport", "End-to-end delivery", "TCP, UDP"],
    ["3 Network", "Internet", "Routing across networks", "IP, ICMP"],
    ["2 Data Link", "Link", "Frames on one link", "Ethernet, Wi-Fi"],
    ["1 Physical", "Link", "Bits on the wire", "Cables, radio"],
  ],
  [1900, 1500, 2900, 3060],
));
body.push(callout("analogy", ["Sending a letter: you write it (Application), put it in an envelope with an address (Transport/Network), the postal trucks route it (Network), and roads/planes carry it (Physical). Each layer only cares about its own job."]));
body.push(H2("Encapsulation"));
body.push(code([
  "Your data:                         [ HTTP body ]",
  "Transport adds TCP header:    [TCP][ HTTP body ]",
  "Network adds IP header:   [IP][TCP][ HTTP body ]",
  "Link adds Ethernet frame: [ETH][IP][TCP][data][CRC]",
], "encapsulation"));
body.push(H2("Key addressing concepts"));
body.push(bullet([{ t: "IP address: ", b: true }, "logical address of a host (IPv4 32-bit, IPv6 128-bit)."]));
body.push(bullet([{ t: "MAC address: ", b: true }, "hardware address of a NIC, used within one link."]));
body.push(bullet([{ t: "Port: ", b: true }, "identifies a specific process/service on a host (HTTP 80, HTTPS 443)."]));
body.push(bullet([{ t: "Socket: ", b: true }, "the pair (IP, port) — the endpoint of a connection."]));
body.push(bullet([{ t: "Subnet / CIDR: ", b: true }, "192.168.1.0/24 means the first 24 bits are the network part."]));
body.push(...summary([
  "Networking is layered so each layer solves one problem independently.",
  "TCP/IP collapses OSI into 4 practical layers: Link, Internet, Transport, Application.",
  "Data is encapsulated with a header at each layer going down, stripped going up.",
  "A connection is identified by (src IP, src port, dst IP, dst port, protocol).",
]));
body.push(...interview([
  "Walk through what happens when you type a URL and press Enter.",
  "Difference between IP address, MAC address and port?",
  "What is the OSI model? Map TCP/IP onto it.",
  "What is encapsulation? Which header is added at which layer?",
  "What does a subnet mask / CIDR notation mean?",
  "Public vs private IP and what NAT does.",
]));
body.push(...coding([
  { level: "Easy", text: "Parse a CIDR string and print the number of usable host addresses." },
  { level: "Medium", text: "Write a TCP echo client and server using raw sockets." },
  { level: "Hard", text: "Implement a tiny HTTP/1.1 server that parses request lines and headers from a socket." },
  { level: "Expert", text: "Build a minimal port scanner with a timeout and concurrency limit." },
]));
body.push(...realworld([
  "A CDN like Cloudflare exists entirely to shorten the network path: it terminates TLS close to the user, caches content at the edge, and reuses warm TCP connections to origin — turning a 300ms transcontinental round trip into a ~20ms local one.",
]));
body.push(...miniproject([
  "Build a 'Network Detective' tool that, given a domain, resolves DNS, opens a TCP connection, performs a TLS handshake, sends an HTTP request, and prints timing for each phase (DNS / connect / TLS / first byte).",
]));
body.push(...advanced([
  "QUIC / HTTP/3 run over UDP to remove head-of-line blocking and speed up handshakes.",
  "BGP routes the whole internet between autonomous systems — and misconfigurations cause global outages.",
  "MTU, fragmentation and why Path MTU Discovery matters.",
]));

// ============ 4. HTTP & HTTPS ============
body.push(H1("4. HTTP & HTTPS", "ch4"));
body.push(callout("definition", ["HTTP (HyperText Transfer Protocol) is a stateless, text-based request/response protocol at the application layer. HTTPS is HTTP carried inside a TLS-encrypted channel."]));
body.push(H2("Anatomy of a request & response"));
body.push(code([
  "GET /api/products?id=42 HTTP/1.1      <- request line (method, path, version)",
  "Host: api.example.com                  <- headers",
  "Authorization: Bearer eyJhbGci...",
  "Accept: application/json",
  "                                       <- blank line",
  "(optional body, e.g. JSON for POST)",
  "",
  "HTTP/1.1 200 OK                        <- status line",
  "Content-Type: application/json",
  "Cache-Control: max-age=60",
  "",
  '{ "id": 42, "name": "GS1 Widget" }     <- response body',
], "http"));
body.push(H2("Methods & idempotency"));
body.push(table(
  ["Method", "Purpose", "Safe?", "Idempotent?"],
  [
    ["GET", "Read a resource", "Yes", "Yes"],
    ["POST", "Create / submit", "No", "No"],
    ["PUT", "Replace a resource", "No", "Yes"],
    ["PATCH", "Partial update", "No", "No"],
    ["DELETE", "Remove a resource", "No", "Yes"],
  ],
  [1700, 4000, 1660, 2000],
));
body.push(callout("interview", ["'Safe' = no server state change. 'Idempotent' = calling N times == calling once. Interviewers love: is POST idempotent? (No.) Is DELETE? (Yes — deleting twice leaves it deleted.)"]));
body.push(H2("Status codes you must know"));
body.push(table(
  ["Class", "Meaning", "Examples"],
  [
    ["2xx", "Success", "200 OK, 201 Created, 204 No Content"],
    ["3xx", "Redirect", "301 Moved, 304 Not Modified"],
    ["4xx", "Client error", "400, 401, 403, 404, 409, 429"],
    ["5xx", "Server error", "500, 502, 503, 504"],
  ],
  [1300, 2400, 5660],
));
body.push(H2("HTTP versions"));
body.push(table(
  ["Version", "Key idea", "Win"],
  [
    ["HTTP/1.1", "Persistent connections, one req at a time per conn", "Reuse TCP"],
    ["HTTP/2", "Multiplexed streams, header compression, server push", "No head-of-line at app layer"],
    ["HTTP/3", "Runs over QUIC (UDP), 0-RTT", "No TCP head-of-line blocking"],
  ],
  [1700, 5000, 2660],
));
body.push(H2("Statelessness, cookies & caching"));
body.push(P("HTTP is stateless — the server does not remember you between requests. State is re-established with cookies, tokens, or sessions. Caching headers (Cache-Control, ETag, Last-Modified) avoid refetching unchanged data."));
body.push(callout("mistake", ["Putting sensitive data or auth tokens in the URL query string. URLs land in logs, browser history and Referer headers. Use headers or the body instead."]));
body.push(callout("best", ["Design REST URLs around nouns (/users/42/orders), use the right verb, return correct status codes, version your API (/v1/), and paginate large collections."]));
body.push(...summary([
  "HTTP is a stateless request/response protocol; HTTPS = HTTP over TLS.",
  "Know methods, safe vs idempotent, and the status-code families cold.",
  "HTTP/2 multiplexes; HTTP/3 moves to QUIC over UDP.",
  "State is added back with cookies/tokens; caching headers cut traffic.",
]));
body.push(...interview([
  "Is PUT idempotent? Is POST? Explain.",
  "Difference between 401 and 403?",
  "What problem does HTTP/2 multiplexing solve over HTTP/1.1?",
  "How do ETag and 304 Not Modified save bandwidth?",
  "What makes an API RESTful? Constraints of REST.",
  "How does HTTPS differ from HTTP at the protocol level?",
  "Cookies vs localStorage vs sessionStorage for auth — trade-offs?",
]));
body.push(...coding([
  { level: "Easy", text: "Write a client that GETs a URL and prints status code + selected headers." },
  { level: "Medium", text: "Implement conditional GET using ETag/If-None-Match and handle 304." },
  { level: "Hard", text: "Build a tiny REST API for a TODO list with correct verbs and status codes." },
  { level: "Expert", text: "Add a token-bucket rate limiter returning 429 with a Retry-After header." },
]));
body.push(...realworld([
  "Stripe's API is a gold-standard REST design: idempotency keys on POST so a retried payment never charges twice, clear versioning via a date header, and meaningful status codes. Study it before any API-design interview.",
]));
body.push(...miniproject([
  "Build a 'Postman-lite' CLI: send any method with custom headers/body, pretty-print JSON, show response timing, and save requests to a collection file.",
]));
body.push(...advanced([
  "HTTP/2 server push (now largely deprecated in favor of 103 Early Hints).",
  "Connection pooling & keep-alive tuning for high-throughput clients (e.g. dio/OkHttp).",
  "CORS preflight (OPTIONS) and why browsers enforce the same-origin policy.",
  "gRPC rides HTTP/2 for binary, streaming RPC — covered in the Backend volume.",
]));

// ============ 5. DNS ============
body.push(H1("5. DNS — The Internet's Phonebook", "ch5"));
body.push(callout("definition", ["DNS (Domain Name System) is a distributed, hierarchical database that translates human-friendly domain names (api.example.com) into IP addresses (93.184.216.34)."]));
body.push(callout("analogy", ["DNS is the contacts app on your phone: you remember 'Mom', not her 12-digit number. DNS lets you remember 'google.com', not an IP that can change anytime."]));
body.push(H2("Resolution flow"));
body.push(code([
  "browser cache -> OS cache -> recursive resolver (ISP)",
  "   resolver asks:",
  "     Root server      -> 'ask the .com TLD server'",
  "     .com TLD server  -> 'ask example.com's nameserver'",
  "     Authoritative NS -> 'api.example.com is 93.184.216.34'",
  "   resolver caches the answer for TTL seconds, returns to browser",
], "dns lookup"));
body.push(H2("Record types"));
body.push(table(
  ["Record", "Maps", "Use"],
  [
    ["A / AAAA", "name → IPv4 / IPv6", "Basic hostname resolution"],
    ["CNAME", "name → another name", "Alias (www → app domain)"],
    ["MX", "name → mail server", "Email routing"],
    ["TXT", "name → text", "SPF, domain verification"],
    ["NS", "zone → nameserver", "Delegation"],
  ],
  [1700, 3700, 3960],
));
body.push(callout("tip", ["TTL is a trade-off: low TTL = faster failover but more DNS traffic; high TTL = better caching but slower changes. Before a migration, lower TTL hours ahead so the cutover is fast."]));
body.push(...summary([
  "DNS turns names into IPs via a hierarchy: root → TTL → authoritative.",
  "Answers are cached at every level using a TTL to reduce load.",
  "A/AAAA, CNAME, MX, TXT, NS are the records you must recognize.",
]));
body.push(...interview([
  "Walk through a DNS lookup for a cold cache.",
  "Difference between recursive and authoritative DNS servers.",
  "A vs CNAME record — when can't you use a CNAME?",
  "What is TTL and how does it affect failover?",
  "What is DNS round-robin and its limitation as load balancing?",
]));
body.push(...coding([
  { level: "Easy", text: "Resolve a domain to all its A records using the language's resolver API." },
  { level: "Medium", text: "Write a CLI that prints A, MX and TXT records for a domain (a mini 'dig')." },
  { level: "Hard", text: "Implement a small in-memory DNS cache that respects TTL expiry." },
  { level: "Expert", text: "Parse a raw DNS response packet (binary) into structured records." },
]));
body.push(...realworld([
  "A single mistyped TTL/record once took half the internet offline: in 2021 a config change at a major DNS/CDN provider showed how central DNS is. Production teams keep DNS in version control and stage changes carefully.",
]));
body.push(...miniproject([
  "Build a 'DNS Health Checker' that, for a list of domains, reports current records, TTLs, resolver latency, and flags records expiring or misconfigured (e.g., CNAME at the zone apex).",
]));
body.push(...advanced([
  "DNS over HTTPS/TLS (DoH/DoT) for privacy.",
  "GeoDNS & anycast route users to the nearest data center.",
  "DNSSEC signs records to prevent cache poisoning.",
]));

// ============ 6. TCP vs UDP ============
body.push(H1("6. TCP vs UDP", "ch6"));
body.push(callout("definition", ["TCP and UDP are the two main transport-layer protocols. TCP is connection-oriented and reliable; UDP is connectionless and best-effort."]));
body.push(H2("The TCP three-way handshake"));
body.push(code([
  "Client                Server",
  "  | --- SYN ----------> |   'I want to talk, my seq=x'",
  "  | <-- SYN-ACK ------- |   'OK, my seq=y, ack=x+1'",
  "  | --- ACK ----------> |   'great, ack=y+1'",
  "  | === data flows ===  |",
  "  (teardown uses FIN/ACK, FIN/ACK)",
], "tcp handshake"));
body.push(H2("Side-by-side"));
body.push(table(
  ["Feature", "TCP", "UDP"],
  [
    ["Connection", "Yes (handshake)", "No"],
    ["Reliability", "Guaranteed, retransmits", "Best-effort, may drop"],
    ["Ordering", "In-order delivery", "No ordering"],
    ["Speed/overhead", "Higher latency, more overhead", "Fast, minimal header"],
    ["Flow/Congestion ctrl", "Yes", "No"],
    ["Use cases", "Web, email, file transfer, DB", "Video, VoIP, games, DNS"],
  ],
  [2200, 3580, 3580],
));
body.push(callout("analogy", ["TCP is a phone call: you say 'hello?', confirm you're both there, and notice if the line drops. UDP is shouting across a room: faster, but you don't know if everyone heard you."]));
body.push(callout("interview", ["Why is DNS usually UDP? Because a query/response is tiny and fits in one packet — the cost of a TCP handshake would dominate. It falls back to TCP for large responses (zone transfers)."]));
body.push(callout("mistake", ["Saying 'UDP is unreliable so never use it for important things.' Modern stacks (QUIC/HTTP-3, real-time media) build their own reliability on UDP to avoid TCP's head-of-line blocking. Reliability can live above the transport layer."]));
body.push(...summary([
  "TCP = connection, reliable, ordered, flow/congestion-controlled — at a latency cost.",
  "UDP = connectionless, fast, no guarantees — you add reliability if you need it.",
  "Three-way handshake (SYN/SYN-ACK/ACK) sets up a TCP connection.",
  "Choose by workload: bulk/correctness → TCP; real-time/low-latency → UDP.",
]));
body.push(...interview([
  "Explain the TCP three-way handshake and connection teardown.",
  "When would you choose UDP over TCP?",
  "What are flow control and congestion control? (sliding window, AIMD)",
  "What is head-of-line blocking and how does HTTP/3 avoid it?",
  "What is a SYN flood and how do SYN cookies help?",
]));
body.push(...coding([
  { level: "Easy", text: "Build a UDP echo server/client; observe that packets can be lost or reordered." },
  { level: "Medium", text: "Build a TCP chat server handling multiple clients concurrently." },
  { level: "Hard", text: "Add a simple ACK + retransmit layer on top of UDP for reliable delivery." },
  { level: "Expert", text: "Implement a sliding-window protocol with cumulative ACKs over UDP." },
]));
body.push(...realworld([
  "Online games and Zoom use UDP: a late video frame is useless, so it's better to drop it and show the next one than to wait for a TCP retransmit. They add just enough reliability (FEC, selective retransmit) for the data that matters.",
]));
body.push(...miniproject([
  "Build a 'Reliable UDP File Transfer' that chunks a file, numbers packets, retransmits lost ones, and reassembles in order — then compare its throughput to a plain TCP transfer.",
]));
body.push(...advanced([
  "Nagle's algorithm vs TCP_NODELAY for latency-sensitive apps.",
  "Congestion control variants: Reno, CUBIC, BBR.",
  "QUIC reimplements streams, reliability and TLS over UDP.",
]));

// ============ 7. SSL / TLS ============
body.push(H1("7. SSL / TLS", "ch7"));
body.push(callout("definition", ["TLS (Transport Layer Security), the successor to the deprecated SSL, encrypts data in transit and authenticates the server (and optionally the client) so communication is private and tamper-proof."]));
body.push(H2("What TLS guarantees"));
body.push(bullet([{ t: "Confidentiality: ", b: true }, "eavesdroppers see only ciphertext."]));
body.push(bullet([{ t: "Integrity: ", b: true }, "tampering is detected via message authentication codes."]));
body.push(bullet([{ t: "Authentication: ", b: true }, "certificates prove you're talking to the real server, not an impostor."]));
body.push(H2("The TLS handshake (simplified)"));
body.push(code([
  "1. ClientHello   -> supported ciphers, random, SNI (hostname)",
  "2. ServerHello   <- chosen cipher, server certificate (public key)",
  "3. Client verifies cert chain up to a trusted Certificate Authority",
  "4. Key exchange  -> both derive the same symmetric session key (ECDHE)",
  "5. Finished      -> from now on, all data is symmetric-encrypted (AES)",
], "tls 1.2/1.3 handshake"));
body.push(callout("analogy", ["Asymmetric crypto is a padlock you mail open: anyone can snap it shut (encrypt with the public key) but only you have the key to open it (the private key). TLS uses this once to agree on a fast shared secret, then switches to symmetric encryption."]));
body.push(H2("Symmetric vs asymmetric — why both?"));
body.push(table(
  ["", "Asymmetric (RSA/ECDHE)", "Symmetric (AES)"],
  [
    ["Keys", "Public + private pair", "One shared secret"],
    ["Speed", "Slow", "Very fast"],
    ["Used in TLS for", "Authenticate + exchange the key", "Encrypt the actual data"],
  ],
  [1700, 4000, 3660],
));
body.push(callout("note", ["Certificate chain: your server cert is signed by an intermediate CA, signed by a root CA whose public key ships in your OS/browser trust store. The browser walks this chain to decide trust."]));
body.push(callout("mistake", ["Disabling certificate validation ('trust all certs') to 'fix' an SSL error in a mobile/Flutter app. This defeats TLS entirely and is a critical security hole. Fix the actual cert/clock/hostname issue instead."]));
body.push(callout("tip", ["Use TLS 1.3 (fewer round trips, 0-RTT resumption, only modern ciphers), enable HSTS, automate certificate renewal (Let's Encrypt/ACME), and consider certificate pinning for high-security mobile apps."]));
body.push(...summary([
  "TLS gives confidentiality, integrity and authentication for data in transit.",
  "Handshake uses asymmetric crypto to authenticate + agree a symmetric key, then AES does the bulk encryption.",
  "Trust comes from a certificate chain rooted in a trusted CA.",
  "TLS 1.3 is faster and safer than older TLS/SSL — never disable validation.",
]));
body.push(...interview([
  "Walk through the TLS handshake.",
  "Why does TLS use both asymmetric and symmetric encryption?",
  "What is a certificate authority and how does the chain of trust work?",
  "What is a man-in-the-middle attack and how does TLS prevent it?",
  "What is forward secrecy and why does ECDHE provide it?",
  "What is certificate pinning and when is it worth the operational cost?",
]));
body.push(...coding([
  { level: "Easy", text: "Use openssl s_client to fetch and print a site's certificate and expiry." },
  { level: "Medium", text: "Write a script that flags certificates expiring within 30 days for a list of domains." },
  { level: "Hard", text: "Implement a toy Diffie-Hellman key exchange and show both sides derive the same secret." },
  { level: "Expert", text: "Build a tiny HTTPS server with a self-signed cert and add hostname verification on the client." },
]));
body.push(...realworld([
  "Let's Encrypt issues free, automated certificates via the ACME protocol and is a major reason most of the web is now HTTPS. Production teams renew certs automatically; an expired cert is one of the most common (and embarrassing) outages.",
]));
body.push(...miniproject([
  "Build a 'TLS Inspector' that connects to any host, prints the negotiated TLS version and cipher, the full certificate chain, expiry dates, and grades the configuration (e.g., flags TLS 1.0/weak ciphers).",
]));
body.push(...advanced([
  "0-RTT resumption in TLS 1.3 and its replay-attack caveat.",
  "mTLS (mutual TLS) for service-to-service auth in microservices/zero-trust.",
  "OCSP stapling and certificate transparency logs.",
]));

// ============ 8. AUTHENTICATION & AUTHORIZATION (JWT, OAuth) ============
body.push(H1("8. Authentication, Authorization, JWT & OAuth", "ch8"));
body.push(callout("definition", [
  [{ t: "Authentication (AuthN)", b: true }, " = proving who you are. ", { t: "Authorization (AuthZ)", b: true }, " = deciding what you're allowed to do. They are different steps, in that order."]
]));
body.push(callout("analogy", ["At an airport: showing your passport is authentication (you are who you claim). Your boarding pass is authorization (you may board this specific flight, in this class). One identity, many permissions."]));
body.push(H2("Authentication factors"));
body.push(bullet([{ t: "Something you know: ", b: true }, "password, PIN."]));
body.push(bullet([{ t: "Something you have: ", b: true }, "phone, hardware token, OTP."]));
body.push(bullet([{ t: "Something you are: ", b: true }, "fingerprint, face. MFA combines two+ factors."]));
body.push(H2("Sessions vs tokens"));
body.push(table(
  ["", "Server sessions", "JWT / tokens"],
  [
    ["State", "Stored on server (or Redis)", "Stateless — encoded in the token"],
    ["Scaling", "Needs shared session store", "Any server can verify with a key"],
    ["Revocation", "Easy (delete session)", "Hard — needs blocklist / short TTL"],
    ["Best for", "Classic web apps", "APIs, mobile, microservices"],
  ],
  [1500, 3930, 3930],
));
body.push(H2("JWT structure"));
body.push(P("A JWT (JSON Web Token) has three Base64URL parts separated by dots: header.payload.signature."));
body.push(code([
  "header:    { \"alg\": \"HS256\", \"typ\": \"JWT\" }",
  "payload:   { \"sub\": \"user-42\", \"role\": \"admin\", \"exp\": 1735689600 }",
  "signature: HMAC-SHA256( base64(header) + '.' + base64(payload), SECRET )",
  "",
  "token =  eyJhbGci...  .  eyJzdWIi...  .  3kF9...",
], "jwt"));
body.push(callout("mistake", ["JWT payloads are Base64-encoded, NOT encrypted — anyone can read them. Never put passwords or secrets in a JWT. The signature only proves it wasn't tampered with, not that it's hidden."]));
body.push(callout("mistake", ["Accepting alg:'none' or letting the client choose the algorithm lets an attacker forge tokens. Always pin the expected algorithm server-side."]));
body.push(H2("OAuth 2.0 — delegated authorization"));
body.push(P("OAuth 2.0 lets a user grant a third-party app limited access to their data on another service without sharing their password. 'Sign in with Google' is OAuth + OpenID Connect (which adds an identity layer / ID token)."));
body.push(code([
  "User      App(Client)        Auth Server(Google)     API",
  "  |  click 'Login'  |              |                  |",
  "  |---------------->|  redirect    |                  |",
  "  |  approve consent screen ------>|                  |",
  "  |<-- redirect back with CODE ----|                  |",
  "  |                 |-- code+secret-->| exchange      |",
  "  |                 |<-- access token + refresh token |",
  "  |                 |------ call API with token ------>|",
], "oauth 2.0 authorization code flow"));
body.push(callout("note", ["Use the Authorization Code flow with PKCE for mobile/SPA apps. The old Implicit flow is deprecated. Access tokens are short-lived; refresh tokens get new ones without re-login."]));
body.push(H2("Authorization models"));
body.push(table(
  ["Model", "Idea", "Example"],
  [
    ["RBAC", "Permissions via roles", "admin, editor, viewer"],
    ["ABAC", "Rules over attributes", "allow if dept==owner.dept"],
    ["ACL", "Per-object permission list", "file: alice=rw, bob=r"],
  ],
  [1500, 4000, 3860],
));
body.push(callout("best", ["Hash passwords with bcrypt/argon2 (never plain or MD5/SHA1). Enforce least privilege. Keep access tokens short-lived, store refresh tokens securely (httpOnly cookie or secure storage), and always check authorization on the server — never trust the client."]));
body.push(...summary([
  "AuthN proves identity; AuthZ grants permissions — always in that order.",
  "Sessions are stateful & easy to revoke; JWTs are stateless & scale but are hard to revoke.",
  "A JWT is signed, not encrypted — never store secrets in it; pin the algorithm.",
  "OAuth 2.0 delegates access via tokens; use Authorization Code + PKCE for mobile/SPA.",
  "RBAC/ABAC/ACL are the common authorization models; enforce checks server-side.",
]));
body.push(...interview([
  "Difference between authentication and authorization?",
  "Session-based vs token-based auth — trade-offs and revocation?",
  "Is a JWT encrypted? What does the signature actually protect?",
  "How do you revoke a JWT before it expires?",
  "Explain the OAuth 2.0 authorization code flow. Why PKCE?",
  "Access token vs refresh token vs ID token?",
  "How should passwords be stored? Why bcrypt/argon2 over SHA-256?",
  "RBAC vs ABAC — when use each?",
]));
body.push(...coding([
  { level: "Easy", text: "Hash and verify a password with bcrypt; show that the same password yields different hashes (salting)." },
  { level: "Medium", text: "Implement JWT issue + verify (sign with HMAC, validate exp and signature)." },
  { level: "Hard", text: "Add refresh-token rotation with a revocation list backed by Redis." },
  { level: "Expert", text: "Implement the OAuth Authorization Code + PKCE flow end-to-end against a real provider." },
]));
body.push(...realworld([
  "GitHub, Google and Slack all expose OAuth so apps can act on a user's behalf with scoped permissions ('read repos' but not 'delete'). When you click 'Authorize', you're approving exactly those scopes — least privilege in action.",
]));
body.push(...miniproject([
  "Build a complete auth service: email/password signup with bcrypt, login issuing a short-lived JWT + refresh token, role-based route protection (admin vs user), and 'Sign in with Google' via OAuth. This single project demonstrates AuthN, AuthZ, JWT and OAuth together.",
]));
body.push(...advanced([
  "OpenID Connect (OIDC) layers identity on OAuth (the ID token).",
  "SAML for enterprise SSO; SCIM for user provisioning.",
  "Token binding, DPoP and mTLS-bound tokens to stop token theft.",
  "Zero-trust architecture: authenticate & authorize every request, even internal.",
]));

// ============ 9. ENCRYPTION, HASHING, ENCODING ============
body.push(H1("9. Encryption vs Hashing vs Encoding", "ch9"));
body.push(callout("mistake", ["The single most common security confusion in interviews: treating encoding, hashing and encryption as interchangeable. They solve completely different problems."]));
body.push(table(
  ["", "Encoding", "Hashing", "Encryption"],
  [
    ["Goal", "Format/transport data", "Verify integrity / store passwords", "Confidentiality"],
    ["Reversible?", "Yes (no key)", "No (one-way)", "Yes (with key)"],
    ["Key needed?", "No", "No (salt, not key)", "Yes"],
    ["Examples", "Base64, URL, UTF-8", "SHA-256, bcrypt, argon2", "AES, RSA, ChaCha20"],
  ],
  [1500, 2620, 2620, 2620],
));
body.push(H2("Encoding"));
body.push(P("Encoding transforms data into another format for safe transport or storage — anyone can decode it. Base64 turns binary into ASCII (e.g., images in JSON, JWT parts). It is NOT security."));
body.push(callout("analogy", ["Encoding is translating English to Morse code — anyone with the chart can read it back. Encryption is writing in a language only you and your friend share a key for."]));
body.push(H2("Hashing"));
body.push(bullet([{ t: "One-way: ", b: true }, "you cannot reverse a hash to the input."]));
body.push(bullet([{ t: "Deterministic: ", b: true }, "same input → same hash; tiny input change → totally different hash (avalanche)."]));
body.push(bullet([{ t: "Fixed length: ", b: true }, "any input size → fixed-size digest."]));
body.push(callout("mistake", ["Using fast hashes (MD5, SHA-1, plain SHA-256) for passwords. They're built for speed, so attackers brute-force billions/sec. Use slow, salted hashes: bcrypt, scrypt, or argon2."]));
body.push(callout("note", ["Salt = random per-password value added before hashing so identical passwords get different hashes and rainbow tables fail. Pepper = a secret added globally, stored separately."]));
body.push(H2("Encryption"));
body.push(bullet([{ t: "Symmetric (AES): ", b: true }, "one key encrypts & decrypts. Fast; great for bulk data at rest."]));
body.push(bullet([{ t: "Asymmetric (RSA/ECC): ", b: true }, "public key encrypts, private key decrypts. Enables key exchange & digital signatures."]));
body.push(callout("perf", ["Real systems combine them (hybrid/envelope encryption): use slow asymmetric crypto once to share a fast symmetric key, then AES for the data. This is exactly what TLS and AWS KMS do."]));
body.push(...summary([
  "Encoding = reversible formatting, no key, not security (Base64, UTF-8).",
  "Hashing = one-way digest for integrity & passwords; salt it and use bcrypt/argon2.",
  "Encryption = reversible with a key for confidentiality; symmetric (AES) is fast, asymmetric (RSA) enables key exchange/signatures.",
  "Hybrid encryption uses asymmetric to exchange a symmetric key, then symmetric for data.",
]));
body.push(...interview([
  "Difference between encoding, hashing and encryption?",
  "Why is Base64 not encryption?",
  "Why salt password hashes? What attack does it stop?",
  "Why use bcrypt/argon2 instead of SHA-256 for passwords?",
  "Symmetric vs asymmetric encryption — speed and use cases.",
  "What is a digital signature and how does it use hashing + asymmetric keys?",
  "What is a collision and why does it matter for hash functions?",
]));
body.push(...coding([
  { level: "Easy", text: "Encode/decode a string to Base64 and URL-encoding; show round-trip equality." },
  { level: "Medium", text: "Hash passwords with a salt using bcrypt; verify correct and reject wrong passwords." },
  { level: "Hard", text: "Encrypt and decrypt a file with AES-256-GCM, handling IV and auth tag correctly." },
  { level: "Expert", text: "Sign a message with an RSA/ECDSA private key and verify it with the public key." },
]));
body.push(...realworld([
  "When you store credit-card or Aadhaar-like data, regulations require encryption at rest (AES via a KMS) and TLS in transit, while passwords are hashed (argon2) — never encrypted, because the server should never be able to recover them. Knowing which tool goes where is exactly what security reviewers check.",
]));
body.push(...miniproject([
  "Build a 'CryptoBox' CLI with three subcommands: encode (Base64/hex), hash (argon2 password hashing + verify), and encrypt (AES-256-GCM file encryption with a passphrase-derived key via PBKDF2). The project forces you to use each tool for its correct purpose.",
]));
body.push(...advanced([
  "Authenticated encryption (AES-GCM, ChaCha20-Poly1305) gives confidentiality + integrity together.",
  "Key derivation functions (PBKDF2, scrypt, argon2) turn passwords into keys.",
  "HMAC for message authentication; Merkle trees for tamper-evident logs/blockchains.",
  "Post-quantum cryptography (lattice-based) is coming as quantum computers threaten RSA/ECC.",
]));

// ============ 10. DATA STRUCTURES ============
body.push(H1("10. Data Structures", "ch10"));
body.push(callout("definition", ["A data structure is a way of organizing data in memory so that specific operations (insert, search, delete, traverse) are efficient. Choosing the right one is often the difference between a passing and failing solution."]));
body.push(H2("The master comparison table"));
body.push(table(
  ["Structure", "Access", "Search", "Insert", "Delete", "Strength"],
  [
    ["Array", "O(1)", "O(n)", "O(n)", "O(n)", "Index, cache-friendly"],
    ["Dynamic array", "O(1)", "O(n)", "O(1)*", "O(n)", "Grows automatically"],
    ["Linked list", "O(n)", "O(n)", "O(1)", "O(1)", "Cheap insert at ends"],
    ["Stack (LIFO)", "—", "—", "O(1)", "O(1)", "Undo, recursion"],
    ["Queue (FIFO)", "—", "—", "O(1)", "O(1)", "Scheduling, BFS"],
    ["Hash table", "—", "O(1)*", "O(1)*", "O(1)*", "Fast key lookup"],
    ["BST (balanced)", "O(log n)", "O(log n)", "O(log n)", "O(log n)", "Sorted + fast"],
    ["Heap", "O(1) min", "O(n)", "O(log n)", "O(log n)", "Priority queue"],
    ["Trie", "—", "O(L)", "O(L)", "O(L)", "Prefix search"],
    ["Graph", "—", "varies", "—", "—", "Relationships"],
  ],
  [1500, 1380, 1240, 1240, 1240, 2760],
));
body.push(P("* amortized / average case. Hash tables degrade to O(n) on bad hashing; dynamic-array insert is O(1) amortized due to occasional resizes."));
body.push(H2("How a hash table works"));
body.push(code([
  "index = hash(key) % capacity",
  "buckets[index] -> store (key, value)",
  "collision (two keys same index) ->",
  "   chaining: linked list per bucket   OR",
  "   open addressing: probe next slot",
  "load factor too high -> resize & rehash (keeps O(1) average)",
], "hash table"));
body.push(callout("interview", ["Hash tables are the most-used structure in interviews — they turn many O(n²) brute forces into O(n). The moment you think 'have I seen this before?' or 'count occurrences', reach for a hash map/set."]));
body.push(H2("Trees & graphs"));
body.push(bullet([{ t: "Binary Search Tree: ", b: true }, "left < node < right; balanced variants (AVL, Red-Black) keep operations O(log n)."]));
body.push(bullet([{ t: "Heap: ", b: true }, "complete binary tree where parent ≤ children (min-heap); backs priority queues and heapsort."]));
body.push(bullet([{ t: "Trie: ", b: true }, "tree keyed by characters; powers autocomplete and spell-check."]));
body.push(bullet([{ t: "Graph: ", b: true }, "nodes + edges; stored as adjacency list (sparse) or matrix (dense)."]));
body.push(callout("mistake", ["Using a linked list when you need random access, or an array when you do many middle insertions. Match the structure to the dominant operation, not habit."]));
body.push(...summary([
  "Pick the structure by which operation dominates your workload.",
  "Arrays = O(1) index + cache-friendly; linked lists = O(1) end insert, O(n) access.",
  "Hash tables give O(1) average lookup and crush brute-force interview problems.",
  "Trees/heaps give O(log n) ordered operations; tries excel at prefixes; graphs model relationships.",
]));
body.push(...interview([
  "Array vs linked list — when use each?",
  "How does a hash table achieve O(1)? How are collisions handled?",
  "What is a balanced BST and why does balance matter?",
  "Stack vs queue — give a real use for each.",
  "How would you implement an LRU cache in O(1)?",
  "When is a heap the right structure?",
  "Adjacency list vs adjacency matrix for graphs?",
]));
body.push(...coding([
  { level: "Easy", text: "Two Sum using a hash map in O(n)." },
  { level: "Medium", text: "Implement a min-heap (insert, extract-min, heapify)." },
  { level: "Hard", text: "Design an LRU cache with O(1) get/put (hash map + doubly linked list)." },
  { level: "Expert", text: "Implement a trie with insert/search/startsWith and add wildcard search." },
]));
body.push(...realworld([
  "Your phone's contact search uses a trie or inverted index; a game's pathfinding uses a graph + priority queue (heap) for A*; a database index is a B-tree (a disk-friendly balanced tree). Every product you use is a tour of data structures.",
]));
body.push(...miniproject([
  "Build an 'Autocomplete Engine': load a dictionary into a trie, return the top-k completions for a prefix ranked by frequency (using a heap), and expose it as a tiny REST endpoint. Combines trie + heap + hashing.",
]));
body.push(...advanced([
  "Self-balancing trees (AVL, Red-Black) and B/B+-trees used by databases & filesystems.",
  "Bloom filters: probabilistic membership in tiny space (used by Cassandra, browsers).",
  "Union-Find (disjoint set) with path compression for connectivity problems.",
  "Skip lists as a simpler alternative to balanced trees (used by Redis sorted sets).",
]));

// ============ 11. ALGORITHMS ============
body.push(H1("11. Algorithms", "ch11"));
body.push(callout("definition", ["An algorithm is a finite, well-defined sequence of steps that transforms an input into a desired output. Good algorithms are correct, efficient, and as simple as the problem allows."]));
body.push(H2("Core algorithm families"));
body.push(table(
  ["Family", "Idea", "Classic examples"],
  [
    ["Searching", "Find an element", "Linear, Binary search"],
    ["Sorting", "Order elements", "Merge, Quick, Heap sort"],
    ["Two pointers", "Scan from both ends/speeds", "Pair sum, palindrome"],
    ["Sliding window", "Move a range over data", "Max subarray, longest substring"],
    ["Recursion / D&C", "Solve subproblems, combine", "Merge sort, binary search"],
    ["Greedy", "Locally optimal choice", "Interval scheduling, Huffman"],
    ["Dynamic programming", "Cache overlapping subproblems", "Knapsack, edit distance"],
    ["Backtracking", "Try, fail, undo", "N-Queens, Sudoku"],
    ["Graph traversal", "Visit nodes systematically", "BFS, DFS, Dijkstra"],
  ],
  [1900, 3400, 4060],
));
body.push(H2("Binary search — the must-know"));
body.push(code([
  "lo = 0, hi = n - 1",
  "while lo <= hi:",
  "    mid = lo + (hi - lo) / 2     // avoids overflow",
  "    if a[mid] == target: return mid",
  "    elif a[mid] < target: lo = mid + 1",
  "    else: hi = mid - 1",
  "return -1            // O(log n), requires sorted input",
], "binary search"));
body.push(H2("Sorting at a glance"));
body.push(table(
  ["Algorithm", "Avg", "Worst", "Space", "Stable?"],
  [
    ["Quick sort", "O(n log n)", "O(n²)", "O(log n)", "No"],
    ["Merge sort", "O(n log n)", "O(n log n)", "O(n)", "Yes"],
    ["Heap sort", "O(n log n)", "O(n log n)", "O(1)", "No"],
    ["Insertion", "O(n²)", "O(n²)", "O(1)", "Yes"],
  ],
  [2200, 1900, 1900, 1660, 1700],
));
body.push(callout("tip", ["Recognize the pattern, not the problem. 'Subarray/substring with a constraint' → sliding window. 'Sorted array / minimize the maximum' → binary search. 'Count of ways / optimal value' → DP. 'Shortest path' → BFS/Dijkstra. Pattern recognition is what fast interviewees actually do."]));
body.push(H2("Recursion → DP"));
body.push(P("Many problems have a naive exponential recursion that repeats work. Memoization (top-down) or tabulation (bottom-up) caches subproblem answers to make it polynomial. Fibonacci goes from O(2ⁿ) to O(n) this way."));
body.push(callout("mistake", ["Jumping straight to code. Senior candidates first state the approach, the complexity, and edge cases (empty input, duplicates, overflow, single element) out loud — then code. Interviewers grade your process, not just the answer."]));
body.push(...summary([
  "Master a small set of patterns: binary search, two pointers, sliding window, BFS/DFS, greedy, DP, backtracking.",
  "Recognize the pattern from the problem's wording and constraints.",
  "Know sort/search complexities and when each sort is appropriate.",
  "State approach + complexity + edge cases before coding.",
]));
body.push(...interview([
  "Implement binary search and prove its O(log n).",
  "Quick sort vs merge sort — trade-offs; which is stable?",
  "When does DP apply? Memoization vs tabulation?",
  "BFS vs DFS — when use each? Iterative vs recursive?",
  "Explain a greedy choice that is provably optimal (e.g., interval scheduling).",
  "How do you detect a cycle in a linked list / graph?",
]));
body.push(...coding([
  { level: "Easy", text: "Reverse a linked list; find the middle with fast/slow pointers." },
  { level: "Medium", text: "Longest substring without repeating characters (sliding window)." },
  { level: "Hard", text: "Course schedule / topological sort with cycle detection." },
  { level: "Expert", text: "Edit distance (Levenshtein) with DP; reconstruct the operations." },
]));
body.push(...realworld([
  "Google Maps' routing is Dijkstra/A* on a graph of roads; your IDE's autocomplete ranking and 'did you mean?' use edit distance; video streaming uses greedy bitrate selection. Algorithms aren't academic — they're the product.",
]));
body.push(...miniproject([
  "Build a 'Maze Solver & Visualizer': generate a random maze, then solve it with BFS (shortest path), DFS, and A*, animating the explored cells so you can see why BFS finds the shortest path and DFS doesn't.",
]));
body.push(...advanced([
  "Amortized analysis (why dynamic-array push is O(1) average).",
  "Randomized algorithms (quickselect, randomized quicksort) to dodge worst cases.",
  "Bit manipulation tricks (XOR swap, counting set bits, subsets).",
  "NP-completeness: recognize when a problem is intractable and you need heuristics.",
]));

// ============ 12. TIME & SPACE COMPLEXITY ============
body.push(H1("12. Time & Space Complexity (Big-O)", "ch12"));
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

// ============ 13. OOP ============
body.push(H1("13. Object-Oriented Programming", "ch13"));
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

// ============ 14. SOLID ============
body.push(H1("14. SOLID Principles", "ch14"));
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

// ============ 15. DESIGN PATTERNS ============
body.push(H1("15. Design Patterns", "ch15"));
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
