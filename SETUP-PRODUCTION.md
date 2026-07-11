# ELKASS — uruchomienie produkcyjne

## 1. Supabase
1. Utwórz projekt Supabase.
2. Uruchom kolejno wszystkie pliki z `supabase/migrations/` w SQL Editor.
3. W Authentication utwórz pierwszego użytkownika (Szefa).
4. W tabeli `admin_profiles` dodaj rekord z jego `user_id`, emailem, `project_slug=elkass` i rolą `admin`.
5. W `config/cloud-config.js` ustaw `enabled: true`, URL projektu i publiczny klucz anon.

## 2. Dodawanie pracowników
Tworzenie kont z panelu wymaga Edge Function `create-panel-user`, ponieważ przeglądarka nie może posiadać klucza service-role. Do czasu wdrożenia funkcji nowe konta tworzy się w Supabase Authentication i dopisuje ich profil do `admin_profiles`.

## 3. Role
- `editor` — Pracownik: produkty, zdjęcia, treści i bieżąca obsługa.
- `admin` — Szef: pełna obsługa oraz użytkownicy i operacje usuwania.
- `super_admin` — właściciel techniczny.

## 4. Wdrożenie
Repo jest statyczne i może zostać wdrożone na Vercel/Netlify. Nie publikuj klucza `service_role`. Klucz anon może znajdować się w konfiguracji frontendu, ponieważ dostęp zabezpiecza RLS.

## 5. Przed przyjmowaniem płatności
Należy osobno podłączyć operatora płatności, webhook oraz serwerowe tworzenie zamówień. Aktualna wersja panelu i katalogu nie powinna być traktowana jako certyfikowany system płatniczy.
