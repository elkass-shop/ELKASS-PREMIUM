# ELKASS Home v2 LIVE Final

Cel tego wydania: zakończyć błądzenie po poprawkach starego Home i dostarczyć czysty, nowy frontend strony głównej oraz działające podstawy zarządzania produktami i grafikami z panelu.

## Zrobione
- Nowa strona główna od podstaw (`index.html` i `app/home/index.html`).
- Jeden nowy CSS bez dokładania kolejnych łatek: `assets/css/elkass-home-v2-final.css`.
- Dane produktów pobierane z `data/products.json` oraz z produktów dodanych w ELKASS Studio.
- Panel `/admin/` w trybie prostym dla laika:
  - dodawanie produktu,
  - edycja produktu,
  - wgrywanie grafiki produktu,
  - zmiana Hero,
  - zmiana zdjęcia salonu,
  - Media Studio lokalne,
  - fundament Design Engine.
- Produkt dodany w panelu pojawia się na stronie głównej i otwiera jako karta produktu.

## Ważne
Obecnie zapis działa lokalnie w przeglądarce przez `localStorage`, żeby można było rano pokazać działający mechanizm bez konfiguracji chmury. Następny krok to podłączenie tego samego API do Supabase.

## WOODYBOY
Moduły są projektowane tak, aby później można było wydzielić je do WOODYBOY Core: Store, Product Builder, Media Studio, Home Builder i Design Engine.
