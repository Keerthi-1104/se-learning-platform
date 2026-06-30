# SE Learning Platform — Architecture Plan

> **Vision:** An AI-powered Flutter app that takes a developer from **Beginner → Senior Engineer → Mobile Architect → Tech Lead** through 16 structured levels, with theory, practice, quizzes, flashcards, coding challenges, gamification, progress tracking, and AI assistance.

This document is the **single source of truth** for how the app is built. Every feature follows the patterns defined here so the codebase stays consistent as it grows to 16 levels.

---

## 1. Guiding Principles

| Principle | What it means here |
|---|---|
| **Feature-first + Clean Architecture** | Each feature is a vertical slice (`presentation → domain → data`). Adding Level 2…16 = cloning the topic feature, not rewriting. |
| **Offline-first** | All content ships in-app (JSON/assets) and works with zero network. AI features degrade gracefully to stubbed responses. |
| **Content as data, not code** | Topics are JSON documents, not hard-coded screens. One renderer displays any topic. Authoring new content never touches Dart. |
| **Single source of progress** | One local DB owns XP, streaks, completion, bookmarks. Every screen reads/writes through one repository. |
| **AI is a service, not a dependency** | All AI calls go through one `AiService` interface. Swap Claude ↔ stub ↔ другой provider without touching UI. |
| **Testable by construction** | Domain logic depends on abstractions; repositories are injected; UI is dumb. |

---

## 2. Tech Stack Decisions

| Concern | Choice | Why |
|---|---|---|
| **Framework** | Flutter (stable) + Dart 3 | Cross-platform, matches user's skill set |
| **State management** | **flutter_riverpod** | Compile-safe DI + state in one tool; testable; less boilerplate than BLoC for a content app. (Volume 5 of the books still teaches all options.) |
| **Navigation** | **go_router** | Declarative, deep-linkable (level → topic → quiz), web-ready |
| **Local persistence** | **Hive** (progress, XP, bookmarks, settings) + **bundled JSON assets** (content) | Hive is fast, no native setup; content is read-only assets |
| **DI / locator** | Riverpod providers (no separate get_it needed) | One mental model |
| **Models / immutability** | `freezed` + `json_serializable` | Safe immutable models + JSON parsing for content |
| **AI** | `AiService` abstraction → Claude (`claude-opus-4-8`) HTTP impl **or** `StubAiService` | Runs with or without an API key |
| **Markdown rendering** | `flutter_markdown` | Theory/notes authored in Markdown |
| **Code highlighting** | `flutter_highlight` | Syntax-colored code samples |
| **Charts (progress)** | `fl_chart` | XP / streak / mastery visuals |
| **Local notifications** | `flutter_local_notifications` | Revision reminders, streak nudges |

> **Decision log:** Riverpod over BLoC chosen for *velocity on a content-heavy app with lots of small derived state*. If the team prefers BLoC, the architecture below is unchanged — only the `presentation/state` layer swaps.

---

## 3. High-Level Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        PRESENTATION                            │
│   Screens (Roadmap, Level, Topic, Quiz, Flashcards, Profile)   │
│   Widgets · Riverpod Notifiers/Providers · go_router           │
└───────────────▲───────────────────────────────▲───────────────┘
                │ calls use-cases                │ watches state
┌───────────────┴───────────────────────────────┴───────────────┐
│                          DOMAIN                                │
│   Entities (Topic, Level, Question, Progress, Badge)           │
│   UseCases (GetTopic, SubmitQuiz, AwardXp, AskAi, ...)         │
│   Repository INTERFACES (abstract)                             │
└───────────────▲───────────────────────────────▲───────────────┘
                │ implemented by                 │
┌───────────────┴───────────────────────────────┴───────────────┐
│                           DATA                                 │
│   ContentRepository  → JSON assets (16 levels of content)      │
│   ProgressRepository → Hive boxes (XP, streaks, completion)    │
│   AiService          → Claude HTTP  |  Stub (offline)          │
└───────────────────────────────────────────────────────────────┘
```

**Rule:** dependencies point **inward**. Presentation knows Domain; Data implements Domain; Domain knows nothing about Flutter, Hive, or HTTP.

---

## 4. Folder Structure

```
app/
├── pubspec.yaml
├── assets/
│   ├── content/
│   │   ├── roadmap.json              # the 16 levels + topic index
│   │   ├── level_01/
│   │   │   ├── computer_architecture.json
│   │   │   ├── operating_systems.json
│   │   │   └── ... (one file per topic)
│   │   └── level_02/ ...
│   └── images/
└── lib/
    ├── main.dart
    ├── app.dart                      # MaterialApp.router + theme
    ├── core/
    │   ├── theme/                    # design system: colors, typography, spacing
    │   ├── router/                   # go_router config
    │   ├── di/                       # global providers (repos, services)
    │   ├── ai/                       # AiService interface + Claude + Stub impls
    │   ├── error/                    # Failure types, Result<T>
    │   └── widgets/                  # shared: callout, code block, level card
    ├── domain/
    │   ├── entities/                 # Level, Topic, Section, Question, Progress, Badge
    │   ├── repositories/             # ContentRepository, ProgressRepository (abstract)
    │   └── usecases/                 # GetRoadmap, GetTopic, SubmitQuiz, AwardXp, AskAi
    ├── data/
    │   ├── models/                   # *_model.dart (freezed/json) + mappers
    │   ├── datasources/              # AssetContentSource, HiveProgressSource
    │   └── repositories/             # *RepositoryImpl
    └── features/
        ├── roadmap/                  # 16-level overview + progress ring
        ├── level/                    # topics within a level
        ├── topic/                    # theory · code · diagram · notes (tabbed)
        ├── quiz/                     # MCQ engine + results + XP award
        ├── flashcards/               # spaced-repetition review
        ├── gamification/             # XP bar, streaks, badges, leaderboard (local)
        ├── ai/                       # "Explain", "Fix my code", mock interview
        └── profile/                  # progress dashboard, settings, reminders
```

---

## 5. Content Model (the heart of the app)

A **Topic** is a JSON document. One `TopicScreen` renders any topic, so authoring = writing JSON, never Dart. This is how all 16 levels scale.

```jsonc
// assets/content/level_01/computer_architecture.json
{
  "id": "cs.computer_architecture",
  "levelId": 1,
  "title": "Computer Architecture",
  "icon": "memory",
  "estimatedMinutes": 25,
  "xp": 50,
  "objectives": ["Explain fetch-decode-execute", "Reason about the memory hierarchy"],
  "sections": [
    { "type": "theory",   "markdown": "## Definition\nComputer architecture is..." },
    { "type": "callout",  "variant": "analogy", "markdown": "Think of a kitchen..." },
    { "type": "code",     "language": "text", "code": "[CPU]\n ├─ Registers ..." },
    { "type": "diagram",  "asset": "images/mem_hierarchy.png", "caption": "Memory hierarchy" },
    { "type": "table",    "headers": ["Concept","Why"], "rows": [["Cache","Locality"]] },
    { "type": "callout",  "variant": "mistake", "markdown": "Beginners assume 1 line = 1 unit of time..." }
  ],
  "flashcards": [
    { "front": "What are the 4 CPU cycle stages?", "back": "Fetch, Decode, Execute, Write-back" }
  ],
  "quiz": [
    {
      "q": "Which memory is fastest?",
      "options": ["RAM", "L1 cache", "Registers", "SSD"],
      "answer": 2,
      "explain": "Registers sit inside the CPU and take ~1 cycle."
    }
  ],
  "challenges": [
    { "level": "Easy",   "text": "Detect host endianness." },
    { "level": "Medium", "text": "Benchmark row-major vs column-major traversal." }
  ],
  "interviewQuestions": ["Explain fetch-decode-execute.", "Von Neumann vs Harvard?"],
  "references": [{ "label": "CSAPP", "url": "https://csapp.cs.cmu.edu" }]
}
```

**Section `type`s the renderer understands:** `theory`, `callout` (variants: definition/analogy/tip/best/mistake/interview/note/perf), `code`, `diagram`, `table`, `divider`. New section types = one widget added to the renderer's switch.

> The **books in `docs/books/` are the source content.** A small authoring script (`docs/content/build_content.dart` or a Node script) converts/curates book prose into these topic JSON files. Volume 1 already supplies all Level 1 topics.

---

## 6. Progress, XP & Gamification Model

Stored in **Hive** (local, offline). One `ProgressRepository` is the only writer.

```dart
// Hive box: "progress"
class TopicProgress {
  String topicId;
  bool theoryDone;
  int  quizBestScore;     // 0..100
  bool completed;         // theory + quiz passed
  DateTime? lastVisited;
}

// Hive box: "player"
class PlayerState {
  int xp;                 // total XP
  int level;             // derived: skill rank from XP curve
  int streakDays;
  DateTime? lastActiveDay;
  Set<String> badges;     // earned achievement ids
  Set<String> bookmarks;  // topicIds
}
```

**XP rules** (in a pure `GamificationService`, fully unit-testable):

| Action | XP |
|---|---|
| Finish theory | +10 |
| Pass quiz (≥70%) | +30 |
| Perfect quiz (100%) | +20 bonus |
| Daily streak day | +5 |
| Complete a whole level | +100 |

**Skill ranks** (derived from total XP): `Novice → Beginner → Practitioner → Proficient → Senior → Architect → Lead`.
**Streaks**: incremented when `lastActiveDay` is yesterday; reset if a day is skipped.
**Badges**: e.g. `first_topic`, `level_1_master`, `7_day_streak`, `quiz_perfectionist`.
**Leaderboard**: local-only board of personal bests (no backend needed); future: optional cloud sync.

---

## 7. AI Service Contract

All AI features call one interface. The app runs fully offline with `StubAiService`; set an API key to enable `ClaudeAiService`.

```dart
abstract class AiService {
  Future<String> explainTopic(String topicId, {String? focus});
  Future<String> explainCode(String code, {String? language});
  Future<CodeFix> fixCode(String code, String error);
  Future<List<Question>> generateQuiz(String topicId, {int count = 5});
  Future<MockInterview> generateMockInterview(String role, String level);
  Stream<String> chat(List<ChatMessage> history); // streaming "Ask AI"
}
```

- **`ClaudeAiService`** → Anthropic Messages API, model `claude-opus-4-8`, key read from `--dart-define=ANTHROPIC_API_KEY=...` (never hard-coded/committed).
- **`StubAiService`** → returns deterministic canned responses sourced from the topic JSON so demos work with no network/key.
- Selection is a Riverpod provider: key present → Claude, else → Stub.

---

## 8. Navigation Map (go_router)

```
/                      → RoadmapScreen (16 levels, progress rings)
/level/:levelId        → LevelScreen (topics in the level)
/topic/:topicId        → TopicScreen (tabs: Learn · Code · Diagram · Notes)
/topic/:topicId/quiz   → QuizScreen → QuizResultScreen
/topic/:topicId/cards  → FlashcardsScreen
/ai                    → AiAssistantScreen (Explain / Fix / Mock Interview / Chat)
/profile               → ProfileScreen (XP, streak, badges, charts, settings)
```

Bottom navigation: **Roadmap · Practice · AI · Profile**.

---

## 9. Design System

- **Color**: a calm, premium palette (navy/blue primary, teal/green/amber/red accents) mirroring the books, exposed via a `ThemeExtension` so callouts/code blocks are themable + dark-mode ready.
- **Typography**: clear scale (display/title/body/code) — code uses a monospace family.
- **Components**: reusable `Callout`, `CodeBlock`, `LevelCard`, `XpBar`, `StreakChip`, `DifficultyTag`.
- **Material 3**, responsive (phone → tablet), accessible (semantic labels, ≥4.5:1 contrast, scalable text).

---

## 10. Build Sequence (incremental, "step by step")

| Phase | Deliverable | Status |
|---|---|---|
| **0** | Architecture plan (this doc) + separate project | ✅ Done |
| **1** | `flutter create` app, theme, router, bottom nav, roadmap of 16 levels (from `roadmap.json`) | ▶ Next |
| **2** | Topic renderer + Level 1 content wired from Volume 1 (theory/callout/code/table/diagram) | |
| **3** | Quiz engine + results + XP award; Hive progress repository | |
| **4** | Gamification: XP bar, streaks, badges, profile dashboard with charts | |
| **5** | Flashcards (spaced repetition) + bookmarks + revision reminders | |
| **6** | AI layer: `AiService` + Stub now, Claude impl behind a key | |
| **7** | Fill Levels 2–16 content (JSON) progressively from the book volumes | |
| **8** | Polish: dark mode, animations, onboarding, settings, tests | |

Each phase is independently runnable — the app is never in a broken state.

---

## 11. How the Books and the App Relate

```
docs/books/Volume-1-CS-Fundamentals.docx   (human-readable premium book)
                 │  curate / convert
                 ▼
docs/content/level_01/*.json   →   assets/content/level_01/*.json
                 │  rendered by
                 ▼
features/topic/TopicScreen     (in-app interactive learning)
```

The user gets **both**: polished documents to read *and* an interactive app that teaches the same material with quizzes, XP, and AI help.

---

## 12. Non-Goals (for v1)

- No backend/server, no user accounts, no real online leaderboard (all local).
- No payments. No multi-device sync (designed-for-later via the repository seam).
- AI is optional; the app is 100% useful offline.

---

*Next step: Phase 1 — scaffold the Flutter app (`app/`) with theme, router, and the 16-level roadmap driven by `roadmap.json`.*
