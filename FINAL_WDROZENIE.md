# ELKASS FINAL 1.0 — wdrożenie i testy

## Uruchomienie bez bazy
Projekt działa jako statyczna aplikacja. Wgraj zawartość katalogu na Vercel/Netlify/hosting obsługujący plik `vercel.json` albo uruchom lokalnie:

```bash
python3 -m http.server 8080
```

Panel: `/admin/`

Konta demonstracyjne:
- admin@elkass.pl / admin123
- mod@elkass.pl / mod123

Dane trybu lokalnego są przechowywane w przeglądarce. Moduł Backup pozwala pobrać i odtworzyć cały stan panelu.

## Podłączenie Supabase
1. Utwórz projekt Supabase.
2. Uruchom kolejno migracje z `supabase/migrations/`.
3. Uzupełnij `config/cloud-config.js` i ustaw `enabled: true`.
4. Skonfiguruj bucket mediów i Supabase Auth.
5. Przed produkcją zaostrz polityki RLS z migracji `004_elkass_final_modules.sql` zgodnie z rolami w `admin_profiles`.

## Zakres panelu
- Dashboard
- Produkty
- Kategorie i podkategorie
- Marki
- Orders Center
- Customer Center
- Media Studio PRO
- Home Builder
- Product Builder PRO
- Live CMS
- SEO Manager
- Opinie
- Newsletter
- Showroom
- Ustawienia
- Użytkownicy i role
- Backup/import
- Theme Engine z motywami bazowymi i własnymi

## Test odbiorczy
1. Zaloguj się jako administrator.
2. Dodaj i edytuj produkt, następnie otwórz jego kartę.
3. Usuń testowy produkt.
4. Dodaj kategorię, podkategorię i markę.
5. Dodaj zamówienie i zmień jego status.
6. Dodaj klienta.
7. Dodaj grafikę w Media Studio i ustaw ją jako Hero.
8. Zapisz dane Product Builder PRO.
9. Utwórz stronę Live CMS i rekord SEO.
10. Dodaj opinię i przełącz publikację.
11. Dodaj adres newslettera i wyeksportuj CSV.
12. Dodaj element Showroom.
13. Zapisz ustawienia sklepu.
14. Wybierz każdy motyw oraz utwórz własny.
15. Pobierz backup, zmień dane i zaimportuj backup ponownie.
16. Sprawdź widoki mobilne sklepu i panelu.

## Ważne
Bez skonfigurowanego Supabase aplikacja pracuje w trybie lokalnym. Do prawdziwego logowania email, resetu hasła, współdzielonych danych i chmurowego uploadu wymagane są dane projektu Supabase.
