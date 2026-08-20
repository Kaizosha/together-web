#!/bin/sh

set -eu

ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
DIST="$ROOT/dist"
CLIENT="$DIST/client"

rm -rf "$DIST"
mkdir -p "$CLIENT" "$DIST/server"

for file in _headers 404.html index.html privacy.html icon.png robots.txt \
  site.webmanifest sitemap.xml; do
  cp "$ROOT/$file" "$CLIENT/$file"
done

mkdir -p "$CLIENT/assets/styles" "$CLIENT/assets/scripts" \
  "$CLIENT/assets/media/social"

for file in brand.css markdown.css together.css; do
  cp "$ROOT/assets/styles/$file" "$CLIENT/assets/styles/$file"
done

for file in document-navigation.js site-motion.js together-product.js; do
  cp "$ROOT/assets/scripts/$file" "$CLIENT/assets/scripts/$file"
done

cp "$ROOT/tools/sites-static-worker.js" "$DIST/server/index.js"
cp "$ROOT/assets/media/social/together-social-card.png" \
  "$CLIENT/assets/media/social/together-social-card.png"

printf 'Built static Together site in %s\n' "$DIST"
