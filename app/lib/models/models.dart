// Immutable data models for roadmap + topic content.
// Hand-written fromJson (no codegen) for build reliability.

class RoadmapLevel {
  final int id;
  final String title;
  final String icon;
  final String color; // hex RRGGBB
  final String summary;
  final List<TopicSummary> topics;

  const RoadmapLevel({
    required this.id,
    required this.title,
    required this.icon,
    required this.color,
    required this.summary,
    required this.topics,
  });

  factory RoadmapLevel.fromJson(Map<String, dynamic> j) => RoadmapLevel(
        id: j['id'] as int,
        title: j['title'] as String,
        icon: j['icon'] as String? ?? 'school',
        color: j['color'] as String? ?? '2E75B6',
        summary: j['summary'] as String? ?? '',
        topics: (j['topics'] as List<dynamic>? ?? [])
            .map((e) => TopicSummary.fromJson(e as Map<String, dynamic>))
            .toList(),
      );
}

class TopicSummary {
  final String id;
  final String title;
  final int xp;
  final int minutes;

  const TopicSummary({
    required this.id,
    required this.title,
    required this.xp,
    required this.minutes,
  });

  factory TopicSummary.fromJson(Map<String, dynamic> j) => TopicSummary(
        id: j['id'] as String,
        title: j['title'] as String,
        xp: j['xp'] as int? ?? 30,
        minutes: j['minutes'] as int? ?? 15,
      );
}

/// Full topic content rendered by TopicScreen.
class Topic {
  final String id;
  final int levelId;
  final String title;
  final int xp;
  final int minutes;
  final List<String> objectives;
  final List<Section> sections;
  final List<Flashcard> flashcards;
  final List<Question> quiz;
  final List<Challenge> challenges;
  final List<String> interviewQuestions;
  final List<Reference> references;
  final bool isStub; // true when no authored JSON exists yet

  const Topic({
    required this.id,
    required this.levelId,
    required this.title,
    required this.xp,
    required this.minutes,
    required this.objectives,
    required this.sections,
    required this.flashcards,
    required this.quiz,
    required this.challenges,
    required this.interviewQuestions,
    required this.references,
    this.isStub = false,
  });

  factory Topic.fromJson(Map<String, dynamic> j) => Topic(
        id: j['id'] as String,
        levelId: j['levelId'] as int? ?? 0,
        title: j['title'] as String,
        xp: j['xp'] as int? ?? 30,
        minutes: j['estimatedMinutes'] as int? ?? j['minutes'] as int? ?? 15,
        objectives:
            (j['objectives'] as List<dynamic>? ?? []).map((e) => e.toString()).toList(),
        sections: (j['sections'] as List<dynamic>? ?? [])
            .map((e) => Section.fromJson(e as Map<String, dynamic>))
            .toList(),
        flashcards: (j['flashcards'] as List<dynamic>? ?? [])
            .map((e) => Flashcard.fromJson(e as Map<String, dynamic>))
            .toList(),
        quiz: (j['quiz'] as List<dynamic>? ?? [])
            .map((e) => Question.fromJson(e as Map<String, dynamic>))
            .toList(),
        challenges: (j['challenges'] as List<dynamic>? ?? [])
            .map((e) => Challenge.fromJson(e as Map<String, dynamic>))
            .toList(),
        interviewQuestions: (j['interviewQuestions'] as List<dynamic>? ?? [])
            .map((e) => e.toString())
            .toList(),
        references: (j['references'] as List<dynamic>? ?? [])
            .map((e) => Reference.fromJson(e as Map<String, dynamic>))
            .toList(),
      );

  /// Placeholder for topics whose JSON isn't authored yet — keeps the app
  /// fully navigable across all 16 levels.
  factory Topic.stub(TopicSummary s, int levelId) => Topic(
        id: s.id,
        levelId: levelId,
        title: s.title,
        xp: s.xp,
        minutes: s.minutes,
        objectives: const [],
        sections: const [],
        flashcards: const [],
        quiz: const [],
        challenges: const [],
        interviewQuestions: const [],
        references: const [],
        isStub: true,
      );

  /// Plain-text projection of the theory, used by the offline AI stub + RAG.
  String get plainText {
    final buf = StringBuffer();
    for (final s in sections) {
      if (s.markdown != null) buf.writeln(s.markdown);
      if (s.code != null) buf.writeln(s.code);
      if (s.rows.isNotEmpty) {
        buf.writeln(s.headers.join(' | '));
        for (final r in s.rows) {
          buf.writeln(r.join(' | '));
        }
      }
    }
    return buf.toString();
  }
}

class Section {
  final String type; // theory, callout, code, table, diagram, divider
  final String? variant; // for callout
  final String? markdown;
  final String? code;
  final String? language;
  final String? caption;
  final List<String> headers;
  final List<List<String>> rows;

  const Section({
    required this.type,
    this.variant,
    this.markdown,
    this.code,
    this.language,
    this.caption,
    this.headers = const [],
    this.rows = const [],
  });

  factory Section.fromJson(Map<String, dynamic> j) => Section(
        type: j['type'] as String,
        variant: j['variant'] as String?,
        markdown: j['markdown'] as String?,
        code: j['code'] as String?,
        language: j['language'] as String?,
        caption: j['caption'] as String?,
        headers:
            (j['headers'] as List<dynamic>? ?? []).map((e) => e.toString()).toList(),
        rows: (j['rows'] as List<dynamic>? ?? [])
            .map((r) => (r as List<dynamic>).map((e) => e.toString()).toList())
            .toList(),
      );
}

class Flashcard {
  final String front;
  final String back;
  const Flashcard({required this.front, required this.back});
  factory Flashcard.fromJson(Map<String, dynamic> j) =>
      Flashcard(front: j['front'] as String, back: j['back'] as String);
}

class Question {
  final String q;
  final List<String> options;
  final int answer; // index
  final String explain;
  const Question({
    required this.q,
    required this.options,
    required this.answer,
    required this.explain,
  });
  factory Question.fromJson(Map<String, dynamic> j) => Question(
        q: j['q'] as String,
        options: (j['options'] as List<dynamic>).map((e) => e.toString()).toList(),
        answer: j['answer'] as int,
        explain: j['explain'] as String? ?? '',
      );
}

class Challenge {
  final String level; // Easy/Medium/Hard/Expert
  final String text;
  const Challenge({required this.level, required this.text});
  factory Challenge.fromJson(Map<String, dynamic> j) =>
      Challenge(level: j['level'] as String? ?? 'Easy', text: j['text'] as String);
}

class Reference {
  final String label;
  final String url;
  const Reference({required this.label, required this.url});
  factory Reference.fromJson(Map<String, dynamic> j) =>
      Reference(label: j['label'] as String, url: j['url'] as String? ?? '');
}
