# ELKASS v1.0 — uruchomienie

1. Utwórz projekt w Supabase.
2. W SQL Editor uruchom `supabase/migrations/20260710_elkass_v1_complete.sql`.
3. W Supabase Authentication utwórz konto szefa.
4. W SQL Editor wykonaj (podstawiając UUID i e-mail):
   `insert into public.admin_profiles(user_id,email,name,role) values ('UUID','email','Szef','super_admin');`
5. Uzupełnij `config/cloud-config.js`: `enabled: true`, URL i publiczny anon key.
6. Wgraj cały katalog na Vercel/Netlify albo serwer statyczny.
7. Zaloguj się pod `/admin/`, dodaj produkty, zdjęcia i opublikuj je.

## Co działa
- katalog i karta produktu,
- koszyk zapisywany w przeglądarce,
- checkout zapisujący zamówienie przez bezpieczną funkcję RPC,
- panel z rolami Szef/Pracownik,
- produkty, CMS, media i Storage Supabase,
- zamówienia i klienci w bazie,
- podstawowe SEO, robots i sitemap.

## Przed sprzedażą
Skonfiguruj prawdziwą domenę w `sitemap.xml`, dane firmy, politykę prywatności, regulamin, dostawy i operatora płatności. Płatności online wymagają osobnej integracji serwerowej i webhooków. Bez niej dostępne są zamówienia z płatnością ustalaną z klientem / w salonie.
