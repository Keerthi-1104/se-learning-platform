import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

/// Fetches content JSON (roadmap + topics) from the CDN, keeps a Hive cache,
/// falls back to a bundled starter pack + last cached copy so the app works
/// offline. Same contract as reading bundled assets: [loadJsonString] returns
/// the raw JSON text for a path like "roadmap.json" or "level_02/streams.json".
///
/// Resilience order for a topic path:
///   1. Hive cache with matching manifest sha  (fast + offline)
///   2. Network fetch from CDN                  (updates cache)
///   3. Hive cache with any sha                 (offline / CDN down)
///   4. Bundled starter asset if present        (first launch, no net)
///   5. throw AssetLoadException                (repo will substitute a stub)
class ContentService {
  ContentService({
    required this.cdnBase,
    http.Client? httpClient,
    Box<String>? cache,
  })  : _http = httpClient ?? http.Client(),
        _cache = cache;

  /// e.g. "https://cdn.jsdelivr.net/gh/Keerthi-1104/se-learning-content@main"
  final String cdnBase;
  final http.Client _http;
  final Box<String>? _cache;

  static const _boxName = 'content_cache';
  static const _manifestKey = '__manifest__';
  static const _manifestPath = 'content_manifest.json';
  static const _networkTimeout = Duration(seconds: 8);

  /// The last-known manifest, decoded. Null until [syncManifest] has run at
  /// least once (or a cached manifest is loaded).
  Map<String, dynamic>? _manifest;

  Map<String, dynamic>? get manifest => _manifest;

  /// Call once from main() after Hive.initFlutter().
  static Future<ContentService> init({required String cdnBase}) async {
    final box = await Hive.openBox<String>(_boxName);
    final svc = ContentService(cdnBase: cdnBase, cache: box);
    // Warm from cache immediately so first read is offline-safe.
    final cachedManifestRaw = box.get(_manifestKey);
    if (cachedManifestRaw != null) {
      try {
        svc._manifest = jsonDecode(cachedManifestRaw) as Map<String, dynamic>;
      } catch (_) {/* ignore corrupt cache */}
    }
    return svc;
  }

  /// Refreshes the manifest from the CDN. Silently no-ops on network failure
  /// (we still have the cached manifest, if any). Safe to call in the
  /// background at app start.
  Future<void> syncManifest() async {
    try {
      final raw = await _fetchString(_manifestPath);
      _manifest = jsonDecode(raw) as Map<String, dynamic>;
      await _cache?.put(_manifestKey, raw);
    } catch (e) {
      debugPrint('ContentService: manifest sync failed: $e');
    }
  }

  /// Returns the raw JSON text at [logicalPath] (e.g. "roadmap.json" or
  /// "level_02/streams.json"). Throws [AssetLoadException] if unavailable
  /// from every source.
  Future<String> loadJsonString(String logicalPath) async {
    final expectedSha = _expectedShaFor(logicalPath);

    // 1. Cache hit with matching sha -> return immediately
    final cachedRaw = _cache?.get(_pathKey(logicalPath));
    final cachedSha = _cache?.get(_shaKey(logicalPath));
    if (cachedRaw != null && expectedSha != null && cachedSha == expectedSha) {
      return cachedRaw;
    }

    // 2. Network fetch
    try {
      final fresh = await _fetchString(logicalPath);
      await _cache?.put(_pathKey(logicalPath), fresh);
      if (expectedSha != null) {
        await _cache?.put(_shaKey(logicalPath), expectedSha);
      }
      return fresh;
    } catch (_) {/* fall through */}

    // 3. Stale cache is better than nothing
    if (cachedRaw != null) return cachedRaw;

    // 4. Bundled starter pack (roadmap + level_01 ship with the APK)
    try {
      return await rootBundle.loadString('assets/content/$logicalPath');
    } catch (_) {/* not bundled */}

    // 5. Give up — repository layer will substitute a stub.
    throw AssetLoadException(logicalPath);
  }

  /// Returns the roadmap JSON text. Convenience wrapper.
  Future<String> loadRoadmapJson() => loadJsonString(_manifestPath == 'roadmap.json'
      ? 'roadmap.json'
      : 'roadmap.json');

  // ---------------------------------------------------------------- internals

  String? _expectedShaFor(String logicalPath) {
    final m = _manifest;
    if (m == null) return null;
    if (logicalPath == 'roadmap.json') {
      return (m['roadmap'] as Map?)?['sha'] as String?;
    }
    final topics = m['topics'] as Map?;
    if (topics == null) return null;
    for (final entry in topics.values) {
      if (entry is Map && entry['path'] == logicalPath) {
        return entry['sha'] as String?;
      }
    }
    return null;
  }

  Future<String> _fetchString(String logicalPath) async {
    final uri = Uri.parse('$cdnBase/$logicalPath');
    final resp = await _http.get(uri).timeout(_networkTimeout);
    if (resp.statusCode != 200) {
      throw HttpException(resp.statusCode, uri.toString());
    }
    return resp.body;
  }

  String _pathKey(String p) => 'raw:$p';
  String _shaKey(String p) => 'sha:$p';
}

class AssetLoadException implements Exception {
  AssetLoadException(this.path);
  final String path;
  @override
  String toString() => 'AssetLoadException($path)';
}

class HttpException implements Exception {
  HttpException(this.statusCode, this.url);
  final int statusCode;
  final String url;
  @override
  String toString() => 'HttpException($statusCode $url)';
}
