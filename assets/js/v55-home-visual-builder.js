
(function(){
  const KEY='elkass.home.visual.v55';
  const DEFAULTS={heroTitle:'Sprzęt do domu z doradztwem, nie tylko z półki!',heroSubtitle:'RTV, AGD, multimedia, serwis, transport i pomoc w wyborze. Lokalnie, konkretnie i w premium wydaniu.',heroImage:'/assets/images/hero/hero-premium-demo.png',heroMobileImage:'/assets/images/hero/hero-premium-demo.png',galleryImage:'/assets/images/gallery/salon-elkass-demo.jpg',categoryRtv:'/assets/categories/clean-rtv.jpg',categoryAgd:'/assets/categories/clean-agd.jpg',promoBanner:'/assets/banners/weekend-sale.jpg',heroHeightDesktop:'560px',heroHeightMobile:'430px'};
  const media=[
    {id:'hero-premium',label:'Hero Premium',src:'/assets/images/hero/hero-premium-demo.png'},
    {id:'salon',label:'Salon ELKASS',src:'/assets/images/gallery/salon-elkass-demo.jpg'},
    {id:'weekend',label:'Weekend sale',src:'/assets/banners/weekend-sale.jpg'},
    {id:'rtv',label:'RTV',src:'/assets/categories/clean-rtv.jpg'},
    {id:'agd',label:'AGD',src:'/assets/categories/clean-agd.jpg'},
    {id:'blackweek',label:'Black Week',src:'/assets/hero-seasonal-real/blackweek.jpg'}
  ];
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function read(){try{return {...DEFAULTS,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {...DEFAULTS}}}
  function save(v){localStorage.setItem(KEY,JSON.stringify({...read(),...v}));}
  function toast(msg){const t=$('#v47Toast')||document.createElement('div'); if(!t.id){t.id='v47Toast';t.className='v47-toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
  function applyHome(){
    const cfg=read();
    document.body.classList.add('v55-home-active');
    document.documentElement.style.setProperty('--v55-hero-image',`url("${cfg.heroImage}")`);
    const h1=$('.hero h1'); if(h1 && cfg.heroTitle) h1.innerHTML=cfg.heroTitle.replace('nie tylko z półki','<span>nie tylko z półki</span>');
    const p=$('.hero .hero-inner p'); if(p && cfg.heroSubtitle) p.textContent=cfg.heroSubtitle;
    const hero=$('.hero-card'); if(hero){hero.style.minHeight=cfg.heroHeightDesktop || '560px'}
    const gallery=$('.v24-meet-photo img'); if(gallery && cfg.galleryImage) gallery.src=cfg.galleryImage;
    const rtv=$('[data-category="rtv"] .v23-card-media img'); if(rtv && cfg.categoryRtv) rtv.src=cfg.categoryRtv;
    const agd=$('[data-category="agd"] .v23-card-media img'); if(agd && cfg.categoryAgd) agd.src=cfg.categoryAgd;
    if(matchMedia('(max-width: 760px)').matches && hero){hero.style.minHeight=cfg.heroHeightMobile || '430px'}
  }
  function adminHtml(){const cfg=read();return `<section id="visual" class="v47-tab"><div class="v47-grid"><div class="v47-card span12"><div class="v47-head"><div><h2>Home Visual Builder LIVE</h2><p>V55: zmiana grafik Hero, kategorii i galerii bez edycji kodu. Zapis lokalny teraz, chmura po podpięciu Supabase.</p></div><span class="v47-pill">V55 LIVE</span></div><div class="v55-visual-panel"><div class="v55-editor-card"><h3>Edytuj stronę główną</h3><div class="v55-fieldset"><label class="full">Nagłówek Hero<input id="v55HeroTitle" value="${cfg.heroTitle}"></label><label class="full">Opis Hero<textarea id="v55HeroSubtitle" rows="3">${cfg.heroSubtitle}</textarea></label><label>Wysokość desktop<input id="v55HeroDesktop" value="${cfg.heroHeightDesktop}"></label><label>Wysokość mobile<input id="v55HeroMobile" value="${cfg.heroHeightMobile}"></label><label class="full">Zdjęcie Hero<input id="v55HeroImage" value="${cfg.heroImage}"></label><label>Zdjęcie RTV<input id="v55RtvImage" value="${cfg.categoryRtv}"></label><label>Zdjęcie AGD<input id="v55AgdImage" value="${cfg.categoryAgd}"></label><label class="full">Zdjęcie sekcji Poznaj ELKASS<input id="v55GalleryImage" value="${cfg.galleryImage}"></label></div><div class="v55-actions"><button class="v55-btn primary" id="v55SaveHome">Zapisz Home Visual</button><button class="v55-btn" id="v55ApplyDemo">Wstaw demo media pack</button><button class="v55-btn dark" id="v55ResetHome">Reset</button></div><p class="v55-status">Po zapisie otwórz podgląd sklepu. Zmiany są odczytywane przez stronę główną.</p><h3>Biblioteka szybkiego wyboru</h3><div class="v55-media-grid">${media.map(m=>`<button class="v55-media-tile" data-v55-pick="${m.src}"><img src="${m.src}" alt=""><span>${m.label}</span></button>`).join('')}</div></div><div class="v55-preview-card"><h3>Podgląd Hero</h3><div class="v55-live-preview" id="v55Preview"><div><h4>${cfg.heroTitle}</h4><p>${cfg.heroSubtitle}</p><span class="v55-preview-btn">Zobacz ofertę</span></div></div><p class="v55-status">Podgląd pokazuje kierunek wizualny. Pełny efekt sprawdzisz na stronie głównej.</p></div></div></div></div></section>`}
  function bindAdmin(){
    const nav=$('.v47-nav'), main=$('.v47-main'); if(!nav||!main||$('#visual'))return;
    const btn=document.createElement('button'); btn.dataset.v47Tab='visual'; btn.textContent='🖼 Home Visual'; nav.insertBefore(btn, nav.querySelector('a'));
    main.insertAdjacentHTML('beforeend',adminHtml());
    btn.addEventListener('click',()=>{$$('.v47-nav button').forEach(x=>x.classList.remove('active'));$$('.v47-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#visual').classList.add('active')});
    const updatePreview=()=>{const img=$('#v55HeroImage')?.value||DEFAULTS.heroImage; const pv=$('#v55Preview'); if(pv)pv.style.setProperty('--v55-preview-image',`url("${img}")`); const h=$('#v55Preview h4'); if(h)h.textContent=$('#v55HeroTitle')?.value||DEFAULTS.heroTitle; const p=$('#v55Preview p'); if(p)p.textContent=$('#v55HeroSubtitle')?.value||DEFAULTS.heroSubtitle;};
    ['v55HeroImage','v55HeroTitle','v55HeroSubtitle'].forEach(id=>$('#'+id)?.addEventListener('input',updatePreview)); updatePreview();
    $$('.v55-media-tile').forEach(tile=>tile.addEventListener('click',()=>{const input=$('#v55HeroImage'); if(input)input.value=tile.dataset.v55Pick; $$('.v55-media-tile').forEach(x=>x.classList.remove('active')); tile.classList.add('active'); updatePreview();}));
    $('#v55ApplyDemo')?.addEventListener('click',()=>{save(DEFAULTS); toast('Wstawiono demo media pack'); location.reload();});
    $('#v55ResetHome')?.addEventListener('click',()=>{localStorage.removeItem(KEY); toast('Zresetowano Home Visual'); location.reload();});
    $('#v55SaveHome')?.addEventListener('click',()=>{save({heroTitle:$('#v55HeroTitle').value,heroSubtitle:$('#v55HeroSubtitle').value,heroImage:$('#v55HeroImage').value,heroHeightDesktop:$('#v55HeroDesktop').value,heroHeightMobile:$('#v55HeroMobile').value,categoryRtv:$('#v55RtvImage').value,categoryAgd:$('#v55AgdImage').value,galleryImage:$('#v55GalleryImage').value}); toast('Zapisano grafiki i teksty strony głównej'); updatePreview();});
  }
  function init(){ if(document.body.classList.contains('v47-studio')) bindAdmin(); else applyHome(); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
})();
