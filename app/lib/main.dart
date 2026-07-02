import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'core/content/content_service.dart';
import 'core/router/app_router.dart';
import 'core/theme/app_theme.dart';
import 'state/progress_repository.dart';
import 'state/providers.dart';

// Content CDN — set via --dart-define=CONTENT_CDN=... to point at a fork.
// Default: the canonical se-learning-content repo served by jsDelivr.
const _defaultCdn =
    'https://cdn.jsdelivr.net/gh/Keerthi-1104/se-learning-content@main';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();

  final progress = ProgressRepository();
  await progress.init();

  const cdn = String.fromEnvironment('CONTENT_CDN', defaultValue: _defaultCdn);
  final content = await ContentService.init(cdnBase: cdn);
  // Fire-and-forget: refresh manifest in the background so the FIRST screen
  // renders instantly from cache/starter pack, and updates land on next launch.
  unawaited(content.syncManifest());

  runApp(
    ProviderScope(
      overrides: [
        progressRepoProvider.overrideWithValue(progress),
        contentServiceProvider.overrideWithValue(content),
      ],
      child: const SeLearningApp(),
    ),
  );
}

class SeLearningApp extends StatelessWidget {
  const SeLearningApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'SE Learning Platform',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: ThemeMode.system,
      routerConfig: appRouter,
    );
  }
}
