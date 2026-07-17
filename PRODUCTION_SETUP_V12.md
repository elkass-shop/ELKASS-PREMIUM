# ELKASS Production v12 — uruchomienie

1. Utwórz projekt Supabase w regionie UE.
2. W SQL Editor uruchom kolejno migracje `001`–`005`.
3. W Supabase Authentication utwórz pierwszego użytkownika.
4. Dodaj go do roli właściciela:

```sql
insert into public.admin_profiles(user_id,project_slug,display_name,role)
select id,'elkass','Właściciel','owner' from auth.users where email='TWOJ_EMAIL';
```

5. W `config/cloud-config.js` wpisz Project URL i publiczny `anon key`, ustaw `enabled: true`.
6. Otwórz `/admin/migrate.html`, zaloguj się i wykonaj jednorazowy import danych lokalnych.
7. Po migracji usuń lub zabezpiecz plik `admin/migrate.html` na serwerze produkcyjnym.
8. Dodaj domenę firmową w Authentication → URL Configuration oraz ustaw Site URL i Redirect URLs.

## Bezpieczeństwo

- Nigdy nie wpisuj `service_role` do plików frontendu.
- Panel zapisuje dane wyłącznie po uwierzytelnieniu i sprawdzeniu roli przez RLS.
- Publiczny sklep odczytuje tylko aktywne/opublikowane rekordy.
- Zamówienie powstaje przez funkcję RPC, która ponownie pobiera ceny produktów z bazy.
- Media mają limit 15 MB i akceptują wyłącznie formaty graficzne.

## Podkategorie

Tabela `categories` ma `parent_id`. Kategoria bez `parent_id` jest główna. Podkategoria wskazuje ID rodzica. Struktura może mieć wiele poziomów.

## Obrazy

- produkt i miniatura: `object-fit: contain`,
- Hero, showroom, banner i kategoria: `object-fit: cover`,
- pliki trafiają do publicznego bucketu `elkass-media`,
- do bazy zapisywany jest publiczny URL.
