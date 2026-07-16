(()=>{
 const KEY='elkass.theme.v1';
 const BASE='assets/hero-seasonal-real/';
 const THEMES={
  light:{label:'Motyw jasny',hero:'assets/hero-clean-panorama.png',accent:'#e5091a',accent2:'#263247',soft:'#ffffff',message:'Czysty, jasny design ELKASS',particle:'spark',decor:'none'},
  dark:{label:'Motyw ciemny',hero:'assets/hero-wow-v5.png',accent:'#ff2b3d',accent2:'#111827',soft:'#0d1118',message:'Technologia w eleganckim, nocnym wydaniu',particle:'digital',decor:'dark-tech'},
  valentines:{label:'Walentynki',hero:'assets/hero-premium.png',accent:'#e11d48',accent2:'#9f1239',soft:'#fff1f5',message:'Technologia, którą pokochasz',particle:'petal',decor:'valentines'},
  sale:{label:'Wyprzedaż',hero:'assets/banners/weekend-sale.jpg',accent:'#ef233c',accent2:'#ff9f1c',soft:'#fff7ed',message:'Wielka wyprzedaż — ceny, które znikają szybko',particle:'confetti',decor:'sale'},
  premium:{label:'ELKASS Premium',hero:'assets/hero-clean-panorama.png',accent:'#e5091a',accent2:'#111827',soft:'#fff7f8',message:'Technologia i doradztwo w wydaniu premium',particle:'spark',decor:'premium'},
  christmas:{label:'Boże Narodzenie',hero:BASE+'christmas.jpg',accent:'#b80f2e',accent2:'#0b6b3a',soft:'#fff8f3',message:'Świąteczne premiery, prezenty i wyjątkowe ceny',particle:'snow',decor:'christmas'},
  winter:{label:'Zima',hero:BASE+'winter.jpg',accent:'#0c6fb8',accent2:'#9fd8ff',soft:'#f2f9ff',message:'Zimowe okazje i ciepło domowego komfortu',particle:'snow',decor:'winter'},
  easter:{label:'Wielkanoc',hero:BASE+'easter.jpg',accent:'#8a4fc7',accent2:'#6aa84f',soft:'#fff9ef',message:'Wielkanocne inspiracje dla pięknego domu',particle:'petal',decor:'easter'},
  spring:{label:'Wiosna',hero:BASE+'spring.jpg',accent:'#2f8f56',accent2:'#ef78a3',soft:'#f4fff8',message:'Wiosenne odświeżenie domu',particle:'petal',decor:'spring'},
  summer:{label:'Lato',hero:BASE+'summer.jpg',accent:'#087fc1',accent2:'#f2aa27',soft:'#effaff',message:'Letnie premiery i chłodne ceny',particle:'light',decor:'summer'},
  autumn:{label:'Jesień',hero:BASE+'autumn.jpg',accent:'#bf5b20',accent2:'#6f3518',soft:'#fff7ed',message:'Jesienne inspiracje dla domu',particle:'leaf',decor:'autumn'},
  blackweek:{label:'Black Week',hero:BASE+'blackweek.jpg',accent:'#d8b02c',accent2:'#07080b',soft:'#f7f7f8',message:'BLACK WEEK — wyjątkowe ceny w ELKASS',particle:'gold',decor:'blackweek'},
  cyberweek:{label:'Cyber Week',hero:BASE+'cyberweek.jpg',accent:'#8b5cf6',accent2:'#0b0d16',soft:'#f7f3ff',message:'CYBER WEEK — technologia w specjalnych cenach',particle:'digital',decor:'cyberweek'},
  mikolajki:{label:'Mikołajki',hero:BASE+'mikolajki.jpg',accent:'#d21e38',accent2:'#f0c75e',soft:'#fff8f4',message:'Mikołajkowe prezenty dla całego domu',particle:'snow',decor:'mikolajki'},
  backtoschool:{label:'Back to School',hero:'assets/hero-seasonal/backtoschool.svg',accent:'#1f5fd3',accent2:'#f0a522',soft:'#f3f7ff',message:'Powrót do szkoły z dobrą technologią',particle:'paper',decor:'school'},
  rtvdays:{label:'RTV Days',hero:'assets/hero-seasonal/rtvdays.svg',accent:'#6e3fd1',accent2:'#00a9d6',soft:'#f6f2ff',message:'RTV Days — obraz, dźwięk i gaming',particle:'digital',decor:'rtv'},
  agddays:{label:'AGD Days',hero:'assets/hero-seasonal/agddays.svg',accent:'#0c8174',accent2:'#e5091a',soft:'#effcf9',message:'AGD Days — wyposażamy Twój dom',particle:'light',decor:'agd'}
 };
 const DECOR_BASE='assets/theme-decor-v2/';
 function safe(v,f){try{return JSON.parse(v)||f}catch(e){return f}}
 function read(){return safe(localStorage.getItem(KEY),{theme:'premium',decorations:true,intensity:'balanced',useThemeHero:true,autoSchedule:false})}
 function write(v){localStorage.setItem(KEY,JSON.stringify(v))}
 function within(t){if(!t.autoSchedule)return true;const now=new Date(),start=t.startAt?new Date(t.startAt):null,end=t.endAt?new Date(t.endAt):null;return(!start||now>=start)&&(!end||now<=end)}
 function resolved(input){const t=input||read();return within(t)?t:{...t,theme:'premium',scheduleInactive:true}}
 function remove(){document.querySelectorAll('[data-season-ui]').forEach(x=>x.remove());document.querySelectorAll('.season-host').forEach(x=>x.classList.remove('season-host'))}
 function path(url){try{return new URL(url,document.baseURI).href}catch(e){return url}}
 function count(t){const base=innerWidth<700?5:10;return t.intensity==='subtle'?Math.max(3,base-3):t.intensity==='rich'?base+5:base}
 function particleMarkup(type,i){const map={snow:['✦','✧','•'],petal:['●','◆','•'],leaf:['◆','◈','◇'],light:['✦','•','✧'],gold:['◆','✦','◇'],digital:['▰','▪','◇'],paper:['▱','▭','▪'],spark:['✦','·','✧'],confetti:['▰','●','◆']};return(map[type]||map.spark)[i%3]}
 function addParticles(host,type,t){if(!host)return;const layer=document.createElement('div');layer.className='season-hero-particles season-'+type;layer.dataset.seasonUi='particles';layer.setAttribute('aria-hidden','true');for(let i=0;i<count(t);i++){const p=document.createElement('i');p.textContent=particleMarkup(type,i);p.style.left=(4+Math.random()*92)+'%';p.style.top=(-5+Math.random()*80)+'%';p.style.fontSize=(6+Math.random()*9)+'px';p.style.opacity=(.12+Math.random()*.30);p.style.animationDuration=(7+Math.random()*8)+'s';p.style.animationDelay=(-Math.random()*9)+'s';p.style.setProperty('--drift',(-24+Math.random()*48)+'px');layer.appendChild(p)}host.appendChild(layer)}
 function addDecor(host,cfg,key){if(!host||cfg.decor==='none')return;host.classList.add('season-host');const scene=document.createElement('div');scene.className='season-scene season-scene-'+cfg.decor;scene.dataset.seasonUi='scene';scene.setAttribute('aria-hidden','true');scene.innerHTML=`<img class="season-art season-art-main" src="${path(DECOR_BASE+cfg.decor+'.svg')}" alt=""><span class="season-orbit"></span>`;host.appendChild(scene)}
 function addCampaign(hero,cfg,t,key){if(!hero)return;const bar=document.createElement('div');bar.className='season-campaign season-campaign-'+cfg.decor;bar.dataset.seasonUi='campaign';bar.innerHTML=`<span class="season-campaign-label">${cfg.label}</span><strong>${t.message||cfg.message}</strong><span class="season-campaign-dot" aria-hidden="true"></span>`;hero.appendChild(bar)}
 function addSectionAccent(target,kind,cfg){if(!target||cfg.decor==='none')return;target.classList.add('season-host');const a=document.createElement('div');a.className=`season-section-accent season-section-accent-${kind} season-section-accent-${cfg.decor}`;a.dataset.seasonUi='accent';a.setAttribute('aria-hidden','true');a.style.backgroundImage=`url("${path(DECOR_BASE+cfg.decor+'.svg')}")`;target.appendChild(a)}
 function apply(input){
  const t=resolved(input),custom=t.theme==='custom',key=THEMES[t.theme]?t.theme:(custom?'custom':'premium');
  const cfg=custom?{label:t.customName||'Własny motyw',hero:t.heroDesktop||'assets/hero-clean-panorama.png',accent:t.primaryColor||'#e5091a',accent2:t.secondaryColor||'#111827',soft:t.backgroundColor||'#fff',message:t.message||'Autorski motyw ELKASS',particle:t.particle||'spark',decor:'premium'}:THEMES[key];
  document.body.className=document.body.className.replace(/\btheme-[a-z0-9-]+\b/g,'').replace(/\btheme-intensity-[a-z]+\b/g,'').replace(/\s+/g,' ').trim();
  document.body.classList.add('theme-'+key,'theme-intensity-'+(t.intensity||'balanced'));
  document.body.style.setProperty('--season-accent',t.accent||cfg.accent);document.body.style.setProperty('--season-accent-2',t.accent2||cfg.accent2);document.body.style.setProperty('--season-soft',t.backgroundColor||cfg.soft);document.body.style.setProperty('--custom-text',t.textColor||'');document.body.dataset.season=key;
  if(custom){document.body.style.setProperty('--px-bg',t.backgroundColor||'#fff');document.body.style.setProperty('--px-text',t.textColor||'#111827')}
  remove();
  const heroImg=document.querySelector('#efHeroImage,.ef-hero-media img,.hero img');
  if(heroImg&&t.useThemeHero!==false){heroImg.dataset.originalSrc=heroImg.dataset.originalSrc||heroImg.getAttribute('src')||'';heroImg.src=path(t.heroDesktop||cfg.hero);heroImg.classList.add('season-hero-image')}
  const heroCard=document.querySelector('.ef-hero-card,.hero-card,.hero');
  const hit=document.querySelector('.ef-hit-main');
  const showroom=document.querySelector('.ef-showroom article');
  if(t.decorations!==false&&cfg.decor!=='none'){
    addDecor(heroCard,cfg,key);addParticles(heroCard,cfg.particle,t);addCampaign(heroCard,cfg,t,key);addSectionAccent(hit,'hit',cfg);addSectionAccent(showroom,'showroom',cfg)
  }
  const campaign=document.querySelector('.ef-kicker');if(campaign)campaign.textContent=t.campaignLabel||cfg.label;
 }
 function preview(theme){apply({...read(),theme,autoSchedule:false})}
 function status(t=read()){return{active:within(t),theme:t.theme||'premium',label:t.theme==='custom'?(t.customName||'Własny motyw'):(THEMES[t.theme]||THEMES.premium).label,startAt:t.startAt||'',endAt:t.endAt||''}}
 window.ELKASSSeasonal={apply,preview,read,write,status,themes:THEMES};
 document.addEventListener('DOMContentLoaded',()=>apply());window.addEventListener('storage',e=>{if(e.key===KEY)apply()});setInterval(()=>{const t=read();if(t.autoSchedule)apply(t)},60000);
})();
