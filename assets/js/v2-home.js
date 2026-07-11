(function(){
  const btn=document.querySelector('[data-mobile-menu]');
  const nav=document.querySelector('.nav-v2');
  if(btn&&nav) btn.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const q=form.querySelector('input')?.value.trim(); if(q) location.href='category.html?search='+encodeURIComponent(q)}));
})();
