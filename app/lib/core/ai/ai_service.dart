import '../../models/models.dart';
import '../content/content_repository.dart';

/// Result of an AI call. `usedAi` tells the UI whether a real model answered
/// or we fell back to the offline content engine — but either way the user
/// always gets a useful response.
class AiResponse {
  final String text;
  final bool usedAi;
  const AiResponse(this.text, {this.usedAi = false});
}

/// The single contract every AI feature talks to. The app NEVER depends on a
/// network or a model being present — implementations must degrade gracefully.
abstract class AiService {
  Future<AiResponse> explainTopic(Topic topic, {String? focus});
  Future<AiResponse> explainConcept(String query);
  Future<AiResponse> mockInterview(String topicTitle);
}

/// 100% offline engine. Builds answers directly from the bundled content —
/// no model, no network, no API key. This is the guaranteed floor: if every
/// smarter AI fails, THIS still works, so the app always works.
class StubAiService implements AiService {
  final ContentRepository content;
  StubAiService(this.content);

  @override
  Future<AiResponse> explainTopic(Topic topic, {String? focus}) async {
    if (topic.isStub || topic.sections.isEmpty) {
      return AiResponse(
        'Here is what to focus on for "${topic.title}":\n\n'
        '${topic.objectives.isEmpty ? "Core definition, why it exists, how it works internally, "
            "trade-offs, and common interview angles." : topic.objectives.map((o) => "• $o").join("\n")}\n\n'
        '(Offline study mode — detailed lesson content for this topic is being added.)',
      );
    }
    final firstTheory = topic.sections
        .firstWhere((s) => s.type == 'theory' && (s.markdown ?? '').isNotEmpty,
            orElse: () => topic.sections.first)
        .markdown;
    final buf = StringBuffer()
      ..writeln('**${topic.title} — in brief**\n')
      ..writeln(_stripMd(firstTheory ?? '').trim());
    if (topic.objectives.isNotEmpty) {
      buf.writeln('\n**You should be able to:**');
      for (final o in topic.objectives) {
        buf.writeln('• $o');
      }
    }
    if (focus != null && focus.isNotEmpty) {
      buf.writeln('\n*Focus requested: "$focus" — see the matching section in the lesson.*');
    }
    return AiResponse(buf.toString().trim());
  }

  @override
  Future<AiResponse> explainConcept(String query) async {
    // Lightweight retrieval over topic titles (RAG-lite, offline).
    final q = query.toLowerCase();
    final hits = content
        .allTopics()
        .where((t) => t.title.toLowerCase().contains(q) || q.contains(t.title.toLowerCase()))
        .take(3)
        .toList();
    if (hits.isEmpty) {
      return AiResponse(
        'I could not match "$query" to a lesson offline. Try a topic name like '
        '"TLS", "Big-O", or "Garbage Collection", or open it from the Roadmap.',
      );
    }
    final buf = StringBuffer('Related lessons you can open:\n');
    for (final h in hits) {
      buf.writeln('• ${h.title}  (~${h.minutes} min, +${h.xp} XP)');
    }
    return AiResponse(buf.toString().trim());
  }

  @override
  Future<AiResponse> mockInterview(String topicTitle) async {
    return AiResponse(
      'Mock interview — $topicTitle\n\n'
      '1. Define $topicTitle in one sentence.\n'
      '2. Why does it exist / what problem does it solve?\n'
      '3. Walk me through how it works internally.\n'
      '4. What are the trade-offs vs the alternatives?\n'
      '5. Describe a production issue you might hit and how you would debug it.\n\n'
      'Tip: answer out loud, state assumptions, and finish with complexity/limitations.',
    );
  }

  String _stripMd(String s) => s
      .replaceAll(RegExp(r'^#+\s*', multiLine: true), '')
      .replaceAll('**', '')
      .trim();
}

/// Placeholder for YOUR OWN on-device model (e.g. Gemma/Qwen via MediaPipe or
/// llama.cpp). Until the model is wired, it throws so the resilient wrapper
/// falls back to the offline engine. Swapping in a real model later requires
/// NO changes anywhere else in the app.
class LocalLlmService implements AiService {
  bool get isModelAvailable => false; // flip true once a model ships in assets

  Never _notReady() => throw StateError('Local LLM model not loaded yet');

  @override
  Future<AiResponse> explainTopic(Topic topic, {String? focus}) async => _notReady();
  @override
  Future<AiResponse> explainConcept(String query) async => _notReady();
  @override
  Future<AiResponse> mockInterview(String topicTitle) async => _notReady();
}

/// Wraps a "smart" AI with the always-on offline engine. EVERY call is
/// try/catch — if the smart AI is missing, slow, erroring, or offline, the
/// user still gets a real answer from [fallback]. This is the contract that
/// makes "if AI fails, the app still works" literally true.
class ResilientAiService implements AiService {
  final AiService primary;
  final StubAiService fallback;
  ResilientAiService({required this.primary, required this.fallback});

  Future<AiResponse> _guard(
    Future<AiResponse> Function(AiService s) call,
  ) async {
    try {
      final r = await call(primary).timeout(const Duration(seconds: 20));
      return AiResponse(r.text, usedAi: true);
    } catch (_) {
      return call(fallback);
    }
  }

  @override
  Future<AiResponse> explainTopic(Topic topic, {String? focus}) =>
      _guard((s) => s.explainTopic(topic, focus: focus));
  @override
  Future<AiResponse> explainConcept(String query) =>
      _guard((s) => s.explainConcept(query));
  @override
  Future<AiResponse> mockInterview(String topicTitle) =>
      _guard((s) => s.mockInterview(topicTitle));
}
