(function(){
'use strict';
const FALLBACK=(window.ELKASS_URL?window.ELKASS_URL('assets/media-placeholder.svg'):'assets/media-placeholder.svg');
const selectors={
 contain:['.ef-product-media img','.ef-mini > img','.ef-hit-img img','[data-product-image]'],
 cover:['.ef-hero-media img','.ef-cat img','.ef-showroom figure img','[data-cover-image]']
};
function mark(img,fit){
 if(!(img instanceof HTMLImageElement))return;
 img.dataset.mediaFit=img.dataset.mediaFit||fit;
 if(!img.getAttribute('loading')&&!img.closest('.ef-hero-media'))img.loading='lazy';
 img.decoding='async';
 const fallback=()=>{
   if(img.dataset.fallbackApplied==='1')return;
   img.dataset.fallbackApplied='1';img.classList.add('is-media-error');img.src=FALLBACK;img.alt=img.alt||'Grafika ELKASS';
 };
 img.addEventListener('error',fallback,{once:true});
 if(img.complete&&img.naturalWidth===0)fallback();
}
function scan(root=document){
 selectors.contain.forEach(sel=>root.querySelectorAll(sel).forEach(img=>mark(img,'contain')));
 selectors.cover.forEach(sel=>root.querySelectorAll(sel).forEach(img=>mark(img,'cover')));
 root.querySelectorAll('img').forEach(img=>{if(!img.dataset.mediaFit)mark(img,img.closest('.ef-cat,.ef-hero-media,.ef-showroom')?'cover':'contain')});
}
let pending=false;const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;scan()})});
function init(){scan();observer.observe(document.documentElement,{childList:true,subtree:true});window.ELKASSMedia={scan,fit:(img,mode,position)=>{mark(img,mode);if(position)img.style.setProperty('--media-position',position)}}}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
