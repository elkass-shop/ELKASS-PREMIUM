(function(){
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const toast=(msg)=>{const t=$('#v47Toast')||document.createElement('div'); if(!t.id){t.id='v47Toast';t.className='v47-toast';document.body.appendChild(t)} t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2600)};
  const moneyToNumber=(v)=>Number(String(v||'').replace(/[^0-9,.-]/g,'').replace(',','.'))||0;
  const splitLines=(v)=>String(v||'').split(/\\n|\n/).map(x=>x.trim()).filter(Boolean);
  const fallbackProducts=async()=>{ try{return await (window.ElkassCloud?.getProducts?.()||[])}catch(e){return []} };

  function productEditor(){return $('#product .v47-card.span5 .v47-form') || $('#product .v47-card .v47-form')}
  function fields(){const box=productEditor(); if(!box) return null; return {
    box,
    select: $('select', box),
    price: $$('input',box)[0],
    oldPrice: $$('input',box)[1],
    zero: $$('select',box)[1],
    monthly: $$('select',box)[2],
    features: $('textarea', box)
  }}
  function normalizeFromEditor(base){const f=fields(); if(!f) return null; const name=f.select?.value || base?.name || 'Nowy produkt ELKASS';
    const p=Object.assign({}, base||{}, {
      name,
      price: moneyToNumber(f.price?.value || base?.price),
      oldPrice: moneyToNumber(f.oldPrice?.value || base?.oldPrice),
      features: splitLines(f.features?.value || base?.features?.join('\n')),
      financeZero: f.zero?.value || base?.financeZero || 'Wyłączone',
      financeMonthly: f.monthly?.value || base?.financeMonthly || 'Wyłączone',
      badge: base?.badge || 'Poleca ELKASS',
      availability: base?.availability || 'Dostępny od ręki',
      brand: base?.brand || (name.split(' ')[0]||'ELKASS'),
      category: base?.category || 'Oferta',
      image: base?.image || 'assets/products/product-10-zmywarka-bosch.jpg',
      short: base?.short || 'Produkt zapisany z ELKASS Studio LIVE.'
    });
    p.id = base?.id || window.ElkassCloud?.slugify?.(p.name) || p.name.toLowerCase().replace(/\s+/g,'-');
    return p;
  }
  async function currentBase(){const f=fields(); const list=await fallbackProducts(); const selected=f?.select?.value; return list.find(p=>p.name===selected) || list.find(p=>p.id===selected) || list[0] || {};}
  function fillEditor(product){const f=fields(); if(!f || !product) return; if(f.price) f.price.value=(product.price||'') + (product.price?' zł':''); if(f.oldPrice) f.oldPrice.value=(product.oldPrice||product.old_price||'') + ((product.oldPrice||product.old_price)?' zł':''); if(f.features) f.features.value=(product.features||[]).join('\n'); if(f.zero) f.zero.value = product.financeZero || (product.zeroInstallments?'Włączone 10×':'Wyłączone'); if(f.monthly) f.monthly.value = product.financeMonthly || (product.price ? ('od '+Math.max(29,Math.round(product.price/36))+' zł/mies.') : 'Wyłączone');}
  async function populateSelect(){const f=fields(); if(!f?.select) return; const list=await fallbackProducts(); const current=f.select.value; f.select.innerHTML=list.map(p=>`<option value="${p.name}">${p.name}</option>`).join('') + '<option value="Nowy produkt ELKASS">+ Nowy produkt ELKASS</option>'; if(current) f.select.value=current; fillEditor(list.find(p=>p.name===f.select.value)||list[0]); f.select.onchange=()=>fillEditor(list.find(p=>p.name===f.select.value)||{}); renderSavedList(list);}
  function renderSavedList(products){let box=$('#v58SavedProducts'); if(!box){const target=$('#product .v47-card.span5'); if(!target) return; target.insertAdjacentHTML('beforeend','<div class="v58-products-live" id="v58SavedProducts"></div>'); box=$('#v58SavedProducts');}
    const local=window.ElkassCloud?.readLocalProducts?.()||[]; const list=local.length?local:products.slice(0,4); box.innerHTML='<div class="v58-status">LIVE: zapis produktu jest aktywny. Produkt po zapisie otworzysz przyciskiem poniżej.</div>'+list.slice(0,6).map(p=>`<article><img src="${p.image||'assets/products/product-10-zmywarka-bosch.jpg'}" alt=""><div><b>${p.name}</b><small>${p.id||''} • ${p.price||0} zł</small></div><a class="v47-btn" href="app/product/?id=${encodeURIComponent(p.id)}" target="_blank">Otwórz</a></article>`).join('');}
  async function saveEditor(){const base=await currentBase(); const product=normalizeFromEditor(base); if(!product?.name) return toast('Uzupełnij nazwę produktu'); const saved=await window.ElkassCloud.saveProduct(product); await populateSelect(); toast('Produkt zapisany LIVE: '+saved.name);}
  async function newProduct(){const f=fields(); if(!f) return; if(f.select){ if(![...f.select.options].some(o=>o.value==='Nowy produkt ELKASS')) f.select.add(new Option('+ Nowy produkt ELKASS','Nowy produkt ELKASS')); f.select.value='Nowy produkt ELKASS'; } if(f.price) f.price.value=''; if(f.oldPrice) f.oldPrice.value=''; if(f.features) f.features.value=''; toast('Nowy produkt gotowy do uzupełnienia');}
  async function deleteProduct(){const base=await currentBase(); if(!base?.id) return toast('Nie wybrano produktu do usunięcia'); await window.ElkassCloud.deleteLocalProduct(base.id); await populateSelect(); toast('Produkt usunięty lokalnie: '+base.name);}
  function inject(){const target=$('#product .v47-card.span5'); if(!target || $('#v58ProductLiveToolbar')) return; const html=`<div class="v58-live-toolbar" id="v58ProductLiveToolbar"><button class="v47-btn primary" id="v58SaveProduct">Zapisz produkt LIVE</button><button class="v47-btn" id="v58NewProduct">+ Nowy produkt</button><button class="v47-btn" id="v58DeleteProduct">Usuń lokalnie</button><a class="v47-btn dark" id="v58OpenProduct" href="app/product/" target="_blank">Otwórz produkt</a></div><p class="v58-muted">V58: zapis działa w localStorage, a po ustawieniu Supabase w <code>config/cloud-config.js</code> formularz zapisuje do chmury. To już nie jest sam toast UI.</p>`; target.insertAdjacentHTML('beforeend', html); $('#v58SaveProduct').onclick=saveEditor; $('#v58NewProduct').onclick=newProduct; $('#v58DeleteProduct').onclick=deleteProduct; $('#v58OpenProduct').onclick=async(e)=>{const p=normalizeFromEditor(await currentBase()); e.currentTarget.href='app/product/?id='+encodeURIComponent(p.id)};}
  function init(){if(!window.ElkassCloud) return; inject(); populateSelect(); window.addEventListener('elkass:product-saved',()=>populateSelect());}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
