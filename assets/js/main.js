const menuBtn=document.getElementById('menuBtn'),menu=document.getElementById('menu');menuBtn?.addEventListener('click',()=>menu.classList.toggle('open'));
const defaultOrder=['hero','hit','brands','categories','gallery','reviews','contact'];
function readStudioConfig(){try{return JSON.parse(localStorage.getItem('elkassStudioConfig')||'{}')}catch(e){return {}}}
function applySectionOrder(){
  const main=document.getElementById('pageSections'); if(!main) return;
  const cfg=readStudioConfig();
  let order=cfg.sections||JSON.parse(localStorage.getItem('elkassSectionOrder')||'null')||defaultOrder;
  order=order.filter(k=>defaultOrder.includes(k)); defaultOrder.forEach(k=>{if(!order.includes(k))order.push(k)});
  const hidden=cfg.hiddenSections||[];
  defaultOrder.forEach(k=>{const el=main.querySelector(`[data-section="${k}"]`); if(el) el.hidden=hidden.includes(k)});
  order.forEach(key=>{const el=main.querySelector(`[data-section="${key}"]`); if(el) main.appendChild(el)});
}
function applyStudioContent(){
  const cfg=readStudioConfig();
  if(cfg.theme){document.body.dataset.theme=cfg.theme.base||'premium';document.body.dataset.density=cfg.theme.density||'compact';document.body.dataset.season=cfg.theme.season||'none';}
  if(cfg.hero){
    const hero=document.querySelector('[data-section="hero"]');
    const h=hero?.querySelector('h1'),p=hero?.querySelector('p');
    if(h&&cfg.hero.title)h.textContent=cfg.hero.title;
    if(p&&cfg.hero.text)p.textContent=cfg.hero.text;
    const links=hero?.querySelectorAll('.hero-actions a');
    if(links?.[0]&&cfg.hero.cta1)links[0].textContent=cfg.hero.cta1;
    if(links?.[1]&&cfg.hero.cta2)links[1].textContent=cfg.hero.cta2;
  }
  if(cfg.hit){
    const hit=document.querySelector('[data-section="hit"] .deal-main');
    if(hit){
      const name=hit.querySelector('h2'),desc=hit.querySelector('p'),old=hit.querySelector('.old-price'),price=hit.querySelector('.price-line strong'),badge=hit.querySelector('.deal-photo b');
      if(name&&cfg.hit.name)name.textContent=cfg.hit.name;
      if(desc&&cfg.hit.desc)desc.textContent=cfg.hit.desc;
      if(old&&cfg.hit.oldPrice)old.textContent=cfg.hit.oldPrice;
      if(price&&cfg.hit.price)price.textContent=cfg.hit.price;
      if(badge&&cfg.hit.discount)badge.textContent=cfg.hit.discount;
    }
  }
  if(Array.isArray(cfg.promos)){document.querySelectorAll('.mini-promo').forEach((el,i)=>{const p=cfg.promos[i]; if(!p)return; const strong=el.querySelector('strong'),small=el.querySelector('small'),em=el.querySelector('em'),b=el.querySelector('b'),badge=el.querySelector('.promo-badge'); if(strong)strong.textContent=p.name||strong.textContent;if(small)small.textContent=p.desc||small.textContent;if(em)em.textContent=p.old||em.textContent;if(b)b.textContent=p.price||b.textContent;if(badge)badge.textContent=p.discount||badge.textContent;});}
}
applyStudioContent();
applySectionOrder();
