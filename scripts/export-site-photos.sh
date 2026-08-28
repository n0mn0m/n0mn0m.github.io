#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/content/img/site"
EXPORT_DIR="$(mktemp -d "${TMPDIR:-/tmp}/site-photos.XXXXXX")"

cleanup() {
    rm -rf "$EXPORT_DIR"
}
trap cleanup EXIT

mkdir -p "$OUTPUT_DIR"
find "$OUTPUT_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +

osascript - "$EXPORT_DIR" <<'APPLESCRIPT'
on run argv
    set exportDirectory to POSIX file (item 1 of argv)
    tell application "Photos"
        set siteAlbum to album "site"
        set sitePhotos to media items of siteAlbum
        export sitePhotos to exportDirectory
    end tell
end run
APPLESCRIPT

photo_count="$(find "$EXPORT_DIR" -type f | wc -l | tr -d ' ')"
if [ "$photo_count" -eq 0 ]; then
    echo "No photos were exported from the Photos album named site." >&2
    exit 1
fi

index=1
while IFS= read -r photo; do
    name="$(printf 'site-%04d' "$index")"
    sips --resampleHeightWidthMax 2400 --setProperty format jpeg \
        --setProperty formatOptions 88 "$photo" \
        --out "$OUTPUT_DIR/$name-2400.jpg" >/dev/null
    sips --resampleHeightWidthMax 1280 --setProperty format jpeg \
        --setProperty formatOptions 88 "$photo" \
        --out "$OUTPUT_DIR/$name-1280.jpg" >/dev/null
    sips --resampleHeightWidthMax 640 --setProperty format jpeg \
        --setProperty formatOptions 88 "$photo" \
        --out "$OUTPUT_DIR/$name-640.jpg" >/dev/null
    index=$((index + 1))
done < <(find "$EXPORT_DIR" -type f | sort)

echo "Exported $((index - 1)) photos to $OUTPUT_DIR"
