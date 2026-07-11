(function(){
  const page=document.querySelector('.category-v34');
  if(!page) return;
  const mobileBtn=document.querySelector('[data-open-filters]');
  const overlay=document.querySelector('.v34-filter-overlay');
  const close=document.querySelector('[data-close-filters]');
  if(mobileBtn&&overlay){mobileBtn.addEventListener('click',()=>overlay.classList.add('open'));}
  if(close&&overlay){close.addEventListener('click',()=>overlay.classList.remove('open')); overlay.addEventListener('click',e=>{if(e.target===overlay) overlay.classList.remove('open')});}
  document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    page.classList.toggle('v34-list', btn.dataset.view==='list');
  }));
  document.querySelectorAll('.v34-product').forEach(card=>{
    card.addEventListener('click',e=>{ if(!e.target.closest('button,a')) location.href='product.html'; });
  });
})();
