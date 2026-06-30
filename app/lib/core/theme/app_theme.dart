import 'package:flutter/material.dart';

/// Premium design system shared by the whole app (mirrors the book palette).
class AppColors {
  static const navy = Color(0xFF1F3A5F);
  static const blue = Color(0xFF2E75B6);
  static const teal = Color(0xFF0E7C7B);
  static const green = Color(0xFF1E8449);
  static const amber = Color(0xFFB7791F);
  static const red = Color(0xFFC0392B);
  static const purple = Color(0xFF6C3483);
  static const codeBg = Color(0xFF0E1B2A);
  static const codeText = Color(0xFFE6EDF3);

  static Color fromHex(String hex) {
    final v = hex.replaceAll('#', '');
    return Color(int.parse('FF$v', radix: 16));
  }
}

class AppTheme {
  static ThemeData light() {
    final scheme = ColorScheme.fromSeed(
      seedColor: AppColors.blue,
      primary: AppColors.navy,
      secondary: AppColors.teal,
      brightness: Brightness.light,
    );
    return _base(scheme, Brightness.light);
  }

  static ThemeData dark() {
    final scheme = ColorScheme.fromSeed(
      seedColor: AppColors.blue,
      brightness: Brightness.dark,
    );
    return _base(scheme, Brightness.dark);
  }

  static ThemeData _base(ColorScheme scheme, Brightness b) {
    final isDark = b == Brightness.dark;
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: isDark ? const Color(0xFF0F1620) : const Color(0xFFF6F8FB),
      appBarTheme: AppBarTheme(
        backgroundColor: isDark ? const Color(0xFF13202F) : AppColors.navy,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: const TextStyle(
            fontSize: 20, fontWeight: FontWeight.w700, color: Colors.white),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        color: isDark ? const Color(0xFF18242F) : Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(
              color: isDark ? const Color(0xFF24323F) : const Color(0xFFE3E9F0)),
        ),
      ),
      chipTheme: const ChipThemeData(side: BorderSide.none),
      progressIndicatorTheme:
          const ProgressIndicatorThemeData(linearMinHeight: 8),
      textTheme: const TextTheme(
        headlineSmall: TextStyle(fontWeight: FontWeight.w800),
        titleLarge: TextStyle(fontWeight: FontWeight.w700),
        titleMedium: TextStyle(fontWeight: FontWeight.w700),
        bodyMedium: TextStyle(height: 1.45),
      ),
    );
  }
}

/// Map JSON icon names to Material icons.
IconData iconFor(String name) {
  const map = {
    'memory': Icons.memory,
    'coffee': Icons.coffee,
    'android': Icons.android,
    'flutter_dash': Icons.flutter_dash,
    'account_tree': Icons.account_tree,
    'architecture': Icons.architecture,
    'dns': Icons.dns,
    'storage': Icons.storage,
    'local_fire_department': Icons.local_fire_department,
    'extension': Icons.extension,
    'qr_code_2': Icons.qr_code_2,
    'cloud': Icons.cloud,
    'palette': Icons.palette,
    'smart_toy': Icons.smart_toy,
    'schema': Icons.schema,
    'workspace_premium': Icons.workspace_premium,
    'school': Icons.school,
  };
  return map[name] ?? Icons.school;
}
