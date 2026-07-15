(function(){
  const THEMES={
    default:{label:'ELKASS Premium',icon:'✨',badges:['Poleca ELKASS','Dogodne raty','Dostępny od ręki']},
    christmas:{label:'Boże Narodzenie',icon:'🎄',badges:['Pomysł na prezent','Raty 0%','Świąteczna oferta'],effect:'snow'},
    winter:{label:'Zima',icon:'❄️',badges:['Zimowe okazje','Dogodne raty','Dostawa lokalna'],effect:'snow'},
    easter:{label:'Wielkanoc',icon:'🌷',badges:['Wielkanocne promocje','AGD do kuchni','Raty 0%']},
    spring:{label:'Wiosna',icon:'🌸',badges:['Wiosenne okazje','Nowości','Poleca ELKASS']},
    summer:{label:'Lato',icon:'☀️',badges:['Letnie promocje','Dostępny od ręki','Dogodne raty']},
    autumn:{label:'Jesień',icon:'🍂',badges:['Jesienne okazje','Do domu','Raty 0%']},
    blackweek:{label:'Black Week',icon:'⚫',badges:['Black Week','Super cena','Ostatnie sztuki']},
    tvdays:{label:'TV Days',icon:'📺',badges:['TV Days','Soundbar w zestawie','Montaż TV']},
    agddays:{label:'AGD Days',icon:'🏠',badges:['AGD Days','Transport lokalny','Montaż ELKASS']},
    laptopweek:{label:'Laptop Week',icon:'💻',badges:['Laptop Week','Nowości','Dogodne raty']},
    smartphoneweek:{label:'Smartfon Week',icon:'📱',badges:['Smartfon Week','Akcesoria','Raty 0%']}
  };
  function getTheme(){return new URLSearchParams(location.search).get('theme') || localStorage.getItem('elkass-theme') || 'default'}
  function applyTheme(){
    const key=getTheme(); const t=THEMES[key]||THEMES.default; document.body.dataset.theme=key;
    if(new URLSearchParams(location.search).get('theme')) localStorage.setItem('elkass-theme',key);
    // Public shop should never show technical Theme Engine description.
    // Theme visual effects are applied silently; configuration remains inside Studio.
    document.querySelectorAll('.v45-theme-strip').forEach(el=>el.remove());
    if(t.effect==='snow' && !matchMedia('(prefers-reduced-motion: reduce)').matches) addSnow();
    patchFinance(); patchProductLinks();
  }
  function addSnow(){ if(document.querySelector('.v45-snow')) return; const box=document.createElement('div'); box.className='v45-snow'; for(let i=0;i<24;i++){const s=document.createElement('i');s.textContent='✦';s.style.left=(Math.random()*100)+'%';s.style.fontSize=(8+Math.random()*12)+'px';s.style.animationDuration=(8+Math.random()*10)+'s';s.style.animationDelay=(-Math.random()*12)+'s';box.appendChild(s)} document.body.appendChild(box); }
  function patchFinance(){
    document.querySelectorAll('.pricebox-v44,.price-v36,.v22-price-row,.v34-price').forEach(el=>{ if(el.parentElement && !el.parentElement.querySelector('.v45-finance-line')){ const line=document.createElement('div'); line.className='v45-finance-line'; line.innerHTML='<span>💳 Raty 0%</span><span>💳 Dogodne raty</span>'; el.parentElement.appendChild(line); }});
  }
  const imageMap={
    'product-05-telewizor-samsung.jpg':'tv-samsung-55-crystal-uhd','product-10-zmywarka-bosch.jpg':'zmywarka-bosch-60-serie4','product-02-pralka-beko.jpg':'pralka-beko-8kg-inverter','product-12-ekspres-philips.jpg':'ekspres-philips-lattego','product-16-lodowka-lg.jpg':'lodowka-lg-no-frost','product-03-lodowka-lg.jpg':'lodowka-lg-no-frost','product-04-piekarnik-samsung.jpg':'piekarnik-samsung-dual-cook','product-09-odkurzacz-bosch.jpg':'odkurzacz-bosch-hepa','product-20-plyta-indukcyjna.jpg':'plyta-indukcyjna-amica-60','product-06-soundbar-lg.jpg':'soundbar-lg-premium','product-17-monitor-gaming.jpg':'monitor-lenovo-gaming','product-07-laptop-lenovo.jpg':'laptop-lenovo-ideapad','product-08-smartfon-samsung.jpg':'smartfon-samsung-galaxy','product-19-tablet-lenovo.jpg':'tablet-lenovo-tab','product-18-sluchawki-sony.jpg':'sluchawki-sony-wh'};
  function infer(card){ const img=card.querySelector&&card.querySelector('img'); if(img){const f=(img.getAttribute('src')||'').split('/').pop(); if(imageMap[f]) return imageMap[f];} const tx=(card.textContent||'').toLowerCase(); if(tx.includes('beko')) return 'pralka-beko-8kg-inverter'; if(tx.includes('zmywarka')) return 'zmywarka-bosch-60-serie4'; if(tx.includes('lattego')) return 'ekspres-philips-lattego'; if(tx.includes('lodówka')||tx.includes('lodowka')) return 'lodowka-lg-no-frost'; if(tx.includes('samsung')&&tx.includes('55')) return 'tv-samsung-55-crystal-uhd'; return null; }
  function patchProductLinks(){ document.querySelectorAll('a[href="app/product/"],a[href="app/product"],article[data-href="app/product/"]').forEach(a=>{const card=a.closest('article,.v25-product-card,.v22-mini,.v34-product,.product')||a; const id=infer(card); if(id){ if(a.tagName==='A') a.href='app/product/?id='+encodeURIComponent(id); if(a.dataset) a.dataset.href='app/product/?id='+encodeURIComponent(id); }}); }
  document.addEventListener('DOMContentLoaded',applyTheme);
})();
