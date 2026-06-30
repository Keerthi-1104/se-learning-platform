import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../models/models.dart';
import '../../state/providers.dart';

class RoadmapScreen extends ConsumerWidget {
  const RoadmapScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(progressTickProvider); // rebuild on progress change
    final roadmap = ref.watch(roadmapProvider);
    final progress = ref.watch(progressRepoProvider);

    return Scaffold(
      body: roadmap.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Failed to load roadmap:\n$e')),
        data: (levels) {
          final totalTopics = levels.fold<int>(0, (a, l) => a + l.topics.length);
          final done = levels
              .expand((l) => l.topics)
              .where((t) => progress.isCompleted(t.id))
              .length;
          return CustomScrollView(
            slivers: [
              SliverAppBar.large(
                backgroundColor: AppColors.navy,
                foregroundColor: Colors.white,
                title: const Text('Learning Roadmap'),
                flexibleSpace: const FlexibleSpaceBar(
                  background: _HeaderGradient(),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
                  child: _OverviewCard(
                    rank: progress.rank,
                    xp: progress.xp,
                    streak: progress.streak,
                    done: done,
                    total: totalTopics,
                  ),
                ),
              ),
              SliverList.builder(
                itemCount: levels.length,
                itemBuilder: (c, i) => _LevelCard(
                  level: levels[i],
                  completed: levels[i]
                      .topics
                      .where((t) => progress.isCompleted(t.id))
                      .length,
                ),
              ),
              const SliverToBoxAdapter(child: SizedBox(height: 24)),
            ],
          );
        },
      ),
    );
  }
}

class _HeaderGradient extends StatelessWidget {
  const _HeaderGradient();
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.navy, AppColors.blue, AppColors.teal],
        ),
      ),
      child: const Align(
        alignment: Alignment(-0.85, 0.55),
        child: Padding(
          padding: EdgeInsets.only(left: 16),
          child: Text('Beginner → Senior → Architect → Lead',
              style: TextStyle(color: Colors.white70, fontWeight: FontWeight.w600)),
        ),
      ),
    );
  }
}

class _OverviewCard extends StatelessWidget {
  final String rank;
  final int xp, streak, done, total;
  const _OverviewCard({
    required this.rank,
    required this.xp,
    required this.streak,
    required this.done,
    required this.total,
  });

  @override
  Widget build(BuildContext context) {
    final pct = total == 0 ? 0.0 : done / total;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            _stat(Icons.military_tech, rank, 'Rank', AppColors.purple),
            _stat(Icons.bolt, '$xp', 'XP', AppColors.amber),
            _stat(Icons.local_fire_department, '$streak', 'Streak', AppColors.red),
          ]),
          const SizedBox(height: 14),
          Row(children: [
            Text('$done / $total topics',
                style: const TextStyle(fontWeight: FontWeight.w700)),
            const Spacer(),
            Text('${(pct * 100).round()}%',
                style: const TextStyle(color: AppColors.green, fontWeight: FontWeight.w700)),
          ]),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: pct,
              backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest,
              color: AppColors.green,
            ),
          ),
        ]),
      ),
    );
  }

  Widget _stat(IconData icon, String value, String label, Color color) => Expanded(
        child: Column(children: [
          Icon(icon, color: color),
          const SizedBox(height: 4),
          Text(value,
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
          Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        ]),
      );
}

class _LevelCard extends StatelessWidget {
  final RoadmapLevel level;
  final int completed;
  const _LevelCard({required this.level, required this.completed});

  @override
  Widget build(BuildContext context) {
    final color = AppColors.fromHex(level.color);
    final total = level.topics.length;
    final pct = total == 0 ? 0.0 : completed / total;
    return Card(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 0),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: () => context.push('/level/${level.id}'),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(iconFor(level.icon), color: color, size: 28),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                        color: color, borderRadius: BorderRadius.circular(20)),
                    child: Text('L${level.id}',
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.w800)),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(level.title,
                        style: const TextStyle(
                            fontWeight: FontWeight.w800, fontSize: 16)),
                  ),
                ]),
                const SizedBox(height: 4),
                Text(level.summary,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 12.5, color: Colors.grey, height: 1.3)),
                const SizedBox(height: 8),
                Row(children: [
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: pct,
                        minHeight: 6,
                        backgroundColor:
                            Theme.of(context).colorScheme.surfaceContainerHighest,
                        color: color,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text('$completed/$total',
                      style: const TextStyle(
                          fontSize: 11, fontWeight: FontWeight.w700, color: Colors.grey)),
                ]),
              ]),
            ),
            const Icon(Icons.chevron_right, color: Colors.grey),
          ]),
        ),
      ),
    );
  }
}
