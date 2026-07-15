
(function(){
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const LIB=[
    {title:'Hero Premium',src:'assets/images/hero/hero-premium-demo.png',type:'Hero',use:'Home'},
    {title:'Salon ELKASS',src:'assets/images/gallery/salon-elkass-demo.jpg',type:'Galeria',use:'Poznaj ELKASS'},
    {title:'RTV',src:'assets/categories/clean-rtv.jpg',type:'Kategoria',use:'RTV'},
    {title:'AGD',src:'assets/categories/clean-agd.jpg',type:'Kategoria',use:'AGD'},
    {title:'Black Week',src:'assets/hero-seasonal-real/blackweek.jpg',type:'Motyw',use:'Theme Engine'},
    {title:'Boże Narodzenie',src:'assets/hero-seasonal-real/christmas.jpg',type:'Motyw',use:'Theme Engine'},
    {title:'Raty 0%',src:'assets/banners/raty-0.jpg',type:'Banner',use:'Finance Builder'},
    {title:'Weekend sale',src:'assets/banners/weekend-sale.jpg',type:'Banner',use:'Promocje'}
  ];
  function toast(msg){const t=$('#v47Toast')||document.createElement('div'); if(!t.id){t.id='v47Toast';t.className='v47-toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
  function adminHtml(){return `<section id="mediaHome" class="v47-tab"><div class="v47-grid"><div class="v47-card span12"><div class="v47-head"><div><h2>Media + Home Integration</h2><p>V56: jedno Media Studio zasila Hero, kategorie, banery, motywy i galerię. To przygotowanie pod Supabase Storage oraz WOODYBOY Core.</p></div><span class="v47-pill">V56</span></div><div class="v56-dropzone"><strong>Przeciągnij zdjęcia tutaj</strong><br><span>W prototypie pokazujemy bibliotekę i przypisania. Po chmurze upload trafi do Storage.</span></div><div class="v56-library">${LIB.map(x=>`<article class="v56-asset"><img src="${x.src}" alt=""><b>${x.title}</b><small>${x.type}</small><span class="v56-tag">${x.use}</span></article>`).join('')}</div><div class="v56-media-note"><strong>Zasada od V56</strong><p>Grafiki widoczne w sklepie mają być wybierane z Media Studio, a nie wpisywane na stałe w HTML. Dzięki temu później podmienisz demo grafiki na własne zdjęcia ELKASS bez programisty.</p></div></div></div></section>`}
  function bindAdmin(){const nav=$('.v47-nav'), main=$('.v47-main'); if(!nav||!main||$('#mediaHome'))return; const btn=document.createElement('button'); btn.dataset.v47Tab='mediaHome'; btn.textContent='🔗 Media ↔ Home'; nav.insertBefore(btn, nav.querySelector('a')); main.insertAdjacentHTML('beforeend',adminHtml()); btn.addEventListener('click',()=>{$$('.v47-nav button').forEach(x=>x.classList.remove('active'));$$('.v47-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#mediaHome').classList.add('active')}); $$('.v56-asset').forEach(a=>a.addEventListener('click',()=>toast('Wybrano grafikę z Media Studio')))}
  function publicMark(){document.body.classList.add('v56-image-ready'); const ribbon=document.createElement('div'); ribbon.className='v56-home-ribbon'; ribbon.textContent='Media Studio Ready'; document.body.appendChild(ribbon); setTimeout(()=>ribbon.classList.add('show'),900); setTimeout(()=>ribbon.classList.remove('show'),4200)}
  function init(){if(document.body.classList.contains('v47-studio')) bindAdmin(); else publicMark();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
})();
