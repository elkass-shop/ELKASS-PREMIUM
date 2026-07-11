# M4.1 Stabilization Fix

Cel poprawki: przywrócić stabilny wygląd strony głównej po pakiecie M4 Showroom Ready.

## Zmiany

- Demo Showroom nie dokłada już automatycznie dużych sekcji do strony głównej.
- Pełny pokaz demo pozostaje w `/app/showroom/` oraz opcjonalnie przez `?showroom=1`.
- Naprawiono czytelność sekcji „Hit tygodnia” po zmianach M2/M4.
- Dodano końcowy CSS stabilizacyjny `assets/css/m4-stabilization-fix.css` ładowany po wcześniejszych stylach.
- Dodano zabezpieczenie przed chowaniem nagłówków pod sticky menu.

## Zasada na przyszłość

Duże pakiety demonstracyjne nie mogą automatycznie dublować sekcji na stronie głównej. Jeśli chcemy pokazać demo content szefowi, robimy to w dedykowanym widoku `/app/showroom/`, a strona główna pozostaje stabilna i uporządkowana.
