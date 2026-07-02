import 'dart:convert';
import '../../models/models.dart';
import 'content_service.dart';

/// Loads roadmap + topic content. Reads through [ContentService], which:
///   * Serves the bundled starter pack (roadmap + Level 1) offline,
///   * Fetches other topics from the CDN and caches them in Hive,
///   * Falls back to the last cached copy if offline / CDN is down.
///
/// This class is the same shape the rest of the app already depends on
/// (`loadRoadmap`, `loadTopic`) so callers don't change.
class ContentRepository {
  ContentRepository(this._service);

  final ContentService _service;

  List<RoadmapLevel>? _levels;
  final Map<String, Topic> _topicCache = {};

  Future<List<RoadmapLevel>> loadRoadmap() async {
    if (_levels != null) return _levels!;
    final raw = await _service.loadJsonString('roadmap.json');
    final json = jsonDecode(raw) as Map<String, dynamic>;
    _levels = (json['levels'] as List<dynamic>)
        .map((e) => RoadmapLevel.fromJson(e as Map<String, dynamic>))
        .toList();
    return _levels!;
  }

  RoadmapLevel? levelById(int id) {
    if (_levels == null) return null;
    for (final l in _levels!) {
      if (l.id == id) return l;
    }
    return null;
  }

  TopicSummary? _summaryFor(String topicId) {
    if (_levels == null) return null;
    for (final l in _levels!) {
      for (final t in l.topics) {
        if (t.id == topicId) return t;
      }
    }
    return null;
  }

  int _levelOf(String topicId) {
    if (_levels == null) return 0;
    for (final l in _levels!) {
      for (final t in l.topics) {
        if (t.id == topicId) return l.id;
      }
    }
    return 0;
  }

  /// Returns the authored Topic, or a graceful stub if its JSON isn't written
  /// yet OR the network+cache both failed. Either way the app stays navigable.
  Future<Topic> loadTopic(String topicId) async {
    if (_topicCache.containsKey(topicId)) return _topicCache[topicId]!;
    await loadRoadmap();
    final levelId = _levelOf(topicId);
    final folder = 'level_${levelId.toString().padLeft(2, '0')}';
    final file = topicId.contains('.') ? topicId.split('.').last : topicId;
    final path = '$folder/$file.json';
    Topic topic;
    try {
      final raw = await _service.loadJsonString(path);
      topic = Topic.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    } catch (_) {
      final s = _summaryFor(topicId);
      topic = s != null
          ? Topic.stub(s, levelId)
          : Topic.stub(
              TopicSummary(id: topicId, title: topicId, xp: 30, minutes: 15),
              levelId);
    }
    _topicCache[topicId] = topic;
    return topic;
  }

  /// Flat list of all topic summaries (for search / RAG retrieval).
  List<TopicSummary> allTopics() {
    if (_levels == null) return const [];
    return [for (final l in _levels!) ...l.topics];
  }
}
