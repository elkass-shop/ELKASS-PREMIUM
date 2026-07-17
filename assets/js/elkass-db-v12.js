(function(){'use strict';
 const cfg=()=>window.ELKASS_CLOUD_CONFIG||{}; let client=null;
 const ready=()=>{const c=cfg();return !!(c.enabled&&c.supabaseUrl&&c.supabaseAnonKey&&!c.supabaseUrl.startsWith('PASTE_')&&window.supabase)};
 function db(){if(!ready())return null;if(!client)client=window.supabase.createClient(cfg().supabaseUrl,cfg().supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});return client}
 function fail(e){console.error('[ELKASS DB]',e);throw e}
 async function list(table,query={}){const c=db();if(!c)return [];let q=c.from(table).select(query.select||'*');Object.entries(query.eq||{}).forEach(([k,v])=>q=q.eq(k,v));if(query.order)q=q.order(query.order,{ascending:query.ascending!==false});if(query.limit)q=q.limit(query.limit);const {data,error}=await q;if(error)fail(error);return data||[]}
 async function upsert(table,payload,conflict){const c=db();if(!c)throw Error('Baza nie jest skonfigurowana');const {data,error}=await c.from(table).upsert(payload,{onConflict:conflict}).select();if(error)fail(error);return data}
 async function remove(table,column,value){const c=db();const {error}=await c.from(table).delete().eq(column,value);if(error)fail(error);return true}
 async function upload(file,folder='products'){const c=db();if(!c)throw Error('Baza nie jest skonfigurowana');const clean=file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]/g,'-');const path=`${folder}/${Date.now()}-${crypto.randomUUID()}-${clean}`;const {error}=await c.storage.from(cfg().storageBucket||'elkass-media').upload(path,file,{cacheControl:'31536000',upsert:false});if(error)fail(error);return c.storage.from(cfg().storageBucket||'elkass-media').getPublicUrl(path).data.publicUrl}
 async function signIn(email,password){const {data,error}=await db().auth.signInWithPassword({email,password});if(error)fail(error);return data}
 async function signOut(){const {error}=await db().auth.signOut();if(error)fail(error)}
 async function session(){return db()?(await db().auth.getSession()).data.session:null}
 async function createOrder(customer,cart){const {data,error}=await db().rpc('create_store_order',{customer,cart});if(error)fail(error);return data}
 async function categoryTree(){const rows=await list('categories',{eq:{project_slug:'elkass',is_active:true},order:'sort_order'});const map=new Map(rows.map(x=>[x.id,{...x,children:[]}]));const roots=[];map.forEach(x=>x.parent_id&&map.has(x.parent_id)?map.get(x.parent_id).children.push(x):roots.push(x));return roots}
 window.ElkassDB={ready,client:db,list,upsert,remove,upload,signIn,signOut,session,createOrder,categoryTree};
 window.dispatchEvent(new CustomEvent('elkass:db-ready',{detail:{configured:ready()}}));
})();
