// ELKASS Cloud Config
// Tryb domyślny: local-first. Panel zapisuje dane w przeglądarce i pozwala testować działanie bez bazy.
// Po utworzeniu Supabase ustaw enabled:true oraz wpisz supabaseUrl i supabaseAnonKey.
window.ELKASS_CLOUD_CONFIG = {
  enabled: false,
  provider: 'supabase',
  projectId: 'elkass',
  supabaseUrl: '',
  supabaseAnonKey: '',
  tables: {
    products: 'products',
    media: 'media_assets',
    home: 'home_sections',
    settings: 'project_settings'
  }
};
