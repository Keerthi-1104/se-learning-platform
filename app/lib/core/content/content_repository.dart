import 'dart:convert';
import 'package:flutter/services.dart';
import '../../models/models.dart';

/// Loads roadmap + topic content from bundled JSON assets.
/// Content is read-only and ships with the app => fully offline.
class ContentRepository {
  List<RoadmapLevel>? _levels;
  final Map<String, Topic> _topicCache = {};

  Future<List<RoadmapLevel>> loadRoadmap() async {
    if (_levels != null) return _levels!;
    final raw = await rootBundle.loadString('assets/content/roadmap.json');
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
  /// yet. Either way the app stays fully navigable.
  Future<Topic> loadTopic(String topicId) async {
    if (_topicCache.containsKey(topicId)) return _topicCache[topicId]!;
    await loadRoadmap();
    final levelId = _levelOf(topicId);
    final folder = 'level_${levelId.toString().padLeft(2, '0')}';
    final file = topicId.contains('.') ? topicId.split('.').last : topicId;
    final path = 'assets/content/$folder/$file.json';
    Topic topic;
    try {
      final raw = await rootBundle.loadString(path);
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
