# ELKASS Layout Builder v4.6.5

Moduł dodaje kontrolę układu sekcji bez edycji kodu.

## Co można zmieniać

- wysokość Hero desktop,
- wysokość Hero mobile,
- odstępy sekcji desktop/mobile,
- wysokość Hitu tygodnia,
- wysokość małych promocji,
- wysokość sekcji Poznaj ELKASS / galerii,
- wysokość kart opinii,
- promień zaokrągleń,
- widoczność sekcji osobno dla desktop/tablet/mobile.

## Gdzie są dane

Domyślna konfiguracja znajduje się w:

`data/layout-v465.json`

Zmiany wykonane w panelu testowym zapisywane są lokalnie w przeglądarce w `localStorage` pod kluczem:

`elkass.layout.v465`

W wersji produkcyjnej ten sam model danych powinien zostać zapisany w bazie lub CMS.

## Jak używać

1. Wejdź w `admin/`.
2. Otwórz zakładkę `Layout Builder`.
3. Wybierz preset lub ustaw wartości ręcznie.
4. Ustaw widoczność sekcji na desktop/tablet/mobile.
5. Kliknij `Zapisz ustawienia`.

## Zgodność z motywami

Layout Builder współpracuje z Theme Engine. Motyw sezonowy może nadpisywać proporcje sekcji, ale nie powinien zmieniać treści.
