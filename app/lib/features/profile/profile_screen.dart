import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../state/providers.dart';

const _badgeMeta = {
  'first_topic': ('First Steps', Icons.flag, AppColors.green),
  'streak': ('On a Roll', Icons.local_fire_department, AppColors.amber),
  '7_day_streak': ('7-Day Streak', Icons.whatshot, AppColors.red),
  'quiz_perfectionist': ('Perfectionist', Icons.star, AppColors.purple),
};

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(progressTickProvider);
    final p = ref.watch(progressRepoProvider);
    final roadmap = ref.watch(roadmapProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('My Progress')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(children: [
                CircleAvatar(
                  radius: 34,
                  backgroundColor: AppColors.purple.withValues(alpha: 0.15),
                  child: const Icon(Icons.person, size: 38, color: AppColors.purple),
                ),
                const SizedBox(height: 12),
                Text(p.rank,
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900)),
                Text('${p.xp} XP', style: const TextStyle(color: Colors.grey)),
                const SizedBox(height: 14),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: p.rankProgress,
                    minHeight: 10,
                    backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest,
                    color: AppColors.purple,
                  ),
                ),
                const SizedBox(height: 6),
                Text('${(p.rankProgress * 100).round()}% to next rank',
                    style: const TextStyle(fontSize: 12, color: Colors.grey)),
              ]),
            ),
          ),
          const SizedBox(height: 8),
          Row(children: [
            _statCard(Icons.local_fire_department, '${p.streak}', 'Day Streak', AppColors.red),
            const SizedBox(width: 10),
            _statCard(Icons.bookmark, '${p.bookmarks.length}', 'Bookmarks', AppColors.blue),
          ]),
          const SizedBox(height: 18),
          const Text('Achievements',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
          const SizedBox(height: 8),
          _Badges(earned: p.badges),
          const SizedBox(height: 18),
          const Text('Completion by Level',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
          const SizedBox(height: 8),
          roadmap.when(
            loading: () => const Center(child: Padding(
                padding: EdgeInsets.all(16), child: CircularProgressIndicator())),
            error: (e, _) => Text('$e'),
            data: (levels) => Column(
              children: [
                for (final l in levels)
                  Builder(builder: (context) {
                    final done = l.topics.where((t) => p.isCompleted(t.id)).length;
                    final pct = l.topics.isEmpty ? 0.0 : done / l.topics.length;
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 5),
                      child: Row(children: [
                        SizedBox(
                            width: 34,
                            child: Text('L${l.id}',
                                style: const TextStyle(fontWeight: FontWeight.w800))),
                        Expanded(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(6),
                            child: LinearProgressIndicator(
                              value: pct,
                              minHeight: 9,
                              backgroundColor:
                                  Theme.of(context).colorScheme.surfaceContainerHighest,
                              color: AppColors.fromHex(l.color),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text('$done/${l.topics.length}',
                            style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      ]),
                    );
                  }),
              ],
            ),
          ),
          const SizedBox(height: 24),
          OutlinedButton.icon(
            onPressed: () => context.go('/'),
            icon: const Icon(Icons.map),
            label: const Text('Continue Learning'),
          ),
        ],
      ),
    );
  }

  Widget _statCard(IconData icon, String value, String label, Color color) => Expanded(
        child: Card(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 16),
            child: Column(children: [
              Icon(icon, color: color, size: 26),
              const SizedBox(height: 6),
              Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
              Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
            ]),
          ),
        ),
      );
}

class _Badges extends StatelessWidget {
  final List<String> earned;
  const _Badges({required this.earned});
  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        for (final entry in _badgeMeta.entries)
          Builder(builder: (context) {
            final has = earned.contains(entry.key);
            final (label, icon, color) = entry.value;
            return Container(
              width: 96,
              padding: const EdgeInsets.symmetric(vertical: 14),
              decoration: BoxDecoration(
                color: has ? color.withValues(alpha: 0.12) : Colors.grey.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: has ? color : Colors.grey.withValues(alpha: 0.3)),
              ),
              child: Column(children: [
                Icon(icon, color: has ? color : Colors.grey, size: 28),
                const SizedBox(height: 6),
                Text(label,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: has ? color : Colors.grey)),
              ]),
            );
          }),
      ],
    );
  }
}
