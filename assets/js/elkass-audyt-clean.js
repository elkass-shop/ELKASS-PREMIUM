
(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}
  const sectionMap={
    hero:'#home', search:'.shop-search-section', hit:'.deal-banner-section', trust:'.trust-strip', promotions:'#promocje', categories:'#oferta', bestsellers:'.bestsellers-section', quick:'.quick-info', reviews:'#opinie', local:'.local-advantages', gallery:'#galeria', contact:'#kontakt', cta:'.cta-section', brands:'.brands-section'
  };
  const defaultOrder=['hero','hit','trust','search','promotions','categories','quick','reviews','local','gallery','contact','cta','brands'];
  const nameToKey={'Hero premium':'hero','Hit tygodnia':'hit','Zaufanie':'trust','Wyszukiwarka':'search','Promocje':'promotions','Kategorie główne':'categories','Kategorie':'categories','Podkategorie':'categories','Produkty polecane':'bestsellers','Klasyczny blok sklepu':'local','Galeria ELKASS':'gallery','Galeria':'gallery','Producenci':'brands','Opinie':'reviews','Kontakt':'contact'};
  function removeDuplicates(){
    document.querySelectorAll('.elkass701-promo-section,.elkass-brand-marquee,.brand-ticker,.promo-strip,.top-offers-strip').forEach(el=>el.remove());
    const deals=[...document.querySelectorAll('.deal-banner-section')]; deals.slice(1).forEach(el=>el.remove());
    const brands=[...document.querySelectorAll('.brands-section')]; brands.slice(1).forEach(el=>el.remove());
    const brand=document.querySelector('.brands-section');
    if(brand){
      const eye=brand.querySelector('.eyebrow'); if(eye) eye.textContent='Renomowani producenci';
      const title=brand.querySelector('.brands-title,h2'); if(title) title.textContent='Nasi partnerzy i marki dostępne w ofercie';
      const lead=brand.querySelector('.brands-lead,p'); if(lead) lead.textContent='Sprawdzone marki RTV, AGD, multimedia i akcesoria — dostępne z lokalnym doradztwem ELKASS.';
    }
  }
  function applyHomeOrder(){
    if(document.body.classList.contains('gallery-page')) return;
    const main=document.querySelector('main'); if(!main) return;
    let order=defaultOrder.slice();
    try{
      const saved=JSON.parse(localStorage.getItem('elkassSections')||'null');
      if(Array.isArray(saved)&&saved.length){
        const mapped=saved.map(x=>nameToKey[x]||x).filter(Boolean);
        order=[...new Set([...mapped,...defaultOrder])];
      }
    }catch(e){}
    const moved=new Set();
    order.forEach(key=>{
      const sel=sectionMap[key]; if(!sel) return;
      const el=document.querySelector(sel); if(el && !moved.has(el)){main.appendChild(el);moved.add(el);}
    });
    const hero=document.querySelector('#home'), hit=document.querySelector('.deal-banner-section');
    if(hero && hit && hero.parentNode===main) hero.insertAdjacentElement('afterend',hit);
  }
  function compactHit(){
    const hit=document.querySelector('.deal-banner-section'); if(hit){hit.dataset.elkassAudyt='compact-under-hero';}
    const minis=document.querySelector('#dealMiniList'); if(minis){minis.setAttribute('aria-label','Kompaktowe mini oferty');}
  }
  function markGallery(){ if(/gallery\.html/i.test(location.pathname)) document.body.classList.add('gallery-page'); }
  ready(()=>{markGallery();removeDuplicates();applyHomeOrder();compactHit();setTimeout(()=>{removeDuplicates();applyHomeOrder();compactHit();},250);setTimeout(()=>{removeDuplicates();applyHomeOrder();compactHit();},900);});
})();
