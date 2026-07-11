
(function(){
  const KEY='elkass.orders.v57';
  const DEFAULT=[
    {id:'ELK-2026-001',customer:'Jan K.',city:'Olesno',status:'nowe',total:4298,items:['Samsung 55” Crystal UHD','Soundbar LG'],service:'Transport + konfiguracja'},
    {id:'ELK-2026-002',customer:'Anna M.',city:'Dobrodzień',status:'w realizacji',total:1999,items:['Bosch zmywarka 60 cm Serie 4'],service:'Montaż'},
    {id:'ELK-2026-003',customer:'Piotr S.',city:'Praszka',status:'gotowe do odbioru',total:1499,items:['Beko pralka 8 kg'],service:'Odbiór w salonie'}
  ];
  const statuses=['nowe','w realizacji','gotowe do odbioru'];
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||DEFAULT}catch(e){return DEFAULT}}
  function write(data){localStorage.setItem(KEY,JSON.stringify(data))}
  function setStatus(id,status){const data=read().map(o=>o.id===id?{...o,status}:o);write(data);renderAdmin();renderPublic();}
  function card(o){return `<article class="v57-order-card"><b>${o.id}</b><small>${o.customer} • ${o.city}</small><small>${(o.items||[]).join(', ')}</small><small><b>${o.total} zł</b> • ${o.service}</small><div class="v57-order-actions"><button class="v57-mini-btn primary" data-v57-next="${o.id}">Dalej</button><button class="v57-mini-btn" data-v57-note="${o.id}">Notatka</button></div></article>`}
  function board(){const data=read();return `<div class="v57-metrics"><div class="v57-metric"><b>${data.length}</b><span>zamówienia testowe</span></div><div class="v57-metric"><b>${data.filter(x=>x.status==='nowe').length}</b><span>nowe</span></div><div class="v57-metric"><b>${data.filter(x=>x.status==='w realizacji').length}</b><span>w realizacji</span></div><div class="v57-metric"><b>${data.reduce((a,b)=>a+(Number(b.total)||0),0).toLocaleString('pl-PL')} zł</b><span>wartość</span></div></div><div class="v57-orders-board">${statuses.map(st=>`<section class="v57-column"><h3>${st}</h3>${data.filter(x=>x.status===st).map(card).join('')||'<p>Brak</p>'}</section>`).join('')}</div>`}
  function bindButtons(){ $$('[data-v57-next]').forEach(btn=>btn.onclick=()=>{const data=read();const o=data.find(x=>x.id===btn.dataset.v57Next); if(!o)return; const idx=statuses.indexOf(o.status); setStatus(o.id,statuses[Math.min(idx+1,statuses.length-1)]);}); $$('[data-v57-note]').forEach(btn=>btn.onclick=()=>alert('Tu będzie notatka pracownika do zamówienia '+btn.dataset.v57Note)); }
  function adminHtml(){return `<section id="ordersPro" class="v47-tab"><div class="v47-grid"><div class="v47-card span12"><div class="v47-head"><div><h2>Orders & Customer Center PRO</h2><p>V57: pierwsza żywa tablica zamówień, statusy, centrum klienta i przygotowanie pod gwarancje/serwis.</p></div><span class="v47-pill">V57</span></div><div id="v57AdminBoard"></div><div class="v57-customer-panel"><div class="v57-customer-card"><h3>Centrum klienta</h3><div class="v57-customer-list"><div>Historia zakupów</div><div>Gwarancje</div><div>Zgłoszenia serwisowe</div><div>Ulubione produkty</div></div></div><div class="v57-customer-card"><h3>Przyszły WOODYBOY Core</h3><p>Orders Engine i Customer Center są projektowane jako moduły możliwe do wydzielenia z ELKASS do platformy WOODYBOY.</p></div></div></div></div></section>`}
  function renderAdmin(){const box=$('#v57AdminBoard'); if(box){box.innerHTML=board(); bindButtons();}}
  function bindAdmin(){const nav=$('.v47-nav'), main=$('.v47-main'); if(!nav||!main||$('#ordersPro'))return; const btn=document.createElement('button'); btn.dataset.v47Tab='ordersPro'; btn.textContent='📦 Orders PRO'; nav.insertBefore(btn, nav.querySelector('a')); main.insertAdjacentHTML('beforeend',adminHtml()); btn.addEventListener('click',()=>{$$('.v47-nav button').forEach(x=>x.classList.remove('active'));$$('.v47-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#ordersPro').classList.add('active');renderAdmin();}); renderAdmin();}
  function renderPublic(){const box=$('#v57PublicOrders'); if(box){box.innerHTML=board(); bindButtons();}}
  function init(){if(document.body.classList.contains('v47-studio')) bindAdmin(); renderPublic();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
})();
