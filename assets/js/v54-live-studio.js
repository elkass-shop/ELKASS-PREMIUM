(function(){
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const toast = (msg)=>{
    const t = $('#v47Toast') || document.createElement('div');
    if(!t.id){t.id='v47Toast';t.className='v47-toast';document.body.appendChild(t)}
    t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2400);
  };

  function productFormHtml(){
    return `<div class="v54-live-card">
      <div class="v47-head"><div><h2>Product Builder LIVE</h2><p>Ten formularz naprawdę zapisuje produkt: lokalnie w przeglądarce, a po konfiguracji Supabase także w chmurze. Produkt pojawia się od razu na stronie przez <code>/app/product/?id=...</code>.</p></div><span class="v47-pill" id="cloudModeBadge">tryb</span></div>
      <div class="v54-live-grid">
        <form id="v54ProductForm" class="v54-form">
          <label>Nazwa produktu<input name="name" required placeholder="np. Bosch zmywarka 60 cm Serie 4"></label>
          <label>Marka<input name="brand" placeholder="Bosch"></label>
          <label>Kategoria<input name="category" placeholder="AGD"></label>
          <label>Podkategoria<input name="subcategory" placeholder="Zmywarki"></label>
          <label>Cena<input name="price" type="number" min="0" step="1" placeholder="1999"></label>
          <label>Stara cena<input name="oldPrice" type="number" min="0" step="1" placeholder="2499"></label>
          <label>Badge<select name="badge"><option>Poleca ELKASS</option><option>Hit tygodnia</option><option>Promocja</option><option>Nowość</option><option>Bestseller</option></select></label>
          <label>Dostępność<select name="availability"><option>Dostępny od ręki</option><option>Dostępny w salonie</option><option>Na zamówienie</option><option>Chwilowo niedostępny</option></select></label>
          <label class="full">Zdjęcie / ścieżka z Media Studio<input name="image" placeholder="assets/products/product-10-zmywarka-bosch.jpg"></label>
          <label class="full">Krótki opis<textarea name="short" rows="3" placeholder="Krótki opis widoczny na karcie produktu."></textarea></label>
          <label class="full">Parametry wysoko, każdy w nowej linii<textarea name="features" rows="5" placeholder="60 cm\n14 kompletów\n42 dB\nAquaStop"></textarea></label>
          <div class="full v54-actions"><button class="v47-btn primary" type="submit">Zapisz produkt</button><button class="v47-btn" type="button" id="v54FillDemo">Wstaw demo</button><button class="v47-btn dark" type="button" id="v54ExportProducts">Eksport JSON</button></div>
        </form>
        <div class="v54-preview">
          <h3>Produkty zapisane przez panel</h3>
          <p>W trybie bez Supabase dane zapisują się lokalnie. Po wpisaniu kluczy w <code>config/cloud-config.js</code> ten sam formularz zacznie zapisywać do chmury.</p>
          <div id="v54ProductsList" class="v54-products-list"></div>
        </div>
      </div>
    </div>`;
  }

  function cloudHtml(){
    return `<section id="cloud" class="v47-tab"><div class="v47-grid"><div class="v47-card span7"><div class="v47-head"><div><h2>Cloud Foundation v54</h2><p>Przejście z makiety do aplikacji: produkty, media i ustawienia przygotowane pod Supabase oraz przyszły WOODYBOY Core.</p></div><span class="v47-pill">V54</span></div><div class="v47-quality"><div>Tryb danych <span id="v54CloudMode">local-demo</span></div><div>Produkty <span>JSON + localStorage + Supabase-ready</span></div><div>Media <span>Storage-ready</span></div><div>WOODYBOY <span>project_id / project_slug ready</span></div></div></div><div class="v47-card span5"><h2>Co ustawić w chmurze?</h2><p>1. Utwórz projekt Supabase.<br>2. Uruchom migrację SQL z <code>supabase/migrations/001_woodyboy_elkass_cloud_core.sql</code>.<br>3. Skopiuj <code>config/cloud-config.example.js</code> do <code>config/cloud-config.js</code> i wpisz URL oraz anon key.</p><a class="v47-btn primary" href="/docs/studio/CLOUD_FOUNDATION_V54.md">Instrukcja</a></div></div></section>`;
  }

  function renderList(){
    const box = $('#v54ProductsList'); if(!box || !window.ElkassCloud) return;
    const local = window.ElkassCloud.readLocalProducts();
    if(!local.length){ box.innerHTML = '<div class="v54-empty">Brak produktów zapisanych z panelu. Kliknij „Wstaw demo” i „Zapisz produkt”.</div>'; return; }
    box.innerHTML = local.map(p=>`<article class="v54-product-row"><img src="${p.image || 'assets/products/product-10-zmywarka-bosch.jpg'}" alt=""><div><b>${p.name}</b><small>${p.brand || ''} • ${p.category || ''} • ${p.price || 0} zł</small><a href="app/product/?id=${encodeURIComponent(p.id)}" target="_blank">Otwórz produkt</a></div><button class="v47-btn" data-v54-delete="${p.id}">Usuń lokalnie</button></article>`).join('');
    $$('[data-v54-delete]').forEach(btn=>btn.onclick=async()=>{await window.ElkassCloud.deleteLocalProduct(btn.dataset.v54Delete);renderList();toast('Usunięto lokalny produkt')});
  }

  function bindForm(){
    const form = $('#v54ProductForm'); if(!form || !window.ElkassCloud) return;
    const mode = window.ElkassCloud.mode();
    const badge = $('#cloudModeBadge'); if(badge) badge.textContent = mode;
    const cloudMode = $('#v54CloudMode'); if(cloudMode) cloudMode.textContent = mode;

    $('#v54FillDemo')?.addEventListener('click',()=>{
      form.name.value = 'Bosch zmywarka 60 cm Serie 4 — demo LIVE';
      form.brand.value = 'Bosch';
      form.category.value = 'AGD';
      form.subcategory.value = 'Zmywarki';
      form.price.value = '1999';
      form.oldPrice.value = '2499';
      form.badge.value = 'Poleca ELKASS';
      form.availability.value = 'Dostępny od ręki';
      form.image.value = 'assets/products/product-10-zmywarka-bosch.jpg';
      form.short.value = 'Produkt zapisany z panelu. To test żywego Product Buildera z localStorage/Supabase-ready.';
      form.features.value = '60 cm\n14 kompletów\n42 dB\nAquaStop\nRaty 0%\nDogodne raty';
    });
    $('#v54ExportProducts')?.addEventListener('click',()=>{
      const data = window.ElkassCloud.exportLocalProducts();
      navigator.clipboard?.writeText(data);
      toast('Eksport JSON skopiowany do schowka');
    });
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      const product = await window.ElkassCloud.saveProduct(values);
      renderList();
      toast('Zapisano produkt: ' + product.name);
    });
    renderList();
  }

  function init(){
    const nav = $('.v47-nav');
    if(nav && !nav.querySelector('[data-v47-tab="cloud"]')){
      const btn = document.createElement('button'); btn.dataset.v47Tab='cloud'; btn.textContent='☁ Chmura';
      nav.insertBefore(btn, nav.querySelector('a'));
      btn.addEventListener('click',()=>{
        $$('.v47-nav button').forEach(x=>x.classList.remove('active'));
        $$('.v47-tab').forEach(x=>x.classList.remove('active'));
        btn.classList.add('active'); $('#cloud')?.classList.add('active');
      });
    }
    const main = $('.v47-main');
    if(main && !$('#cloud')) main.insertAdjacentHTML('beforeend', cloudHtml());
    const productTab = $('#product');
    if(productTab && !$('#v54ProductForm')) productTab.insertAdjacentHTML('afterbegin', productFormHtml());
    bindForm();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
