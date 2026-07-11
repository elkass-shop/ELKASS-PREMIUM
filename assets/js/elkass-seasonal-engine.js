(()=>{
 const KEY='elkass.theme.v1';
 const HISTORY_KEY='elkass.theme.history.v1';
 const BASE='/assets/hero-seasonal-real/';
 const THEMES={
  premium:{label:'ELKASS Premium',hero:'/assets/hero-clean-panorama.png',accent:'#e5091a',accent2:'#111827',soft:'#fff7f8',message:'Technologia i doradztwo w wydaniu premium',particle:'spark',ornament:'premium'},
  christmas:{label:'Boże Narodzenie',hero:BASE+'christmas.jpg',accent:'#b80f2e',accent2:'#0b6b3a',soft:'#fff8f3',message:'Świąteczne premiery, prezenty i wyjątkowe ceny',particle:'snow',ornament:'christmas'},
  winter:{label:'Zima',hero:BASE+'winter.jpg',accent:'#0c6fb8',accent2:'#9fd8ff',soft:'#f2f9ff',message:'Zimowe okazje i ciepło domowego komfortu',particle:'snow',ornament:'winter'},
  easter:{label:'Wielkanoc',hero:BASE+'easter.jpg',accent:'#8a4fc7',accent2:'#6aa84f',soft:'#fff9ef',message:'Wielkanocne inspiracje dla pięknego domu',particle:'petal',ornament:'easter'},
  spring:{label:'Wiosna',hero:BASE+'spring.jpg',accent:'#2f8f56',accent2:'#ef78a3',soft:'#f4fff8',message:'Wiosenne odświeżenie domu',particle:'petal',ornament:'spring'},
  summer:{label:'Lato',hero:BASE+'summer.jpg',accent:'#087fc1',accent2:'#f2aa27',soft:'#effaff',message:'Letnie premiery i chłodne ceny',particle:'light',ornament:'summer'},
  autumn:{label:'Jesień',hero:BASE+'autumn.jpg',accent:'#bf5b20',accent2:'#6f3518',soft:'#fff7ed',message:'Jesienne inspiracje dla domu',particle:'leaf',ornament:'autumn'},
  blackweek:{label:'Black Week',hero:BASE+'blackweek.jpg',accent:'#d8b02c',accent2:'#07080b',soft:'#f7f7f8',message:'BLACK WEEK — wyjątkowe ceny w ELKASS',particle:'gold',ornament:'blackweek'},
  cyberweek:{label:'Cyber Week',hero:BASE+'cyberweek.jpg',accent:'#8b5cf6',accent2:'#0b0d16',soft:'#f7f3ff',message:'CYBER WEEK — technologia w specjalnych cenach',particle:'digital',ornament:'cyberweek'},
  mikolajki:{label:'Mikołajki',hero:BASE+'mikolajki.jpg',accent:'#d21e38',accent2:'#f0c75e',soft:'#fff8f4',message:'Mikołajkowe prezenty dla całego domu',particle:'snow',ornament:'mikolajki'},
  backtoschool:{label:'Back to School',hero:'/assets/hero-seasonal/backtoschool.svg',accent:'#1f5fd3',accent2:'#f0a522',soft:'#f3f7ff',message:'Powrót do szkoły z dobrą technologią',particle:'paper',ornament:'school'},
  rtvdays:{label:'RTV Days',hero:'/assets/hero-seasonal/rtvdays.svg',accent:'#6e3fd1',accent2:'#00a9d6',soft:'#f6f2ff',message:'RTV Days — obraz, dźwięk i gaming',particle:'digital',ornament:'rtv'},
  agddays:{label:'AGD Days',hero:'/assets/hero-seasonal/agddays.svg',accent:'#0c8174',accent2:'#e5091a',soft:'#effcf9',message:'AGD Days — wyposażamy Twój dom',particle:'light',ornament:'agd'}
 };
 function safe(v,f){try{return JSON.parse(v)||f}catch(e){return f}}
 function read(){return safe(localStorage.getItem(KEY),{theme:'premium',decorations:true,intensity:'balanced',useThemeHero:true,autoSchedule:false})}
 function write(v){localStorage.setItem(KEY,JSON.stringify(v))}
 function within(t){
  if(!t.autoSchedule) return true;
  const now=new Date(); const start=t.startAt?new Date(t.startAt):null; const end=t.endAt?new Date(t.endAt):null;
  return (!start||now>=start)&&(!end||now<=end);
 }
 function resolved(input){const t=input||read(); if(!within(t)) return {...t,theme:'premium',scheduleInactive:true}; return t}
 function remove(){document.querySelectorAll('.season-layer,.season-banner,.season-luxury-frame,.season-luxury-badge,.season-lights,.season-ribbon,.season-glow,.season-ornament').forEach(x=>x.remove())}
 function count(t){const base=innerWidth<700?8:18; return t.intensity==='subtle'?Math.max(5,base-6):t.intensity==='rich'?base+12:base}
 function particleMarkup(type,i){
  const map={snow:['✦','✧','•'],petal:['◆','◇','•'],leaf:['◆','◈','◇'],light:['✦','•','✧'],gold:['◆','✦','◇'],digital:['▰','▪','◇'],paper:['▱','▭','▪'],spark:['✦','·','✧']};
  return (map[type]||map.spark)[i%3];
 }
 function apply(input){
  const t=resolved(input); const key=THEMES[t.theme]?t.theme:'premium'; const cfg=THEMES[key];
  document.body.className=document.body.className.replace(/\btheme-[a-z0-9]+\b/g,'').replace(/\btheme-intensity-[a-z]+\b/g,'').replace(/\s+/g,' ').trim();
  document.body.classList.add('theme-'+key,'theme-intensity-'+(t.intensity||'balanced'));
  document.body.style.setProperty('--season-accent',t.accent||cfg.accent);
  document.body.style.setProperty('--season-accent-2',t.accent2||cfg.accent2);
  document.body.style.setProperty('--season-soft',cfg.soft);
  document.body.dataset.season=key;
  remove();
  const hero=document.querySelector('#efHeroImage,.ef-hero-media img,.hero img');
  if(hero && t.useThemeHero!==false){hero.dataset.originalSrc=hero.dataset.originalSrc||hero.getAttribute('src')||''; hero.src=t.heroDesktop||cfg.hero; hero.classList.add('season-hero-image');}
  if(t.decorations===false||key==='premium') return;
  const layer=document.createElement('div'); layer.className='season-layer season-'+cfg.particle; layer.setAttribute('aria-hidden','true');
  for(let i=0;i<count(t);i++){const p=document.createElement('i');p.className='season-particle';p.textContent=particleMarkup(cfg.particle,i);p.style.left=(Math.random()*100)+'%';p.style.fontSize=(7+Math.random()*11)+'px';p.style.opacity=(.18+Math.random()*.36);p.style.animationDuration=(10+Math.random()*14)+'s';p.style.animationDelay=(-Math.random()*16)+'s';p.style.setProperty('--drift',(-50+Math.random()*100)+'px');layer.appendChild(p)}
  document.body.appendChild(layer);
  const frame=document.createElement('div');frame.className='season-luxury-frame '+cfg.ornament;frame.setAttribute('aria-hidden','true');document.body.appendChild(frame);
  const badge=document.createElement('div');badge.className='season-luxury-badge';badge.innerHTML=`<span>${cfg.label}</span><b>${t.message||cfg.message}</b>`;document.body.appendChild(badge);
  const lights=document.createElement('div');lights.className='season-lights';lights.innerHTML='<i></i>'.repeat(18);document.body.appendChild(lights);
  const ga=document.createElement('div');ga.className='season-glow a';document.body.appendChild(ga); const gb=document.createElement('div');gb.className='season-glow b';document.body.appendChild(gb);
  if(key==='blackweek'||key==='cyberweek'){const r=document.createElement('div');r.className='season-ribbon';r.textContent=key==='blackweek'?'BLACK WEEK':'CYBER WEEK';document.body.appendChild(r)}
  const campaign=document.querySelector('.ef-kicker'); if(campaign) campaign.textContent=t.campaignLabel||cfg.label;
 }
 function preview(theme){const current=read();apply({...current,theme,autoSchedule:false})}
 function status(t=read()){return {active:within(t),theme:t.theme||'premium',label:(THEMES[t.theme]||THEMES.premium).label,startAt:t.startAt||'',endAt:t.endAt||''}}
 window.ELKASSSeasonal={apply,preview,read,write,status,themes:THEMES};
 document.addEventListener('DOMContentLoaded',()=>apply());
 window.addEventListener('storage',e=>{if(e.key===KEY)apply()});
 setInterval(()=>{const t=read(); if(t.autoSchedule)apply(t)},60000);
})();