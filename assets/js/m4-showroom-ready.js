
(function(){
  const products = [
    {id:'tv-samsung-55-crystal-uhd', name:'Samsung 55” Crystal UHD 4K', short:'Smart TV, dobry obraz i konfiguracja ELKASS.', price:'2 299 zł', old:'2 999 zł', badge:'Hit tygodnia', image:'/assets/products/product-05-telewizor-samsung.jpg'},
    {id:'pralka-beko-8kg-inverter', name:'Beko pralka 8 kg Inverter', short:'Cicha pralka do rodzinnego domu.', price:'1 499 zł', old:'1 899 zł', badge:'Raty 0%', image:'/assets/products/product-02-pralka-beko.jpg'},
    {id:'zmywarka-bosch-60-serie4', name:'Bosch zmywarka 60 cm Serie 4', short:'Cicha zmywarka i montaż lokalny.', price:'1 999 zł', old:'2 499 zł', badge:'Super cena', image:'/assets/products/product-10-zmywarka-bosch.jpg'},
    {id:'ekspres-philips-lattego', name:'Philips LatteGo', short:'Kawy mleczne jednym kliknięciem.', price:'2 199 zł', old:'2 799 zł', badge:'Weekend', image:'/assets/products/product-12-ekspres-philips.jpg'},
    {id:'lodowka-lg-no-frost', name:'LG lodówka No Frost', short:'Duża pojemność i wniesienie.', price:'2 699 zł', old:'3 299 zł', badge:'Outlet', image:'/assets/products/product-16-lodowka-lg.jpg'},
    {id:'soundbar-lg-premium', name:'Soundbar LG', short:'Lepszy dźwięk do filmów i sportu.', price:'799 zł', old:'999 zł', badge:'Audio', image:'/assets/products/product-06-soundbar-lg.jpg'},
    {id:'laptop-lenovo-ideapad', name:'Lenovo IdeaPad', short:'Laptop do nauki, pracy i domu.', price:'2 399 zł', old:'2 899 zł', badge:'Back to school', image:'/assets/products/product-07-laptop-lenovo.jpg'},
    {id:'odkurzacz-bosch-hepa', name:'Bosch odkurzacz HEPA', short:'Mocne sprzątanie i filtr HEPA.', price:'699 zł', old:'899 zł', badge:'Poleca ELKASS', image:'/assets/products/product-09-odkurzacz-bosch.jpg'}
  ];
  function productCard(p){return `<article class="m4-card"><div class="m4-card-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="m4-card-body"><span class="m4-badge">${p.badge}</span><h3>${p.name}</h3><p>${p.short}</p><div class="m4-price"><strong>${p.price}</strong><s>${p.old}</s></div><a href="/app/product/?id=${p.id}">Zobacz produkt →</a></div></article>`}
  function addHomeShowroom(){
    /* M4.3: Showroom demo is no longer injected into the public Home.
       Demo remains available in /app/showroom/ and admin. */
    return;
  }
  function addAdminShowroom(){
    if(!location.pathname.includes('/admin')) return;
    const host = document.querySelector('.v47-main') || document.querySelector('main') || document.body;
    if(!host || document.querySelector('.m4-admin-live')) return;
    const box=document.createElement('section');
    box.className='m4-admin-live';
    box.innerHTML=`<h2>M4 Showroom Ready</h2><p>Tryb pokazowy dla szefa: wypełnia sklep produktami, grafikami i sekcjami demonstracyjnymi. To nie jest pusty szkielet — to baza do dalszej podmiany na realne materiały ELKASS.</p><div class="m4-admin-actions"><button id="m4SeedDemo">Wczytaj demo content</button><a href="/" target="_blank">Otwórz stronę główną</a><a class="ghost" href="/app/category/" target="_blank">Oferta</a><a class="ghost" href="/app/product/?id=pralka-beko-8kg-inverter" target="_blank">Produkt Beko</a></div>`;
    host.prepend(box);
    const btn=box.querySelector('#m4SeedDemo');
    btn.addEventListener('click',()=>{
      localStorage.setItem('elkass_demo_mode','showroom-ready');
      localStorage.setItem('elkass_demo_products', JSON.stringify(products));
      btn.textContent='Demo content zapisany lokalnie ✓';
      setTimeout(()=>btn.textContent='Wczytaj demo content',2400);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{addHomeShowroom();addAdminShowroom();}); else {addHomeShowroom();addAdminShowroom();}
})();
