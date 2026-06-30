import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../state/providers.dart';

class LevelScreen extends ConsumerWidget {
  final int levelId;
  const LevelScreen({super.key, required this.levelId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(progressTickProvider);
    final roadmap = ref.watch(roadmapProvider);
    final progress = ref.watch(progressRepoProvider);

    return roadmap.when(
      loading: () => const Scaffold(body: Center(child: CircularProgressIndicator())),
      error: (e, _) => Scaffold(body: Center(child: Text('$e'))),
      data: (levels) {
        final level = levels.firstWhere((l) => l.id == levelId);
        final color = AppColors.fromHex(level.color);
        return Scaffold(
          appBar: AppBar(
            backgroundColor: color,
            title: Text('L${level.id} · ${level.title}'),
          ),
          body: ListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
            itemCount: level.topics.length + 1,
            itemBuilder: (c, i) {
              if (i == 0) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(level.summary,
                      style: const TextStyle(color: Colors.grey, height: 1.4)),
                );
              }
              final t = level.topics[i - 1];
              final completed = progress.isCompleted(t.id);
              final theoryDone = progress.theoryDone(t.id);
              return Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  leading: CircleAvatar(
                    backgroundColor: completed
                        ? AppColors.green
                        : theoryDone
                            ? AppColors.amber
                            : color.withValues(alpha: 0.15),
                    foregroundColor: (completed || theoryDone) ? Colors.white : color,
                    child: completed
                        ? const Icon(Icons.check)
                        : Text('$i', style: const TextStyle(fontWeight: FontWeight.w800)),
                  ),
                  title: Text(t.title,
                      style: const TextStyle(fontWeight: FontWeight.w700)),
                  subtitle: Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Row(children: [
                      const Icon(Icons.schedule, size: 13, color: Colors.grey),
                      const SizedBox(width: 3),
                      Text('${t.minutes} min',
                          style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      const SizedBox(width: 12),
                      const Icon(Icons.bolt, size: 13, color: AppColors.amber),
                      Text('${t.xp} XP',
                          style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    ]),
                  ),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => context.push('/topic/${t.id}'),
                ),
              );
            },
          ),
        );
      },
    );
  }
}
