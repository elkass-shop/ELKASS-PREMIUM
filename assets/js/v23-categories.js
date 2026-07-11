(function(){
  const cards=[...document.querySelectorAll('.v23-category-card,.v23-product-card')];
  if(!('IntersectionObserver' in window)){cards.forEach(c=>c.classList.add('is-visible'));return;}
  const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.12});
  cards.forEach(c=>io.observe(c));
})();
