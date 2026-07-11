// ELKASS Cloud Config — skopiuj ten plik jako config/cloud-config.js i uzupełnij dane Supabase.
// Klucz anon public jest bezpieczny do frontendu tylko przy poprawnym RLS w Supabase.
window.ELKASS_CLOUD_CONFIG = {
  enabled: false,
  provider: 'supabase',
  projectId: 'elkass',
  supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
  tables: {
    products: 'products',
    media: 'media_assets',
    home: 'home_sections',
    settings: 'project_settings'
  }
};
