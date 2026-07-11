# F4 — Final Live CMS + Auth Foundation

## Cel
Wersja do prezentacji: strona główna zostaje w zaakceptowanym kierunku F3, a panel `/admin` dostaje prostą obsługę produktów, grafik i logowania.

## Konta testowe
- Administrator: `admin@elkass.pl` / `admin123`
- Moderator: `mod@elkass.pl` / `mod123`

## Role
### Administrator
- pełny dostęp,
- dodawanie/edycja/usuwanie produktów,
- dodawanie grafik,
- zmiana Hero i zdjęcia salonu,
- zarządzanie użytkownikami.

### Moderator
- dodawanie i edycja produktów,
- dodawanie grafik,
- zmiana Hero i zdjęcia salonu,
- bez zarządzania użytkownikami i bez usuwania produktów.

## Reset hasła
W wersji statycznej reset hasła zapisuje żądanie lokalnie w przeglądarce. Prawdziwy email resetujący będzie działał po podpięciu Supabase Auth lub innego backendu pocztowego.

## Media Studio
Panel pozwala dodać grafikę z komputera i ustawić ją jako:
- Hero,
- zdjęcie salonu,
- zdjęcie produktu w formularzu.

## Produkty
Produkt zapisany w panelu pojawia się na stronie i otwiera przez:
- `/app/product/?id=...`
- `product.html?id=...`

## WOODYBOY
ELKASS pozostaje pierwszym wdrożeniem. Mechanizmy Studio, Media i Product Builder projektujemy tak, aby można je było później wydzielić do WOODYBOY Core.
