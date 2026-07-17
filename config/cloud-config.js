// ELKASS Production Config v12
// Never place service_role here. This file is public in the browser.
window.ELKASS_CLOUD_CONFIG = {
  enabled: false,
  provider: 'supabase',
  projectId: 'elkass',
  supabaseUrl: 'PASTE_SUPABASE_PROJECT_URL',
  supabaseAnonKey: 'PASTE_SUPABASE_ANON_KEY',
  storageBucket: 'elkass-media',
  tables: {
    products: 'products', categories: 'categories', brands: 'brands', media: 'media_assets',
    home: 'home_sections', settings: 'site_settings', orders: 'orders', customers: 'customers',
    reviews: 'reviews', newsletter: 'newsletter_subscribers', showroom: 'showroom_items', themes: 'theme_presets'
  }
};
