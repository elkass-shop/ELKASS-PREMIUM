(function(){
  const defaults={visibility:{hero:true,breadcrumbs:true,subcategories:true,filtersDesktop:true,filtersMobile:true,brandStrip:true,advisor:true,guide:true,faq:false},filterGroups:[{id:'category',enabled:true},{id:'brand',enabled:true},{id:'price',enabled:true},{id:'status',enabled:true},{id:'size',enabled:false},{id:'energy',enabled:false}],mobile:{filterMode:'drawer',cardsPerRow:1,showQuickActions:true},desktop:{filterMode:'sidebar',cardsPerRow:3,defaultView:'grid'}};
  function load(){try{return JSON.parse(localStorage.getItem('elkass.categoryStudio.v35')||'null')||defaults}catch(e){return defaults}}
  function mergeConfig(c){return { ...defaults, ...c, visibility:{...defaults.visibility,...(c.visibility||{})}, mobile:{...defaults.mobile,...(c.mobile||{})}, desktop:{...defaults.desktop,...(c.desktop||{})}, filterGroups:Array.isArray(c.filterGroups)?c.filterGroups:defaults.filterGroups}}
  function apply(){const cfg=mergeConfig(load());
    const sec=(name,show)=>document.querySelectorAll(`[data-section="${name}"]`).forEach(el=>el.classList.toggle('is-hidden-by-studio',!show));
    sec('category-hero',cfg.visibility.hero);sec('breadcrumbs',cfg.visibility.breadcrumbs);sec('subcategories',cfg.visibility.subcategories);sec('filters-desktop',cfg.visibility.filtersDesktop);sec('filters-mobile-button',cfg.visibility.filtersMobile);sec('advisor',cfg.visibility.advisor);sec('guide',cfg.visibility.guide);
    const enabled=new Map(cfg.filterGroups.map(g=>[g.id,!!g.enabled]));
    document.querySelectorAll('[data-filter-group]').forEach(el=>{const id=el.getAttribute('data-filter-group');el.classList.toggle('is-disabled',enabled.has(id)?!enabled.get(id):false)});
    document.body.dataset.categoryMobileFilters=cfg.visibility.filtersMobile?'on':'off';
    const wrap=document.querySelector('.v34-main');
    if(wrap && !document.querySelector('.v35-category-status')){wrap.insertAdjacentHTML('afterbegin',`<div class="v35-category-status"><span><b>Oferta ELKASS</b> — filtry i sekcje są gotowe do sterowania z Category Studio.</span><small>Desktop / Mobile / SEO / Smart Filters</small></div>`)}
  }
  window.elkassApplyCategoryStudio=apply;document.addEventListener('DOMContentLoaded',apply);
})();
