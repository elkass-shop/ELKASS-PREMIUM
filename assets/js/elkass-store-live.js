(function(){
  const KEY_PRODUCTS='elkass_live_products_v1';
  const KEY_HOME='elkass_live_home_v1';
  const KEY_MEDIA='elkass_live_media_v1';
  const DEFAULT_HOME={
    heroTitle:'Technologia do Twojego domu',
    heroAccent:'z doradztwem ELKASS',
    heroText:'RTV, AGD, montaż, transport i wsparcie po zakupie. Lokalny salon w Oleśnie, który pomaga dobrać sprzęt do domu, nie tylko do ceny z półki.',
    heroImage:'/assets/hero-clean-panorama.png',
    heroProduct:'Samsung OLED • Smart TV • kino domowe',
    salonImage:'/assets/sklep.jpg',
    activeTheme:'premium'
  };
  async function baseProducts(){
    try{
      const res=await fetch('/data/products.json',{cache:'no-store'});
      const json=await res.json();
      return Array.isArray(json)?json:(json.products||[]);
    }catch(e){return []}
  }
  function read(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}}
  function write(key,val){localStorage.setItem(key,JSON.stringify(val)); window.dispatchEvent(new CustomEvent('elkass:data-change',{detail:{key,val}}));}
  async function getProducts(){
    const base=await baseProducts();
    const live=read(KEY_PRODUCTS,[]);
    const map=new Map();
    base.forEach(p=>map.set(p.id,p));
    live.forEach(p=>map.set(p.id,p));
    return [...map.values()].filter(p=>p && p.status!=='deleted');
  }
  async function saveProduct(product){
    const live=read(KEY_PRODUCTS,[]).filter(p=>p.id!==product.id);
    live.unshift(product); write(KEY_PRODUCTS,live); return product;
  }
  function deleteProduct(id){const live=read(KEY_PRODUCTS,[]); const existing=live.find(p=>p.id===id); if(existing){existing.status='deleted'; write(KEY_PRODUCTS,live)} else {live.unshift({id,status:'deleted'});write(KEY_PRODUCTS,live)}}
  function getHome(){return {...DEFAULT_HOME,...read(KEY_HOME,{})}}
  function saveHome(data){const home={...getHome(),...data};write(KEY_HOME,home);return home}
  function getMedia(){return read(KEY_MEDIA,[])}
  function saveMedia(item){const media=getMedia();media.unshift(item);write(KEY_MEDIA,media);return item}
  function money(n){return new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN',maximumFractionDigits:0}).format(Number(n||0))}
  function slug(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')||('produkt-'+Date.now())}
  window.ElkassLiveStore={getProducts,saveProduct,deleteProduct,getHome,saveHome,getMedia,saveMedia,money,slug,DEFAULT_HOME};
})();
