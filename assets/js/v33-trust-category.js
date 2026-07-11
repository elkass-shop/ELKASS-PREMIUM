(function(){
  const track=document.querySelector('[data-trust-track]');
  if(!track) return;
  const reviews=[
    ['Anna K.','Olesno','Profesjonalna obsługa i bardzo konkretne doradztwo przy wyborze sprzętu do kuchni.'],
    ['Marek S.','Praszka','Szybka dostawa, wniesienie i ustawienie sprzętu. Wszystko bez problemu.'],
    ['Katarzyna M.','Dobrodzień','Miła obsługa, duży wybór i pomoc w dobraniu pralki do małej łazienki.'],
    ['Piotr W.','Gorzów Śląski','Kupujemy w ELKASS od lat. Doradztwo zawsze jest konkretne i uczciwe.'],
    ['Ewa P.','Radłów','Telewizor dobrany idealnie do salonu, a montaż przebiegł bardzo sprawnie.'],
    ['Tomasz R.','Zębowice','Bardzo dobre ceny promocyjne i fachowa pomoc przy wyborze zmywarki.'],
    ['Joanna L.','Ciasna','Obsługa cierpliwie wyjaśniła różnice między modelami. Polecam.'],
    ['Grzegorz B.','Kluczbork','Transport na czas, kontakt bezproblemowy, sprzęt działa jak należy.'],
    ['Agnieszka D.','Lubliniec','Świetne doradztwo przy wyborze AGD do zabudowy. Wszystko pasuje do kuchni.'],
    ['Paweł N.','Olesno','Zamówienie zrealizowane szybko, a pracownicy pomogli z konfiguracją.'],
    ['Monika T.','Praszka','Bardzo dobry kontakt i rzeczowe podpowiedzi. Nie wciskają najdroższego sprzętu.'],
    ['Robert C.','Dobrodzień','Duży plus za montaż i uruchomienie sprzętu po dostawie.'],
    ['Barbara F.','Olesno','Miła atmosfera w sklepie i duży wybór sprzętu na miejscu.'],
    ['Łukasz H.','Gorzów Śląski','Fachowa obsługa, szybka decyzja i sprawna dostawa telewizora.'],
    ['Natalia J.','Radłów','Pomogli dobrać lodówkę do wymiarów wnęki. Wszystko idealnie pasuje.'],
    ['Damian K.','Zębowice','Dobre podejście do klienta i jasne informacje o ratach oraz dostawie.'],
    ['Iwona M.','Ciasna','Sklep godny polecenia. Obsługa zna produkty, a nie tylko czyta etykiety.'],
    ['Andrzej P.','Kluczbork','Soundbar i telewizor dobrane jako zestaw. Efekt w salonie bardzo dobry.'],
    ['Magdalena R.','Lubliniec','Zakup przebiegł sprawnie, a dostawa była szybciej niż się spodziewałam.'],
    ['Sławomir S.','Olesno','Bardzo dobra obsługa po zakupie. Pomogli z ustawieniem sprzętu.'],
    ['Karolina W.','Praszka','Widać doświadczenie. Doradzili model dopasowany do budżetu.'],
    ['Michał A.','Dobrodzień','Polecam za konkretne podejście i szeroki wybór RTV.'],
    ['Teresa B.','Gorzów Śląski','Kupiliśmy pralkę, dostawa i wniesienie bez żadnych problemów.'],
    ['Rafał D.','Radłów','Świetny kontakt telefoniczny i szybkie przygotowanie oferty.'],
    ['Patrycja E.','Zębowice','Bardzo estetyczny salon i pomocna obsługa przy wyborze sprzętu.'],
    ['Krzysztof G.','Ciasna','Zmywarka działa cicho, tak jak doradzili. Dobry wybór.'],
    ['Renata K.','Kluczbork','Fachowo, miło i bez pośpiechu. Tak powinny wyglądać zakupy.'],
    ['Marcin L.','Lubliniec','Wrócę po kolejne zakupy. Dobry stosunek ceny do obsługi.'],
    ['Aleksandra M.','Olesno','Pomoc przy wyborze ekspresu była bardzo konkretna. Kawa świetna.'],
    ['Wojciech N.','Praszka','Sprzęt dostępny od ręki i szybka realizacja zamówienia.'],
    ['Beata O.','Dobrodzień','Dobre doradztwo, spokojna rozmowa i dopasowanie sprzętu do potrzeb.'],
    ['Sebastian P.','Gorzów Śląski','Montaż telewizora wykonany estetycznie i sprawnie.'],
    ['Dorota R.','Radłów','Polecam za obsługę i pomoc także po zakupie.'],
    ['Artur S.','Zębowice','Nie musiałem porównywać dziesiątek modeli. Doradzili konkretnie.'],
    ['Sylwia T.','Ciasna','Bardzo dobra oferta AGD i szybka dostawa do domu.'],
    ['Adam W.','Kluczbork','Zakup na raty przebiegł prosto, wszystko jasno wyjaśnione.'],
    ['Justyna Z.','Lubliniec','W sklepie widać doświadczenie i znajomość produktów.'],
    ['Daniel K.','Olesno','Dobry wybór telewizora i akcesoriów. Wszystko działa świetnie.'],
    ['Elżbieta S.','Praszka','Miła obsługa i pomoc w dobraniu lodówki do kuchni.'],
    ['Przemysław M.','Dobrodzień','Polecam za terminowość i profesjonalny montaż.'],
    ['Halina C.','Gorzów Śląski','Dostałam jasne porównanie kilku modeli i wybrałam najlepszy dla siebie.'],
    ['Bartosz J.','Radłów','Świetna obsługa przy zakupie sprzętu audio.'],
    ['Małgorzata P.','Zębowice','Transport i wniesienie na duży plus. Bez stresu.'],
    ['Dariusz R.','Ciasna','Konkretnie, szybko i z dobrym doradztwem. Polecam.'],
    ['Alicja L.','Kluczbork','W ELKASS kupiliśmy już kolejny sprzęt. Zawsze wszystko w porządku.'],
    ['Radosław F.','Lubliniec','Dobre promocje i obsługa, która naprawdę pomaga wybrać.'],
    ['Weronika D.','Olesno','Ekspres dobrany do naszych potrzeb, nie najdroższy, tylko najlepszy dla nas.'],
    ['Henryk B.','Praszka','Solidny lokalny sklep. Dużo lepszy kontakt niż w dużych sieciach.'],
    ['Milena K.','Dobrodzień','Obsługa bardzo pomocna, szczególnie przy AGD do zabudowy.'],
    ['Filip S.','Gorzów Śląski','Wszystko zgodnie z ustaleniami. Dostawa i montaż punktualnie.'],
    ['Lucyna M.','Radłów','Doradzili sprzęt energooszczędny i prosty w obsłudze.'],
    ['Mateusz T.','Zębowice','Dobry wybór, dobra cena i konkretna pomoc.'],
    ['Aneta W.','Ciasna','Bardzo polecam za podejście do klienta i jasne tłumaczenie funkcji.'],
    ['Jarosław H.','Kluczbork','Nie było problemu z doradztwem i dostawą poza Olesno.'],
    ['Olga N.','Lubliniec','Estetyczny salon, duży wybór i bardzo przyjazna obsługa.'],
    ['Cezary P.','Olesno','Kupiliśmy zestaw do salonu. Wszystko dobrane spójnie i z sensem.'],
    ['Ilona R.','Praszka','Polecam za cierpliwość i bardzo dobre wyjaśnienie różnic między modelami.'],
    ['Maciej G.','Dobrodzień','Lokalny sklep z obsługą na wysokim poziomie.'],
    ['Teresa J.','Gorzów Śląski','Dostawa, wniesienie i uruchomienie sprzętu bez żadnych zastrzeżeń.'],
    ['Szymon C.','Olesno','Dobra oferta, przejrzyste warunki i szybka realizacja.']
  ];
  const shuffled=reviews.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
  track.innerHTML=shuffled.map(([name,place,text])=>`<article class="trust-review"><div><div class="stars">★★★★★</div><p>“${text}”</p></div><div class="trust-person"><div><b>${name}</b><small>📍 ${place}</small></div><span class="trust-source">Google</span></div></article>`).join('');
  const prev=document.querySelector('[data-trust-prev]');
  const next=document.querySelector('[data-trust-next]');
  const dots=document.querySelector('[data-trust-dots]');
  let index=0, timer=null;
  function visible(){ const w=innerWidth; if(w>1450)return 6; if(w>1100)return 5; if(w>640)return 3; return 1; }
  function max(){return Math.max(0, reviews.length-visible());}
  function update(){
    index=Math.max(0,Math.min(index,max()));
    const card=track.querySelector('.trust-review'); if(!card)return;
    const gap=14; const step=card.getBoundingClientRect().width+gap;
    track.style.transform=`translateX(${-index*step}px)`;
    if(dots){ const pages=Math.min(8, Math.ceil(reviews.length/visible())); const active=Math.min(pages-1,Math.floor(index/visible())); dots.innerHTML=Array.from({length:pages},(_,i)=>`<button aria-label="Opinie ${i+1}" class="${i===active?'active':''}"></button>`).join(''); }
  }
  function go(n){ index=(index+n>max())?0:(index+n<0?max():index+n); update(); }
  prev&&prev.addEventListener('click',()=>go(-1)); next&&next.addEventListener('click',()=>go(1));
  function start(){ stop(); timer=setInterval(()=>go(1),4200); } function stop(){ if(timer) clearInterval(timer); }
  track.closest('.trust-card')?.addEventListener('mouseenter',stop); track.closest('.trust-card')?.addEventListener('mouseleave',start);
  addEventListener('resize',update); update(); start();
})();
