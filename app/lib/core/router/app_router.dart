import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/shell/home_shell.dart';
import '../../features/roadmap/roadmap_screen.dart';
import '../../features/level/level_screen.dart';
import '../../features/topic/topic_screen.dart';
import '../../features/quiz/quiz_screen.dart';
import '../../features/profile/profile_screen.dart';
import '../../features/ai/ai_screen.dart';

final _rootKey = GlobalKey<NavigatorState>();
final _shellKey = GlobalKey<NavigatorState>();

final appRouter = GoRouter(
  navigatorKey: _rootKey,
  initialLocation: '/',
  routes: [
    ShellRoute(
      navigatorKey: _shellKey,
      builder: (context, state, child) => HomeShell(child: child),
      routes: [
        GoRoute(path: '/', builder: (c, s) => const RoadmapScreen()),
        GoRoute(path: '/ai', builder: (c, s) => const AiScreen()),
        GoRoute(path: '/profile', builder: (c, s) => const ProfileScreen()),
      ],
    ),
    GoRoute(
      path: '/level/:id',
      parentNavigatorKey: _rootKey,
      builder: (c, s) => LevelScreen(levelId: int.parse(s.pathParameters['id']!)),
    ),
    GoRoute(
      path: '/topic/:id',
      parentNavigatorKey: _rootKey,
      builder: (c, s) => TopicScreen(topicId: s.pathParameters['id']!),
    ),
    GoRoute(
      path: '/topic/:id/quiz',
      parentNavigatorKey: _rootKey,
      builder: (c, s) => QuizScreen(topicId: s.pathParameters['id']!),
    ),
  ],
);
