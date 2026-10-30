import {createFrameAnimator} from './8d735375e9640955.js';
const stage=document.querySelector('.motion-portrait'),poster=document.querySelector('#portrait'),oldCanvas=document.querySelector('#portrait-canvas');
if(stage&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
const sprite=document.createElement('canvas');sprite.width=480;sprite.height=720;sprite.id='portrait-sprite';sprite.setAttribute('role','img');sprite.setAttribute('aria-label','Interactive character');Object.assign(sprite.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',contain:'paint',opacity:'1'});
const ctx=sprite.getContext('2d');const frames=new Map(),pending=new Map();let animator,desired=0,visible=true,modal=!!document.querySelector('dialog[open]'),scrolling=false,dead=false,shown=false;
const circularDistance=(a,b)=>Math.min(Math.abs(a-b),69-Math.abs(a-b));
const draw=frame=>{desired=((Math.round(frame)%69)+69)%69;if(!frames.size)return;let best=desired;if(!frames.has(best))best=[...frames.keys()].reduce((a,b)=>circularDistance(a,desired)<circularDistance(b,desired)?a:b);ctx.clearRect(0,0,480,720);ctx.drawImage(frames.get(best),0,0);sprite.dataset.frame=String(best);if(!shown){stage.append(sprite);poster.style.display='none';oldCanvas.style.display='none';shown=true;}};
const load=number=>{const n=(number+69)%69;if(frames.has(n))return Promise.resolve();if(pending.has(n))return pending.get(n);const task=(async()=>{const img=new Image();img.decoding='async';img.src='site-assets/character-frames/'+String(n).padStart(2,'0')+'.webp';try{await img.decode();if(dead)return;frames.set(n,img);if(!modal&&visible)draw(desired);}catch{}finally{pending.delete(n);}})();pending.set(n,task);return task;};
animator=createFrameAnimator({frameCount:69,circular:true,smoothTime:.18,maxSpeed:90,render:frame=>{draw(frame);if(!frames.has(desired))load(desired);}});
let rect=stage.getBoundingClientRect();const refresh=()=>rect=stage.getBoundingClientRect();new ResizeObserver(refresh).observe(stage);window.addEventListener('scroll',refresh,{passive:true});window.addEventListener('resize',refresh,{passive:true});
let inputRaf=0,pointer;const follow=()=>{inputRaf=0;if(!pointer||modal||scrolling||!visible||document.hidden)return;const dx=pointer.x-rect.left-rect.width*.52,dy=pointer.y-rect.top-rect.height*.18;if(Math.hypot(dx,dy)>15){const target=Math.round((((Math.atan2(dy,dx)+Math.PI/2+Math.PI*2)%(Math.PI*2))/(Math.PI*2))*69)%69;load(target);animator.setDirection(dx,dy,-Math.PI/2);}};
document.addEventListener('pointermove',e=>{if(modal||scrolling||!visible)return;pointer={x:e.clientX,y:e.clientY};if(!inputRaf)inputRaf=requestAnimationFrame(follow);},{passive:true});
const pause=()=>animator.setPaused(modal||scrolling||!visible||document.hidden);
document.addEventListener('portfolio-scrolling',e=>{scrolling=e.detail;pause();});
document.addEventListener('portfolio-modal',e=>{modal=e.detail;pause();});document.addEventListener('visibilitychange',pause);new IntersectionObserver(([e])=>{visible=e.isIntersecting;pause();}).observe(stage);
await load(0);stage.dataset.renderMode='progressive-frames';
// Decode separate small images in short, interruptible jobs instead of one giant atlas.
let next=1;const warm=async()=>{while(next<69&&!dead){if(modal||scrolling||document.hidden||!visible){await new Promise(r=>setTimeout(r,350));continue;}const n=next++;await load(n);await new Promise(r=>{if('requestIdleCallback'in window)requestIdleCallback(r,{timeout:150});else setTimeout(r,20);});}};warm();
window.addEventListener('pagehide',()=>{dead=true;animator.destroy();if(inputRaf)cancelAnimationFrame(inputRaf);frames.clear();});
}
