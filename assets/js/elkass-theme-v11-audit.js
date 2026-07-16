(()=>{
  const markReady=()=>{
    document.documentElement.classList.add('elkass-v11-ready');
    document.querySelectorAll('.ef-cat').forEach((card,index)=>{
      card.dataset.categoryIndex=String(index+1);
      const img=card.querySelector('img');
      if(img){img.loading=index<4?'eager':'lazy';img.decoding='async';}
    });
    document.querySelectorAll('.ef-product').forEach(card=>{
      const badge=card.querySelector('.ef-product-badge');
      if(badge && !badge.title) badge.title=badge.textContent.trim();
    });
  };
  const applyThemeMarkers=()=>{
    const theme=(document.body.dataset.season||'premium').toLowerCase();
    document.querySelectorAll('[data-theme-role]').forEach(n=>n.removeAttribute('data-theme-role'));
    document.querySelector('.ef-hero-card')?.setAttribute('data-theme-role','hero');
    document.querySelector('#kategorie')?.setAttribute('data-theme-role','categories');
    document.querySelector('#hit')?.setAttribute('data-theme-role','promotion');
    document.querySelector('#produkty')?.setAttribute('data-theme-role','products');
    document.querySelector('#opinie')?.setAttribute('data-theme-role','trust');
    document.querySelector('.ef-footer')?.setAttribute('data-theme-role','footer');
    document.body.setAttribute('data-theme-audited',theme);
  };
  const run=()=>{markReady();applyThemeMarkers();};
  document.addEventListener('DOMContentLoaded',()=>{
    run();
    setTimeout(run,120);
    const observer=new MutationObserver(()=>{markReady();applyThemeMarkers();});
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','data-season']});
  });
  window.addEventListener('storage',e=>{if(e.key==='elkass.theme.v1')setTimeout(run,30)});
})();
