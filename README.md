# ELKASS 10 Premium — V44 Product Experience PREMIUM

To jest brakujący etap V44 pomiędzy V43 Product Engine a V45 Smart Commerce.

## Co sprawdzić
1. Wejdź w `/app/product/?id=tv-samsung-55-crystal-uhd`.
2. Kliknij produkty z sekcji `Kupowane razem` i `Produkty podobne` — powinny otwierać różne produkty.
3. Sprawdź mobile: dolny pasek zakupu, miniatury, parametry.
4. Sprawdź, czy Ekspert ELKASS i Usługi ELKASS są niżej, a nie dominują na górze.

Po zatwierdzeniu V44 można nakładać V45 Smart Commerce + Theme Engine.


## V46 Media Studio PRO
Dodano fundament biblioteki mediów: `data/media-v46.json`, katalogi `assets/images/*`, panel Media Studio PRO i dokumentację `docs/studio/MEDIA_STUDIO_V46.md`.


## Aktualny sprint

V47 – ELKASS Studio COMPLETE: Dashboard + Home Builder oraz Product Builder PRO. Panel testowy dostępny pod `/admin`.


## Aktualny pakiet sprintów

Ten build zawiera V55, V56 i V57:

- Home Visual Builder LIVE,
- Media + Home Integration,
- Orders & Customer Center PRO.

Testuj: `/admin`, `/app/home/`, `/app/orders/`.

## V58/V59/V60 — test LIVE

Po wdrożeniu sprawdź:

1. `/admin` → Product Builder PRO → **Zapisz produkt LIVE**.
2. `/admin` → Home Builder → **Home Visual Builder LIVE**.
3. `/admin` → Media → **Media Studio LIVE**.
4. `/app/product/?id=<id-produktu>` — karta produktu powinna wczytać produkt zapisany lokalnie lub z Supabase.
5. `/app/home/` — zmiany Hero z Home Builder powinny być widoczne w tej samej przeglądarce.


## M3 – ELKASS Live Platform

Dodano połączony milestone: Live CMS, Home Builder LIVE, Media Studio LIVE, Visual Builder, Theme Engine LIVE i Design System. Szczegóły: `docs/milestones/M3_LIVE_PLATFORM.md`.


### M4 Showroom Ready

Projekt zawiera warstwę demonstracyjną, która pozwala pokazać szefowi sklep z produktami, grafikami i sekcjami wizualnymi zamiast pustego szkieletu. Test: `/` oraz `/admin`.

### F6 – obsługa struktury sklepu
Panel `/admin` pozwala teraz zarządzać kategoriami, podkategoriami i motywami. Produkty można przypisywać do pełnej struktury: marka, kategoria, podkategoria, seria/model. Wersja nadal działa lokalnie przez `localStorage`, ale posiada migrację pod Supabase.
