(function(){
  function $(sel,root=document){return root.querySelector(sel)}
  function card(p){
    return `<a class="elkass-product-card" href="/product.html?id=${encodeURIComponent(p.id)}">
      <div class="elkass-product-card__img"><img src="${p.image||'/assets/products/product-05-telewizor-samsung.jpg'}" alt="${p.name||''}" onerror="this.src='/assets/products/product-05-telewizor-samsung.jpg'"></div>
      <div class="elkass-product-card__body">
        <div class="elkass-product-card__brand">${p.brand||'ELKASS'} • ${p.category||'Oferta'}</div>
        <h3>${p.name||'Produkt ELKASS'}</h3>
        <div class="elkass-product-card__bottom">
          <div class="elkass-product-card__price"><strong>${ElkassLiveStore.money(p.price)}</strong>${p.oldPrice?`<del>${ElkassLiveStore.money(p.oldPrice)}</del>`:''}</div>
          <span class="elkass-small-btn">Zobacz</span>
        </div>
      </div>
    </a>`
  }
  function mini(p){return `<a class="elkass-mini-promo" href="/product.html?id=${encodeURIComponent(p.id)}"><div class="elkass-mini-promo__img"><img src="${p.image}" alt="${p.name}" onerror="this.src='/assets/products/product-05-telewizor-samsung.jpg'"></div><div class="elkass-mini-promo__body"><strong>${p.name}</strong><span>${ElkassLiveStore.money(p.price)}</span></div></a>`}
  async function render(){
    const home=ElkassLiveStore.getHome();
    const products=await ElkassLiveStore.getProducts();
    const heroImg=$('[data-home-hero-img]'); if(heroImg) heroImg.src=home.heroImage;
    const title=$('[data-home-title]'); if(title) title.innerHTML=`${home.heroTitle}<span>${home.heroAccent}</span>`;
    const text=$('[data-home-text]'); if(text) text.textContent=home.heroText;
    const heroProduct=$('[data-home-product]'); if(heroProduct) heroProduct.textContent=home.heroProduct;
    const salon=$('[data-salon-img]'); if(salon) salon.src=home.salonImage;
    const hit=products[0]||{};
    const hitBox=$('[data-hit]'); if(hitBox){hitBox.innerHTML=`<div class="elkass-hit__media"><img src="${hit.image||'/assets/products/product-05-telewizor-samsung.jpg'}" alt="${hit.name||''}" onerror="this.src='/assets/products/product-05-telewizor-samsung.jpg'"></div><div class="elkass-hit__body"><div><span class="elkass-badge">${hit.badge||'Hit tygodnia'}</span><h2>${hit.name||'Hit tygodnia ELKASS'}</h2><p>${hit.short||'Wybrany produkt z oferty ELKASS z doradztwem, dostawą i wsparciem po zakupie.'}</p><div class="elkass-price"><strong>${ElkassLiveStore.money(hit.price||0)}</strong>${hit.oldPrice?`<del>${ElkassLiveStore.money(hit.oldPrice)}</del>`:''}</div><div class="elkass-hit__meta"><span>● ${hit.availability||'Dostępny od ręki'}</span><span>● Raty 0%</span><span>● Transport lokalny</span></div></div><div class="elkass-hero-actions"><a class="elkass-btn elkass-btn--red" href="/product.html?id=${encodeURIComponent(hit.id||'')}">Zobacz produkt</a><a class="elkass-btn elkass-btn--light" href="tel:+48774400000">Zapytaj doradcę</a></div></div>`}
    const minis=$('[data-mini-promos]'); if(minis) minis.innerHTML=products.slice(1,5).map(mini).join('');
    const grid=$('[data-products-grid]'); if(grid) grid.innerHTML=products.slice(0,8).map(card).join('');
  }
  document.addEventListener('DOMContentLoaded',render); window.addEventListener('elkass:data-change',render);
})();
