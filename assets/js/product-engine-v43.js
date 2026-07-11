
(function(){
  const PRODUCT_URL = '/data/products.json';
  const mapByImage = {
    'product-05-telewizor-samsung.jpg':'tv-samsung-55-crystal-uhd',
    'product-10-zmywarka-bosch.jpg':'zmywarka-bosch-60-serie4',
    'product-02-pralka-beko.jpg':'pralka-beko-8kg-inverter',
    'product-12-ekspres-philips.jpg':'ekspres-philips-lattego',
    'product-16-lodowka-lg.jpg':'lodowka-lg-no-frost',
    'product-04-piekarnik-samsung.jpg':'piekarnik-samsung-dual-cook',
    'product-09-odkurzacz-bosch.jpg':'odkurzacz-bosch-hepa',
    'product-20-plyta-indukcyjna.jpg':'plyta-indukcyjna-amica-60',
    'product-06-soundbar-lg.jpg':'soundbar-lg-premium',
    'product-17-monitor-gaming.jpg':'monitor-lenovo-gaming',
    'product-07-laptop-lenovo.jpg':'laptop-lenovo-ideapad',
    'product-08-smartfon-samsung.jpg':'smartfon-samsung-galaxy',
    'product-19-tablet-lenovo.jpg':'tablet-lenovo-tab',
    'product-18-sluchawki-sony.jpg':'sluchawki-sony-wh',
    'product-03-chlodziarka-amica.jpg':'chlodziarka-amica-podblatowa',
    'product-13-zamrazarka-kernau.jpg':'zamrazarka-kernau',
    'product-14-pralka-philco.jpg':'pralka-philco-7kg',
    'product-15-robot-sprzatajacy.jpg':'robot-sprzatajacy-smart',
    'product-11-mikrofala-amica.jpg':'mikrofala-amica-inox',
    'oled-tv.jpg':'uchwyt-tv-uniwersalny',
    'clean-agd-zabudowa.jpg':'okap-kuchenny-premium'
  };
  const fmt = n => (Number(n)||0).toLocaleString('pl-PL') + ' zł';
  const productHref = id => '/app/product/?id=' + encodeURIComponent(id);
  async function loadProducts(){
    if(window.ELKASS_PRODUCTS) return window.ELKASS_PRODUCTS;
    if(window.ElkassCloud && typeof window.ElkassCloud.getProducts === 'function'){
      window.ELKASS_PRODUCTS = await window.ElkassCloud.getProducts();
      return window.ELKASS_PRODUCTS;
    }
    const res = await fetch(PRODUCT_URL, {cache:'no-store'});
    const data = await res.json();
    window.ELKASS_PRODUCTS = data.products || [];
    return window.ELKASS_PRODUCTS;
  }
  function inferIdFromElement(el){
    if(!el) return null;
    if(el.dataset && el.dataset.productId) return el.dataset.productId;
    const img = el.querySelector ? el.querySelector('img') : null;
    if(img){
      const file=(img.getAttribute('src')||'').split('/').pop();
      if(mapByImage[file]) return mapByImage[file];
    }
    const text=(el.textContent||'').toLowerCase();
    if(text.includes('zmywarka')||text.includes('bosch 60')) return 'zmywarka-bosch-60-serie4';
    if(text.includes('pralka beko')) return 'pralka-beko-8kg-inverter';
    if(text.includes('lattego')||text.includes('ekspres')) return 'ekspres-philips-lattego';
    if(text.includes('lodówka')||text.includes('lodowka')) return 'lodowka-lg-no-frost';
    if(text.includes('piekarnik')) return 'piekarnik-samsung-dual-cook';
    if(text.includes('odkurzacz')) return 'odkurzacz-bosch-hepa';
    if(text.includes('płyta')||text.includes('plyta')) return 'plyta-indukcyjna-amica-60';
    if(text.includes('soundbar')) return 'soundbar-lg-premium';
    if(text.includes('monitor')) return 'monitor-lenovo-gaming';
    if(text.includes('słuchawki')||text.includes('sluchawki')) return 'sluchawki-sony-wh';
    if(text.includes('samsung') && text.includes('55')) return 'tv-samsung-55-crystal-uhd';
    return null;
  }
  function patchProductLinks(){
    document.querySelectorAll('a[href="/app/product/"], a[href="/app/product"], [data-href="/app/product/"]').forEach(a=>{
      const card=a.closest('article, .product, .v25-product-card, .product-card-v36, .promo-card, .v34-product, .v22-hit') || a;
      const id=inferIdFromElement(card);
      if(id){
        if(a.tagName==='A') a.href=productHref(id);
        if(a.dataset) a.dataset.href=productHref(id);
      }
    });
  }
  function patchNavigation(){
    document.querySelectorAll('a').forEach(a=>{
      const t=(a.textContent||'').toLowerCase();
      if(t.includes('kontynuuj zakupy')) a.href='/app/category/';
    });
    const logo=document.querySelector('.logo'); if(logo) logo.href='/app/home/';
  }
  function productCard(p, cls='product-card-v36'){
    return `<a class="${cls} elkass-product-card" href="${productHref(p.id)}" data-product-id="${p.id}">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3><p>${p.features.slice(0,2).join(' • ')}</p>
      <div class="elkass-price"><s>${fmt(p.oldPrice)}</s><strong>${fmt(p.price)}</strong></div>
    </a>`;
  }
  function renderDynamicSections(products){
    const byId=Object.fromEntries(products.map(p=>[p.id,p]));
    const section=document.querySelector('[data-dynamic-section="promocje-wybrane"]');
    if(section){
      const ids=(section.dataset.products||'').split(',').filter(Boolean);
      const list=(ids.length?ids:['piekarnik-samsung-dual-cook','odkurzacz-bosch-hepa','plyta-indukcyjna-amica-60','soundbar-lg-premium','monitor-lenovo-gaming']).map(id=>byId[id]).filter(Boolean);
      const wrap=section.querySelector('.dynamic-products-row') || section;
      wrap.innerHTML=list.map(p=>productCard(p,'v25-product-card')).join('');
    }
  }
  function renderProductPage(products){
    if(!location.pathname.includes('/app/product')) return;
    // V58: V44 Product Experience has its own renderer (#product-v44). Do not overwrite it with the older v43 renderer.
    if(document.getElementById('product-v44')) return;
    const byId=Object.fromEntries(products.map(p=>[p.id,p]));
    const pathId=(location.pathname.split('/').filter(Boolean).pop()||'').replace('.html','');
    const id=new URLSearchParams(location.search).get('id') || (pathId && !['product','produkt'].includes(pathId) ? pathId : '') || 'tv-samsung-55-crystal-uhd';
    const p=byId[id] || byId['tv-samsung-55-crystal-uhd'];
    document.title = p.name + ' — ELKASS Olesno';
    const main=document.querySelector('main'); if(!main) return;
    const rel=(p.related||[]).map(rid=>byId[rid]).filter(Boolean).slice(0,4);
    const paramHtml=Object.entries(p.params||{}).map(([group,rows])=>`<div class="param-group"><h3>${group}</h3>${Object.entries(rows).map(([k,v])=>`<div class="param-row"><span>${k}</span><b>${v}</b></div>`).join('')}</div>`).join('');
    const dimHtml=Object.entries(p.dimensions||{}).map(([k,v])=>`<div class="dimension"><b>${v}</b><span>${k}</span></div>`).join('');
    main.innerHTML=`<div class="wrap product-page-v36" data-product-id="${p.id}">
      <nav class="breadcrumbs"><a href="/app/home/">Start</a> › <a href="/app/category/">${p.category}</a> › <span>${p.name}</span></nav>
      <section class="product-hero-v36">
        <div class="gallery-v36">
          <div class="gallery-thumbs">${(p.images||[p.image]).map((img,i)=>`<button class="gallery-thumb ${i?'':'active'}" data-img="${img}"><img src="${img}" alt="${p.name} miniatura ${i+1}"></button>`).join('')}</div>
          <div class="gallery-main"><span class="gallery-badge">Smart Image Engine</span><div class="gallery-actions"><button class="round-action" id="zoomProduct" title="Powiększ">⌕</button></div><img id="mainProductImage" src="${p.image}" alt="${p.name}"></div>
          <div class="media-rule">Zdjęcia są dopasowane do galerii, miniatur, kart produktu i mobile bez rozciągania.</div>
        </div>
        <aside class="buybox-v36">
          <div class="product-labels"><span class="label red">${p.badge}</span><span class="label green">${p.availability}</span><span class="label">Raty 0%</span></div>
          <h1>${p.name}</h1><div class="product-meta"><span>${p.brand}</span><span>${p.subcategory}</span><span>ID: ${p.id}</span></div>
          <div class="rating-v36"><span class="stars-svg">★★★★★</span><small>4.9 / 5 • opinie klientów ELKASS</small></div>
          <p class="lead-v36">${p.short}</p>
          <div class="price-v36"><div class="price-line"><span class="old">${fmt(p.oldPrice)}</span><span class="new">${fmt(p.price)}</span><span class="discount">-${Math.round((1-p.price/p.oldPrice)*100)}%</span></div><span class="installment">Rata od ${Math.max(29,Math.round(p.price/24))} zł / mies. • zapytaj w salonie</span></div>
          <div class="buy-actions-v36"><a class="btn" href="tel:343582442">Zapytaj doradcę</a><button class="btn light" id="addToCartV43">Dodaj do koszyka</button></div>
          <div class="service-grid-v36"><div class="service-chip">Odbiór w salonie<small>ELKASS Olesno</small></div><div class="service-chip">Transport lokalny<small>Wniesienie i ustawienie</small></div><div class="service-chip">Montaż<small>Dobór i konfiguracja</small></div><div class="service-chip">Serwis<small>Wsparcie po zakupie</small></div></div>
          <div class="advisor-card"><b>Ekspert ELKASS poleca</b><p>Dobierzemy produkt, akcesoria i usługę montażu do Twojego domu, nie tylko do ceny z półki.</p></div>
        </aside>
      </section>
      <section class="quick-v36">${p.features.map(f=>`<div class="q"><b>${f}</b><span>cecha produktu</span></div>`).join('')}</section>
      <section class="tabs-card" id="product-info"><div class="tabs-nav" role="tablist"><button class="tab-btn active" data-tab="elkass">Opis ELKASS</button><button class="tab-btn" data-tab="producer">Opis producenta</button><button class="tab-btn" data-tab="params">Parametry</button><button class="tab-btn" data-tab="faq">FAQ</button></div>
        <div class="tab-panel active" id="tab-elkass"><div class="content-grid"><article class="copy-card"><h3>Dlaczego warto wybrać ten produkt?</h3><p>${p.short}</p><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></article><article class="copy-card"><h3>Porada specjalisty ELKASS</h3><p>Przed zakupem pomożemy potwierdzić wymiary, dopasować akcesoria i ustalić transport lub montaż.</p></article></div></div>
        <div class="tab-panel" id="tab-producer"><div class="content-grid"><article class="copy-card"><h3>Opis producenta w czytelnej formie</h3><p>Tu docelowo trafia opis producenta, automatycznie dzielony na nagłówki, akapity i listy, żeby nie tworzyć ściany tekstu.</p></article><article class="copy-card"><h3>Najważniejsze funkcje</h3><p>${p.features.join(', ')}.</p></article></div></div>
        <div class="tab-panel" id="tab-params"><div class="param-groups">${paramHtml}</div><h3 style="margin-top:22px">Wymiary</h3><div class="dimensions">${dimHtml}</div></div>
        <div class="tab-panel" id="tab-faq"><div class="faq-v36"><details open><summary>Czy ELKASS może dostarczyć i zamontować produkt?</summary><p>Tak. Oferujemy lokalny transport, wniesienie, montaż i konfigurację na terenie Olesna i okolic.</p></details><details><summary>Czy można dobrać akcesoria?</summary><p>Tak. Doradca ELKASS pomoże dobrać właściwe akcesoria i produkty powiązane.</p></details></div></div>
      </section>
      <section class="related-v36"><div class="section-title-v36"><span>Kup razem</span><h2>Akcesoria i produkty podobne</h2><p>Dobierz dodatki i produkty, które naturalnie pasują do wybranego modelu.</p></div><div class="related-row-v36">${rel.map(x=>productCard(x)).join('')}</div></section>
    </div>`;
    const bar=document.querySelector('.mobile-buybar'); if(bar){bar.innerHTML=`<div><small>${p.brand}</small><b>${fmt(p.price)}</b></div><a href="tel:343582442">Zapytaj</a>`;}
    document.querySelectorAll('.gallery-thumb').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.gallery-thumb').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('mainProductImage').src=btn.dataset.img;}));
    document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(panel=>panel.classList.remove('active'));btn.classList.add('active');document.getElementById('tab-'+btn.dataset.tab).classList.add('active');}));
    const zoomBtn=document.getElementById('zoomProduct'); if(zoomBtn){zoomBtn.onclick=()=>{let modal=document.getElementById('productZoom'); if(modal){document.getElementById('zoomImage').src=document.getElementById('mainProductImage').src;modal.classList.add('open');}}}
    const add=document.getElementById('addToCartV43'); if(add){add.onclick=()=>{const key='elkass-cart-v43'; const cart=JSON.parse(localStorage.getItem(key)||'[]'); const item=cart.find(i=>i.id===p.id); if(item) item.qty++; else cart.push({id:p.id,qty:1,price:p.price}); localStorage.setItem(key,JSON.stringify(cart)); location.href='/app/cart/';};}
  }
  function renderCart(products){
    if(!location.pathname.includes('/app/cart')) return;
    const byId=Object.fromEntries(products.map(p=>[p.id,p]));
    const key='elkass-cart-v43';
    const addId=new URLSearchParams(location.search).get('add');
    let cart=JSON.parse(localStorage.getItem(key)||'[]');
    if(addId){ const existing=cart.find(i=>i.id===addId); if(existing) existing.qty=(existing.qty||1)+1; else cart.push({id:addId,qty:1}); localStorage.setItem(key,JSON.stringify(cart)); history.replaceState(null,'','/app/cart/'); }
    document.querySelectorAll('a').forEach(a=>{if((a.textContent||'').toLowerCase().includes('kontynuuj zakupy')) a.href='/app/category/';});
    if(!cart.length) return;
    const main=document.querySelector('main'); if(!main) return;
    const rows=cart.map(i=>({p:byId[i.id],qty:i.qty||1})).filter(x=>x.p);
    const total=rows.reduce((s,x)=>s+x.p.price*x.qty,0);
    const list=rows.map(({p,qty})=>`<article class="cart-item-v43"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.features.slice(0,3).join(' • ')}</p><a href="${productHref(p.id)}">Zobacz produkt</a></div><strong>${qty} × ${fmt(p.price)}</strong></article>`).join('');
    main.innerHTML=`<section class="cart-v43 wrap"><h1>Koszyk ELKASS</h1><p>Produkty pobierane są z demo-bazy JSON v43.</p><div class="cart-grid-v43"><div class="cart-list-v43">${list}</div><aside class="cart-summary-v43"><h2>Podsumowanie</h2><div class="summary-row"><span>Razem</span><strong>${fmt(total)}</strong></div><a class="btn" href="/app/checkout/">Przejdź do zamówienia</a><a class="btn light" href="/app/category/">Kontynuuj zakupy</a></aside></div></section>`;
  }
  function setupSearch(products){
    document.querySelectorAll('form.search').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault(); const q=form.querySelector('input')?.value||''; location.href='/app/category/?q='+encodeURIComponent(q);});});
  }
  document.addEventListener('DOMContentLoaded', async ()=>{
    patchProductLinks(); patchNavigation();
    try{
      const products=await loadProducts();
      patchProductLinks(); setupSearch(products); renderDynamicSections(products); renderProductPage(products); renderCart(products);
    }catch(e){console.warn('ELKASS Product Engine v43 error', e);}
  });
})();
