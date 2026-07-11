# V45 — Routing, Smart Commerce i Theme Engine

## Cel
Usunięcie błędów 404 po kliknięciu produktów oraz wprowadzenie pierwszej warstwy Smart Commerce i Theme Engine.

## Zmiany
- Produkty promocyjne na Home prowadzą teraz do `/app/product/?id=...`.
- Dodano fallback routingu dla `/app/product/:slug`, `/produkt/:slug` i `/products/:slug`.
- `product-v44-premium.js` potrafi odczytać ID produktu z parametru `?id=` albo ze ścieżki.
- Koszyk obsługuje `?add=ID_PRODUKTU`.
- Dodano `assets/js/v45-smart-commerce-theme.js`.
- Dodano `assets/css/v45-smart-commerce-theme.css`.
- Dodano `data/theme-engine-v45.json`.

## Finansowanie
Finansowanie zostało rozdzielone na dwa niezależne typy:
- Raty 0%
- Dogodne raty

## Motywy
Na start dostępne motywy:
- Boże Narodzenie
- Zima
- Wielkanoc
- Wiosna
- Lato
- Jesień
- Black Week
- TV Days
- AGD Days
- Laptop Week
- Smartfon Week

## Testy po wdrożeniu
1. Kliknij Beko w promocjach na Home.
2. Sprawdź, czy otwiera się właściwy produkt, bez 404.
3. Kliknij Bosch, Samsung, Philips, LG.
4. Sprawdź koszyk po kliknięciu `Dodaj do koszyka`.
5. Test motywu: dodaj do URL `?theme=christmas`, `?theme=blackweek`, `?theme=easter`.
