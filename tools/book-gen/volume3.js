// VOLUME 3 — Android Development
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
body.push(...topicToChapter(loadTopic("level_03", "fundamentals"),
  { chapterNumber: 1, bookmarkId: "ch1" }));

// 2. Activity Lifecycle
body.push(...topicToChapter(loadTopic("level_03", "activity_lifecycle"),
  { chapterNumber: 2, bookmarkId: "ch2" }));

// 3. Fragments
body.push(...topicToChapter(loadTopic("level_03", "fragments"),
  { chapterNumber: 3, bookmarkId: "ch3" }));

// 4. Intents
body.push(...topicToChapter(loadTopic("level_03", "intents"),
  { chapterNumber: 4, bookmarkId: "ch4" }));

// 5. Services
body.push(...topicToChapter(loadTopic("level_03", "services"),
  { chapterNumber: 5, bookmarkId: "ch5" }));

// 6. Broadcast Receivers
body.push(...topicToChapter(loadTopic("level_03", "broadcast_receivers"),
  { chapterNumber: 6, bookmarkId: "ch6" }));

// 7. Content Providers
body.push(...topicToChapter(loadTopic("level_03", "content_providers"),
  { chapterNumber: 7, bookmarkId: "ch7" }));

// 8. WorkManager
body.push(...topicToChapter(loadTopic("level_03", "workmanager"),
  { chapterNumber: 8, bookmarkId: "ch8" }));

// 9. Jetpack
body.push(...topicToChapter(loadTopic("level_03", "jetpack"),
  { chapterNumber: 9, bookmarkId: "ch9" }));

// 10. Room
body.push(...topicToChapter(loadTopic("level_03", "room"),
  { chapterNumber: 10, bookmarkId: "ch10" }));

// 11. Hilt
body.push(...topicToChapter(loadTopic("level_03", "hilt"),
  { chapterNumber: 11, bookmarkId: "ch11" }));

// 12. Coroutines
body.push(...topicToChapter(loadTopic("level_03", "coroutines"),
  { chapterNumber: 12, bookmarkId: "ch12" }));

// 13. Kotlin for Android
body.push(...topicToChapter(loadTopic("level_03", "kotlin"),
  { chapterNumber: 13, bookmarkId: "ch13" }));

// 14. Performance
body.push(...topicToChapter(loadTopic("level_03", "performance"),
  { chapterNumber: 14, bookmarkId: "ch14" }));

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
const out = require("path").join(__dirname, "../../docs/books/Volume-3-Android.docx");
save(doc, out).then(() => console.log("WROTE", out));
