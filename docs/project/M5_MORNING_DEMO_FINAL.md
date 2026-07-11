# M5 — Morning Demo Final

Cel: przygotować wersję, którą można rano pokazać szefowi jako prawie finalny produkt wizualny + działający panel demo.

## Co zostało wdrożone

- Przepisana strona główna na czysty layout premium.
- Nowy Design Engine oparty o zmienne CSS i motywy.
- Motywy: `premium`, `blackweek`, `christmas`, `spring`.
- Panel `/admin/` uproszczony pod laika.
- Edycja Home: tytuł Hero, opis Hero, grafika Hero, motyw.
- Dodawanie produktów w panelu demo.
- Produkty dodane w panelu pojawiają się na Home i otwierają się na stronie produktu.
- Zachowana architektura pod Supabase: obecny zapis jest lokalny, gotowy do podpięcia chmury.

## Co pokazać szefowi

1. `/` — nowa strona główna.
2. `/admin/` — panel prosty dla laika.
3. Zmień motyw na Black Week lub Boże Narodzenie.
4. Zmień tytuł Hero i grafikę.
5. Dodaj produkt.
6. Wróć na `/` i pokaż, że produkt pojawił się w polecanych.

## Ważna informacja techniczna

W tej wersji zapis działa w `localStorage`, żeby można było bezpiecznie testować panel na Vercel bez konfiguracji konta Supabase. Następny krok produkcyjny to podpięcie tych samych akcji do Supabase.

## WOODYBOY

Moduły zostały opisane jako przyszłe elementy WOODYBOY Core:

- Design Engine,
- Home Builder,
- Product Builder,
- Media Studio,
- Theme Engine.
