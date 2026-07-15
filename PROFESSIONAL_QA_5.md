# ELKASS Professional QA 5.0

## Naprawy stabilności

- Karty produktów mają stałe, niezależne strefy: grafika, badge, marka, nazwa, opis i cena.
- Badge nie może wejść w nazwę produktu; długie etykiety są skracane wewnątrz pola grafiki.
- Hover nie ukrywa tekstu i nie zmienia wysokości karty.
- Opinie są renderowane stronami: 3 desktop, 2 tablet, 1 mobile; zmiana co 5 sekund.
- Zabezpieczono slider przed nakładającymi się timerami, szybkimi kliknięciami, resize i zmianą karty przeglądarki.
- Dodano swipe na telefonach oraz zatrzymanie automatycznej zmiany przy hover/focus.

## Automatyczny system grafik

Każda nowa grafika otrzymuje automatycznie właściwy sposób dopasowania:

- produkty, miniatury promocji i Hit tygodnia: `contain` — cały produkt jest widoczny,
- Hero, kategorie i showroom: `cover` — pole jest zawsze wypełnione,
- stałe proporcje kontenerów zapobiegają przesuwaniu tekstu,
- błędny lub usunięty plik jest zastępowany neutralnym placeholderem ELKASS,
- system działa także dla elementów dodawanych dynamicznie przez panel.

Zalecane formaty źródłowe:

- produkt: 1600 × 1200 px, najlepiej PNG/WebP z jasnym lub przezroczystym tłem,
- kategoria: 1600 × 1200 px, JPG/WebP,
- Hero: 2400 × 1200 px,
- showroom: 1800 × 1200 px,
- logo marki: SVG lub PNG z przezroczystym tłem.

Nie jest konieczne ręczne przycinanie plików do dokładnych wymiarów — system zachowuje układ również dla innych proporcji.

## GitHub Pages

Naprawiono:

- podgląd Theme Engine,
- publikację i otwieranie sklepu z panelu,
- pobieranie `products.json`,
- wyszukiwarkę,
- Live CMS,
- ścieżki CSS, JavaScriptu i aplikacji w podkatalogu repozytorium.

## Kontrole automatyczne

- 566 lokalnych odwołań HTML/JS: 0 brakujących plików,
- wszystkie pliki JavaScript: poprawna składnia,
- wszystkie pliki JSON: poprawna składnia,
- wszystkie pliki CSS: zgodna liczba nawiasów blokowych,
- test serwera lokalnego i symulacja `/ELKASS-PREMIUM/`: HTTP 200,
- podgląd motywu `?themePreview=1`: HTTP 200,
- panel `/admin/`: HTTP 200.

## Ograniczenie środowiska testowego

Proces Chromium w kontenerze nie kończył generowania zrzutów ekranu, dlatego nie oznaczono testu pixel-perfect jako automatycznie zaliczonego. Kontrole struktury, tras, danych, składni i stabilności komponentów zostały wykonane. Po publikacji wymagany jest końcowy przegląd wizualny w Chrome, Firefox i Safari na rzeczywistej domenie.
