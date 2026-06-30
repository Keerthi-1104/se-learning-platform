import 'package:hive/hive.dart';

/// Owns ALL local progress: per-topic completion, XP, streaks, badges,
/// bookmarks. Backed by Hive (offline). Stored as primitive maps so no
/// codegen/adapters are needed — keeps the build simple and robust.
class ProgressRepository {
  static const _topicsBox = 'topics';
  static const _playerBox = 'player';

  late final Box _topics; // key: topicId -> Map
  late final Box _player; // single 'state' key -> Map

  Future<void> init() async {
    _topics = await Hive.openBox(_topicsBox);
    _player = await Hive.openBox(_playerBox);
  }

  // ---- Per-topic ----
  Map _topic(String id) =>
      (_topics.get(id) as Map?)?.cast<String, dynamic>() ?? {};

  bool isCompleted(String id) => _topic(id)['completed'] == true;
  bool theoryDone(String id) => _topic(id)['theoryDone'] == true;
  int quizBest(String id) => (_topic(id)['quizBest'] as int?) ?? 0;

  Future<void> markTheoryDone(String id, int xp) async {
    final t = _topic(id);
    if (t['theoryDone'] == true) return;
    t['theoryDone'] = true;
    await _topics.put(id, t);
    await _addXp(10);
    await _touchStreak();
    await _recomputeCompletion(id, xp);
  }

  Future<void> recordQuiz(String id, int scorePct, int topicXp) async {
    final t = _topic(id);
    final prevBest = (t['quizBest'] as int?) ?? 0;
    if (scorePct > prevBest) t['quizBest'] = scorePct;
    await _topics.put(id, t);
    if (scorePct >= 70 && prevBest < 70) {
      await _addXp(30);
      if (scorePct == 100) await _addXp(20); // perfect bonus
    }
    await _touchStreak();
    await _recomputeCompletion(id, topicXp);
  }

  Future<void> _recomputeCompletion(String id, int topicXp) async {
    final t = _topic(id);
    final done = t['theoryDone'] == true && ((t['quizBest'] as int?) ?? 0) >= 70;
    if (done && t['completed'] != true) {
      t['completed'] = true;
      await _topics.put(id, t);
      await _addBadge('first_topic');
    }
  }

  // ---- Player ----
  Map<String, dynamic> _p() =>
      (_player.get('state') as Map?)?.cast<String, dynamic>() ??
      {'xp': 0, 'streak': 0, 'lastDay': null, 'badges': <String>[], 'bookmarks': <String>[]};

  Future<void> _save(Map<String, dynamic> p) => _player.put('state', p);

  int get xp => _p()['xp'] as int? ?? 0;
  int get streak => _p()['streak'] as int? ?? 0;
  List<String> get badges =>
      ((_p()['badges'] as List?)?.cast<String>()) ?? const [];
  List<String> get bookmarks =>
      ((_p()['bookmarks'] as List?)?.cast<String>()) ?? const [];

  Future<void> _addXp(int amount) async {
    final p = _p();
    p['xp'] = (p['xp'] as int? ?? 0) + amount;
    await _save(p);
  }

  Future<void> _addBadge(String id) async {
    final p = _p();
    final b = ((p['badges'] as List?)?.cast<String>() ?? <String>[]).toSet();
    b.add(id);
    p['badges'] = b.toList();
    await _save(p);
  }

  Future<void> toggleBookmark(String topicId) async {
    final p = _p();
    final marks = ((p['bookmarks'] as List?)?.cast<String>() ?? <String>[]).toSet();
    if (!marks.add(topicId)) marks.remove(topicId);
    p['bookmarks'] = marks.toList();
    await _save(p);
  }

  bool isBookmarked(String topicId) => bookmarks.contains(topicId);

  /// Increment streak once per calendar day; reset if a day was skipped.
  Future<void> _touchStreak() async {
    final p = _p();
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final lastMs = p['lastDay'] as int?;
    if (lastMs == null) {
      p['streak'] = 1;
    } else {
      final last = DateTime.fromMillisecondsSinceEpoch(lastMs);
      final lastDay = DateTime(last.year, last.month, last.day);
      final diff = today.difference(lastDay).inDays;
      if (diff == 0) {
        // same day, no change
      } else if (diff == 1) {
        p['streak'] = (p['streak'] as int? ?? 0) + 1;
        await _addBadge(((p['streak'] as int) >= 7) ? '7_day_streak' : 'streak');
      } else {
        p['streak'] = 1;
      }
    }
    p['lastDay'] = today.millisecondsSinceEpoch;
    await _save(p);
  }

  /// Rank derived from total XP.
  String get rank {
    final x = xp;
    if (x >= 3000) return 'Tech Lead';
    if (x >= 2000) return 'Architect';
    if (x >= 1200) return 'Senior';
    if (x >= 700) return 'Proficient';
    if (x >= 350) return 'Practitioner';
    if (x >= 120) return 'Beginner';
    return 'Novice';
  }

  /// XP progress (0..1) toward the next rank, for the profile bar.
  double get rankProgress {
    const thresholds = [0, 120, 350, 700, 1200, 2000, 3000];
    final x = xp;
    for (var i = 0; i < thresholds.length - 1; i++) {
      if (x < thresholds[i + 1]) {
        final span = thresholds[i + 1] - thresholds[i];
        return ((x - thresholds[i]) / span).clamp(0.0, 1.0);
      }
    }
    return 1.0;
  }
}
