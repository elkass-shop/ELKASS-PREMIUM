# M4 – Showroom Ready Pack

Cel: przestać pokazywać szefowi pusty szkielet. Ten etap dodaje warstwę demonstracyjną z realnymi produktami, grafikami i sekcjami wizualnymi.

## Co dodano

- nowe sekcje na stronie głównej: demo products, ELKASS Identity, media status,
- tryb pokazowy w `/admin`,
- pliki `assets/css/m4-showroom-ready.css` i `assets/js/m4-showroom-ready.js`,
- produkty demonstracyjne spięte z istniejącymi zdjęciami,
- linki do prawidłowych kart produktów `?id=...`,
- pokazowe miejsce pod przyszłe zdjęcia salonu, zespołu, transportu i montaży.

## Co testować

1. `/` – czy strona nie wygląda jak szkielet.
2. `/admin/` – czy pojawia się panel „M4 Showroom Ready”.
3. Kliknięcie „Wczytaj demo content”.
4. Karty produktów na Home.
5. Mobile: czy nowe sekcje nie rozjeżdżają układu.

## Uwaga architektoniczna WOODYBOY

Ten etap jest zrobiony tak, aby później demo content i media layer można było przenieść do modułu `WOODYBOY Core / Demo Store Seeder`.
