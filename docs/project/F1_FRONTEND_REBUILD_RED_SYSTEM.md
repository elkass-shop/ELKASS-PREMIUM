# F1 — ELKASS Frontend Rebuild Red System + LIVE Studio

Cel: zamknąć etap błądzenia po poprawkach i przygotować wersję strony głównej, którą można pokazać jako działający kierunek produktu.

## Najważniejsze założenia

- Więcej czerwonych akcentów, ale w kontrolowany sposób.
- Czerń + biel + czerwony jako główny język wizualny ELKASS.
- Prawdziwe logotypy marek z katalogu `assets/logos`.
- Rozbudowana stopka z odnośnikami: Oferta, Usługi, Obsługa klienta, Informacje.
- Dane produktów i grafiki pozostają możliwe do zmiany w panelu.

## Panel

`/admin/` pozwala testowo:

- dodać produkt,
- edytować produkt,
- wgrać grafikę do Media Studio,
- użyć grafiki jako Hero,
- użyć grafiki jako zdjęcie salonu,
- użyć grafiki w formularzu produktu.

Aktualnie zapis działa lokalnie w przeglądarce. Po podpięciu Supabase ten sam model danych zostanie przeniesiony do chmury.

## WOODYBOY

Ten etap dalej trzyma zasadę: ELKASS jest pierwszym wdrożeniem, a elementy Design Engine, Media Studio i Product Builder mają być później możliwe do wydzielenia do WOODYBOY Core.
