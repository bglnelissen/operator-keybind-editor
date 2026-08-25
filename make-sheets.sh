#!/usr/bin/env bash
# Render the printable PDF sheets for the built-in presets.
#
# The sheets are what the site itself prints, so they must be regenerated whenever a
# built-in preset changes -- otherwise sheets/ quietly drifts from app.js.
#
#   ./make-sheets.sh
#
# Serves the folder on a scratch port, drives headless Chrome over it, and writes
# sheets/keybinds-default.pdf and sheets/keybinds-numpad.pdf.

set -euo pipefail
cd "$(dirname "$0")"

PORT=${PORT:-8677}
CHROME=${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}
[ -x "$CHROME" ] || CHROME="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
[ -x "$CHROME" ] || { echo "No Chrome or Edge found; set CHROME=/path/to/browser" >&2; exit 1; }

mkdir -p sheets

python -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

# Wait for the port rather than sleeping a guessed number of seconds.
for _ in $(seq 1 40); do
  curl -sf "http://127.0.0.1:$PORT/index.html" -o /dev/null && break
  sleep 0.25
done

render() {
  local preset=$1 out=$2
  # --virtual-time-budget lets the bundled defaults finish fetching before the print.
  "$CHROME" \
    --headless \
    --disable-gpu \
    --no-first-run \
    --no-pdf-header-footer \
    --virtual-time-budget=8000 \
    --print-to-pdf="$(pwd)/$out" \
    "http://127.0.0.1:$PORT/index.html?preset=$preset" >/dev/null 2>&1
  [ -s "$out" ] || { echo "failed to render $out" >&2; exit 1; }
  printf '%-34s %s\n' "$out" "$(du -h "$out" | cut -f1)"
}

render default sheets/keybinds-default.pdf
render numpad  sheets/keybinds-numpad.pdf
