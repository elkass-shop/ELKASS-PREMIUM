
(function(){
const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const fmt=n=>(Number(n)||0).toLocaleString('pl-PL')+' zł';
const imgFallback='assets/products/product-05-telewizor-samsung.jpg';
const categories=[['RTV','Telewizory, audio, kino domowe','assets/categories/clean-rtv.jpg'],['AGD','Pralki, lodówki, zmywarki','assets/categories/clean-agd.jpg'],['Do zabudowy','Kuchnia kompletna','assets/categories/clean-agd-zabudowa.jpg'],['Małe AGD','Ekspresy, odkurzacze, roboty','assets/categories/clean-male-agd.jpg'],['Komputery','Laptopy, smartfony, tablety','assets/categories/clean-komputery-telefony.jpg'],['Usługi','Montaż, transport, konfiguracja','assets/categories/clean-serwis.jpg']];
const brands=['Samsung','Bosch','LG','Beko','Amica','Philips','Sony','Lenovo','Whirlpool','Electrolux','Tefal','JBL','Siemens','Sharp','TCL','Hisense','Gorenje','Xiaomi','AEG','Panasonic','Remington','Blaupunkt','Kernau','Sencor','Manta','Philco','DeLonghi','Miele','Liebherr','Haier','Candy'];
const categoriesKey='elkass.categories.v1'; const themeKey='elkass.theme.v1';
function readLocal(key,fb){try{return JSON.parse(localStorage.getItem(key)||'null')||fb}catch(e){return fb}}
function readCats(){ const saved=readLocal(categoriesKey,null); if(Array.isArray(saved)&&saved.length) return saved; return categories.map(c=>({name:c[0],description:c[1],image:c[2],subcategories:[]})); }
function readTheme(){ return readLocal(themeKey,{theme:'premium',message:'',decorations:true}); }
const builtInProducts=[
{id:'tv-samsung-55-crystal-uhd',name:'Samsung 55" Crystal UHD 4K Smart TV',short:'Smart TV 4K z doradztwem ELKASS.',brand:'Samsung',category:'RTV',price:2299,oldPrice:2999,badge:'Hit',image:'assets/products/product-05-telewizor-samsung.jpg'},
{id:'zmywarka-bosch-60-serie4',name:'Bosch zmywarka 60 cm Serie 4',short:'Cicha praca i oszczędne programy.',brand:'Bosch',category:'AGD',price:1999,oldPrice:2499,badge:'Super cena',image:'assets/products/product-10-zmywarka-bosch.jpg'},
{id:'pralka-beko-8kg',name:'Beko pralka 8 kg z silnikiem inwerterowym',short:'Szybkie programy i wygodna pojemność.',brand:'Beko',category:'AGD',price:1499,oldPrice:1899,badge:'Raty 0%',image:'assets/products/product-02-pralka-beko.jpg'},
{id:'ekspres-philips-lattego',name:'Philips LatteGo ekspres automatyczny',short:'Kawa mleczna jednym dotknięciem.',brand:'Philips',category:'Małe AGD',price:2199,oldPrice:2799,badge:'Weekend',image:'assets/products/product-11-ekspres-philips.jpg'},
{id:'lodowka-lg-no-frost',name:'LG lodówka No Frost z dużą pojemnością',short:'Duża pojemność i równomierne chłodzenie.',brand:'LG',category:'AGD',price:2699,oldPrice:3299,badge:'Outlet',image:'assets/products/product-12-lodowka-lg.jpg'},
{id:'soundbar-lg-premium',name:'Soundbar LG do telewizora i filmów',short:'Lepszy dźwięk do kina domowego.',brand:'LG',category:'Audio',price:799,oldPrice:999,badge:'Polecamy',image:'assets/products/product-06-soundbar-lg.jpg'},
{id:'piekarnik-samsung-dual-cook',name:'Samsung piekarnik Dual Cook',short:'Pieczenie na dwóch poziomach.',brand:'Samsung',category:'AGD do zabudowy',price:1599,oldPrice:1999,badge:'Nowość',image:'assets/products/product-04-piekarnik-samsung.jpg'},
{id:'plyta-amica-indukcja-60',name:'Amica płyta indukcyjna 60 cm',short:'Wygodne gotowanie i szybkie grzanie.',brand:'Amica',category:'AGD do zabudowy',price:1349,oldPrice:1599,badge:'AGD',image:'assets/products/product-03-chlodziarka-amica.jpg'}
];
async function products(){ try{ if(window.ElkassCloud?.getProducts){ const cloud=await window.ElkassCloud.getProducts(); if(Array.isArray(cloud)&&cloud.length) return cloud; } }catch(e){ console.warn('cloud products failed',e); } try{ const r=await fetch('/data/products.json',{cache:'no-store'}); const d=await r.json(); const arr=d.products||d||[]; if(Array.isArray(arr)&&arr.length) return arr; }catch(e){ console.warn('json products failed',e); } return builtInProducts; }
function settings(){ try{return JSON.parse(localStorage.getItem('elkass.cloud.settings.v54')||'{}')}catch(e){return{}} }
function homeSettings(){ const s=settings(); return Object.assign({},s.home||{},s['home-final']||{}); }
function displayBadge(p){ if(p.isHit) return 'Hit'; if(p.isPromo) return 'Promocja'; if(p.isOutlet) return 'Outlet'; if(p.isNew) return 'Nowość'; return p.badge||'ELKASS'; }
function productCard(p){ return `<a class="ef-product" href="app/product/?id=${encodeURIComponent(p.id)}"><span class="badge">${displayBadge(p)}</span><img src="${p.image||imgFallback}" alt="${p.name}"><small>${p.brand||''} • ${p.category||''}</small><h3>${p.name}</h3><p>${p.short||''}</p><div class="row"><strong>${fmt(p.price)}</strong><span class="view">Zobacz</span></div></a>` }
function miniCard(p){ return `<a class="ef-mini" href="app/product/?id=${encodeURIComponent(p.id)}"><img src="${p.image||imgFallback}" alt="${p.name}"><div><b>${p.name}</b><strong>${fmt(p.price)}</strong></div></a>` }
function renderCats(){ const el=$('#efCategories'); if(!el) return; const cats=readCats(); el.innerHTML=cats.map(c=>`<a class="ef-cat" href="app/category/?category=${encodeURIComponent(c.name)}"><img src="${c.image||'assets/categories/clean-rtv.jpg'}" alt="${c.name}"><div><b>${c.name}</b><small>${c.description||((c.subcategories||[]).slice(0,3).join(', '))}</small></div></a>`).join(''); }
function readBrands(){ try{ const saved=JSON.parse(localStorage.getItem('elkass.brands.v1')||'null'); if(Array.isArray(saved)&&saved.length) return saved; }catch(e){} return brands; }
function renderBrands(){ const el=$('#efBrands'); if(!el) return; const list=readBrands(); const doubled=[...list,...list]; el.innerHTML=`<div class="ef-brand-marquee">${doubled.map(b=>`<span class="ef-brand-chip">${b}</span>`).join('')}</div>`; }
function applyTheme(){ const t=readTheme(); document.body.className=document.body.className.replace(/ theme-[a-z0-9]+/g,''); document.body.classList.add('theme-'+(t.theme||'premium')); if(t.message){ document.documentElement.style.setProperty('--theme-message','"'+t.message.replace(/"/g,'')+'"'); } window.ELKASSSeasonal?.apply(t); }
function applyHome(){ applyTheme(); const h=homeSettings(); if(h.heroImage) $('#efHeroImage')?.setAttribute('src',h.heroImage); if(h.salonImage) $('#efSalonImage')?.setAttribute('src',h.salonImage); if(h.heroTitle) $('.ef-hero h1').innerHTML=h.heroTitle; if(h.heroText) $('.ef-hero-copy p').textContent=h.heroText; }
function renderProducts(list){
 const active=(Array.isArray(list)?list:[]).filter(p=>p.is_active!==false && p.status!=='draft'); if(!active.length) active.push(...builtInProducts); const sorted=[...active].sort((a,b)=>(b.showHome!==false)-(a.showHome!==false)); const hit=sorted.find(p=>p.isHit)||sorted.find(p=>String(p.id).includes('samsung'))||sorted[0]; const side=sorted.filter(p=>p.id!==hit?.id).slice(0,4); const grid=sorted.filter(p=>p.showHome!==false).slice(0,8);
 if(!active.length){ active.push(...builtInProducts); }
 if($('#efHitMain')&&hit){ $('#efHitMain').innerHTML=`<div class="ef-hit-img"><img src="${hit.image||imgFallback}" alt="${hit.name}"></div><div class="ef-hit-copy"><span class="ef-kicker">Hit tygodnia</span><h3>${hit.name}</h3><p>${hit.short||''}</p><div class="ef-price"><b>${fmt(hit.price)}</b>${hit.oldPrice?`<s>${fmt(hit.oldPrice)}</s>`:''}<span>${hit.oldPrice?'-'+Math.round((1-hit.price/hit.oldPrice)*100)+'%':'ELKASS'}</span></div><div class="ef-actions"><a class="ef-btn" href="app/product/?id=${encodeURIComponent(hit.id)}">Zobacz produkt</a><a class="ef-btn ef-btn-light" href="tel:343582442">Zapytaj doradcę</a></div></div>`; }
 if($('#efHitSide')) $('#efHitSide').innerHTML=side.map(miniCard).join('');
 if($('#efProducts')) $('#efProducts').innerHTML=grid.map(productCard).join('');
}
document.addEventListener('DOMContentLoaded',async()=>{renderCats();renderBrands();applyHome();try{renderProducts(await products())}catch(e){console.warn(e)}});
})();
