import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_theme.dart';
import '../../models/models.dart';
import '../../state/providers.dart';
import 'section_renderer.dart';

class TopicScreen extends ConsumerWidget {
  final String topicId;
  const TopicScreen({super.key, required this.topicId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(progressTickProvider);
    final topicAsync = ref.watch(topicProvider(topicId));
    final progress = ref.watch(progressRepoProvider);

    return topicAsync.when(
      loading: () => const Scaffold(body: Center(child: CircularProgressIndicator())),
      error: (e, _) => Scaffold(body: Center(child: Text('$e'))),
      data: (topic) => DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: Text(topic.title, overflow: TextOverflow.ellipsis),
            actions: [
              IconButton(
                tooltip: 'Bookmark',
                icon: Icon(progress.isBookmarked(topicId)
                    ? Icons.bookmark
                    : Icons.bookmark_border),
                onPressed: () async {
                  await progress.toggleBookmark(topicId);
                  ref.read(progressTickProvider.notifier).state++;
                },
              ),
            ],
            bottom: const TabBar(
              indicatorColor: Colors.white,
              tabs: [Tab(text: 'Learn'), Tab(text: 'Practice')],
            ),
          ),
          body: TabBarView(children: [
            _LearnTab(topic: topic),
            _PracticeTab(topic: topic),
          ]),
          bottomNavigationBar: _BottomBar(topic: topic),
        ),
      ),
    );
  }
}

class _LearnTab extends StatelessWidget {
  final Topic topic;
  const _LearnTab({required this.topic});

  @override
  Widget build(BuildContext context) {
    if (topic.isStub) {
      return _ComingSoon(topic: topic);
    }
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
      children: [
        if (topic.objectives.isNotEmpty) _Objectives(objectives: topic.objectives),
        for (final s in topic.sections) SectionView(section: s),
        if (topic.references.isNotEmpty) ...[
          const SizedBox(height: 16),
          const Text('References & Further Reading',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
          for (final r in topic.references)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Row(children: [
                const Icon(Icons.link, size: 15, color: AppColors.blue),
                const SizedBox(width: 6),
                Expanded(child: Text(r.label, style: const TextStyle(color: AppColors.blue))),
              ]),
            ),
        ],
      ],
    );
  }
}

class _Objectives extends StatelessWidget {
  final List<String> objectives;
  const _Objectives({required this.objectives});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.teal.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: AppColors.teal, width: 5)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: const [
          Icon(Icons.flag, size: 18, color: AppColors.teal),
          SizedBox(width: 6),
          Text('LEARNING OBJECTIVES',
              style: TextStyle(
                  fontWeight: FontWeight.w800, fontSize: 12, color: AppColors.teal)),
        ]),
        const SizedBox(height: 6),
        for (final o in objectives)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 2),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('✓ ', style: TextStyle(color: AppColors.teal)),
              Expanded(child: Text(o, style: const TextStyle(height: 1.35))),
            ]),
          ),
      ]),
    );
  }
}

class _PracticeTab extends StatelessWidget {
  final Topic topic;
  const _PracticeTab({required this.topic});

  @override
  Widget build(BuildContext context) {
    final hasAny = topic.flashcards.isNotEmpty ||
        topic.challenges.isNotEmpty ||
        topic.interviewQuestions.isNotEmpty;
    if (!hasAny) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text('Practice material for this topic is being added.',
              textAlign: TextAlign.center, style: TextStyle(color: Colors.grey)),
        ),
      );
    }
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 28),
      children: [
        if (topic.flashcards.isNotEmpty) ...[
          _sectionTitle(Icons.style, 'Flashcards', AppColors.purple),
          SizedBox(
            height: 170,
            child: PageView(
              children: [for (final f in topic.flashcards) _FlashCard(card: f)],
            ),
          ),
          const SizedBox(height: 16),
        ],
        if (topic.challenges.isNotEmpty) ...[
          _sectionTitle(Icons.code, 'Coding Challenges', AppColors.blue),
          for (final ch in topic.challenges) _ChallengeTile(challenge: ch),
          const SizedBox(height: 16),
        ],
        if (topic.interviewQuestions.isNotEmpty) ...[
          _sectionTitle(Icons.record_voice_over, 'Interview Questions', AppColors.amber),
          for (var i = 0; i < topic.interviewQuestions.length; i++)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('${i + 1}. ',
                    style: const TextStyle(fontWeight: FontWeight.w800, color: AppColors.amber)),
                Expanded(child: Text(topic.interviewQuestions[i], style: const TextStyle(height: 1.4))),
              ]),
            ),
        ],
      ],
    );
  }

  Widget _sectionTitle(IconData icon, String text, Color color) => Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Row(children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(width: 8),
          Text(text, style: TextStyle(fontWeight: FontWeight.w800, fontSize: 17, color: color)),
        ]),
      );
}

class _FlashCard extends StatefulWidget {
  final Flashcard card;
  const _FlashCard({required this.card});
  @override
  State<_FlashCard> createState() => _FlashCardState();
}

class _FlashCardState extends State<_FlashCard> {
  bool _showBack = false;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: GestureDetector(
        onTap: () => setState(() => _showBack = !_showBack),
        child: Card(
          color: _showBack ? AppColors.purple : null,
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text(_showBack ? 'ANSWER' : 'QUESTION',
                    style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: _showBack ? Colors.white70 : Colors.grey)),
                const SizedBox(height: 10),
                Text(_showBack ? widget.card.back : widget.card.front,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: 16,
                        height: 1.35,
                        color: _showBack ? Colors.white : null)),
                const SizedBox(height: 10),
                Text('tap to flip',
                    style: TextStyle(
                        fontSize: 11,
                        color: _showBack ? Colors.white60 : Colors.grey)),
              ]),
            ),
          ),
        ),
      ),
    );
  }
}

class _ChallengeTile extends StatelessWidget {
  final Challenge challenge;
  const _ChallengeTile({required this.challenge});
  Color get _color {
    switch (challenge.level) {
      case 'Expert':
        return AppColors.red;
      case 'Hard':
        return AppColors.amber;
      case 'Medium':
        return AppColors.blue;
      default:
        return AppColors.green;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
                color: _color.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(6)),
            child: Text(challenge.level,
                style: TextStyle(
                    color: _color, fontWeight: FontWeight.w800, fontSize: 11)),
          ),
          const SizedBox(width: 10),
          Expanded(child: Text(challenge.text, style: const TextStyle(height: 1.35))),
        ]),
      ),
    );
  }
}

class _ComingSoon extends StatelessWidget {
  final Topic topic;
  const _ComingSoon({required this.topic});
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          const Icon(Icons.construction, size: 56, color: AppColors.amber),
          const SizedBox(height: 16),
          Text(topic.title,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
          const SizedBox(height: 8),
          const Text(
            'Full interactive lesson is being authored for this topic.\n'
            'Tap “Ask AI” below for an offline study brief, or explore other topics.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey, height: 1.4),
          ),
        ]),
      ),
    );
  }
}

class _BottomBar extends ConsumerWidget {
  final Topic topic;
  const _BottomBar({required this.topic});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progress = ref.watch(progressRepoProvider);
    final theoryDone = progress.theoryDone(topic.id);
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 10),
        child: Row(children: [
          OutlinedButton.icon(
            onPressed: () => _askAi(context, ref),
            icon: const Icon(Icons.smart_toy_outlined, size: 18),
            label: const Text('Ask AI'),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: theoryDone
                ? FilledButton.icon(
                    style: FilledButton.styleFrom(backgroundColor: AppColors.green),
                    onPressed: topic.quiz.isEmpty
                        ? null
                        : () => context.push('/topic/${topic.id}/quiz'),
                    icon: const Icon(Icons.quiz, size: 18),
                    label: Text(topic.quiz.isEmpty ? 'Read ✓' : 'Take Quiz'),
                  )
                : FilledButton.icon(
                    onPressed: () async {
                      await progress.markTheoryDone(topic.id, topic.xp);
                      ref.read(progressTickProvider.notifier).state++;
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                            content: Text('Theory complete! +10 XP'),
                            duration: Duration(seconds: 1)));
                      }
                    },
                    icon: const Icon(Icons.check, size: 18),
                    label: const Text('Mark as Read (+10 XP)'),
                  ),
          ),
        ]),
      ),
    );
  }

  Future<void> _askAi(BuildContext context, WidgetRef ref) async {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (c) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.6,
        maxChildSize: 0.9,
        builder: (c, scroll) => FutureBuilder(
          future: ref.read(aiServiceProvider).explainTopic(topic),
          builder: (c, snap) {
            return ListView(
              controller: scroll,
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
              children: [
                Row(children: [
                  const Icon(Icons.smart_toy, color: AppColors.teal),
                  const SizedBox(width: 8),
                  const Text('AI Tutor',
                      style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
                  const Spacer(),
                  if (snap.hasData)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                          color: (snap.data!.usedAi ? AppColors.green : AppColors.amber)
                              .withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(20)),
                      child: Text(snap.data!.usedAi ? 'on-device model' : 'offline mode',
                          style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: snap.data!.usedAi ? AppColors.green : AppColors.amber)),
                    ),
                ]),
                const SizedBox(height: 14),
                if (!snap.hasData)
                  const Padding(
                    padding: EdgeInsets.all(24),
                    child: Center(child: CircularProgressIndicator()),
                  )
                else
                  Text(snap.data!.text, style: const TextStyle(height: 1.5, fontSize: 15)),
              ],
            );
          },
        ),
      ),
    );
  }
}
