# ELKASS Platform 1.0 — start

## Co jest w paczce
- oryginalny układ strony: Hero, usługi, statystyki, kategorie, promocje, producenci, produkty, showroom, opinie, kontakt i pełna stopka,
- panel: produkty, media, producenci, kategorie, motywy sezonowe, strona główna, układ i użytkownicy,
- 13 motywów sezonowych z harmonogramem,
- Supabase Auth, Storage i jedna migracja zbiorcza,
- GitHub Pages z poprawnymi ścieżkami w podkatalogu repo.

## Publikacja GitHub Pages
1. Wgraj zawartość paczki do głównego katalogu repo.
2. Settings → Pages → Source: GitHub Actions.
3. Poczekaj na zielony workflow `Deploy ELKASS`.

## Baza
W Supabase SQL Editor uruchom `supabase/migrations/999_elkass_platform_final.sql`. Potem uzupełnij `config/cloud-config.js`.

## Pierwszy szef
Utwórz użytkownika w Supabase Authentication, a następnie wykonaj:
```sql
insert into public.admin_profiles(id,email,display_name,role)
select id,email,'Szef','owner' from auth.users where email='TWOJ_EMAIL';
```

## Ważne
Płatności online wymagają osobnego backendu/Edge Function i kluczy operatora. Nie wpisuj `service_role` do repo.
