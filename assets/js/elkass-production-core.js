(function(){
  'use strict';
  const cfg=()=>window.ELKASS_CLOUD_CONFIG||{};
  const authKey='elkass.supabase.session.v1';
  const safe=(v,f=null)=>{try{return JSON.parse(v)}catch{return f}};
  const session=()=>safe(localStorage.getItem(authKey),null);
  const saveSession=s=>s?localStorage.setItem(authKey,JSON.stringify(s)):localStorage.removeItem(authKey);
  const ready=()=>!!(cfg().enabled&&cfg().supabaseUrl&&cfg().supabaseAnonKey);
  async function request(path,opt={}){
    const c=cfg(); const s=session();
    const headers={apikey:c.supabaseAnonKey,'Content-Type':'application/json',...(opt.headers||{})};
    headers.Authorization='Bearer '+(s?.access_token||c.supabaseAnonKey);
    const res=await fetch(c.supabaseUrl.replace(/\/$/,'')+path,{...opt,headers});
    const text=await res.text(); const body=text?safe(text,text):null;
    if(!res.ok) throw new Error(typeof body==='string'?body:(body?.msg||body?.message||'Błąd usługi'));
    return body;
  }
  async function signIn(email,password){
    const data=await request('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})}); saveSession(data); return profile();
  }
  async function profile(){
    const s=session(); if(!s?.user?.email) return null;
    try{
      const rows=await request('/rest/v1/admin_profiles?email=eq.'+encodeURIComponent(s.user.email)+'&is_active=eq.true&select=*');
      if(!rows?.length) throw new Error('Brak aktywnego profilu panelu');
      return {...rows[0],access_token:s.access_token};
    }catch(e){ saveSession(null); throw e; }
  }
  async function signOut(){try{if(session())await request('/auth/v1/logout',{method:'POST'})}catch{} saveSession(null);}
  async function upload(file,folder='products'){
    if(!ready()) return await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)});
    const c=cfg(); const ext=(file.name.split('.').pop()||'jpg').replace(/[^a-z0-9]/gi,'');
    const path=(c.projectId||'elkass')+'/'+folder+'/'+Date.now()+'-'+Math.random().toString(36).slice(2)+'.'+ext;
    const s=session(); const headers={apikey:c.supabaseAnonKey,Authorization:'Bearer '+s.access_token,'Content-Type':file.type||'application/octet-stream','x-upsert':'false'};
    const res=await fetch(c.supabaseUrl.replace(/\/$/,'')+'/storage/v1/object/'+(c.storageBucket||'elkass-media')+'/'+path,{method:'POST',headers,body:file});
    if(!res.ok) throw new Error('Nie udało się wysłać zdjęcia');
    return c.supabaseUrl.replace(/\/$/,'')+'/storage/v1/object/public/'+(c.storageBucket||'elkass-media')+'/'+path;
  }
  async function createUser(email,password,name,role){
    return request('/functions/v1/create-panel-user',{method:'POST',body:JSON.stringify({email,password,name,role})});
  }
  window.ElkassProduction={ready,session,signIn,profile,signOut,upload,createUser,request};
})();
document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('modeBanner');if(b&&window.ElkassProduction?.ready?.()){b.classList.add('cloud');b.textContent='Tryb online — dane są synchronizowane z bazą Supabase.'}});
