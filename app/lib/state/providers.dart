import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../core/content/content_repository.dart';
import '../core/ai/ai_service.dart';
import '../models/models.dart';
import 'progress_repository.dart';

/// Global singletons, injected via Riverpod (our DI container).
final contentRepoProvider = Provider<ContentRepository>((ref) => ContentRepository());

final progressRepoProvider = Provider<ProgressRepository>((ref) {
  throw UnimplementedError('Overridden in main() after Hive init');
});

/// AI is always wrapped in the resilient service: tries your own/local model,
/// falls back to the offline content engine so the app never breaks.
final aiServiceProvider = Provider<AiService>((ref) {
  final content = ref.watch(contentRepoProvider);
  final stub = StubAiService(content);
  // When a real on-device model is wired, set primary: LocalLlmService().
  return ResilientAiService(primary: LocalLlmService(), fallback: stub);
});

/// Loads the 16-level roadmap once.
final roadmapProvider = FutureProvider<List<RoadmapLevel>>((ref) async {
  return ref.watch(contentRepoProvider).loadRoadmap();
});

/// Loads a single topic (authored JSON or graceful stub).
final topicProvider = FutureProvider.family<Topic, String>((ref, topicId) async {
  return ref.watch(contentRepoProvider).loadTopic(topicId);
});

/// Bumped whenever progress changes so screens rebuild their XP/streak/done state.
final progressTickProvider = StateProvider<int>((ref) => 0);
