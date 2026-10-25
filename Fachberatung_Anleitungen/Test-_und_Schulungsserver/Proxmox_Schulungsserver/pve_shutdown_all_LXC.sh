#!/usr/bin/env bash
# Copyright (c) (Mai 2026) Theo Richter & David Klein
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
set -euo pipefail
if [[ "${1:-}" == --help || "${1:-}" == -h ]]; then echo "Nutzung: $0 CT_ID [CT_ID ...]; beendet NUR ausdrücklich genannte Container geordnet."; exit 0; fi
(($# > 0)) || { echo "Container-IDs fehlen; keine Aktion." >&2; exit 2; }
for id in "$@"; do [[ "$id" =~ ^[1-9][0-9]{2,8}$ ]] || exit 2; pct config "$id" >/dev/null; done
for id in "$@"; do pct shutdown "$id" --timeout 120; done
echo "Genannte Container geordnet heruntergefahren."
