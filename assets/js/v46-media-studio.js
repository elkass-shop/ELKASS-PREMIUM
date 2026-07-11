
(function(){
  const mediaDataUrl='/data/media-v46.json';
  async function initMediaStudio(){
    const grid=document.getElementById('mediaLibraryGrid');
    if(!grid) return;
    try{
      const data=await fetch(mediaDataUrl).then(r=>r.json());
      grid.innerHTML=data.library.map(item=>`<article class="media-asset-card"><img src="${item.path}" alt="${item.alt||item.name}" onerror="this.style.display='none'"><div class="media-meta"><strong>${item.name}</strong><small>${item.type} • ${item.assignedTo.join(', ')}</small><span>${item.status==='demo'?'Demo media':'Gotowe'}</span></div></article>`).join('');
      const presets=document.getElementById('cropPresetGrid');
      if(presets) presets.innerHTML=data.targetPresets.map(p=>`<div class="crop-preview"><b>${p.name}</b><div class="ratio"></div><small>${p.ratio} • ${p.crop}</small></div>`).join('');
    }catch(e){console.warn('Media Studio: brak danych media-v46.json',e);}
  }
  document.addEventListener('DOMContentLoaded',initMediaStudio);
})();
