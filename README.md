# SE Learning Platform

An AI-powered Flutter app that takes a developer from **Beginner → Senior → Architect → Tech Lead** across **16 levels** — with theory, quizzes, flashcards, coding challenges, XP/streaks/badges, progress tracking, and an **offline-resilient AI tutor**.

> **Design rule:** the app works **100% offline**. AI is a bonus, never a dependency — if no model is present or a call fails, answers fall back to the bundled lesson content automatically.

## Project layout

```
SE_Learning_Platform/
├── docs/
│   ├── ARCHITECTURE.md         # the full blueprint (read this first)
│   ├── books/                  # premium .docx learning books (Volume 1 done)
│   └── content/                # roadmap.json + topic JSON (content source)
└── app/                        # the Flutter application
```

## Run it

```bash
cd app
flutter pub get
flutter run            # on a connected device/emulator
# or build an APK:
flutter build apk --debug
```

## What works today (Phase 1–4)

- **Roadmap**: all 16 levels with per-level progress + overall XP/rank/streak header.
- **Level → Topic**: every topic is navigable; authored topics show full rich lessons, unauthored ones show a graceful "coming soon" + offline AI brief.
- **Topic lesson**: theory, colored callouts (definition/analogy/tip/mistake/perf), code blocks, tables, learning objectives, flashcards, coding challenges (Easy→Expert), interview questions, references, bookmarking.
- **Quiz engine**: MCQs with instant explanations, scoring, pass ≥70%, XP + perfect-score bonus.
- **Gamification**: XP, ranks (Novice→Tech Lead), daily streaks, achievement badges — all stored locally with Hive.
- **AI Tutor**: ask any topic; resilient service falls back to content engine offline.
- **Profile**: rank progress, streak, bookmarks, achievements, per-level completion bars.

## Tech

Flutter · Riverpod (state + DI) · go_router · Hive (local progress) · content-as-JSON · no codegen.

## Adding content

Author a topic by dropping a JSON file in `app/assets/content/level_XX/<topic>.json`
(schema in `docs/ARCHITECTURE.md` §5). No Dart changes needed — one renderer displays any topic.

See `docs/ARCHITECTURE.md` for the build sequence (Phases 0–8) and how the books feed the app.
