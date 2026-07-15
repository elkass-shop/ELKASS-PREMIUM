from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json,re,sys
ROOT=Path(__file__).resolve().parents[1]
class P(HTMLParser):
 def __init__(self): super().__init__(); self.refs=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for k in ('src','href'):
   if k in a:self.refs.append((tag,k,a[k]))
errors=[]; checked=0
for html in ROOT.rglob('*.html'):
 p=P();
 has_base='window.ELKASS_BASE' in html.read_text(errors='ignore')
 try:p.feed(html.read_text(errors='ignore'))
 except Exception as e:errors.append(f'HTML parse {html.relative_to(ROOT)}: {e}');continue
 for tag,key,ref in p.refs:
  if not ref or ref.startswith(('#','mailto:','tel:','javascript:','data:','blob:','http://','https://','//')):continue
  ref=ref.split('?',1)[0].split('#',1)[0]
  if not ref:continue
  target=(ROOT/ref.lstrip('/')) if (ref.startswith('/') or has_base) else (html.parent/ref)
  target=Path(unquote(str(target))).resolve()
  checked+=1
  if not target.exists():
   # directory links are valid if index.html exists
   if not (target/'index.html').exists():errors.append(f'BROKEN {html.relative_to(ROOT)} -> {ref}')
for js in ROOT.rglob('*.js'):
 txt=js.read_text(errors='ignore')
 for m in re.finditer(r"['\"](assets/[^'\"?#]+)['\"]",txt):
  checked+=1
  if not (ROOT/m.group(1)).exists():errors.append(f'MISSING ASSET {js.relative_to(ROOT)} -> {m.group(1)}')
print(json.dumps({'checked_references':checked,'errors':errors,'error_count':len(errors)},ensure_ascii=False,indent=2))
sys.exit(1 if errors else 0)
