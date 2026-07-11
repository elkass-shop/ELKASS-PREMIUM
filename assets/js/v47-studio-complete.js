
(function(){
 const tabs=[...document.querySelectorAll('[data-v47-tab]')];
 const panes=[...document.querySelectorAll('.v47-tab')];
 tabs.forEach(btn=>btn.addEventListener('click',()=>{tabs.forEach(b=>b.classList.remove('active'));btn.classList.add('active');panes.forEach(p=>p.classList.remove('active'));const pane=document.getElementById(btn.dataset.v47Tab);if(pane)pane.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}));
 const toast=document.getElementById('v47Toast');
 const showToast=(msg='Zapisano zmiany w ELKASS Studio')=>{if(!toast)return;toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)};
 document.querySelectorAll('[data-save]').forEach(el=>el.addEventListener('click',()=>showToast(el.dataset.save||undefined)));
 const rows=(id,items)=>{const box=document.getElementById(id); if(!box)return; box.innerHTML=items.map((it,i)=>`<div class="v47-row"><div class="drag">${i+1}</div><div><strong>${it.name}</strong><small>${it.desc}</small></div><button class="v47-iconbtn" data-save="Zapisano: ${it.name}">${it.action||'Edytuj'}</button></div>`).join(''); box.querySelectorAll('[data-save]').forEach(el=>el.addEventListener('click',()=>showToast(el.dataset.save)));};
 rows('homeBuilderRows',[
  {name:'Hero',desc:'Treść, CTA, grafika, wysokość desktop/mobile, overlay i widoczność.'},
  {name:'Promocje ELKASS',desc:'Hit tygodnia, 4 promocje, wysokości kafli, produkty z bazy i motywy.'},
  {name:'Kategorie',desc:'Kafle, opisy, grafiki z Media Studio i układ mobile.'},
  {name:'Producenci',desc:'Logo, kolejność, slider, prędkość i widoczność.'},
  {name:'Opinie',desc:'60 opinii, rotacja, liczba kart desktop/tablet/mobile.'},
  {name:'Poznaj ELKASS',desc:'Kompaktowa sekcja salonu, zdjęcie, CTA i link do galerii.'},
  {name:'Kontakt i mapa',desc:'Adres, godziny, CTA, mapa i układ mobilny.'}
 ]);
 rows('productBuilderRows',[
  {name:'Dane podstawowe',desc:'Nazwa, marka, kategoria, ID, SKU, EAN, widoczność.'},
  {name:'Cena i finansowanie',desc:'Cena, stara cena, rabat, Raty 0%, Dogodne raty.'},
  {name:'Galeria produktu',desc:'Zdjęcie główne, miniatury, media, ALT, kadrowanie.'},
  {name:'Parametry kluczowe',desc:'4–8 parametrów widocznych wysoko na karcie produktu.'},
  {name:'Opisy',desc:'Opis ELKASS, opis producenta, sekcje i formatowanie.'},
  {name:'Powiązania',desc:'Kupowane razem, akcesoria, produkty podobne i oglądane.'},
  {name:'SEO i publikacja',desc:'Meta title, description, slug, OG i status publikacji.'}
 ]);
 rows('quickActions',[
  {name:'Dodaj produkt',desc:'Otwórz Product Builder PRO z szablonami RTV/AGD.',action:'Start'},
  {name:'Zmień Hero',desc:'Przejdź do Home Builder i edytuj pierwszą sekcję.',action:'Otwórz'},
  {name:'Aktywuj motyw',desc:'Włącz Black Week, Święta, Wielkanoc lub motyw elektroniczny.',action:'Motywy'},
  {name:'Sprawdź mobile',desc:'Podgląd responsywny przed publikacją.',action:'Preview'}
 ]);
 rows('woodyboyRows',[
  {name:'Product Engine',desc:'Moduł ogólny, docelowo do wydzielenia do WOODYBOY Core.'},
  {name:'Media Studio',desc:'Uniwersalna biblioteka mediów dla wielu przyszłych sklepów.'},
  {name:'Layout Builder',desc:'Silnik ustawień sekcji niezależny od ELKASS.'},
  {name:'Theme Engine',desc:'Motywy i harmonogramy jako funkcja platformowa.'}
 ]);
})();
