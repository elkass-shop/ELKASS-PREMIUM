
(function(){
const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const fmt=n=> new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN',maximumFractionDigits:0}).format(Number(n||0));
const params=new URLSearchParams(location.search);
const pathId=(location.pathname.split('/').filter(Boolean).pop()||'').replace('.html','');
const id=params.get('id') || (pathId && !['product','produkt'].includes(pathId) ? pathId : '') || 'tv-samsung-55-crystal-uhd';
async function load(){
 let products=[];
 try{
   if(window.ElkassCloud && typeof window.ElkassCloud.getProducts === 'function'){
     products = await window.ElkassCloud.getProducts();
   } else {
     const data = await fetch('/data/products.json', {cache:'no-store'}).then(r=>r.json());
     products = data.products || [];
   }
 }catch(e){console.warn(e)}
 const product=products.find(p=>p.id===id)||products[0]; if(!product) return;
 const byId=Object.fromEntries(products.map(p=>[p.id,p]));
 render(product,products,byId);
}
function render(p, products, byId){
 document.title=p.name+' — ELKASS Premium';
 const root=$('#product-v44'); if(!root) return;
 const imgs=(p.images&&p.images.length?p.images:[p.image]).filter(Boolean);
 const features=(p.features||[]).slice(0,8);
 const top=features.slice(0,6);
 const mainParams=[];
 Object.entries(p.params||{}).forEach(([g,obj])=>Object.entries(obj||{}).forEach(([k,v])=>mainParams.push([k,v])));
 while(top.length<6 && mainParams.length){ const [k,v]=mainParams.shift(); top.push(v||k); }
 const related=(p.related||[]).map(x=>byId[x]).filter(Boolean);
 const same=products.filter(x=>x.id!==p.id && (x.category===p.category || x.brand===p.brand)).slice(0,4);
 const bundles=related.length?related:same;
 root.innerHTML=`
 <nav class="crumbs-v44"><a href="/">Start</a><span>›</span><a href="/app/category/">${p.category||'Oferta'}</a><span>›</span><span>${p.subcategory||p.brand||''}</span><span>›</span><b>${p.name}</b></nav>
 <section class="product-hero-v44">
  <div class="gallery-card-v44 premium-panel">
   <div class="gallery-layout-v44">
    <div class="thumbs-v44">${imgs.map((im,i)=>`<button class="thumb-v44 ${i?'':'active'}" data-img="${im}"><img src="${im}" alt="${p.name} miniatura ${i+1}"></button>`).join('')}</div>
    <div class="main-photo-v44"><img id="mainPhotoV44" src="${imgs[0]}" alt="${p.name}"><span class="zoom-hint">Kliknij, aby powiększyć</span></div>
   </div>
   <div class="gallery-note"><span>Zdjęcia dopasowane do galerii</span><span>Miniatury produktu</span><span>Wygodny podgląd na telefonie</span></div>
  </div>
  <aside class="buybox-v44 premium-panel">
   <div class="badge-row"><span class="badge-v44">${p.badge||'Polecany produkt'}</span><span class="badge-v44 green">${p.brand||'ELKASS'}</span></div>
   <h1 class="product-title-v44">${p.name}</h1>
   <p class="short-v44">${p.short||'Produkt dostępny w ofercie ELKASS z doradztwem, transportem i obsługą po zakupie.'}</p>
   <div class="pricebox-v44"><div class="price-v44">${fmt(p.price)}</div>${p.oldPrice?`<div class="oldprice-v44">${fmt(p.oldPrice)}</div>`:''}</div>
   <div class="installment-v44">💳 Raty 0% lub dogodne raty od ${Math.max(39,Math.round((p.price||1200)/36))} zł/mies.</div>
   <div class="availability-v44">● ${p.availability||'Dostępny w salonie ELKASS Olesno'}</div>
   <div class="cta-row-v44"><a class="btn-v44 primary" href="/app/cart/?add=${p.id}">Dodaj do koszyka</a><a class="btn-v44 ghost" href="tel:343582442">Zapytaj doradcę</a></div>
   <div class="finance-v44"><div class="finance-card"><b>Raty 0%</b><small>Sprawdź aktualną ofertę w salonie.</small></div><div class="finance-card"><b>Dogodne raty</b><small>Niska rata miesięczna dopasowana do budżetu.</small></div></div>
   <div class="top-params-v44">${top.map((v,i)=>`<div class="param-chip-v44"><small>${['Najważniejsze','Cecha','Parametr','Technologia','Wygoda','ELKASS'][i]||'Parametr'}</small><b>${v}</b></div>`).join('')}</div>
  </aside>
 </section>
 <section class="section-v44"><div class="tabs-v44"><div class="tab-buttons-v44"><button class="active" data-tab="elkass">Opis ELKASS</button><button data-tab="producer">Opis producenta</button><button data-tab="params">Parametry</button><button data-tab="faq">FAQ</button></div>
  <div class="tab-pane-v44 active" data-pane="elkass"><h2>Dlaczego warto wybrać ten model?</h2><p>${p.short||''} W ELKASS dobieramy sprzęt do realnych potrzeb domu: pomieszczenia, budżetu, sposobu używania i dostępnych usług montażu.</p><p>Przed zakupem doradca może pomóc dobrać akcesoria, transport, wniesienie oraz konfigurację.</p></div>
  <div class="tab-pane-v44" data-pane="producer"><h2>Opis producenta</h2><p>Pełny opis producenta może zawierać najważniejsze technologie, funkcje oraz wskazówki użytkowania w czytelnych sekcjach.</p></div>
  <div class="tab-pane-v44" data-pane="params"><div class="spec-grid-v44">${renderSpecs(p)}</div></div>
  <div class="tab-pane-v44" data-pane="faq"><h2>Najczęstsze pytania</h2><p><b>Czy produkt można odebrać w salonie?</b><br>Tak, dostępność salonowa będzie ustawiana w panelu.</p><p><b>Czy ELKASS oferuje montaż?</b><br>Tak, montaż i konfiguracja mogą być dodane jako usługa.</p></div>
 </div></section>
 <section class="section-v44"><div class="section-head-v44"><div><h2>Kupowane razem</h2><p>Dodatki, które najczęściej warto dobrać do tego produktu.</p></div></div><div class="product-strip-v44">${renderProducts(bundles.slice(0,4))}</div></section>
 <section class="section-v44"><div class="section-head-v44"><div><h2>Produkty podobne</h2><p>Ta sama kategoria, podobny budżet lub ta sama marka.</p></div></div><div class="product-strip-v44">${renderProducts(same.slice(0,4))}</div></section>
 <section class="section-v44 advisor-v44"><h2>Ekspert ELKASS pomoże dobrać sprzęt do domu</h2><p>Porównamy modele, dopasujemy akcesoria, doradzimy transport, wniesienie i montaż. Dzięki temu kupujesz sprzęt pasujący do pomieszczenia, budżetu i codziennego użytkowania.</p></section>
 <section class="section-v44 services-v44"><h2>Usługi ELKASS</h2><div class="services-grid-v44"><div class="service-v44"><b>Odbiór w salonie</b><small>ELKASS Olesno</small></div><div class="service-v44"><b>Transport lokalny</b><small>Wniesienie i ustawienie</small></div><div class="service-v44"><b>Montaż</b><small>Dobór i konfiguracja</small></div><div class="service-v44"><b>Serwis</b><small>Wsparcie po zakupie</small></div></div></section>
 <div class="mobile-buybar-v44"><div><small>Cena</small><br><b>${fmt(p.price)}</b></div><a href="/app/cart/?add=${p.id}">Kup</a></div>
 `;
 bind();
}
function renderSpecs(p){
 let html=''; const groups=p.params||{}; Object.entries(groups).forEach(([g,obj])=>{html+=`<div class="spec-group"><h3>${g}</h3>${Object.entries(obj||{}).map(([k,v])=>`<div class="spec-line"><span>${k}</span><b>${v}</b></div>`).join('')}</div>`});
 if(p.dimensions){html+=`<div class="spec-group"><h3>Wymiary</h3>${Object.entries(p.dimensions).map(([k,v])=>`<div class="spec-line"><span>${k}</span><b>${v}</b></div>`).join('')}</div>`}
 return html||'<div class="spec-group"><h3>Parametry</h3><p>Parametry zostaną uzupełnione w Product Studio.</p></div>';
}
function renderProducts(list){return list.map(x=>`<a class="mini-product-v44" href="/app/product/?id=${x.id}"><div class="photo"><img src="${x.image||'/assets/products/product-05-telewizor-samsung.jpg'}" alt="${x.name}"></div><h3>${x.name}</h3><b>${fmt(x.price)}</b></a>`).join('') || '<p>Produkty zostaną wybrane w Product Studio.</p>'}
function bind(){
 $$('.thumb-v44').forEach(b=>b.addEventListener('click',()=>{$$('.thumb-v44').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#mainPhotoV44').src=b.dataset.img;}));
 $$('.tab-buttons-v44 button').forEach(b=>b.addEventListener('click',()=>{$$('.tab-buttons-v44 button').forEach(x=>x.classList.remove('active'));$$('.tab-pane-v44').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(`.tab-pane-v44[data-pane="${b.dataset.tab}"]`).classList.add('active')}));
}
load();
})();
