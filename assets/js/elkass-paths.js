(()=>{
 const isPages=location.hostname.endsWith('github.io');
 const seg=location.pathname.split('/').filter(Boolean);
 const base=isPages&&seg.length?'/'+seg[0]+'/':'/';
 window.ELKASS_BASE=base;
 window.elkassUrl=(v)=>{if(!v||/^(?:https?:|mailto:|tel:|data:|blob:|#|\/\/)/i.test(v))return v;return base+String(v).replace(/^\/+/, '')};
 const fix=(el)=>{if(!el||!el.getAttribute)return;['src','href','action','poster'].forEach(a=>{const v=el.getAttribute(a);if(v&&v[0]=='/'&&v[1]!='/')el.setAttribute(a,window.elkassUrl(v))})};
 document.addEventListener('click',e=>{const a=e.target.closest?.('a[href]');if(a){const v=a.getAttribute('href');if(v&&v[0]=='/'&&v[1]!='/'){e.preventDefault();location.href=window.elkassUrl(v)}}},true);
 document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[src],[href],[action],[poster]').forEach(fix);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){fix(n);n.querySelectorAll?.('[src],[href],[action],[poster]').forEach(fix)}}))).observe(document.documentElement,{subtree:true,childList:true})});
 const ofetch=window.fetch;if(ofetch)window.fetch=(i,o)=>ofetch(typeof i==='string'&&i[0]=='/'&&i[1]!='/'?window.elkassUrl(i):i,o);
 const oopen=window.open;window.open=(u,...r)=>oopen.call(window,typeof u==='string'&&u[0]=='/'&&u[1]!='/'?window.elkassUrl(u):u,...r);
})();