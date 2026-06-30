import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../models/models.dart';
import '../../state/providers.dart';

class QuizScreen extends ConsumerStatefulWidget {
  final String topicId;
  const QuizScreen({super.key, required this.topicId});
  @override
  ConsumerState<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends ConsumerState<QuizScreen> {
  int _index = 0;
  int? _selected;
  bool _revealed = false;
  int _correct = 0;

  @override
  Widget build(BuildContext context) {
    final topicAsync = ref.watch(topicProvider(widget.topicId));
    return topicAsync.when(
      loading: () => const Scaffold(body: Center(child: CircularProgressIndicator())),
      error: (e, _) => Scaffold(body: Center(child: Text('$e'))),
      data: (topic) {
        if (topic.quiz.isEmpty) {
          return Scaffold(
            appBar: AppBar(title: const Text('Quiz')),
            body: const Center(child: Text('No quiz for this topic yet.')),
          );
        }
        if (_index >= topic.quiz.length) {
          return _Result(topic: topic, correct: _correct, total: topic.quiz.length);
        }
        final q = topic.quiz[_index];
        return Scaffold(
          appBar: AppBar(
            title: Text('Quiz · ${_index + 1}/${topic.quiz.length}'),
            bottom: PreferredSize(
              preferredSize: const Size.fromHeight(4),
              child: LinearProgressIndicator(
                value: (_index) / topic.quiz.length,
                backgroundColor: Colors.white24,
                color: Colors.white,
              ),
            ),
          ),
          body: ListView(
            padding: const EdgeInsets.all(20),
            children: [
              Text(q.q, style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, height: 1.35)),
              const SizedBox(height: 20),
              for (var i = 0; i < q.options.length; i++) _option(q, i),
              if (_revealed) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppColors.blue.withValues(alpha: 0.10),
                    borderRadius: BorderRadius.circular(12),
                    border: Border(left: BorderSide(color: AppColors.blue, width: 5)),
                  ),
                  child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    const Icon(Icons.lightbulb, color: AppColors.blue, size: 18),
                    const SizedBox(width: 8),
                    Expanded(child: Text(q.explain, style: const TextStyle(height: 1.4))),
                  ]),
                ),
              ],
            ],
          ),
          bottomNavigationBar: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: FilledButton(
                onPressed: _selected == null
                    ? null
                    : () {
                        if (!_revealed) {
                          setState(() {
                            _revealed = true;
                            if (_selected == q.answer) _correct++;
                          });
                        } else {
                          setState(() {
                            _index++;
                            _selected = null;
                            _revealed = false;
                          });
                        }
                      },
                child: Text(_revealed
                    ? (_index + 1 >= topic.quiz.length ? 'See Result' : 'Next Question')
                    : 'Check Answer'),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _option(Question q, int i) {
    Color? bg;
    Color border = Theme.of(context).dividerColor;
    IconData? icon;
    if (_revealed) {
      if (i == q.answer) {
        bg = AppColors.green.withValues(alpha: 0.15);
        border = AppColors.green;
        icon = Icons.check_circle;
      } else if (i == _selected) {
        bg = AppColors.red.withValues(alpha: 0.12);
        border = AppColors.red;
        icon = Icons.cancel;
      }
    } else if (i == _selected) {
      bg = AppColors.blue.withValues(alpha: 0.12);
      border = AppColors.blue;
    }
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: _revealed ? null : () => setState(() => _selected = i),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: border, width: 1.5),
          ),
          child: Row(children: [
            Expanded(child: Text(q.options[i], style: const TextStyle(fontSize: 15))),
            if (icon != null) Icon(icon, color: border),
          ]),
        ),
      ),
    );
  }
}

class _Result extends ConsumerWidget {
  final Topic topic;
  final int correct, total;
  const _Result({required this.topic, required this.correct, required this.total});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pct = ((correct / total) * 100).round();
    final passed = pct >= 70;
    // Record once after build.
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final p = ref.read(progressRepoProvider);
      await p.recordQuiz(topic.id, pct, topic.xp);
      ref.read(progressTickProvider.notifier).state++;
    });
    return Scaffold(
      appBar: AppBar(title: const Text('Quiz Result')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(28),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Icon(passed ? Icons.emoji_events : Icons.refresh,
                size: 72, color: passed ? AppColors.amber : AppColors.blue),
            const SizedBox(height: 16),
            Text('$pct%',
                style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900)),
            Text('$correct of $total correct',
                style: const TextStyle(color: Colors.grey, fontSize: 16)),
            const SizedBox(height: 12),
            Text(
              passed
                  ? 'Passed! Topic complete. ${pct == 100 ? "Perfect score — +20 bonus XP!" : "+30 XP"}'
                  : 'Almost! You need 70% to complete. Review the lesson and retry.',
              textAlign: TextAlign.center,
              style: TextStyle(
                  color: passed ? AppColors.green : AppColors.red,
                  fontWeight: FontWeight.w700,
                  height: 1.4),
            ),
            const SizedBox(height: 28),
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              OutlinedButton(
                onPressed: () => context.pop(),
                child: const Text('Back to Topic'),
              ),
              const SizedBox(width: 12),
              FilledButton(
                onPressed: () => context.go('/'),
                child: const Text('Roadmap'),
              ),
            ]),
          ]),
        ),
      ),
    );
  }
}
