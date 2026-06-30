import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../models/models.dart';

/// Renders one content Section. New section types => one more case here.
class SectionView extends StatelessWidget {
  final Section section;
  const SectionView({super.key, required this.section});

  @override
  Widget build(BuildContext context) {
    switch (section.type) {
      case 'theory':
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 6),
          child: MarkdownLite(section.markdown ?? ''),
        );
      case 'callout':
        return _Callout(variant: section.variant ?? 'note', markdown: section.markdown ?? '');
      case 'code':
        return _CodeBlock(code: section.code ?? '', language: section.language);
      case 'table':
        return _SimpleTable(headers: section.headers, rows: section.rows);
      case 'diagram':
        return _DiagramCaption(caption: section.caption ?? 'Diagram');
      case 'divider':
        return const Divider(height: 28);
      default:
        return MarkdownLite(section.markdown ?? '');
    }
  }
}

/// Minimal, dependency-free Markdown: ## headings, **bold**, `code`,
/// and "- "/"• " bullet lines.
class MarkdownLite extends StatelessWidget {
  final String data;
  const MarkdownLite(this.data, {super.key});

  @override
  Widget build(BuildContext context) {
    final lines = data.split('\n');
    final widgets = <Widget>[];
    for (final raw in lines) {
      final line = raw.trimRight();
      if (line.trim().isEmpty) {
        widgets.add(const SizedBox(height: 6));
        continue;
      }
      if (line.startsWith('### ')) {
        widgets.add(_h(context, line.substring(4), 15, AppColors.teal));
      } else if (line.startsWith('## ')) {
        widgets.add(_h(context, line.substring(3), 18, AppColors.blue));
      } else if (line.startsWith('# ')) {
        widgets.add(_h(context, line.substring(2), 21, AppColors.navy));
      } else if (line.trimLeft().startsWith('- ') || line.trimLeft().startsWith('• ')) {
        final t = line.trimLeft().substring(2);
        widgets.add(Padding(
          padding: const EdgeInsets.only(left: 4, top: 2, bottom: 2),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Padding(
                padding: EdgeInsets.only(top: 6, right: 8),
                child: Icon(Icons.circle, size: 6, color: AppColors.blue)),
            Expanded(child: _inline(context, t)),
          ]),
        ));
      } else {
        widgets.add(Padding(
            padding: const EdgeInsets.symmetric(vertical: 3),
            child: _inline(context, line)));
      }
    }
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: widgets);
  }

  Widget _h(BuildContext c, String t, double size, Color color) => Padding(
        padding: const EdgeInsets.only(top: 10, bottom: 4),
        child: Text(t,
            style: TextStyle(fontSize: size, fontWeight: FontWeight.w800, color: color)),
      );

  /// Inline parser for **bold** and `code`.
  Widget _inline(BuildContext context, String text) {
    final spans = <InlineSpan>[];
    final pattern = RegExp(r'(\*\*[^*]+\*\*|`[^`]+`)');
    int last = 0;
    for (final m in pattern.allMatches(text)) {
      if (m.start > last) spans.add(TextSpan(text: text.substring(last, m.start)));
      final tok = m.group(0)!;
      if (tok.startsWith('**')) {
        spans.add(TextSpan(
            text: tok.substring(2, tok.length - 2),
            style: const TextStyle(fontWeight: FontWeight.w700)));
      } else {
        spans.add(TextSpan(
          text: tok.substring(1, tok.length - 1),
          style: TextStyle(
              fontFamily: 'monospace',
              fontSize: 13,
              backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest,
              color: AppColors.purple),
        ));
      }
      last = m.end;
    }
    if (last < text.length) spans.add(TextSpan(text: text.substring(last)));
    return RichText(
      text: TextSpan(
          style: DefaultTextStyle.of(context).style.copyWith(height: 1.45, fontSize: 15),
          children: spans),
    );
  }
}

class _Callout extends StatelessWidget {
  final String variant;
  final String markdown;
  const _Callout({required this.variant, required this.markdown});

  @override
  Widget build(BuildContext context) {
    final t = _theme(variant);
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: t.bg.withValues(alpha: 0.16),
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: t.bar, width: 5)),
      ),
      padding: const EdgeInsets.fromLTRB(14, 12, 12, 12),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Icon(t.icon, size: 18, color: t.bar),
          const SizedBox(width: 6),
          Text(t.label,
              style: TextStyle(
                  fontWeight: FontWeight.w800,
                  fontSize: 12,
                  letterSpacing: 0.5,
                  color: t.bar)),
        ]),
        const SizedBox(height: 6),
        MarkdownLite(markdown),
      ]),
    );
  }

  _CalloutTheme _theme(String v) {
    switch (v) {
      case 'definition':
        return _CalloutTheme('DEFINITION', AppColors.blue, AppColors.blue, Icons.menu_book);
      case 'analogy':
        return _CalloutTheme('ANALOGY', AppColors.amber, AppColors.amber, Icons.public);
      case 'tip':
        return _CalloutTheme('SENIOR TIP', AppColors.green, AppColors.green, Icons.psychology);
      case 'best':
        return _CalloutTheme('BEST PRACTICE', AppColors.green, AppColors.green, Icons.verified);
      case 'mistake':
        return _CalloutTheme('COMMON MISTAKE', AppColors.red, AppColors.red, Icons.warning_amber);
      case 'interview':
        return _CalloutTheme('INTERVIEW NOTE', AppColors.amber, AppColors.amber, Icons.flag);
      case 'perf':
        return _CalloutTheme('PERFORMANCE', AppColors.teal, AppColors.teal, Icons.bolt);
      default:
        return _CalloutTheme('NOTE', AppColors.navy, AppColors.navy, Icons.sticky_note_2);
    }
  }
}

class _CalloutTheme {
  final String label;
  final Color bar;
  final Color bg;
  final IconData icon;
  _CalloutTheme(this.label, this.bar, this.bg, this.icon);
}

class _CodeBlock extends StatelessWidget {
  final String code;
  final String? language;
  const _CodeBlock({required this.code, this.language});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.codeBg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        if (language != null && language!.isNotEmpty)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            child: Text(language!.toUpperCase(),
                style: const TextStyle(
                    color: Color(0xFF7FB5E6),
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 1)),
          ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.fromLTRB(14, 4, 14, 14),
          child: SelectableText(
            code,
            style: const TextStyle(
                fontFamily: 'monospace',
                fontSize: 13,
                height: 1.5,
                color: AppColors.codeText),
          ),
        ),
      ]),
    );
  }
}

class _SimpleTable extends StatelessWidget {
  final List<String> headers;
  final List<List<String>> rows;
  const _SimpleTable({required this.headers, required this.rows});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Theme.of(context).dividerColor),
      ),
      clipBehavior: Clip.antiAlias,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: WidgetStatePropertyAll(AppColors.navy.withValues(alpha: 0.9)),
          headingTextStyle:
              const TextStyle(color: Colors.white, fontWeight: FontWeight.w700),
          columns: [for (final h in headers) DataColumn(label: Text(h))],
          rows: [
            for (final r in rows)
              DataRow(cells: [for (final c in r) DataCell(SizedBox(width: 180, child: Text(c)))])
          ],
        ),
      ),
    );
  }
}

class _DiagramCaption extends StatelessWidget {
  final String caption;
  const _DiagramCaption({required this.caption});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(children: [
        const Icon(Icons.image_outlined, color: AppColors.blue),
        const SizedBox(width: 10),
        Expanded(child: Text(caption, style: const TextStyle(fontStyle: FontStyle.italic))),
      ]),
    );
  }
}
