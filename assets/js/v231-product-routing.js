
// ELKASS v2.3.1 — product card routing and panel-ready behavior
(function(){
  document.querySelectorAll('[data-href]').forEach(function(card){
    card.addEventListener('click', function(e){
      if(e.target.closest('a,button,input,select,textarea')) return;
      var href = card.getAttribute('data-href');
      if(href) window.location.href = href;
    });
  });
})();
