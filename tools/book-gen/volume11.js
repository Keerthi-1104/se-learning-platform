// VOLUME 11 — GS1 & Barcode Technologies
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
      children: [new TextRun({ text: "VOLUME 11", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "GS1 & Barcode Technologies", size: 30, color: C.green, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "GTIN · GLN · GCP · SSCC · Digital Link", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "DataMatrix · QR · Standards · Authentication", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Traceability · EPCIS · Serialization", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 11", "intro"));
body.push(P([{ t: "GS1 standards ", b: true }, "are the invisible plumbing of global commerce. Every retail POS scan, every pharma serialization, every recall relies on them. This volume covers the identifiers, data carriers, and applications you need for GS1-related roles — with special attention to Digital Link, EPCIS, and product authentication."]));
body.push(callout("note", [["Each topic ends with ", { t: "✅ Summary · 🎯 Interview · 💻 Coding · 🏭 Real-world · 🛠 Mini Project · 🚀 Advanced.", b: true }]]));
body.push(callout("interview", ["GS1 questions tend to test three things: (1) can you parse a GTIN and compute its check digit; (2) do you understand SGTIN/SSCC/GLN semantically; (3) can you design a traceability or authentication flow. Volume 11 drills all three."]));

// 1. GTIN
body.push(H1("1. GTIN — Global Trade Item Number", "ch1"));
body.push(callout("definition", ["The globally unique identifier for a trade item — a product, packaging level or service that can be priced, ordered, or invoiced. Encoded in the barcode on virtually every retail product."]));
body.push(table(["Format", "Digits", "Where used"], [
  ["GTIN-8", "8", "Very small items"],
  ["GTIN-12 (UPC-A)", "12", "North America retail"],
  ["GTIN-13 (EAN-13)", "13", "Rest of world (India default)"],
  ["GTIN-14", "14", "Cases (ITF-14 / GS1-128)"],
], [2000, 1600, 5760]));
body.push(code([
  "GTIN-13: 8 901234 000015",
  "  8901234 = GS1 company prefix (GCP)",
  "  00001   = Item reference",
  "  5       = Check digit (mod-10, weights 3,1,3,1…)",
], "structure"));
body.push(callout("interview", ["Every GTIN has GCP + item reference + check digit. Understanding this decomposition is fundamental — it's how you verify format, route look-ups, and split identifiers."]));
body.push(callout("mistake", ["Storing GTINs as integers (loses leading zeros) or int32 (overflows GTIN-13). Always store as a STRING, padded to full length."]));
body.push(...summary([
  "GTIN = unique trade item identifier.",
  "Formats: 8/12/13/14; India default = EAN-13.",
  "Structure = GCP + item reference + check digit.",
  "Store as string. Never reuse before GS1's cool-off window.",
]));
body.push(...interview([
  "What is a GTIN and what does it identify?",
  "GTIN-8/12/13/14 — where used?",
  "How to compute the check digit?",
  "Why do different pack sizes need different GTINs?",
  "GS1 rules on retiring / reusing GTINs?",
]));
body.push(...coding([
  { level: "Easy", text: "Compute the check digit for '890123400001' → 5." },
  { level: "Medium", text: "GTIN.isValid(code) supporting 8/12/13/14." },
  { level: "Hard", text: "Split EAN-13 into GCP + item reference (given GCP length)." },
  { level: "Expert", text: "Build a scan → local Isar cache → Digital Link fallback resolver." },
]));
body.push(...realworld(["Every EAN-13 scanned at your grocery is a GTIN. Every DSCSA/FMD pharma pack encodes an SGTIN (GTIN + serial). Getting GTIN right is table-stakes for any commerce app."]));
body.push(...miniproject(["Build a GTIN lookup app: scan barcode → validate → look up in a Firestore product catalog → cache offline."]));
body.push(...advanced(["GTIN reassignment policy, GS1 US vs GS1 Global rules, VMN (variable-measure GTINs) for fresh goods."]));

// 2. GLN
body.push(H1("2. GLN — Global Location Number", "ch2"));
body.push(callout("definition", ["13-digit identifier for a party or place — company, warehouse, store, hospital ward, dock door. How supply chain messages address 'where' or 'who'."]));
body.push(code([
  "GLN structure (13 digits): GCP + Location Reference + Check Digit",
  "SGLN extension in EPCIS: urn:epc:id:sgln:8901234.00021.dock5",
], "gln"));
body.push(callout("interview", ["One GLN can serve as multiple parties (ship-to, bill-to). In EDI and EPCIS, GLNs replace free-text addresses so the whole supply chain agrees on the same key."]));
body.push(...summary([
  "GLN identifies a party or place.",
  "Extensions identify sub-locations (dock, room).",
  "Same check-digit algorithm as GTIN.",
  "Used pervasively in EDI + EPCIS.",
]));
body.push(...interview([
  "What is a GLN?",
  "GLN vs GTIN?",
  "Physical vs functional GLN?",
  "What is an SGLN?",
  "How is GLN used in EDI / EPCIS?",
]));
body.push(...coding([
  { level: "Easy", text: "Compute a GLN check digit." },
  { level: "Medium", text: "Model warehouse + dock doors as GLN + extensions." },
  { level: "Hard", text: "Emit an EPCIS readPoint + bizLocation from a mobile scan." },
  { level: "Expert", text: "Design GLN allocation for a retailer with 500 stores." },
]));
body.push(...realworld(["Every large retailer maintains a GLN registry (thousands of locations). Getting it right is why orders/invoices route correctly across dozens of 3PLs and suppliers."]));
body.push(...miniproject(["Build a GLN admin app: manage physical + functional locations, emit SGLN URNs, export to EDI/EPCIS."]));
body.push(...advanced(["GLN batch registration, VBG (variable-basis GLNs), Global Data Model integration."]));

// 3. GCP
body.push(H1("3. GCP — GS1 Company Prefix", "ch3"));
body.push(callout("definition", ["The unique digit sequence GS1 licenses to a brand. Every GTIN/GLN/SSCC that brand issues starts with its GCP — that's what makes them globally unique."]));
body.push(callout("interview", ["GCP length is not encoded in the barcode. To split a GTIN into GCP + item reference, you need GS1's GCP-length table (per prefix range) or the GEPIR service. That's why 'brand from a GTIN' isn't trivial."]));
body.push(callout("mistake", ["Hard-coding 'GCP is always 7 digits.' It varies (7–12). Consult the length table or GEPIR API."]));
body.push(...summary([
  "GCP = the license root of a brand's GS1 identifiers.",
  "Length varies (7–12); consult the GCP-length table.",
  "Verified by GS1 / GEPIR resolve GCP → licensee.",
  "Cache the length table locally for offline splits.",
]));
body.push(...interview([
  "What is a GCP and how is it licensed?",
  "Why is GCP length variable?",
  "How do you find the licensee?",
  "Verified by GS1 vs GEPIR?",
  "How to cache the length table on mobile?",
]));
body.push(...coding([
  { level: "Easy", text: "Given a GTIN and GCP length, split into GCP + item reference." },
  { level: "Medium", text: "Fetch + cache the GCP-length table in Isar with a TTL." },
  { level: "Hard", text: "Local GEPIR-like brand lookup." },
  { level: "Expert", text: "Handle GCP length reassignment without breaking historical scans." },
]));
body.push(...realworld(["Every consumer-facing 'scan and find the brand' app depends on resolving GCPs. Verified by GS1 is a public consumer-facing use case."]));
body.push(...miniproject(["Build a brand-lookup app that reads any GTIN and shows the licensee, using a cached GCP → brand table."]));
body.push(...advanced(["GS1 Registry Platform APIs, prefix-range reassignments, private-label handling."]));

// 4. SSCC
body.push(H1("4. SSCC — Serial Shipping Container Code", "ch4"));
body.push(callout("definition", ["18-digit identifier for a logistics unit — pallet, carton, container — travelling through the supply chain. Every SSCC unique; never reuse for at least 12 months."]));
body.push(code([
  "SSCC = [Extension][GCP][Serial Ref][Check]",
  "On GS1-128 label: (00) 3 8901234 000000001 5",
], "sscc"));
body.push(callout("interview", ["GTIN = product type; SSCC = specific physical shipment container. Two identical pallets of the same GTIN each have their own SSCC — that's what enables track-and-trace of shipments."]));
body.push(...summary([
  "SSCC identifies a logistics unit.",
  "18 digits: extension + GCP + serial + check.",
  "Do not reuse for 12+ months.",
  "AI 00 in GS1-128 logistics labels.",
]));
body.push(...interview([
  "SSCC vs GTIN?",
  "Structure of an SSCC?",
  "Reuse rules?",
  "How is SSCC encoded on a label?",
  "How does SSCC fit into EPCIS aggregation?",
]));
body.push(...coding([
  { level: "Easy", text: "Compute SSCC check digit." },
  { level: "Medium", text: "Print a GS1-128 label with (00) SSCC and scan-test it." },
  { level: "Hard", text: "Per-warehouse allocator that never repeats." },
  { level: "Expert", text: "Model pallet → cartons → items in EPCIS aggregation events." },
]));
body.push(...realworld(["Every incoming pallet at a large DC scans its SSCC. That single scan cascades into receipt, put-away, and downstream events across dozens of systems."]));
body.push(...miniproject(["Build a warehouse receiving app: scan SSCC → look up ASN → confirm contents → emit ObjectEvent(receiving)."]));
body.push(...advanced(["SSCC in ASN (856), nested aggregation, SSCC uniqueness at scale (globally-issued vs per-DC)."]));

// 5. Digital Link
body.push(H1("5. GS1 Digital Link", "ch5"));
body.push(callout("definition", ["Web URL syntax for GS1 identifiers. Scan a URL like https://id.gs1.org/01/08901234000015 in any camera — no special app — and get a page. Can carry batch/serial/expiry too."]));
body.push(code([
  "https://id.gs1.org/01/08901234000015/10/BATCH42/17/261231/21/SN-777",
  "  01 = GTIN, 10 = batch, 17 = expiry (YYMMDD), 21 = serial",
], "digital link"));
body.push(callout("interview", ["Digital Link solves 'one barcode, many uses': a single QR on-pack can serve consumers (marketing), retailers (POS scan → GTIN), regulators (compliance), because the resolver dispatches by requesting context."]));
body.push(callout("mistake", ["Trusting arbitrary QR URLs as GS1 Digital Link. Validate structure: resolver + `/01/` + real GTIN + valid AIs."]));
body.push(...summary([
  "Web URL syntax for GS1 identifiers.",
  "Optional AIs in the URL path (batch/expiry/serial).",
  "Resolver returns context-appropriate content.",
  "Combines consumer QR + POS + regulatory in one code.",
]));
body.push(...interview([
  "What problem does Digital Link solve?",
  "How does the resolver work?",
  "How to encode batch/expiry/serial?",
  "Digital Link vs 1D at POS — trade-offs?",
  "How to validate a Digital Link on scan?",
]));
body.push(...coding([
  { level: "Easy", text: "Parse a Digital Link URL and extract GTIN + batch." },
  { level: "Medium", text: "Emit a valid Digital Link with GTIN + expiry + serial." },
  { level: "Hard", text: "Resolver stub returning different JSON by Accept header." },
  { level: "Expert", text: "Migrate an SKU line from EAN-13 to Digital Link QR on-pack." },
]));
body.push(...realworld(["Consumer brands are shipping Digital Link QRs today to replace both EAN-13 and marketing URLs. Retail POS is being upgraded to accept them alongside EAN-13."]));
body.push(...miniproject(["Build a resolver + Flutter consumer app: same QR shows nutrition to consumers and compliance data to inspectors (via a role toggle)."]));
body.push(...advanced(["Compressed Digital Link, brand resolver setup, GS1 Digital Link 1.4 features, W3C Verifiable Credentials integration."]));

// 6. DataMatrix
body.push(H1("6. DataMatrix", "ch6"));
body.push(callout("definition", ["Compact 2D matrix barcode with Reed-Solomon ECC. GS1 DataMatrix begins with FNC1 — payload is a stream of Application Identifiers."]));
body.push(code([
  "GS1 DataMatrix payload:",
  "  <FNC1> 01 08901234000015 17 261231 10 BATCH42 21 SN-777",
  "FNC1 = 0x1D (GS in ASCII), delimits variable-length AIs.",
], "gs1 datamatrix"));
body.push(callout("interview", ["DataMatrix dominates regulated industries (pharma DSCSA/FMD, medical UDI) because it fits GTIN + batch + expiry + serial on a tiny label."]));
body.push(callout("mistake", ["Ignoring FNC1 → parser can't tell where variable-length AIs end. Every GS1 DataMatrix parser must handle 0x1D."]));
body.push(...summary([
  "Compact 2D with Reed-Solomon ECC.",
  "GS1 mode: FNC1 + AI stream.",
  "Pharma / UDI standard.",
  "Handle FNC1 to parse correctly.",
]));
body.push(...interview([
  "How does GS1 DataMatrix signal AI data?",
  "Where does DataMatrix dominate?",
  "DataMatrix vs QR?",
  "How to parse variable-length AIs?",
  "What are the pharma 'four elements'?",
]));
body.push(...coding([
  { level: "Easy", text: "Parse a GS1 DataMatrix payload." },
  { level: "Medium", text: "Dart parser handling fixed + variable AIs + FNC1." },
  { level: "Hard", text: "Generate printable DataMatrix with 'four elements'." },
  { level: "Expert", text: "DSCSA-style verification: scan → parse → API check." },
]));
body.push(...realworld(["Every US prescription pack and every EU pharma pack carries a GS1 DataMatrix. Reading them is the foundation of the pharma supply chain."]));
body.push(...miniproject(["Build a pharmacy verifier: scan DataMatrix → decode 'four elements' → check against a mock DSCSA registry."]));
body.push(...advanced(["Rectangular DataMatrix DMRE, dot-peen marking on medical devices, GS1 CBV disposition mapping."]));

// 7. QR
body.push(H1("7. QR Code", "ch7"));
body.push(callout("definition", ["2D matrix with Reed-Solomon ECC, up to ~3 KB. The default consumer 'scan this' code."]));
body.push(table(["ECC level", "Recoverable damage", "Data capacity"], [
  ["L", "~7%", "Highest"],
  ["M", "~15%", "High"],
  ["Q", "~25%", "Medium"],
  ["H", "~30%", "Lowest"],
], [2400, 3500, 3460]));
body.push(callout("interview", ["Digital Link QR is the future for consumer-facing: one code serves POS + consumer + regulator. Choose ECC ≥ M; include a quiet zone; test on real devices under real lighting."]));
body.push(...summary([
  "Three flavors: plain, GS1 (FNC1+AIs), Digital Link.",
  "ECC L/M/Q/H trades capacity for damage tolerance.",
  "Quiet zone + module size affect real-world scan.",
  "Higher ECC for logos overlays.",
]));
body.push(...interview([
  "QR ECC levels — trade-offs?",
  "Why quiet zone matters?",
  "Plain vs GS1 vs Digital Link QR?",
  "QR vs DataMatrix?",
  "How do you size a QR for retail print?",
]));
body.push(...coding([
  { level: "Easy", text: "Generate a QR encoding a URL." },
  { level: "Medium", text: "Generate a GS1 QR with FNC1 + GTIN + batch + expiry." },
  { level: "Hard", text: "Compare scan reliability across ECC + module sizes." },
  { level: "Expert", text: "Labeling pipeline: Digital Link QR + logo + quiet-zone enforcement." },
]));
body.push(...realworld(["Payment QRs (UPI, WeChat Pay, Alipay), event tickets, product engagement — QR is the consumer scan of the decade."]));
body.push(...miniproject(["Build a QR generator/scanner that supports all three flavors + auto-detects which flavor was scanned."]));
body.push(...advanced(["Micro QR, structured append, rMQR (rectangular Micro QR), CameraX barcode scanning."]));

// 8. Standards
body.push(H1("8. Barcode Standards", "ch8"));
body.push(callout("definition", ["GS1 defines a family of symbologies for different use cases. The identifier (GTIN, SSCC…) is separate from the symbology (how bars/dots encode it)."]));
body.push(table(["Symbology", "Dim.", "Use"], [
  ["EAN-13 / UPC-A", "1D", "Retail POS"],
  ["ITF-14", "1D", "Cases / cartons"],
  ["GS1-128 (Code 128)", "1D", "Logistics labels (SSCC + AIs)"],
  ["GS1 DataBar", "1D", "Small items, coupons"],
  ["GS1 DataMatrix", "2D", "Pharma / UDI / serialized"],
  ["GS1 QR", "2D", "Consumer engagement + GS1 data"],
  ["Digital Link QR", "2D 'web'", "Multi-purpose default"],
], [2600, 1000, 5760]));
body.push(callout("interview", ["Two dimensions of choice: symbology (physical constraints) and content (which AIs). Pharma → DataMatrix + GTIN+batch+expiry+serial. Retail → EAN-13. Logistics → GS1-128 + SSCC."]));
body.push(...summary([
  "Symbology is separate from identifier.",
  "Choose by physical constraints + workflow.",
  "AIs are the language of GS1-128 and GS1 2D.",
  "Digital Link QR is a multi-purpose successor.",
]));
body.push(...interview([
  "The GS1 symbology family?",
  "How do you choose a symbology?",
  "What are Application Identifiers?",
  "GS1-128 vs Code 128?",
  "When choose DataMatrix over QR?",
]));
body.push(...coding([
  { level: "Easy", text: "Decode AI-encoded strings." },
  { level: "Medium", text: "Encode SSCC + weight for GS1-128 label." },
  { level: "Hard", text: "Symbology chooser for retail/case/pallet/pharma." },
  { level: "Expert", text: "End-to-end labeler from product spec → symbology + AIs." },
]));
body.push(...realworld(["A single grocery product may have EAN-13 on the unit, ITF-14 on the case, and GS1-128 on the pallet — three symbologies, same GTIN family."]));
body.push(...miniproject(["Build a 'label kit' generator: input product/pack level → correct symbology + AIs + printable output."]));
body.push(...advanced(["Composite symbols (linked 1D + 2D), GS1 DataBar Stacked, mobile-optimized decoding."]));

// 9. Authentication
body.push(H1("9. Product Authentication", "ch9"));
body.push(callout("definition", ["Uses GS1 identifiers (GTIN + serial) plus additional signals (crypto tokens, one-time codes, tamper evidence) so a consumer or supply-chain actor can verify a product is genuine."]));
body.push(callout("interview", ["The clever bit: serials are first-sale tokens. First scan after purchase is expected; subsequent scans of the same serial suggest either the buyer re-scanning or a clone. Server-side state turns a static barcode into a one-shot proof."]));
body.push(callout("mistake", ["Relying only on 'is this GTIN valid?' Counterfeiters copy GTINs trivially. Real authentication needs a UNIQUE per-item element (serial + server state, or crypto signature)."]));
body.push(...summary([
  "GTIN alone isn't authentication.",
  "Serial + server state catches clones (first-scan).",
  "Digital Link + signed token allows partial offline verify.",
  "Combine digital + tamper-evident physical layers.",
]));
body.push(...interview([
  "Why isn't GTIN alone sufficient?",
  "How does a serial defeat clones?",
  "Offline vs online authentication?",
  "How to combine physical + digital?",
  "Architect a scan-to-verify app.",
]));
body.push(...coding([
  { level: "Easy", text: "JSON response for authentic vs suspicious vs unknown." },
  { level: "Medium", text: "Server 'first-scan' state + abuse detection." },
  { level: "Hard", text: "Signed short tokens verifiable offline with a rotating key." },
  { level: "Expert", text: "Anti-cloning strategy combining tamper evidence + heuristics." },
]));
body.push(...realworld(["Luxury brands, pharma, wine, cosmetics — anywhere counterfeits threaten revenue or safety, scan-to-verify apps are already deployed at scale."]));
body.push(...miniproject(["Build a Flutter scan-to-verify app: green/yellow/red result, first-scan state on the server, geo + time heuristics."]));
body.push(...advanced(["W3C Verifiable Credentials, GS1 Web Vocabulary, decentralized identifiers (DIDs) for supply chain."]));

// 10. Traceability
body.push(H1("10. Product Traceability", "ch10"));
body.push(callout("definition", ["Ability to follow a product's journey — from raw ingredients through manufacturing, distribution, retail to consumer — and back for recall. GS1 keys let each step reference the same identifiers."]));
body.push(code([
  "'One up, one down' minimum:",
  "  Each actor records who they received from and who they shipped to.",
  "  Combined across the chain → full journey.",
  "",
  "Five W's of a traceable event:",
  "  What (GTIN/batch), When, Where (GLN), Why (bizStep), Who (party GLN)",
], "traceability"));
body.push(callout("interview", ["Traceability is NOT just recording events — it's ensuring the whole chain uses the SAME identifiers so events from Farm → Factory → Distributor → Retailer can be joined by GTIN + batch + SSCC. That's why GS1 keys are the bedrock."]));
body.push(callout("mistake", ["Free-text 'source' fields. Recalls collapse because 'batch #12' means different things per supplier. Use GTIN + batch + GLN — machine-joinable and audit-friendly."]));
body.push(...summary([
  "'One up, one down' is the industry minimum.",
  "Five W's captured in every event.",
  "Standard identifiers make cross-actor joins trivial.",
  "Rehearse recalls; know your <4 hour SLA for critical categories.",
]));
body.push(...interview([
  "Explain 'one up, one down'.",
  "The five W's of a traceable event?",
  "Why GS1 keys, not free text?",
  "How to architect a <4 hour recall?",
  "What data must every event carry?",
]));
body.push(...coding([
  { level: "Easy", text: "'Received / shipped' event with GTIN + batch + GLN." },
  { level: "Medium", text: "Simulate a recall using an EPCIS-like store." },
  { level: "Hard", text: "'Given batch, list current holders' via aggregation events." },
  { level: "Expert", text: "Industry-wide recall SLA + rehearsal design." },
]));
body.push(...realworld(["The 2020 romaine lettuce recall took days because chains couldn't join their traceability data. Standardization on GS1 is what enables faster recalls now."]));
body.push(...miniproject(["Build a mock food traceability portal: ingest 1M EPCIS events + query 'given GTIN + batch, list every retail location holding it'."]));
body.push(...advanced(["FSMA 204 (US food traceability), IUU fishing traceability, blockchain-based traceability (why it's often overkill), GS1 EPCIS 2.0 querying."]));

// 11. EPCIS
body.push(H1("11. EPCIS — Event-Based Visibility", "ch11"));
body.push(callout("definition", ["GS1 standard for event-based supply-chain visibility. Every meaningful action becomes a structured event with GS1 keys + timestamp + bizStep + disposition. v2.0 (2022) is JSON/JSON-LD."]));
body.push(table(["Event type", "Purpose"], [
  ["ObjectEvent", "Something happened to objects (ship/receive)"],
  ["AggregationEvent", "Pack/unpack objects into a container"],
  ["TransactionEvent", "Associate objects with a business tx (PO/invoice)"],
  ["TransformationEvent", "Inputs consumed → outputs produced (manufacturing)"],
], [3400, 5960]));
body.push(code([
  "{",
  "  \"type\": \"ObjectEvent\",",
  "  \"eventTime\": \"2026-07-01T10:15:30Z\",",
  "  \"epcList\": [\"urn:epc:id:sgtin:8901234.00001.SN-777\"],",
  "  \"action\": \"OBSERVE\",",
  "  \"bizStep\": \"urn:epcglobal:cbv:bizstep:shipping\",",
  "  \"disposition\": \"urn:epcglobal:cbv:disp:in_transit\",",
  "  \"readPoint\": { \"id\": \"urn:epc:id:sgln:8901234.00021.dock5\" },",
  "  \"bizLocation\": { \"id\": \"urn:epc:id:sgln:8901234.00021.0\" }",
  "}",
], "epcis"));
body.push(callout("interview", ["EPCIS standardizes 'what happened' across companies. Regulator, brand, retailer and 3PL each ingest the same event stream and reconstruct the same picture. v2.0 adopted JSON/JSON-LD so it feels native to REST engineers."]));
body.push(callout("mistake", ["Confusing readPoint (where the scan happened, e.g. dock door) with bizLocation (the business site the object is at). Different fields, different meanings."]));
body.push(...summary([
  "Four event types cover all supply-chain actions.",
  "CBV vocabularies (bizStep + disposition) drive dashboards.",
  "Store events append-only; distinguish readPoint vs bizLocation.",
  "v2.0 is JSON/JSON-LD.",
]));
body.push(...interview([
  "Four EPCIS event types?",
  "readPoint vs bizLocation?",
  "How does EPCIS enable cross-actor traceability?",
  "EPCIS 1.x vs 2.0?",
  "How do you query event history?",
]));
body.push(...coding([
  { level: "Easy", text: "Emit ObjectEvent JSON for 'shipping'." },
  { level: "Medium", text: "AggregationEvent packing 10 SGTINs into an SSCC." },
  { level: "Hard", text: "Query event history for an SGTIN across a stream store." },
  { level: "Expert", text: "CBV-driven dashboards for a mock retailer." },
]));
body.push(...realworld(["Pharma DSCSA (US) and FMD (EU) rely on EPCIS-like event streams. Retailers use it for fresh food (FSMA), luxury brands for anti-counterfeit."]));
body.push(...miniproject(["Build a Flutter + Firebase EPCIS emitter: mobile scan → event → EPCIS repository → dashboard."]));
body.push(...advanced(["EPCIS 2.0 querying (WHERE, subscriptions), streaming EPCIS with Kafka, GS1 EPCIS + Verifiable Credentials."]));

// 12. Serialization
body.push(H1("12. Serialization", "ch12"));
body.push(callout("definition", ["Attaches a unique per-unit identifier to each physical item. GTIN identifies the product type; serialization identifies this specific bottle / this specific pallet. SGTIN = GTIN + serial."]));
body.push(code([
  "SGTIN URN:  urn:epc:id:sgtin:8901234.00001.SN-777",
  "                              GCP     Item   Serial",
  "",
  "Regulatory 'four elements' (DSCSA, EU FMD):",
  "  GTIN + Serial + Batch + Expiry",
], "sgtin"));
body.push(callout("interview", ["Serial-space design matters: random serials for tamper resistance vs counter serials for auditability — never mix. Keep the space large (10–12 chars). Reserve an HMAC-like segment if you want offline validation."]));
body.push(callout("mistake", ["Sequential public serials 000001, 000002, … Attackers infer volumes and mint valid-looking clones. Prefer randomized or format-preserving encrypted serials."]));
body.push(...summary([
  "SGTIN = GTIN + serial for per-unit identity.",
  "'Four elements' = GTIN + serial + batch + expiry.",
  "Random > sequential public serials.",
  "Commissioning event → EPCIS on allocation.",
]));
body.push(...interview([
  "GTIN vs SGTIN vs SSCC?",
  "How would you allocate serials for a pharma line?",
  "What are the 'four elements'?",
  "Why avoid sequential public serials?",
  "How do serials integrate with EPCIS?",
]));
body.push(...coding([
  { level: "Easy", text: "Emit SGTIN URN from a GTIN + serial." },
  { level: "Medium", text: "Serial allocator: unique + auditable log." },
  { level: "Hard", text: "EPCIS commissioning event for 10k serials." },
  { level: "Expert", text: "Two-stage anti-counterfeit: printed serial + server-signed Digital Link token." },
]));
body.push(...realworld(["Every US prescription pack, every EU pharma pack, and increasingly every luxury item carries a per-unit serial. Serialization is the foundation of modern regulated supply chains."]));
body.push(...miniproject(["Build a pharma serialization service: allocate serials, commission via EPCIS, verify on scan through a resolver."]));
body.push(...advanced(["Aggregation → shipment (SSCC), sub-serialization for kits, GS1 CBV bizSteps for commissioning/decommissioning, GS1 Registry Platform."]));

// Revision
body.push(H1("Volume 11 Revision Cheat Sheet", "cheat"));
body.push(H2("The identifier alphabet"));
body.push(callout("note", ["GTIN = trade item. GLN = party/place. GCP = the license root. SSCC = logistics unit. SGTIN = specific physical unit. All share the mod-10 check-digit algorithm."]));
body.push(H2("Symbology → workflow map"));
body.push(callout("best", ["Retail unit → EAN-13. Case → ITF-14. Pallet → GS1-128. Pharma/UDI → DataMatrix (with 'four elements'). Consumer engagement + POS → Digital Link QR."]));
body.push(H2("Event vocabulary"));
body.push(callout("perf", ["Every EPCIS event captures 5 W's: What (GTIN/batch/serial), When, Where (readPoint + bizLocation), Why (bizStep), Who (party GLN). Store append-only; query via CBV vocabularies."]));
body.push(rule(C.green));
body.push(P([{ t: "End of Volume 11. ", b: true, color: C.navy }, "Next: Volume 12 — DevOps & Cloud (Git flow, CI/CD, GitHub Actions, Codemagic, Fastlane, Docker, K8s, store delivery)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 11 — GS1 & Barcode Technologies"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-11-GS1.docx");
save(doc, out).then(() => console.log("WROTE", out));
