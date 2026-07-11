
(function(){
  const $=s=>document.querySelector(s);
  const season=localStorage.getItem('elkass-season')||'base';
  if(season && season!=='base') document.body.classList.add('theme-'+season);
  const randomize=()=>{
    document.querySelectorAll('[data-random-discount="true"]').forEach((el,i)=>{
      const discounts=[10,12,15,18,20,21,23,25,30];
      const d=discounts[(Date.now()+i*7)%discounts.length];
      el.textContent='-'+d+'%';
    });
  };
  randomize();
  document.querySelectorAll('.v22-mini').forEach(card=>{
    card.addEventListener('click',e=>{ if(e.target.tagName!=='A') location.href='product.html'; });
  });
})();
