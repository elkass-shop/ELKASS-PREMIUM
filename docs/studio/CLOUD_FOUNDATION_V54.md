# V54 — Cloud Foundation + Live Product Builder

Ten sprint przełącza ELKASS z makiety panelu w kierunku prawdziwej aplikacji.

## Co zostało dodane

- `assets/js/cloud-data-v54.js` — warstwa danych dla sklepu i panelu.
- `config/cloud-config.js` — konfiguracja trybu local-first / Supabase.
- `config/cloud-config.example.js` — wzór konfiguracji chmury.
- `supabase/migrations/001_woodyboy_elkass_cloud_core.sql` — baza pod produkty, media, sekcje Home i ustawienia.
- Product Builder LIVE w `/admin` — formularz, który naprawdę zapisuje produkt lokalnie i po konfiguracji Supabase będzie zapisywał do chmury.

## Jak działa teraz

Domyślnie projekt działa w trybie `local-demo`:

1. Wejdź w `/admin`.
2. Otwórz `Product Builder PRO`.
3. W sekcji `Product Builder LIVE` kliknij `Wstaw demo`.
4. Kliknij `Zapisz produkt`.
5. Kliknij `Otwórz produkt` — zobaczysz produkt na stronie sklepu pod `/app/product/?id=...`.

Dane są zapisane w `localStorage`, więc działają w tej samej przeglądarce. To pozwala testować panel bez bazy.

## Jak podłączyć Supabase

1. Utwórz projekt w Supabase.
2. Wejdź w SQL Editor.
3. Uruchom migrację:
   `supabase/migrations/001_woodyboy_elkass_cloud_core.sql`
4. Skopiuj `config/cloud-config.example.js` jako `config/cloud-config.js`.
5. Ustaw:

```js
window.ELKASS_CLOUD_CONFIG = {
  enabled: true,
  provider: 'supabase',
  projectId: 'elkass',
  supabaseUrl: 'https://TWOJ_PROJEKT.supabase.co',
  supabaseAnonKey: 'TWÓJ_ANON_KEY',
  tables: {
    products: 'products',
    media: 'media_assets',
    home: 'home_sections',
    settings: 'project_settings'
  }
};
```

## Ważne bezpieczeństwo

Na produkcji zapis z panelu musi być zabezpieczony logowaniem administratora i politykami RLS. Ten sprint przygotowuje strukturę i przepływ danych, ale docelowo do zapisu dodamy Supabase Auth / role administratorów.

## Zasada WOODYBOY

Baza ma `project_slug`. Dziś używamy tylko `elkass`, ale struktura jest przygotowana pod przyszłą platformę WOODYBOY, gdzie każdy sklep będzie osobnym projektem.
