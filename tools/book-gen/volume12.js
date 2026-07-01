// VOLUME 12 — DevOps & Cloud
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
      children: [new TextRun({ text: "VOLUME 12", bold: true, size: 56, color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
      children: [new TextRun({ text: "DevOps & Cloud", size: 32, color: C.purple, bold: true })] }),
    ...blank(2),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Git · Git Flow · CI/CD · GitHub Actions", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Codemagic · Fastlane · Docker · Kubernetes", size: 20, color: C.grayText })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "App Distribution · Play Console · App Store Connect · TestFlight", size: 20, color: C.grayText })] }),
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

body.push(H1("How to Use Volume 12", "intro"));
body.push(P([{ t: "DevOps is what turns 'my code works' into 'my code works for everyone, safely, every time.' ", b: true }, "This volume covers the source-control workflows, CI/CD patterns, mobile automation stack (Codemagic, Fastlane), containers & orchestration, and store delivery pipelines you need to ship real software professionally."]));
body.push(callout("note", [["Each topic ends with ", { t: "✅ Summary · 🎯 Interview · 💻 Coding · 🏭 Real-world · 🛠 Mini Project · 🚀 Advanced.", b: true }]]));
body.push(callout("interview", ["Senior DevOps interviews test one theme: 'How would you design a delivery pipeline for [app type]?' Answer with: branch strategy → PR gates → CI matrix → build once → registry → GitOps deploy → progressive rollout → SLO gate → rollback plan. Volume 12 arms you with the full vocabulary."]));

// 1. Git
body.push(H1("1. Git & GitHub", "ch1"));
body.push(callout("definition", ["Git tracks snapshots (commits) as an immutable graph; GitHub adds cloud hosting + PRs + code review + Actions. The default collaboration platform for most teams."]));
body.push(code([
  "git switch -c feat/x",
  "git commit -m \"...\"",
  "git push -u origin feat/x   # -> open PR -> review -> squash-merge",
  "",
  "# rescue",
  "git reflog",
  "git cherry-pick <sha>",
  "git revert  <sha>",
], "git"));
body.push(callout("interview", ["Senior habits: small commits, imperative subjects, one logical change per PR, squash-merge default, protect main with 'require CI + review', rebase feature branches, never force-push shared branches."]));
body.push(callout("mistake", ["Force-pushing main. If you must fix public branches, use `revert`. Reserve `--force-with-lease` for your own feature branches."]));
body.push(...summary([
  "Commit small, PR often, review always.",
  "reflog is your safety net; revert is safe for shared history.",
  "Branch protection + CODEOWNERS + required checks on main.",
  "Actions/env secrets — never in git.",
]));
body.push(...interview([
  "reset vs revert vs restore?",
  "How do you recover lost work?",
  "What is CODEOWNERS?",
  "Rebase vs merge for feature branches?",
  "How to keep clean PR history?",
]));
body.push(...coding([
  { level: "Easy", text: "Open a PR, request review, squash-merge." },
  { level: "Medium", text: "Rewrite messy commits with interactive rebase before opening PR." },
  { level: "Hard", text: "Recover a lost branch via reflog." },
  { level: "Expert", text: "Configure branch protection + CODEOWNERS + required CI matrix." },
]));
body.push(...realworld(["Every SDLC starts with git. Bad hygiene there (huge PRs, dirty history, no protection) cascades into painful reviews, broken bisect, and lost commits."]));
body.push(...miniproject(["Rewrite your team's contribution guide: PR size targets, commit conventions, protection rules, and required checks."]));
body.push(...advanced(["Signed commits (Sigstore/gitsign), monorepo tooling (sparse-checkout, partial clone), git hooks vs pre-commit framework."]));

// 2. Git Flow
body.push(H1("2. Git Flow (& alternatives)", "ch2"));
body.push(callout("definition", ["A branching strategy defines how features, releases, and hotfixes flow through git. Git Flow uses long-lived develop + release; GitHub Flow uses main + short-lived feature branches; Trunk-Based merges everything to main with feature flags."]));
body.push(table(["Strategy", "Best for"], [
  ["Git Flow", "Versioned/SDK/on-prem releases"],
  ["GitHub Flow", "Continuous-deploy web apps"],
  ["Trunk-Based", "High-velocity CD teams"],
  ["Main + release/x.y", "Mobile app store cadence"],
], [3400, 5960]));
body.push(callout("interview", ["Modern high-velocity teams don't use Git Flow — the long-lived develop branch adds friction. Trunk-Based + feature flags is the norm; long-lived feature branches are the anti-pattern."]));
body.push(...summary([
  "Feature flags replace branch-based delay of unfinished work.",
  "Short branches (<1 day) integrate cleanly.",
  "Mobile: main + release/x.y for store cuts.",
  "Cherry-pick hotfixes to release branches; keep main moving.",
]));
body.push(...interview([
  "Git Flow vs GitHub Flow vs Trunk-Based?",
  "When does Git Flow still make sense?",
  "How do feature flags relate to branching?",
  "How to manage mobile release branches?",
  "How do you avoid painful merges?",
]));
body.push(...coding([
  { level: "Easy", text: "Set up main + release/x.y for mobile." },
  { level: "Medium", text: "Cherry-pick a hotfix from main into an active release branch." },
  { level: "Hard", text: "Introduce feature flags to hide an incomplete refactor in main." },
  { level: "Expert", text: "Migrate a Git Flow repo to Trunk-Based safely." },
]));
body.push(...realworld(["Google, Facebook, and most modern SaaS use Trunk-Based. Enterprises with slow release cycles / SDKs sometimes still use Git Flow — pick by cadence, not fashion."]));
body.push(...miniproject(["Document your team's branching model with a diagram, protection rules, and 'when to cut a release branch' criteria."]));
body.push(...advanced(["Stacked PRs (Graphite/spr), feature-flag hygiene (retirement), continuous merge (Aviator, MergeQueue)."]));

// 3. CI/CD
body.push(H1("3. CI / CD", "ch3"));
body.push(callout("definition", ["CI merges frequently and runs tests on every push. CD = Continuous Delivery (always production-ready) or Continuous Deployment (auto-deploy every merge). Different discipline; both aim for fast, safe change."]));
body.push(code([
  "Canonical mobile pipeline:",
  "  push -> checkout -> deps cache -> analyze/lint",
  "       -> unit + widget tests",
  "       -> build (AAB / IPA) with per-flavor keys",
  "       -> distribute artifacts",
  "       -> [approval gate]",
  "       -> internal -> beta -> production",
], "pipeline"));
body.push(callout("interview", ["Mature mobile pipeline gates promotion on THREE signals: tests green, static analysis clean, and crash-free % stable vs shipped version. That's what makes 'weekly release' also 'safe weekly release'."]));
body.push(callout("mistake", ["Baking secrets into pipeline logs; mutable action/image tags; rebuilding for each environment (loses reproducibility)."]));
body.push(...summary([
  "CI feedback under 10 minutes = flow.",
  "Build once, promote same digest.",
  "Three gates: tests + analysis + stability.",
  "Rollback plan is part of the pipeline, not an afterthought.",
]));
body.push(...interview([
  "CI vs CD (both meanings)?",
  "Design a mobile CI/CD pipeline.",
  "How to speed up a slow pipeline?",
  "How to gate production promotion?",
  "How do you handle rollback?",
]));
body.push(...coding([
  { level: "Easy", text: "Add a CI job that runs `flutter analyze` + tests on PR." },
  { level: "Medium", text: "Nightly build producing signed AAB + IPA artifacts." },
  { level: "Hard", text: "Promotion pipeline main → App Distribution → Play Internal → Prod-on-tag." },
  { level: "Expert", text: "Crash-free % gate that blocks production promotion." },
]));
body.push(...realworld(["Elite teams (per DORA) deploy on-demand, restore service in <1 hour, and have change-failure rate <15%. Pipelines are how they get there."]));
body.push(...miniproject(["Convert a project's manual release process into a fully automated pipeline; measure lead time from push → prod before + after."]));
body.push(...advanced(["Progressive delivery, DORA metrics dashboards, deployment rings, feature-flag-driven release strategies."]));

// 4. GitHub Actions
body.push(H1("4. GitHub Actions", "ch4"));
body.push(callout("definition", ["GitHub's built-in CI/CD: YAML workflows in .github/workflows/, triggered by events, running jobs in parallel on hosted or self-hosted runners with reusable actions from the marketplace."]));
body.push(code([
  "name: Flutter CI",
  "on: { push: { branches: [main] }, pull_request: {} }",
  "jobs:",
  "  test:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: subosito/flutter-action@v2",
  "        with: { channel: stable }",
  "      - run: flutter pub get",
  "      - run: flutter analyze",
  "      - run: flutter test --coverage",
], "workflow"));
body.push(callout("interview", ["Senior touches: cache pub/Gradle/Pods, concurrency: cancel-in-progress, environments with required reviewers, and OIDC-based cloud auth (no long-lived cloud keys)."]));
body.push(callout("mistake", ["Referencing actions by @main or @v1. Pin by commit SHA in security-sensitive workflows."]));
body.push(...summary([
  "Workflows in .github/workflows/*.yml.",
  "Jobs run in parallel; steps sequentially.",
  "Cache deps + cancel superseded runs.",
  "Environments + secrets + OIDC federation.",
]));
body.push(...interview([
  "Workflow structure?",
  "How to speed up CI jobs?",
  "How to handle secrets safely?",
  "Reusable workflows vs composite actions?",
  "Why pin by SHA?",
]));
body.push(...coding([
  { level: "Easy", text: "Workflow: analyze + test on PR + push." },
  { level: "Medium", text: "Cache pub/Gradle; measure improvement." },
  { level: "Hard", text: "Release workflow: build signed AAB + IPA on tag." },
  { level: "Expert", text: "OIDC-federate GitHub → GCP for keyless uploads." },
]));
body.push(...realworld(["Most open source and a huge share of enterprise CI is Actions today. Its marketplace is a superpower — and a supply-chain surface, so pin carefully."]));
body.push(...miniproject(["Convert an existing CircleCI/Bitrise pipeline to GitHub Actions with matrix + caching + environments."]));
body.push(...advanced(["Self-hosted runners on K8s (arc), Actions runner controller, workflow attestation, GitHub-hosted larger runners."]));

// 5. Codemagic
body.push(H1("5. Codemagic", "ch5"));
body.push(callout("definition", ["Hosted CI/CD purpose-built for Flutter (also RN and native). codemagic.yaml at repo root; handles macOS iOS builds without owning a Mac; publishes to Play + App Store."]));
body.push(code([
  "workflows:",
  "  release:",
  "    instance_type: mac_mini_m2",
  "    scripts:",
  "      - flutter test",
  "      - flutter build ipa --export-options-plist=$CM_BUILD_DIR/ios/ExportOptions.plist",
  "      - flutter build appbundle",
  "    publishing:",
  "      app_store_connect: { auth: integration, submit_to_testflight: true }",
  "      google_play:       { credentials: $GCP_JSON, track: internal }",
], "codemagic"));
body.push(callout("interview", ["Codemagic's edge over Actions is mobile-first ergonomics: iOS signing, App Store Connect API integration, screenshots via Fastlane, macOS instances included."]));
body.push(callout("tip", ["Split workflows: pr_check (fast, no signing) / nightly (App Distribution) / release (Play + TestFlight from tag). Share secrets across workflows via groups."]));
body.push(...summary([
  "Purpose-built for Flutter mobile CI.",
  "codemagic.yaml describes workflows + publishing.",
  "Hosted macOS + built-in signing.",
  "Layered workflows keep signals fast + safe.",
]));
body.push(...interview([
  "Codemagic vs GitHub Actions for Flutter?",
  "How does it handle iOS signing?",
  "How to structure codemagic.yaml?",
  "How to share secrets across workflows?",
  "How to cache dependencies?",
]));
body.push(...coding([
  { level: "Easy", text: "codemagic.yaml with a PR-check running `flutter test`." },
  { level: "Medium", text: "Release workflow uploading to TestFlight + Play Internal." },
  { level: "Hard", text: "Three flavors (dev/staging/prod) with separate signing + Firebase config." },
  { level: "Expert", text: "Screenshot automation via Fastlane inside Codemagic." },
]));
body.push(...realworld(["Many Flutter agencies and startups use Codemagic because the Mac-in-cloud + native Flutter integration removes real friction."]));
body.push(...miniproject(["Ship a Flutter app end-to-end from Codemagic: PR check → nightly App Distribution → tag → Play + TestFlight."]));
body.push(...advanced(["Codemagic + Bitrise + Actions hybrid strategies, cache tuning, custom images."]));

// 6. Fastlane
body.push(H1("6. Fastlane", "ch6"));
body.push(callout("definition", ["Ruby-based mobile automation toolkit: match (shared iOS signing), deliver (App Store), supply (Play), snapshot/screengrab (screenshots), pilot (TestFlight)."]));
body.push(code([
  "platform :ios do",
  "  lane :beta do",
  "    match(type: 'appstore')",
  "    build_app(scheme: 'Runner')",
  "    upload_to_testflight",
  "  end",
  "end",
], "fastfile"));
body.push(callout("interview", ["match solves iOS team signing: encrypted certs/profiles in a private git repo; every dev/CI runs `fastlane match` and gets the same setup. Combined with the App Store Connect API key = near-zero-touch iOS."]));
body.push(callout("mistake", ["Committing the match passphrase or API key file. Store as CI secret; delete generated files after the job."]));
body.push(...summary([
  "Named lanes = reusable release recipes.",
  "match for shared iOS signing.",
  "supply / deliver for store uploads.",
  "Same Fastfile powers dev + CI.",
]));
body.push(...interview([
  "What is Fastlane and its main tools?",
  "How does match work?",
  "supply vs deliver?",
  "How do you keep the match passphrase safe?",
  "How does Fastlane integrate with CI providers?",
]));
body.push(...coding([
  { level: "Easy", text: "Fastfile with `ios beta` + `android beta` lanes." },
  { level: "Medium", text: "Set up match with a private git repo." },
  { level: "Hard", text: "Automate localized screenshots via snapshot + deliver." },
  { level: "Expert", text: "Use same Fastlane lanes from both Actions and Codemagic." },
]));
body.push(...realworld(["Ten years old and still the mobile automation workhorse. Nearly every serious mobile team runs some Fastlane."]));
body.push(...miniproject(["Fully automate iOS + Android beta releases with named lanes callable both locally and from CI."]));
body.push(...advanced(["Fastlane plugins ecosystem, App Store Connect API key vs personal API key, App Signing rollover with Fastlane."]));

// 7. Docker (DevOps)
body.push(H1("7. Docker (DevOps view)", "ch7"));
body.push(callout("definition", ["For DevOps, Docker is your portable build/run environment. Ship the app + runtime as one image; CI, staging and prod use the same artifact."]));
body.push(callout("interview", ["Build one image → tag it → promote the SAME digest through staging → prod. Never rebuild for prod. Scan for CVEs (Trivy/Grype), sign (cosign) if you care about supply chain."]));
body.push(...summary([
  "Multi-stage builds keep images tiny.",
  "Layer order by change frequency for cache hits.",
  "Non-root USER, pinned base, scan in CI.",
  "Promote by digest, not rebuild.",
]));
body.push(...interview([
  "Why 'build once, promote everywhere'?",
  "Keeping images small and secure?",
  "Image scanning tools?",
  "How to cache in CI?",
  "Multi-arch builds — how?",
]));
body.push(...coding([
  { level: "Easy", text: "Dockerfile for Spring Boot; run it locally." },
  { level: "Medium", text: "Push to GHCR with version + immutable digest tags." },
  { level: "Hard", text: "Trivy scan; fail on HIGH/CRITICAL CVEs." },
  { level: "Expert", text: "Multi-arch build + cosign signing." },
]));
body.push(...realworld(["Every modern deployment pipeline packages via container image. Cloud Run, ECS/Fargate, K8s, Azure Container Apps — same artifact everywhere."]));
body.push(...miniproject(["Build + publish + sign an image for one service; promote to staging + prod using ONLY digest references."]));
body.push(...advanced(["BuildKit cache mounts, distroless bases, SBOM generation (syft), signed provenance (SLSA)."]));

// 8. Kubernetes (DevOps)
body.push(H1("8. Kubernetes (DevOps view)", "ch8"));
body.push(callout("definition", ["Your container orchestrator + rollout engine. Declare desired state; controllers converge, roll out, restart, autoscale — as long as you set the right probes and resources."]));
body.push(code([
  "readinessProbe: { httpGet: { path: /health, port: 8080 } }",
  "livenessProbe:  { httpGet: { path: /alive,  port: 8080 } }",
  "resources:",
  "  requests: { cpu: 100m, memory: 128Mi }",
  "  limits:   { cpu: 500m, memory: 512Mi }",
], "essentials"));
body.push(callout("interview", ["Modern K8s stack = GitOps. Cluster state lives in git; Argo CD / Flux converge continuously. Deployments become PRs — reviewable, auditable, revert-to-rollback."]));
body.push(callout("mistake", ["Missing readiness probes cause 500 storms during rollouts. Missing PDB → too many replicas evicted at once. Missing resource requests → noisy neighbors + starvation."]));
body.push(...summary([
  "Helm/Kustomize for templating; Argo CD/Flux for GitOps.",
  "Probes + PDB + resources = safe rollouts.",
  "Progressive delivery ties promotion to SLOs.",
  "Secrets via SealedSecrets / SOPS / External Secrets — not raw K8s Secrets.",
]));
body.push(...interview([
  "What is GitOps?",
  "Trio before prod?",
  "Progressive delivery vs plain rolling update?",
  "K8s secrets + git — how do they coexist?",
  "How do you monitor deployment health?",
]));
body.push(...coding([
  { level: "Easy", text: "Deploy an app to kind with Deployment + Service + probes." },
  { level: "Medium", text: "Kustomize overlays for dev + prod." },
  { level: "Hard", text: "Argo CD from git; test rollback via revert." },
  { level: "Expert", text: "Argo Rollouts canary tied to SLO checks." },
]));
body.push(...realworld(["Netflix, Spotify, Airbnb — every large product team runs on some flavor of K8s + GitOps. The playbook is remarkably standardized now."]));
body.push(...miniproject(["Stand up a mini prod-like stack: Argo CD-managed app, canary rollouts, and a deliberately breaking deploy to test auto-rollback."]));
body.push(...advanced(["Karpenter/Cluster Autoscaler cost tuning, service mesh (Istio/Linkerd), policy (OPA/Gatekeeper/Kyverno), FinOps for K8s."]));

// 9. App Distribution
body.push(H1("9. Firebase App Distribution", "ch9"));
body.push(callout("definition", ["Ships pre-release APK/AAB/IPA builds directly to invited testers by email — no store review. Perfect for daily internal builds."]));
body.push(callout("interview", ["Typical layered pipeline: App Distribution (nightly, internal) → Play Internal / TestFlight (weekly, wider) → Production. Each stage widens audience and slows cadence."]));
body.push(...summary([
  "Fast internal QA loop, no review.",
  "Automate via firebase CLI, Fastlane plugin, or Actions.",
  "In-app updates via Testers SDK.",
  "Segment testers via groups; auto-notify.",
]));
body.push(...interview([
  "When use App Distribution vs Play Internal vs TestFlight?",
  "How to automate uploads?",
  "How do testers get notified?",
  "How to segment testers?",
  "How to deprecate old builds?",
]));
body.push(...coding([
  { level: "Easy", text: "Upload one APK to a tester group via CLI." },
  { level: "Medium", text: "Automate from Actions on push to main." },
  { level: "Hard", text: "In-app update prompt via Testers SDK." },
  { level: "Expert", text: "Auto-tag PR builds and post the App Distribution link on the PR." },
]));
body.push(...realworld(["Fastest way to close feedback loops with QA and design. Every mature Flutter team runs a nightly App Distribution build."]));
body.push(...miniproject(["Wire nightly App Distribution builds with commit-SHA release notes and Slack notifications when a new build is available."]));
body.push(...advanced(["Custom in-app updater UI, phased tester rollouts, retention of legacy builds."]));

// 10. Play Console
body.push(H1("10. Google Play Console", "ch10"));
body.push(callout("definition", ["Operator dashboard for Android apps: tracks (internal/closed/open/production), staged rollouts, Play App Signing, Play Vitals, policies."]));
body.push(table(["Track", "Audience", "Use"], [
  ["Internal", "≤100 testers instantly", "Daily builds for QA"],
  ["Closed", "Selected users", "Beta with specific groups"],
  ["Open", "Anyone opting in", "Public beta"],
  ["Production", "Everyone (staged)", "Live release"],
], [2000, 3500, 3860]));
body.push(callout("interview", ["Two Play essentials: AAB only (since Aug 2021) and Play App Signing (Google holds the signing key). AAB + Play delivers per-device optimized APKs automatically."]));
body.push(callout("mistake", ["Missing yearly target SDK bumps → can't ship updates. VersionCode not monotonically increasing across CI runs → upload conflicts."]));
body.push(...summary([
  "Track promotion: Internal → Closed → Open → Production.",
  "AAB only; Play App Signing standard.",
  "Staged rollout with Vitals + Crashlytics monitoring.",
  "Automate via Play Publisher API (Fastlane supply / Codemagic).",
]));
body.push(...interview([
  "Track promotion order?",
  "AAB vs APK — why AAB now?",
  "Play App Signing — how does it work?",
  "How to automate uploads?",
  "Staged rollout best practices?",
]));
body.push(...coding([
  { level: "Easy", text: "Upload an AAB to Internal via the console." },
  { level: "Medium", text: "Automate via Fastlane supply + service account JSON." },
  { level: "Hard", text: "Staged rollout at 5% with halt/resume based on Vitals." },
  { level: "Expert", text: "Migrate an app onto Play App Signing without losing upload continuity." },
]));
body.push(...realworld(["Every Android app on Play navigates this. Getting policy + versioning right is what separates 'first submission' from 'sustainable release cadence'."]));
body.push(...miniproject(["Ship a Flutter app through all four tracks with automated Fastlane supply promotion."]));
body.push(...advanced(["Play Integrity API, in-app updates API, dynamic delivery/feature modules, Play Console publisher API deep dives."]));

// 11. App Store Connect
body.push(H1("11. App Store Connect", "ch11"));
body.push(callout("definition", ["Apple's dashboard for iOS/iPadOS/macOS: metadata, screenshots, IAP config, TestFlight, phased rollout, App Review, analytics."]));
body.push(callout("interview", ["Senior touches: use App Store Connect API key for automation, declare privacy nutrition honestly, use phased release for stability signals. App Review flags: crashes on submit build, Sign-in-with-Apple parity, unclear purpose."]));
body.push(...summary([
  "API key over user credentials for CI.",
  "Phased release ramps prod over 7 days.",
  "Store metadata in a versioned deliver folder.",
  "Test the archive build, not just debug.",
]));
body.push(...interview([
  "How to automate App Store submissions?",
  "What is phased release?",
  "How do you handle privacy labels?",
  "Common review rejections?",
  "How to manage signing across a team?",
]));
body.push(...coding([
  { level: "Easy", text: "Upload a manually-built IPA via Transporter." },
  { level: "Medium", text: "Automate submission via Fastlane + ASC API key." },
  { level: "Hard", text: "Phased release with stability monitoring." },
  { level: "Expert", text: "Fully automate metadata + screenshots + submission from CI." },
]));
body.push(...realworld(["Every iOS release passes through App Store Connect. Investing in automation removes the human error that causes review rejections."]));
body.push(...miniproject(["Automate an iOS pipeline: sign via match → build → deliver metadata + screenshots → submit for review."]));
body.push(...advanced(["StoreKit 2 automation, VoIP entitlement handling, in-app events API, App Store server notifications."]));

// 12. TestFlight
body.push(H1("12. TestFlight", "ch12"));
body.push(callout("definition", ["Apple's official beta distribution: internal (≤100, instant) or external (≤10,000, light beta review), 90-day expiry, feedback + crash logs."]));
body.push(callout("interview", ["Edge over App Distribution on iOS: real App Store install UX, Xcode + Crashlytics crash logs, iOS-integrated feedback surface. Combine with Fastlane `pilot` for one-command uploads."]));
body.push(callout("mistake", ["Missing beta app review info causes rejections faster than real issues. 90-day expiry surprises testers — plan renewal builds."]));
body.push(...summary([
  "Internal: instant, ≤100; External: reviewed, ≤10k.",
  "90-day expiry; segment testers into groups.",
  "Fastlane pilot / Codemagic / Actions to automate.",
  "In-iOS feedback surface is high-signal.",
]));
body.push(...interview([
  "Internal vs external TestFlight?",
  "How to automate uploads?",
  "How to gather beta feedback?",
  "Expiry handling?",
  "Play Internal vs TestFlight?",
]));
body.push(...coding([
  { level: "Easy", text: "Upload a build to TestFlight via App Store Connect." },
  { level: "Medium", text: "Segment testers into 'qa' + 'beta'; target a release to one." },
  { level: "Hard", text: "Automate via Fastlane pilot in CI." },
  { level: "Expert", text: "Auto-promote nightly TestFlight → external testers after N stable days." },
]));
body.push(...realworld(["TestFlight is the de-facto iOS beta channel. Most consumer iOS apps run public TestFlight betas alongside their production releases."]));
body.push(...miniproject(["Stand up automated TestFlight betas: nightly internal → weekly external (with beta review), notify testers on Slack."]));
body.push(...advanced(["Deep-link beta invites, per-country beta groups, feedback triage automation."]));

// Revision
body.push(H1("Volume 12 Revision Cheat Sheet", "cheat"));
body.push(H2("The mobile release pipeline"));
body.push(callout("note", ["PR check (Actions/Codemagic) → nightly App Distribution → weekly Play Internal + TestFlight → tagged prod release (staged rollout on both stores) → SLO gate + rollback plan."]));
H2("The DevOps stack in one line");
body.push(callout("best", ["Git + PRs + branch protection → CI (Actions/Codemagic) with cache + matrix → Fastlane for mobile signing/upload → Docker build once → GitOps deploy via Argo CD → progressive rollout with SLO checks."]));
body.push(H2("Gates before production"));
body.push(callout("perf", ["Green tests, clean static analysis, stable crash-free % vs shipped, image scanned, SBOM/signature attached, approver signed off, rollback plan documented. Miss any one → don't ship."]));
body.push(rule(C.purple));
body.push(P([{ t: "End of Volume 12. ", b: true, color: C.navy }, "Next: Volume 13 — UI/UX (Figma, Material 3, responsive/adaptive, accessibility, design systems, motion)."], { align: AlignmentType.CENTER }));

const doc = makeDoc([
  { properties: { page: { size: L.PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: cover() },
  { properties: pageProps("Volume 12 — DevOps & Cloud"),
    children: [...toc(), ...body] },
]);
const out = require("path").join(__dirname, "../../docs/books/Volume-12-DevOps.docx");
save(doc, out).then(() => console.log("WROTE", out));
