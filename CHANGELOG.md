# CHANGELOG — ELKASS Platform

## V49.1 — Home polish
- Poprawiono stylistykę opinii Google.
- Usunięto publiczny opis techniczny Theme Engine ze sklepu.
- Zmniejszono sekcję producentów i przeniesiono ją pod kategorie.


## Sprint 0 + V44 Product Polish

- Uporządkowano dokumentację startową projektu.
- Doprecyzowano strukturę pracy na jednym repozytorium `elkass-platform`.
- Przebudowano kartę produktu V44:
  - najważniejsze parametry wróciły wysoko, pod opis produktu,
  - blok ceny, dostępności, rat i CTA został uporządkowany,
  - `Dodaj do koszyka` jest głównym przyciskiem,
  - `Zapytaj doradcę` jest przyciskiem drugorzędnym,
  - `Raty 0%` oraz `Dogodne raty` są osobnymi elementami,
  - `Ekspert ELKASS poleca` został przeniesiony niżej,
  - usługi ELKASS zostały przeniesione niżej jako wsparcie po decyzji zakupowej,
  - dodano sekcje: Kupowane razem, Produkty podobne, Klienci oglądali również,
  - poprawiono mobile buy bar i hierarchię informacji na telefonie.

## Założenie od tego sprintu

Każdy kolejny moduł rozwijamy równolegle dla:

- Desktop,
- Mobile,
- ELKASS Studio,
- dokumentacji,
- przyszłej migracji na docelową witrynę.


## V47 – ELKASS Studio COMPLETE

- Dodano Dashboard administratora v47.
- Dodano Home Builder COMPLETE z sekcjami strony głównej.
- Dodano Product Builder PRO z finansowaniem, parametrami, mediami i powiązaniami.
- Dodano dokumentację `docs/studio/V47_STUDIO_COMPLETE.md`.
- Dodano dokument `docs/platform/WOODYBOY_PLATFORM.md` z założeniem, że ELKASS jest pierwszym wdrożeniem przyszłej platformy WOODYBOY.

## V50/V51 — Home Trust Polish + Launch QA
- Opinie Google przebudowane w kierunku starego, spokojnego stylu premium: gwiazdki, ocena 4.8/5, lokalne zaufanie.
- Zmniejszono i uspokojono sekcję producentów pod kategoriami.
- Ukryto publiczne elementy techniczne Theme Engine.
- Dodano dokumentację sprintu w `docs/project/V50_V51_HOME_TRUST_AND_LAUNCH_QA.md`.

## V54 — Cloud Foundation + Live Product Builder

- Dodano warstwę danych `ElkassCloud`.
- Dodano konfigurację `config/cloud-config.js` oraz przykład Supabase.
- Dodano migrację SQL pod Supabase i przyszły WOODYBOY Core.
- Product Builder w panelu otrzymał działający formularz zapisu produktu.
- Sklep odczytuje produkty z JSON + localStorage, a po konfiguracji także z Supabase.
- Dodano dokumentację `docs/studio/CLOUD_FOUNDATION_V54.md`.

## V55/V56/V57 — Visual Builder, Media Integration, Orders PRO

- Dodano Home Visual Builder LIVE: zmiana grafik Hero, kategorii i sekcji Poznaj ELKASS z panelu.
- Dodano Media + Home Integration: jedno Media Studio jako źródło grafik strony głównej.
- Dodano Orders & Customer Center PRO: tablica zamówień, statusy, widok klienta i fundament gwarancji/serwisu.
- Wszystkie trzy moduły są projektowane jako przyszłe moduły WOODYBOY Core, przy zachowaniu ELKASS jako pierwszego wdrożenia.

## V58/V59/V60 — Live Data, Home Visual Builder, Media Studio

- Product Builder otrzymał realne przyciski: zapisz produkt LIVE, nowy produkt, usuń lokalnie.
- Dodano Home Visual Builder LIVE: zmiana grafiki Hero, tekstów i wysokości bez edycji kodu.
- Dodano Media Studio LIVE: testowy upload grafik do localStorage i wybór w Home Builder.
- Dodano migrację Supabase pod `project_settings` i `media_assets`.
- Zabezpieczono kartę produktu V44 przed nadpisaniem przez starszy renderer V43.
- Utrzymano zasadę: ELKASS jako pierwsze wdrożenie, moduły projektowane pod przyszły WOODYBOY Core.

## v61 — M1 Live CMS Production Ready

- Dodano zakładkę `M1 Live CMS` w panelu.
- Dodano demo content seed.
- Dodano export/import backup.
- Dodano snapshot publikacji i przywracanie.
- Dodano walidację projektu przed publikacją.
- Dodano `data/demo-store-v61.json`.


## M2 – ELKASS Premium Design Pass
- Dodano warstwę `m2-premium-design-pass.css`.
- Poprawiono Hero, karty produktów, opinie, producentów, kategorię, produkt i mobile.
- Usunięto z widoku klienta techniczne określenia w sekcjach produktowych.
- Zachowano kierunek przyszłego wydzielenia do WOODYBOY Core.


## M3 – ELKASS Live Platform

Dodano połączony milestone: Live CMS, Home Builder LIVE, Media Studio LIVE, Visual Builder, Theme Engine LIVE i Design System. Szczegóły: `docs/milestones/M3_LIVE_PLATFORM.md`.


## M4 – Showroom Ready Pack

- Dodano wizualny demo content na stronę główną.
- Dodano sekcję produktów pokazowych z grafikami.
- Dodano panel M4 Showroom Ready w `/admin`.
- Dodano dokumentację `docs/project/M4_SHOWROOM_READY.md`.


## M4.3 – Home Premium Redesign

- Panoramiczne, niższe Hero.
- Czyste tło Hero bez wtopionych napisów i statystyk.
- Niższe i szersze Promocje ELKASS.
- Stabilizacja Hit tygodnia, polecanych produktów, opinii i Znajdź nas.
- Wyłączone automatyczne doklejanie sekcji Showroom do Home.


## Final Home + Live CMS
- Panoramiczny Home jako czysty layout.
- Prosty panel dodawania produktów i grafik.
- Hero i zdjęcie salonu zmieniane z panelu.
- Zachowane dane i wcześniejsze moduły repo.


## F2 – Final Compact Pass
- Zmniejszono pionowe odstępy na stronie głównej.
- Hero jest niższe i bardziej panoramiczne.
- Usunięto zbędne opisy przy sekcjach Home przez finalny CSS.
- Powiększono pasek producentów i rozszerzono listę marek.
- Zachowano ELKASS Studio LIVE: dodawanie produktów, grafik, podmiana Hero i zdjęcia salonu.

## F3 Final Frontend Correction
- Wyśrodkowane menu główne.
- Hero obniżone i bardziej panoramiczne.
- Usunięte zbędne opisy przy kategoriach/promocjach/produktach.
- Kategorie powiększone.
- Hit tygodnia przywrócony jako pełna sekcja 70/30 z produktami pobieranymi z danych lub fallbacku.
- Większy pasek producentów z prawdziwymi logotypami.
- Zachowany LIVE CMS: produkty/grafiki z panelu nadal działają przez localStorage/Supabase fallback.

## F4 — Final Live CMS + Auth Foundation

- Dodano ekran logowania do `/admin`.
- Dodano role: Administrator i Moderator.
- Dodano konta testowe: `admin@elkass.pl / admin123` i `mod@elkass.pl / mod123`.
- Dodano formularz resetu hasła w wersji demo, gotowy pod Supabase Auth.
- Zachowano LIVE CMS: dodawanie, edycję i usuwanie produktów.
- Zachowano Media Studio: dodawanie grafik, ustawianie Hero, salonu i zdjęcia produktu.
- Dodano zarządzanie użytkownikami dla administratora.
- Utrzymano ostatni zaakceptowany kierunek Home z F3.

## F4.2 + F5 — Brand ribbon rollback + CMS stabilization

- Przywrócono ruchomy pasek producentów w formie większych kafli tekstowych, zamiast nieudanych pseudo-logotypów.
- Dodano pełniejszą listę marek: Samsung, Bosch, LG, Beko, Amica, Philips, Sony, Lenovo, Whirlpool, Electrolux, Tefal, JBL, Siemens, Sharp, TCL, Hisense, Gorenje, Xiaomi, AEG, Panasonic, Remington, Blaupunkt, Kernau, Sencor, Manta, Philco, DeLonghi, Miele, Liebherr, Haier, Candy.
- Dodano w panelu sekcję Producenci: dodawanie, usuwanie i przywracanie listy marek.
- Ustabilizowano dopasowanie zdjęć: grafiki produktów i media w panelu używają `object-fit: contain`, żeby nie ucinały zdjęć.
- Zachowano finalny Home F3/F4 oraz podstawowy Live CMS produktów i grafik.

## F6 – Category/Subcategory + Theme Engine + Product Builder Complete
- Dodano builder kategorii i podkategorii w `/admin`.
- Product Builder otrzymał wybór: marka → kategoria → podkategoria → seria/model.
- Dodano flagi produktu: strona główna, promocja, hit tygodnia, outlet, nowość oraz status szkic/opublikowany.
- Dodano panel motywów sezonowych: Premium, Boże Narodzenie, Wielkanoc, Wiosna, Lato, Jesień, Black Week, Back to School, RTV Days, AGD Days.
- Strona główna czyta kategorie i motyw z danych lokalnych, zachowując fallback demo.
- Dodano migrację Supabase dla kategorii, podkategorii, motywów i pól produktów.

## F6.1 — Seasonal Design Engine LIVE
- Motywy sezonowe otrzymały rzeczywiste dekoracje, animacje i kolory.
- Boże Narodzenie: śnieg, choinki, prezenty, bombki i świąteczny komunikat.
- Wielkanoc: pisanki, królik, kwiaty i płatki.
- Wiosna/Lato/Jesień: płatki, słońce, liście, dynie i sezonowe akcenty.
- Black Week: czarno-żółta oprawa, błyskawice i wstęga promocyjna.
- Back to School / RTV Days / AGD Days: tematyczne ikony i dekoracje.
- Panel motywów ma teraz wizualne kafle i natychmiastowy podgląd wyboru.

## F7–F9 Luxury Seasonal Campaigns
- ekskluzywne motywy z dedykowanym Hero i dekoracjami SVG
- harmonogram kampanii
- intensywność dekoracji
- historia publikacji i przywracanie motywów
