(function(){
  const STORAGE_KEY='elkass.layout.v465';
  const DEFAULT_URL='/data/layout-v465.json';
  const sectionMap={
    hero:['.hero'],
    promotions:['#hit','.v22-promo-section'],
    brands:['#producenci','.v22-brands-section'],
    categories:['#oferta','.v23-categories'],
    dynamicProducts:['#sekcja-promocyjna','.v25-dynamic-products'],
    about:['#poznaj-elkass','.v24-about','.v25-about'],
    reviews:['#opinie','.v33-reviews','.v331-reviews'],
    contact:['#znajdz-nas','.v24-contact','.v25-contact']
  };
  const variables={
    heroDesktopHeight:'--elkass-hero-desktop-height',
    heroMobileHeight:'--elkass-hero-mobile-height',
    sectionPaddingDesktop:'--elkass-section-padding-desktop',
    sectionPaddingMobile:'--elkass-section-padding-mobile',
    promoHitHeight:'--elkass-promo-hit-height',
    promoMiniHeight:'--elkass-promo-mini-height',
    galleryHeight:'--elkass-gallery-height',
    reviewsHeight:'--elkass-reviews-height',
    radius:'--elkass-section-radius'
  };
  function px(v){return String(v).includes('px')?String(v):`${v}px`;}
  function getSaved(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch(e){return null}}
  function save(cfg){localStorage.setItem(STORAGE_KEY,JSON.stringify(cfg));}
  function activePreset(cfg){return (cfg.presets&&cfg.presets[cfg.activePreset])||cfg.presets?.standard||{};}
  function apply(cfg){
    const preset=activePreset(cfg);
    Object.keys(variables).forEach(k=>{if(preset[k]!=null)document.documentElement.style.setProperty(variables[k],px(preset[k]));});
    Object.entries(cfg.sections||{}).forEach(([key,sec])=>{
      const nodes=(sectionMap[key]||[]).flatMap(sel=>Array.from(document.querySelectorAll(sel)));
      nodes.forEach(node=>{
        node.classList.toggle('elkass-hide-desktop',sec.enabledDesktop===false);
        node.classList.toggle('elkass-hide-tablet',sec.enabledTablet===false);
        node.classList.toggle('elkass-hide-mobile',sec.enabledMobile===false);
        if(sec.order) node.style.order=sec.order;
      });
    });
    document.documentElement.dataset.layoutPreset=cfg.activePreset||'standard';
  }
  function toast(msg){const t=document.getElementById('toast');if(t){t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}else console.log(msg)}
  async function loadConfig(){
    const saved=getSaved();
    if(saved) return saved;
    try{const res=await fetch(DEFAULT_URL,{cache:'no-store'});return await res.json();}catch(e){return {activePreset:'standard',presets:{standard:{heroDesktopHeight:620,heroMobileHeight:520,sectionPaddingDesktop:72,sectionPaddingMobile:44,promoHitHeight:470,promoMiniHeight:270,galleryHeight:380,reviewsHeight:300,radius:28}},sections:{}}}
  }
  function makeRange(name,label,min,max,step,value){return `<label>${label}<input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-layout-range="${name}"><output>${value}px</output></label>`}
  function mountStudio(cfg){
    const nav=document.querySelector('.studio-nav');
    const main=document.querySelector('.studio-main');
    if(!nav||!main||document.getElementById('layout')) return;
    const btn=document.createElement('button');btn.dataset.tab='layout';btn.textContent='📐 Layout Builder';
    const mobileBtn=nav.querySelector('[data-tab="mobile"]');
    nav.insertBefore(btn,mobileBtn||nav.firstChild);
    const preset=activePreset(cfg);
    const sectionRows=Object.entries(cfg.sections||{}).sort((a,b)=>(a[1].order||0)-(b[1].order||0)).map(([key,sec],i)=>`
      <div class="layout-section-row" data-section="${key}">
        <div class="drag">${i+1}</div><div><strong>${sec.label||key}</strong><small>Widoczność i kolejność sekcji</small></div>
        <label><input type="checkbox" data-visible="desktop" ${sec.enabledDesktop!==false?'checked':''}> Desktop</label>
        <label><input type="checkbox" data-visible="tablet" ${sec.enabledTablet!==false?'checked':''}> Tablet</label>
        <label><input type="checkbox" data-visible="mobile" ${sec.enabledMobile!==false?'checked':''}> Mobile</label>
      </div>`).join('');
    const section=document.createElement('section');section.id='layout';section.className='studio-tab';
    section.innerHTML=`<div class="layout-builder-grid">
      <div class="layout-panel span-8"><div class="module-head"><div><h2>Layout Builder v4.6.5</h2><p>Zmiana wysokości, odstępów, zaokrągleń i widoczności sekcji bez dotykania kodu. Desktop i mobile mają osobne ustawienia.</p></div><span class="pill">Live controls</span></div>
        <div class="layout-controls">
          <label>Preset układu<select id="layoutPreset">${Object.entries(cfg.presets||{}).map(([k,p])=>`<option value="${k}" ${k===cfg.activePreset?'selected':''}>${p.name||k}</option>`).join('')}</select></label>
          ${makeRange('radius','Zaokrąglenia sekcji',16,42,1,preset.radius||28)}
          ${makeRange('heroDesktopHeight','Hero desktop',420,820,10,preset.heroDesktopHeight||620)}
          ${makeRange('heroMobileHeight','Hero mobile',360,660,10,preset.heroMobileHeight||520)}
          ${makeRange('sectionPaddingDesktop','Odstępy sekcji desktop',34,110,2,preset.sectionPaddingDesktop||72)}
          ${makeRange('sectionPaddingMobile','Odstępy sekcji mobile',24,74,2,preset.sectionPaddingMobile||44)}
          ${makeRange('promoHitHeight','Hit tygodnia — wysokość',320,620,10,preset.promoHitHeight||470)}
          ${makeRange('promoMiniHeight','Małe promocje — wysokość',190,380,10,preset.promoMiniHeight||270)}
          ${makeRange('galleryHeight','Poznaj ELKASS / galeria',260,520,10,preset.galleryHeight||380)}
          ${makeRange('reviewsHeight','Opinie — wysokość kart',220,420,10,preset.reviewsHeight||300)}
        </div>
        <div class="layout-actions"><button class="studio-btn primary" id="layoutSave">Zapisz ustawienia</button><button class="studio-btn" id="layoutReset">Reset do pliku JSON</button><button class="studio-btn" id="layoutCompact">Szybko: Compact</button></div>
      </div>
      <div class="layout-panel span-4"><h2>Podgląd proporcji</h2><div class="layout-preview-card"><div class="layout-preview-hero"><b>Hero</b><br><small>wysokość z Layout Buildera</small></div><div class="layout-preview-section">Promocje</div><div class="layout-preview-section">Kategorie</div><div class="layout-preview-section">Opinie</div></div></div>
      <div class="layout-panel span-8"><h2>Widoczność sekcji</h2>${sectionRows}</div>
      <div class="layout-panel span-4"><h2>Motywy sezonowe</h2><div class="layout-note">Layout Builder współpracuje z Theme Engine. Motyw może zmienić proporcje sekcji, ale treść i kolejność pozostają pod kontrolą Home Studio.</div><div class="quality-list" style="margin-top:14px"><div class="quality-item">Boże Narodzenie <span>obsługuje layout</span></div><div class="quality-item">Black Week <span>obsługuje layout</span></div><div class="quality-item">Mobile <span>osobne wartości</span></div></div></div>
    </div>`;
    main.appendChild(section);
    function updateFromControls(){
      const current=activePreset(cfg);
      document.querySelectorAll('[data-layout-range]').forEach(input=>{current[input.dataset.layoutRange]=Number(input.value); input.nextElementSibling.textContent=input.value+'px';});
      cfg.activePreset=document.getElementById('layoutPreset').value;
      cfg.presets[cfg.activePreset]=Object.assign({},cfg.presets[cfg.activePreset],current);
      document.querySelectorAll('.layout-section-row').forEach(row=>{const sec=cfg.sections[row.dataset.section]; if(!sec)return; sec.enabledDesktop=row.querySelector('[data-visible="desktop"]').checked; sec.enabledTablet=row.querySelector('[data-visible="tablet"]').checked; sec.enabledMobile=row.querySelector('[data-visible="mobile"]').checked;});
      apply(cfg);
    }
    document.querySelectorAll('[data-layout-range]').forEach(i=>i.addEventListener('input',updateFromControls));
    document.querySelectorAll('.layout-section-row input').forEach(i=>i.addEventListener('change',updateFromControls));
    document.getElementById('layoutPreset').addEventListener('change',e=>{cfg.activePreset=e.target.value; const p=activePreset(cfg); document.querySelectorAll('[data-layout-range]').forEach(input=>{const v=p[input.dataset.layoutRange]; if(v!=null){input.value=v; input.nextElementSibling.textContent=v+'px';}}); apply(cfg);});
    document.getElementById('layoutSave').addEventListener('click',()=>{updateFromControls();save(cfg);toast('Layout zapisany w Studio');});
    document.getElementById('layoutReset').addEventListener('click',()=>{localStorage.removeItem(STORAGE_KEY);location.reload();});
    document.getElementById('layoutCompact').addEventListener('click',()=>{document.getElementById('layoutPreset').value='compact';document.getElementById('layoutPreset').dispatchEvent(new Event('change'));updateFromControls();save(cfg);toast('Ustawiono Compact');});
  }
  loadConfig().then(cfg=>{apply(cfg); if(location.pathname.startsWith('/admin')) mountStudio(cfg);});
})();
