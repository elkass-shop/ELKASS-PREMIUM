(function(){
  const isPages = location.hostname.endsWith('github.io');
  const parts = location.pathname.split('/').filter(Boolean);
  const base = isPages && parts.length ? '/' + parts[0] + '/' : '/';
  window.ELKASS_BASE = base;
  window.elkassUrl = function(path){
    if (!path || /^(https?:|mailto:|tel:|#|data:|blob:)/i.test(path)) return path;
    return base + String(path).replace(/^\/+/, '');
  };
  const normalize = el => {
    ['href','src','action'].forEach(attr=>{
      const v=el.getAttribute && el.getAttribute(attr);
      if(v && v.startsWith('/') && !v.startsWith('//')) el.setAttribute(attr, window.elkassUrl(v));
    });
  };
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[href],[src],[action]').forEach(normalize);
    new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{
      if(n.nodeType===1){ normalize(n); n.querySelectorAll?.('[href],[src],[action]').forEach(normalize); }
    }))).observe(document.documentElement,{childList:true,subtree:true});
  });
  const nativeFetch=window.fetch;
  if(nativeFetch) window.fetch=function(input,init){
    if(typeof input==='string' && input.startsWith('/') && !input.startsWith('//')) input=window.elkassUrl(input);
    return nativeFetch.call(this,input,init);
  };
})();