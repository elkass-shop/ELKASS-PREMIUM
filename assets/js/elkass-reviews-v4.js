(function(){
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
function card(r){const initials=r.name.replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g,'').slice(0,2)||'E';return `<article class="ef-review-card"><div class="ef-review-stars" aria-label="5 gwiazdek">★★★★★</div><p>${r.text}</p><div class="ef-review-author"><span class="ef-review-avatar">${initials}</span><span><b>${r.name}</b><small>${r.city} • klient ELKASS</small></span></div></article>`}
function init(){const root=document.querySelector('[data-review-carousel]');if(!root)return;const track=root.querySelector('.ef-review-track');const dots=root.querySelector('.ef-review-dots');const pages=[];for(let i=0;i<reviews.length;i+=3)pages.push(reviews.slice(i,i+3));track.innerHTML=pages.map(group=>`<div class="ef-review-slide">${group.map(card).join('')}</div>`).join('');dots.innerHTML=pages.map((_,i)=>`<button class="ef-review-dot${i===0?' active':''}" type="button" aria-label="Pokaż opinie ${i+1}" data-review-dot="${i}"></button>`).join('');let index=0,timer;
 const show=(next)=>{index=(next+pages.length)%pages.length;track.style.transform=`translateX(-${index*100}%)`;dots.querySelectorAll('.ef-review-dot').forEach((d,i)=>d.classList.toggle('active',i===index));};
 const play=()=>{clearInterval(timer);timer=setInterval(()=>show(index+1),5000)};
 root.querySelector('[data-review-prev]')?.addEventListener('click',()=>{show(index-1);play()});root.querySelector('[data-review-next]')?.addEventListener('click',()=>{show(index+1);play()});dots.addEventListener('click',e=>{const b=e.target.closest('[data-review-dot]');if(b){show(Number(b.dataset.reviewDot));play()}});root.addEventListener('mouseenter',()=>clearInterval(timer));root.addEventListener('mouseleave',play);root.addEventListener('focusin',()=>clearInterval(timer));root.addEventListener('focusout',play);play();
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
