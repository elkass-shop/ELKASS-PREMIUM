(function(){
  'use strict';
  document.documentElement.classList.add('ep-js');
  var targets=document.querySelectorAll('.ef-section,.ef-showroom,.ef-reviews,.ef-contact,.ef-stats,.cart-panel,.cart-summary,.product-shell-v44>.wrap');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){targets.forEach(function(el){el.classList.add('ep-visible')});return;}
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('ep-visible');observer.unobserve(entry.target);}})},{threshold:.08,rootMargin:'0px 0px -30px'});
  targets.forEach(function(el){el.classList.add('ep-reveal');observer.observe(el)});
})();
