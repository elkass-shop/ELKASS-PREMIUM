(function(){
  const LOCAL_PRODUCTS_KEY = 'elkass.cloud.products.v54';
  const LOCAL_SETTINGS_KEY = 'elkass.cloud.settings.v54';
  const DEFAULT_PROJECT = 'elkass';
  const cfg = () => window.ELKASS_CLOUD_CONFIG || {enabled:false, tables:{products:'products'}};

  const safeJson = (value, fallback) => { try { return JSON.parse(value); } catch(e){ return fallback; } };
  const readLocalProducts = () => safeJson(localStorage.getItem(LOCAL_PRODUCTS_KEY), []);
  const writeLocalProducts = (items) => localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(items || []));
  const readLocalSettings = () => safeJson(localStorage.getItem(LOCAL_SETTINGS_KEY), {});
  const writeLocalSettings = (settings) => localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings || {}));

  function slugify(str){
    return String(str||'produkt')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/ł/g,'l')
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/^-+|-+$/g,'') || ('produkt-' + Date.now());
  }

  function normalizeProduct(p){
    const id = p.id || slugify([p.brand, p.name].filter(Boolean).join(' '));
    const price = Number(String(p.price||0).replace(/[^0-9.,]/g,'').replace(',','.')) || 0;
    const oldPrice = Number(String(p.oldPrice||p.old_price||0).replace(/[^0-9.,]/g,'').replace(',','.')) || null;
    const features = Array.isArray(p.features) ? p.features : String(p.features||'').split('\n').map(x=>x.trim()).filter(Boolean);
    const image = p.image || '/assets/products/product-10-zmywarka-bosch.jpg';
    return {
      id,
      name: p.name || 'Nowy produkt ELKASS',
      short: p.short || p.description || 'Opis produktu do uzupełnienia w Product Builder.',
      brand: p.brand || 'ELKASS',
      category: p.category || 'Oferta',
      subcategory: p.subcategory || '',
      series: p.series || '',
      status: p.status || (p.is_active === false ? 'draft' : 'published'),
      showHome: p.showHome !== false,
      isPromo: !!p.isPromo,
      isHit: !!p.isHit,
      isOutlet: !!p.isOutlet,
      isNew: !!p.isNew,
      price,
      oldPrice: oldPrice || undefined,
      badge: p.badge || 'Poleca ELKASS',
      availability: p.availability || 'Dostępny od ręki',
      image,
      images: Array.isArray(p.images) && p.images.length ? p.images : [image],
      features: features.length ? features : ['Produkt ELKASS', 'Doradztwo', 'Transport', 'Serwis'],
      params: p.params || {'Podstawowe': {'Marka': p.brand || 'ELKASS', 'Kategoria': p.category || 'Oferta'}},
      dimensions: p.dimensions || {},
      related: p.related || [],
      is_active: p.is_active !== false
    };
  }

  async function fetchJsonProducts(){
    const res = await fetch('/data/products.json', {cache:'no-store'});
    const data = await res.json();
    return Array.isArray(data) ? data : (data.products || []);
  }

  function supabaseReady(){
    const c = cfg();
    return !!(c.enabled && c.supabaseUrl && c.supabaseAnonKey);
  }

  async function supabaseRequest(path, options={}){
    const c = cfg();
    const url = c.supabaseUrl.replace(/\/$/,'') + '/rest/v1/' + path;
    const headers = Object.assign({
      apikey: c.supabaseAnonKey,
      Authorization: 'Bearer ' + (window.ElkassProduction?.session?.()?.access_token || c.supabaseAnonKey),
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    }, options.headers || {});
    const res = await fetch(url, Object.assign({}, options, {headers}));
    if(!res.ok){ throw new Error('Supabase ' + res.status + ': ' + await res.text()); }
    if(res.status === 204) return null;
    return res.json();
  }

  async function getProducts(){
    let base = [];
    try { base = await fetchJsonProducts(); } catch(e){ console.warn('Nie udało się pobrać /data/products.json', e); }

    if(supabaseReady()){
      try {
        const c = cfg();
        const rows = await supabaseRequest(`${c.tables.products || 'products'}?project_slug=eq.${encodeURIComponent(c.projectId||DEFAULT_PROJECT)}&is_active=eq.true&select=*`);
        if(Array.isArray(rows) && rows.length){
          const cloud = rows.map(row => normalizeProduct(Object.assign({}, row.product_json || {}, {
            id: row.id,
            name: row.name,
            brand: row.brand,
            category: row.category,
            subcategory: row.subcategory,
            series: row.series || row.product_json?.series,
            status: row.status || row.product_json?.status,
            showHome: row.product_json?.showHome,
            isPromo: row.product_json?.isPromo,
            isHit: row.product_json?.isHit,
            isOutlet: row.product_json?.isOutlet,
            isNew: row.product_json?.isNew,
            price: row.price,
            oldPrice: row.old_price,
            badge: row.badge,
            availability: row.availability,
            image: row.image,
            is_active: row.is_active
          })));
          const byId = new Map(base.map(p=>[p.id, p]));
          cloud.forEach(p=>byId.set(p.id, p));
          return Array.from(byId.values());
        }
      } catch(e){ console.warn('Cloud products fallback do JSON/localStorage:', e); }
    }

    const local = readLocalProducts().map(normalizeProduct);
    if(local.length){
      const byId = new Map(base.map(p=>[p.id, p]));
      local.forEach(p=>byId.set(p.id, p));
      return Array.from(byId.values());
    }
    return base;
  }

  async function saveProduct(product){
    const p = normalizeProduct(product);
    const local = readLocalProducts();
    const idx = local.findIndex(x=>x.id === p.id);
    if(idx >= 0) local[idx] = p; else local.unshift(p);
    writeLocalProducts(local);

    if(supabaseReady()){
      const c = cfg();
      const row = {
        id: p.id,
        project_slug: c.projectId || DEFAULT_PROJECT,
        name: p.name,
        brand: p.brand,
        category: p.category,
        subcategory: p.subcategory,
        price: p.price,
        old_price: p.oldPrice || null,
        badge: p.badge,
        availability: p.availability,
        image: p.image,
        is_active: p.is_active !== false,
        product_json: p
      };
      try {
        await supabaseRequest(`${c.tables.products || 'products'}?id=eq.${encodeURIComponent(p.id)}`, {
          method:'PATCH',
          body: JSON.stringify(row)
        });
      } catch(e){
        await supabaseRequest(`${c.tables.products || 'products'}`, {
          method:'POST',
          body: JSON.stringify(row)
        });
      }
    }
    window.dispatchEvent(new CustomEvent('elkass:product-saved', {detail:p}));
    return p;
  }

  async function deleteLocalProduct(id){
    writeLocalProducts(readLocalProducts().filter(p=>p.id !== id));
    if(supabaseReady()){
      const c=cfg();
      await supabaseRequest(`${c.tables.products || 'products'}?id=eq.${encodeURIComponent(id)}&project_slug=eq.${encodeURIComponent(c.projectId||DEFAULT_PROJECT)}`, {method:'DELETE'});
    }
    window.dispatchEvent(new CustomEvent('elkass:product-deleted', {detail:{id}}));
  }

  async function saveSetting(key, value){
    const settings = readLocalSettings();
    settings[key] = value;
    writeLocalSettings(settings);
    return settings;
  }

  window.ElkassCloud = {
    mode: () => supabaseReady() ? 'supabase' : 'local-demo',
    config: cfg,
    slugify,
    normalizeProduct,
    getProducts,
    saveProduct,
    deleteLocalProduct,
    readLocalProducts,
    readLocalSettings,
    saveSetting,
    exportLocalProducts: () => JSON.stringify({version:'v54-local-export', products: readLocalProducts()}, null, 2)
  };
})();
