"""Read-only external link inventory; examples and templates are not reachability claims."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urlsplit
import ipaddress, json, re

root=Path(__file__).resolve().parents[1]
section=root/"Fachberatung_Anleitungen/Test-_und_Schulungsserver"
inventory={}
for file in section.rglob("*"):
    if file.suffix not in {".md",".sh",".example"}: continue
    source=file.read_text(encoding="utf-8")
    for match in re.finditer(r'https?://[^\s<>"\x27\x60)]+',source):
        url=match.group().rstrip(".,;")
        if any(c in url for c in ["$","{","}","*","\\\\"]): continue
        host=urlsplit(url).hostname or ""
        try:
            ipaddress.ip_address(host)
            continue
        except ValueError: pass
        if host.lower() in {"serveradresse","mein_svws-server","localhost","server","url"}: continue
        entry=inventory.setdefault(url,{"url":url,"sources":[],"published":False})
        entry["sources"].append(str(file.relative_to(root)))
        entry["published"] |= file.suffix==".md"
def probe(entry):
    try:
        request=Request(entry["url"],headers={"User-Agent":"FBM-documentation-link-check/1.0","Range":"bytes=0-1023"})
        with urlopen(request,timeout=15) as response:
            entry.update(status=response.status,final_url=response.url)
    except HTTPError as error:
        entry.update(status=error.code)
    except Exception as error:
        entry.update(status="unverified",error=type(error).__name__)
    return entry
with ThreadPoolExecutor(max_workers=8) as pool:
    results=list(pool.map(probe,inventory.values()))
out=root/"test-results"
out.mkdir(exist_ok=True)
(out/"training-links.json").write_text(json.dumps(results,indent=2,ensure_ascii=False),encoding="utf-8")
broken=[entry for entry in results if entry["published"] and entry["status"] in {400,404,410}]
unknown=[entry for entry in results if not isinstance(entry["status"],int) or entry["status"] in {401,403,429}]
print(json.dumps({"links":len(results),"broken_published":broken,"unverified_or_restricted":len(unknown)},ensure_ascii=True))
raise SystemExit(bool(broken))
