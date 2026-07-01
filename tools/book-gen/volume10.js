// VOLUME 10 — Flutter Plugins (27)
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
      border: { top: { style: L.BorderStyle.SINGLE, size: 18, color: C.blue, space: 8 },
                bottom: { style: L.BorderStyle.SINGLE, size: 18, color: C.blue, space: 8 } },
      children: [new TextRun({ text: "VOLUME 10", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "Flutter Plugins", size: 32, color: C.blue, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "27 essential plugins — install, native config, best practices, pitfalls, real usage.", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Networking · State · Storage · Firebase · Maps · Media · Platform · Scanning", size: 20, color: C.grayText })] }),
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

const chapter = (title, def, points, mistake, tip) => {
  const out = [H1(title)];
  out.push(callout("definition", [def]));
  points.forEach((p) => bullet(p) && out.push(bullet(p)));
  if (mistake) out.push(callout("mistake", [mistake]));
  if (tip) out.push(callout("tip", [tip]));
  return out;
};

const body = [];

body.push(H1("How to Use Volume 10", "intro"));
body.push(P([{ t: "Plugins are how Flutter meets the platform. ", b: true }, "This volume covers 27 plugins you'll use across nearly every real Flutter app — organized by domain. Each chapter focuses on plugin-specific concerns: install, native config, pitfalls, and best practices. State, storage, and Firebase fundamentals are covered in Volumes 5, 8, and 9 respectively."]));
body.push(callout("note", ["Every chapter is short — the goal is a lookup-friendly reference. For deeper concept work, see the linked volumes."]));

// ---- Networking ----
body.push(H1("Part I — Networking", "part1"));

body.push(H2("1. Dio"));
body.push(callout("definition", ["De-facto HTTP client for Flutter — interceptors, form data, cancellation, upload/download progress."]));
body.push(code([
  "final dio = Dio(BaseOptions(baseUrl: '...'));",
  "dio.interceptors.addAll([Log(), Auth(), Retry()]);",
  "final res = await dio.get('/users', cancelToken: token);",
], "dio"));
body.push(callout("tip", ["One Dio per API; interceptors for auth/retry/logging; CancelToken per screen; map DioException to a typed AppError."]));
body.push(callout("mistake", ["Sharing one global Dio with no cancel token — background requests keep running after users leave a screen."]));

body.push(H2("2. http (package)"));
body.push(callout("definition", ["Dart's official minimal HTTP client — just enough for simple REST."]));
body.push(callout("tip", ["Reuse a single http.Client for connection pooling. Graduate to Dio when you need interceptors/retries/cancellation."]));

body.push(H2("3. Retrofit"));
body.push(callout("definition", ["Codegen typed HTTP client on top of Dio: `@GET`/`@POST` annotations → generated implementation."]));
body.push(code([
  "@RestApi(baseUrl: 'https://api.example.com')",
  "abstract class UserApi {",
  "  factory UserApi(Dio dio) = _UserApi;",
  "  @GET('/users/{id}') Future<User> get(@Path('id') String id);",
  "}",
], "retrofit"));
body.push(callout("tip", ["Combine with json_serializable/freezed models. Inject a fake for tests. Re-run build_runner after annotation changes."]));

body.push(H2("4. cached_network_image"));
body.push(callout("definition", ["Caches network images to disk/memory with placeholder + errorWidget."]));
body.push(callout("tip", ["Set `memCacheWidth`/`memCacheHeight` to widget size — avoids OOM from 4000-px images in 80-px thumbnails. Clear cache on logout."]));

// ---- State ----
body.push(H1("Part II — State Management", "part2"));

body.push(H2("5. provider"));
body.push(callout("definition", ["Lightweight wrapper over InheritedWidget for DI + state (ChangeNotifier, Streams, Futures, Proxy)."]));
body.push(callout("tip", ["watch/read/Selector; use ProxyProvider for derived state; move to Riverpod when compile-safety matters."]));

body.push(H2("6. flutter_bloc"));
body.push(callout("definition", ["Bindings for BLoC/Cubit: BlocProvider, BlocBuilder, BlocListener, BlocConsumer, RepositoryProvider."]));
body.push(code([
  "BlocProvider(create: (_) => CounterCubit(),",
  "  child: BlocBuilder<CounterCubit, int>(",
  "    builder: (c, s) => Text('$s'),",
  "  ),",
  ");",
], "flutter_bloc"));
body.push(callout("tip", ["BlocBuilder for UI; BlocListener for side effects. Add a BlocObserver for global logging. Use bloc_test for state-sequence assertions."]));

body.push(H2("7. flutter_riverpod"));
body.push(callout("definition", ["Compile-safe DI + state. Wrap the app in ProviderScope; widgets extend ConsumerWidget."]));
body.push(callout("tip", ["watch in build, read in callbacks, listen for side effects. autoDispose for screen-scoped providers; family for parameterized. Test with ProviderScope overrides."]));

// ---- Storage ----
body.push(H1("Part III — Storage", "part3"));

body.push(H2("8. hive"));
body.push(callout("definition", ["Pure-Dart NoSQL key-value store; boxes are files on disk."]));
body.push(callout("tip", ["Register adapters BEFORE openBox. Encrypt sensitive boxes with HiveAesCipher + key in flutter_secure_storage. Only add @HiveFields — never renumber existing ones."]));

body.push(H2("9. flutter_secure_storage"));
body.push(callout("definition", ["Stores small secrets in iOS Keychain / Android EncryptedSharedPreferences (Keystore-backed)."]));
body.push(callout("tip", ["Small secrets only (tokens). iOS: choose `first_unlock` accessibility if you need background refresh. Clear on logout."]));

body.push(H2("10. shared_preferences"));
body.push(callout("definition", ["Tiny primitive KV over Android SharedPreferences / iOS NSUserDefaults."]));
body.push(callout("mistake", ["Storing auth tokens or JSON blobs here. Use flutter_secure_storage or Hive/Isar/Drift instead."]));

body.push(H2("11. drift"));
body.push(callout("definition", ["Reactive typed SQL layer over SQLite: tables in Dart or .drift files, codegen produces DAOs and Streams."]));
body.push(callout("tip", ["Run on a background isolate with `NativeDatabase.createInBackground()`. Bump `schemaVersion` + MigrationStrategy for every schema change."]));

body.push(H2("12. isar"));
body.push(callout("definition", ["Native NoSQL DB with codegen schemas, indexes, FTS, links and reactive queries."]));
body.push(callout("tip", ["Batch writes inside a single writeTxn(). One index per query — design indexes for top queries. watch() streams for reactive UI."]));

// ---- Firebase & Location ----
body.push(H1("Part IV — Firebase, Maps & Location", "part4"));

body.push(H2("13. Firebase packages (FlutterFire)"));
body.push(callout("definition", ["firebase_core plus one package per product; configure with flutterfire_cli → firebase_options.dart."]));
body.push(callout("tip", ["Multi-env: configure twice, choose per flavor. Keep versions in sync. Test with Firebase Emulator Suite. Enable App Check."]));

body.push(H2("14. google_maps_flutter"));
body.push(callout("definition", ["Embeds a native Google Map inside a Flutter widget with markers, polylines, camera control."]));
body.push(callout("tip", ["Restrict API keys per platform + bundle ID in Cloud Console. Cluster > few-hundred markers. For heavy custom tiling consider Mapbox/MapLibre."]));

body.push(H2("15. geolocator"));
body.push(callout("definition", ["Current position + distance/bearing calculations + a position stream, with permission plumbing."]));
body.push(callout("tip", ["Use `LocationAccuracy.medium` + a distanceFilter for battery-friendly tracking. Request whileInUse before always. Add proper Info.plist / manifest strings."]));

// ---- Media ----
body.push(H1("Part V — Media", "part5"));

body.push(H2("16. camera"));
body.push(callout("definition", ["Low-level access: enumerate cameras, preview, capture stills, record videos."]));
body.push(callout("tip", ["Dispose CameraController in State.dispose() AND on AppLifecycleState.paused. Pick appropriate ResolutionPreset — max resolution overheats devices."]));

body.push(H2("17. image_picker"));
body.push(callout("definition", ["Opens system gallery/camera and returns a picked file."]));
body.push(callout("tip", ["Use `imageQuality`/`maxWidth` for cheap compression. Handle iOS 14+ limited-photo access. For richer selection use photo_manager + image_cropper."]));

body.push(H2("18. video_player"));
body.push(callout("definition", ["Plays videos via ExoPlayer (Android) / AVPlayer (iOS) — the low-level primitive."]));
body.push(callout("tip", ["Wrap with Chewie / better_player for UI controls. Always dispose. Auto-pause off-screen with visibility_detector. For HLS at scale use a CDN + better_player."]));

body.push(H2("19. file_picker"));
body.push(callout("definition", ["Opens platform document picker; returns single/multiple files with type filters."]));
body.push(callout("mistake", ["`withData: true` on big files loads them into memory (OOM). Stream via path instead. Copy to your docs directory if you need durable paths."]));

// ---- Platform ----
body.push(H1("Part VI — Platform Integration", "part6"));

body.push(H2("20. webview_flutter"));
body.push(callout("definition", ["Embeds a native WebView (WKWebView / WebView) with a controller-based API."]));
body.push(callout("tip", ["Whitelist navigation origins; treat addJavaScriptChannel input as untrusted. For OAuth, prefer flutter_web_auth_2 / ASWebAuthenticationSession over an embedded WebView."]));

body.push(H2("21. permission_handler"));
body.push(callout("definition", ["Unified runtime permission requests + status + settings redirect."]));
body.push(callout("tip", ["Request in-context (on user action) with a pre-prompt. Handle `permanentlyDenied` with `openAppSettings()`. Add Info.plist keys + manifest entries."]));

body.push(H2("22. local_auth"));
body.push(callout("definition", ["Biometric authentication (Face ID / Touch ID / fingerprint) + device-passcode fallback."]));
body.push(callout("mistake", ["Treating `authenticate() == true` as data protection. It only verifies presence — pair with Keystore-bound keys or secure storage for real security."]));

body.push(H2("23. flutter_local_notifications"));
body.push(callout("definition", ["Schedule and show OS notifications from the app — reminders, alarms, timers — without a server."]));
body.push(callout("tip", ["Create Android channels once. Android 13+ needs POST_NOTIFICATIONS runtime permission. Use `timezone` for DST-safe scheduling. Exact alarms on Android 12+ need SCHEDULE_EXACT_ALARM."]));

body.push(H2("24. workmanager"));
body.push(callout("definition", ["Wraps Android WorkManager + iOS BGTaskScheduler for background Dart work with constraints and retries."]));
body.push(callout("mistake", ["Assuming iOS runs your task on schedule — BGTasks are opportunistic and rare. Also: forgetting to re-init plugins/DI inside the fresh isolate `callbackDispatcher`."]));

// ---- Scanning ----
body.push(H1("Part VII — Scanning", "part7"));

body.push(H2("25. mobile_scanner"));
body.push(callout("definition", ["Lightweight barcode/QR scanner using Google ML Kit under the hood."]));
body.push(callout("tip", ["Restrict formats to what you scan. Debounce duplicate reads. Dispose the controller on route exit."]));

body.push(H2("26. Google ML Kit"));
body.push(callout("definition", ["On-device ML primitives via Flutter packages — text/face/barcode/pose recognition, translation, and custom TFLite models."]));
body.push(callout("tip", ["Reuse detector instances; throttle to N frames/sec. Bundled vs Play-services models is a size-vs-first-launch tradeoff. Always `close()` detectors."]));

body.push(H2("27. Scandit SDK"));
body.push(callout("definition", ["Commercial enterprise scanning SDK — hostile conditions, damaged codes, multi-code batches. Licensed."]));
body.push(callout("interview", ["When to justify Scandit's cost? Enterprise/retail/GS1 workflows where 2-3× faster scans and near-100% accuracy on damaged codes directly affect throughput and revenue."]));

// ---- Revision ----
body.push(H1("Volume 10 Revision Cheat Sheet", "cheat"));
body.push(H2("Pick-the-plugin quick chart"));
body.push(table(["Need", "Reach for"], [
  ["Simple HTTP", "package:http"],
  ["Rich HTTP + interceptors + cancel", "dio (+ retrofit for typing)"],
  ["Image cache", "cached_network_image"],
  ["Baseline state", "provider"],
  ["Event-driven complex state", "flutter_bloc"],
  ["Compile-safe DI + state", "flutter_riverpod"],
  ["Small secrets", "flutter_secure_storage"],
  ["Tiny primitive settings", "shared_preferences"],
  ["Local KV cache", "hive"],
  ["Local SQL + reactive", "drift"],
  ["Local NoSQL + speed", "isar"],
  ["Auth / DB / analytics", "FlutterFire packages"],
  ["Maps", "google_maps_flutter"],
  ["Location", "geolocator"],
  ["Photo/Video pick", "image_picker"],
  ["Camera preview", "camera"],
  ["Video playback", "video_player + chewie"],
  ["Arbitrary files", "file_picker"],
  ["Embedded web", "webview_flutter"],
  ["Runtime permissions", "permission_handler"],
  ["Biometrics", "local_auth"],
  ["Reminders / alarms", "flutter_local_notifications"],
  ["Guaranteed background", "workmanager"],
  ["Consumer QR/barcode", "mobile_scanner"],
  ["On-device ML", "Google ML Kit"],
  ["Enterprise scanning", "Scandit SDK"],
], [4680, 4680]));
body.push(H2("Universal safety rules"));
body.push(callout("best", ["Set up native config (Info.plist / Manifest) BEFORE writing Dart. Add per-flavor keys via build config. Dispose controllers/subscriptions. Test failure paths (denied permission, offline, huge file, background isolate)."]));
body.push(rule(C.blue));
body.push(P([{ t: "End of Volume 10. ", b: true, color: C.navy }, "Next: Volume 11 — GS1 & Barcode Technologies (GTIN, GLN, GCP, SSCC, Digital Link, DataMatrix, EPCIS, Traceability)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 10 — Flutter Plugins"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-10-Plugins.docx");
save(doc, out).then(() => console.log("WROTE", out));
