# V58/V59/V60 — LIVE DATA + Home Builder + Media Studio

Ten sprint łączy trzy etapy, których celem jest zakończenie pracy na makietach i rozpoczęcie pracy na danych.

## V58 — Product Builder LIVE DATA

Dodano działające operacje w panelu produktu:

- zapis produktu LIVE,
- nowy produkt,
- usuwanie lokalne,
- lista produktów zapisanych z panelu,
- otwieranie produktu po `id`,
- kompatybilność z `ElkassCloud` i Supabase-ready.

W trybie bez Supabase dane zapisują się w `localStorage`, dzięki czemu można od razu testować zachowanie formularza i karty produktu. Po skonfigurowaniu Supabase ten sam interfejs będzie zapisywał rekordy do chmury.

## V59 — Home Visual Builder LIVE

Dodano działające ustawienia strony głównej:

- zdjęcie Hero,
- nagłówek Hero,
- podtytuł Hero,
- wysokość Hero,
- tytuł promocji,
- tytuł kategorii,
- podgląd miniatury Hero w panelu.

Zmiany są widoczne na `/app/home/` w tej samej przeglądarce. Docelowo dane trafią do tabeli ustawień projektu.

## V60 — Media Studio LIVE

Dodano testowy upload grafik w panelu:

- wybór pliku z komputera,
- zapis jako data URL w localStorage,
- przypisanie roli: Hero, Kategoria, Produkt, Baner, Motyw sezonowy,
- lista mediów do użycia w Home Visual Builder.

Wersja produkcyjna powinna używać Supabase Storage, ale interfejs i przepływ pracy są już przygotowane.

## Zasada WOODYBOY

Moduły V58-V60 są projektowane jako przyszłe elementy WOODYBOY Core:

- Live Data Engine,
- Home Visual Builder,
- Media Studio,
- Cloud Storage Adapter.

ELKASS pozostaje pierwszym wdrożeniem referencyjnym.
