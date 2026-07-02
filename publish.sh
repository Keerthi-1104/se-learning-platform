#!/usr/bin/env bash
# publish.sh — one-shot content publisher.
# Regenerates the manifest, mirrors files to ../se-learning-content,
# and pushes to GitHub so jsDelivr picks up the update.
#
# Works from ANY subdirectory — resolves paths relative to this script.

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTENT_DIR="$REPO_ROOT/../se-learning-content"

echo "→ regenerating manifest + mirroring content"
node "$REPO_ROOT/tools/publish_content.js"

echo ""
echo "→ committing + pushing to Keerthi-1104/se-learning-content"
cd "$CONTENT_DIR"

if git diff --quiet && git diff --cached --quiet; then
  echo "(no content changes — nothing to commit)"
  exit 0
fi

git add -A
git commit -m "content update: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push

echo ""
echo "✓ pushed. jsDelivr will pick it up in ~10 min."
echo "  Force-purge one file:"
echo "    curl https://purge.jsdelivr.net/gh/Keerthi-1104/se-learning-content@main/content_manifest.json"
