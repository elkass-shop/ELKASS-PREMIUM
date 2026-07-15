(function(){
'use strict';
const reviews=[
 {text:'Profesjonalne doradztwo, szybka dostawa i pomoc przy uruchomieniu sprzętu. Wszystko jasno wyjaśnione od początku do końca.',name:'M. K.',city:'Olesno'},
 {text:'Kupiliśmy pralkę i zmywarkę. Sprzęt dobrany rozsądnie, bez wciskania najdroższego modelu. Bardzo dobry kontakt.',name:'A. P.',city:'Dobrodzień'},
 {text:'Duży plus za montaż i kontakt po zakupie. Ekipa przyjechała punktualnie, zabezpieczyła podłogę i wszystko ustawiła.',name:'T. S.',city:'Gorzów Śląski'},
 {text:'Telewizor wybrany po konkretnej rozmowie o naszym salonie i sposobie oglądania. Obraz świetny, konfiguracja na miejscu.',name:'K. W.',city:'Kluczbork'},
 {text:'Lodówka wniesiona bez problemu mimo wąskiej klatki. Stary sprzęt zabrany, a nowy wypoziomowany i uruchomiony.',name:'E. B.',city:'Praszka'},
 {text:'Bardzo uczciwe podejście. Doradca zaproponował tańszy model, bo droższy nie dawał nam żadnej realnej korzyści.',name:'P. R.',city:'Olesno'},
 {text:'Zakup ekspresu z instruktażem i ustawieniem kawy pod nasze preferencje. Tego nie daje zwykły sklep internetowy.',name:'J. L.',city:'Lubliniec'},
 {text:'Szybka realizacja zamówienia, dobry kontakt telefoniczny i bezproblemowe raty. Wszystkie warunki wyjaśnione czytelnie.',name:'D. M.',city:'Olesno'},
 {text:'Soundbar zamontowany i połączony z telewizorem. Technik został do momentu, aż wszystko działało dokładnie tak jak trzeba.',name:'R. C.',city:'Zawadzkie'},
 {text:'Wracamy do ELKASS od lat. Zawsze można liczyć na konkretną poradę, rozsądne ceny i pomoc także długo po zakupie.',name:'B. i A. N.',city:'Olesno'},
 {text:'Piekarnik i płyta dobrane do istniejącej zabudowy. Pomiar, dostawa i montaż odbyły się bez żadnych niespodzianek.',name:'S. G.',city:'Radłów'},
 {text:'Kontakt na bardzo wysokim poziomie. O każdym etapie zamówienia dostaliśmy informację, a dostawa była dokładnie o czasie.',name:'N. F.',city:'Bodzanowice'}
];
const esc=v=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const perPage=()=>matchMedia('(max-width:760px)').matches?1:matchMedia('(max-width:1060px)').matches?2:3;
function card(r){const initials=r.name.replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g,'').slice(0,2)||'E';return `<article class="ef-review-card"><div class="ef-review-stars" aria-label="Ocena 5 na 5">★★★★★</div><p>${esc(r.text)}</p><div class="ef-review-author"><span class="ef-review-avatar">${esc(initials)}</span><span><b>${esc(r.name)}</b><small>${esc(r.city)} • klient ELKASS</small></span></div></article>`}
function init(){
 const root=document.querySelector('[data-review-carousel]');if(!root||root.dataset.ready==='1')return;root.dataset.ready='1';
 const track=root.querySelector('.ef-review-track'),dots=root.querySelector('.ef-review-dots');if(!track||!dots)return;
 let page=0,timer=0,renderToken=0,touchX=null,currentPer=perPage();
 const pages=()=>Math.max(1,Math.ceil(reviews.length/perPage()));
 const normalize=()=>{page=((page%pages())+pages())%pages()};
 function renderDots(){dots.innerHTML=Array.from({length:pages()},(_,i)=>`<button class="ef-review-dot${i===page?' active':''}" type="button" aria-label="Pokaż zestaw opinii ${i+1}" aria-current="${i===page?'true':'false'}" data-review-dot="${i}"></button>`).join('')}
 function commit(token){if(token!==renderToken)return;normalize();const count=perPage(),start=page*count;let group=reviews.slice(start,start+count);if(group.length<count)group=group.concat(reviews.slice(0,count-group.length));track.innerHTML=group.map(card).join('');renderDots();requestAnimationFrame(()=>track.classList.remove('is-changing'))}
 function render(animate){renderToken++;const token=renderToken;if(!animate){track.classList.remove('is-changing');commit(token);return}track.classList.add('is-changing');setTimeout(()=>commit(token),170)}
 function show(next){page=next;render(true)}
 function stop(){clearInterval(timer);timer=0}
 function play(){stop();if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;timer=setInterval(()=>show(page+1),5000)}
 root.querySelector('[data-review-prev]')?.addEventListener('click',()=>{show(page-1);play()});
 root.querySelector('[data-review-next]')?.addEventListener('click',()=>{show(page+1);play()});
 dots.addEventListener('click',e=>{const b=e.target.closest('[data-review-dot]');if(!b)return;show(Number(b.dataset.reviewDot)||0);play()});
 root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',play);root.addEventListener('focusin',stop);root.addEventListener('focusout',play);
 root.addEventListener('touchstart',e=>{touchX=e.touches[0]?.clientX??null},{passive:true});root.addEventListener('touchend',e=>{if(touchX==null)return;const dx=(e.changedTouches[0]?.clientX??touchX)-touchX;touchX=null;if(Math.abs(dx)>45){show(page+(dx<0?1:-1));play()}},{passive:true});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():play());
 let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const next=perPage();if(next!==currentPer){currentPer=next;page=0;render(false)}},120)});
 render(false);play();
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
