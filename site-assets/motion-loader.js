(()=>{
const stage=document.querySelector('.motion-portrait');
if(!stage||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
let started=false;
const start=()=>{if(started)return;started=true;const run=()=>import('./motion.js').catch(()=>{});if('requestIdleCallback'in window)requestIdleCallback(run,{timeout:2000});else setTimeout(run,200);};
const observe=()=>{const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();start();}},{rootMargin:'100px'});observer.observe(stage);};
if(document.readyState==='complete')observe();else window.addEventListener('load',observe,{once:true});
})();