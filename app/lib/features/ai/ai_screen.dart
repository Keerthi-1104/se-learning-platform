import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/theme/app_theme.dart';
import '../../state/providers.dart';

/// AI Tutor. Works fully offline: every answer is produced by the resilient
/// AI service, which falls back to the content engine if no model is present.
class AiScreen extends ConsumerStatefulWidget {
  const AiScreen({super.key});
  @override
  ConsumerState<AiScreen> createState() => _AiScreenState();
}

class _AiScreenState extends ConsumerState<AiScreen> {
  final _controller = TextEditingController();
  final List<_Msg> _messages = [];
  bool _busy = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _send(String text) async {
    if (text.trim().isEmpty || _busy) return;
    setState(() {
      _messages.add(_Msg(text, fromUser: true));
      _busy = true;
      _controller.clear();
    });
    final res = await ref.read(aiServiceProvider).explainConcept(text);
    if (!mounted) return;
    setState(() {
      _messages.add(_Msg(res.text, fromUser: false, usedAi: res.usedAi));
      _busy = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Tutor'),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 12),
            child: Center(
              child: Text('offline-ready',
                  style: TextStyle(fontSize: 12, color: Colors.white70)),
            ),
          ),
        ],
      ),
      body: Column(children: [
        Expanded(
          child: _messages.isEmpty
              ? _Intro(onPick: _send)
              : ListView.builder(
                  padding: const EdgeInsets.all(14),
                  itemCount: _messages.length,
                  itemBuilder: (c, i) => _Bubble(msg: _messages[i]),
                ),
        ),
        if (_busy) const LinearProgressIndicator(),
        SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(12, 6, 12, 10),
            child: Row(children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  textInputAction: TextInputAction.send,
                  onSubmitted: _send,
                  decoration: InputDecoration(
                    hintText: 'Ask about any topic (e.g. "TLS", "Big-O")…',
                    filled: true,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(24),
                      borderSide: BorderSide.none,
                    ),
                    contentPadding:
                        const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              FloatingActionButton.small(
                onPressed: () => _send(_controller.text),
                backgroundColor: AppColors.teal,
                child: const Icon(Icons.send, color: Colors.white),
              ),
            ]),
          ),
        ),
      ]),
    );
  }
}

class _Intro extends StatelessWidget {
  final void Function(String) onPick;
  const _Intro({required this.onPick});
  @override
  Widget build(BuildContext context) {
    const chips = ['Explain TLS', 'What is Big-O', 'OAuth flow', 'Garbage Collection'];
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        const SizedBox(height: 20),
        const Icon(Icons.smart_toy, size: 64, color: AppColors.teal),
        const SizedBox(height: 14),
        const Text('AI Tutor',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
        const SizedBox(height: 8),
        const Text(
          'Ask anything about the roadmap. Works without internet — if no AI '
          'model is available, answers come straight from the lessons.',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.grey, height: 1.4),
        ),
        const SizedBox(height: 22),
        Wrap(
          alignment: WrapAlignment.center,
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final c in chips)
              ActionChip(
                label: Text(c),
                onPressed: () => onPick(c),
                backgroundColor: AppColors.teal.withValues(alpha: 0.10),
              ),
          ],
        ),
      ],
    );
  }
}

class _Msg {
  final String text;
  final bool fromUser;
  final bool usedAi;
  _Msg(this.text, {required this.fromUser, this.usedAi = false});
}

class _Bubble extends StatelessWidget {
  final _Msg msg;
  const _Bubble({required this.msg});
  @override
  Widget build(BuildContext context) {
    final isUser = msg.fromUser;
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 5),
        padding: const EdgeInsets.all(14),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.82),
        decoration: BoxDecoration(
          color: isUser
              ? AppColors.blue
              : Theme.of(context).colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (!isUser)
            Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Text(msg.usedAi ? 'AI model' : 'From lessons',
                  style: const TextStyle(
                      fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.teal)),
            ),
          Text(msg.text,
              style: TextStyle(
                  height: 1.45, color: isUser ? Colors.white : null, fontSize: 15)),
        ]),
      ),
    );
  }
}
