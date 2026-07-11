# F5 — Mobile CMS Database Fix

Zakres:

- naprawiona wersja mobilna: wyszukiwarka nie nachodzi na menu,
- kompaktowy pasek informacji pod Hero,
- produkty na telefonie układane w 2 kolumnach zamiast długiej listy jeden pod drugim,
- kompaktowe karty usług pod Hero,
- dodany produkt z panelu trafia na początek listy na stronie głównej,
- zdjęcia produktów i media są dopasowywane przez `object-fit: contain`, bez ucinania,
- dodana migracja Supabase pod role, rewizje CMS i marki.

## Baza

Tryb obecny: local-first, czyli panel działa demonstracyjnie bez bazy.

Po wpisaniu w `config/cloud-config.js`:

```js
enabled: true,
supabaseUrl: '...',
supabaseAnonKey: '...'
```

produkty będą mogły zapisywać się do Supabase. Service Role Key nie powinien być wpisywany w repo ani wysyłany w czacie.

## Kolejny krok

F6 powinien podpiąć prawdziwy Supabase Auth oraz Storage:

- logowanie admin/moderator z Supabase Auth,
- reset hasła przez email,
- upload zdjęć do Storage,
- role i uprawnienia na bazie `admin_profiles`.
