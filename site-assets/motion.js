
async function videoFallback(){
const {createFrameAnimator}=await import("./8d735375e9640955.js");
const {createChromaVideoRenderer}=await import("./e4f7971a5dcbf9a5.js");
const video=document.querySelector('#portrait-video');video.src=video.dataset.src;const canvas=document.querySelector('#portrait-canvas'),poster=document.querySelector('#portrait'),stage=document.querySelector('.motion-portrait');
const runtime={"type": "chroma-video", "frameCount": 69, "fps": 24.0, "keying": {"algorithm": "dominance-v2", "mode": "green", "keyColor": [0, 239, 0], "similarity": 0.12, "smoothness": 0.06, "dominanceStart": 0.0, "dominanceEnd": 0.12, "spillStart": -0.005, "spillEnd": 0.06, "spill": 1.0}, "anchors": {}, "posterFrame": 0, "assets": {"poster": "final/poster-alpha.png", "desktop": "final/motion-chroma-desktop.mp4", "mobile": "final/motion-chroma-mobile.mp4", "timeline": "/Users/kangxizhen/Documents/Codex/2026-10-29/bang/outputs/mouse-motion/build/timeline.json"}};
let animator,renderer,ready=false,onscreen=true;
const fallback=()=>{ready=false;canvas.style.opacity=0;poster.style.display='block';};
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
try{
await new Promise((resolve,reject)=>{if(video.readyState>=2)return resolve();video.addEventListener('loadeddata',resolve,{once:true});video.addEventListener('error',reject,{once:true});video.load();});
renderer=createChromaVideoRenderer({video,canvas,frameCount:runtime.frameCount,fps:runtime.fps,keying:runtime.keying,maxDpr:1.5,onFrame:(frame)=>{canvas.dataset.frame=String(frame);canvas.style.opacity=1;poster.style.display='none';}});
animator=createFrameAnimator({frameCount:runtime.frameCount,circular:true,smoothTime:.14,maxSpeed:runtime.frameCount*1.5,render:frame=>renderer.render(Math.min(runtime.frameCount-1,frame))});ready=true;
const follow=(x,y)=>{if(!ready||document.hidden||!onscreen)return;const r=canvas.getBoundingClientRect();const dx=x-(r.left+r.width*.52),dy=y-(r.top+r.height*.18);canvas.dataset.pointer=x+','+y;if(Math.hypot(dx,dy)>15)animator.setDirection(dx,dy,-Math.PI/2);};
let inputRaf=0,lastPointer=null;
const scheduleFollow=e=>{if(document.querySelector('dialog[open]'))return;lastPointer={x:e.clientX,y:e.clientY};if(inputRaf)return;inputRaf=requestAnimationFrame(()=>{inputRaf=0;if(lastPointer)follow(lastPointer.x,lastPointer.y);});};
if('PointerEvent' in window)document.addEventListener('pointermove',scheduleFollow,{passive:true});
else{document.addEventListener('mousemove',scheduleFollow,{passive:true});document.addEventListener('touchmove',e=>{if(e.touches[0])scheduleFollow(e.touches[0]);},{passive:true});}
window.addEventListener('pagehide',()=>{if(inputRaf)cancelAnimationFrame(inputRaf);});
new ResizeObserver(()=>renderer.resize()).observe(stage);
new IntersectionObserver(([e])=>onscreen=e.isIntersecting).observe(stage);
video.addEventListener('error',fallback);canvas.addEventListener('webglcontextlost',fallback);window.addEventListener('pagehide',()=>{animator.destroy();renderer.destroy();});
}catch(error){fallback();console.warn('Character preview unavailable',error);}
}
}
const poster=document.querySelector('#portrait'),canvas=document.querySelector('#portrait-canvas'),stage=document.querySelector('.motion-portrait');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
try{
const atlas=new Image();atlas.src="site-assets/e86d0079b3575c30.webp";await atlas.decode();
// Decode compact frames once; avoid uploading/cropping the full atlas per draw.
const frames=[];
if(typeof createImageBitmap==='function'){
 for(let i=0;i<69;i++){frames.push(await createImageBitmap(atlas,(i%9)*480,Math.floor(i/9)*720,480,720));if(i%6===5)await new Promise(resolve=>setTimeout(resolve,0));}
}

const {createFrameAnimator}=await import("./8d735375e9640955.js");
const sprite=document.createElement('canvas');sprite.width=480;sprite.height=720;const context=sprite.getContext('2d');if(!context)throw new Error('Canvas unavailable');sprite.id='portrait-sprite';sprite.setAttribute('aria-label','Interactive character');sprite.setAttribute('role','img');
Object.assign(sprite.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',contain:'paint',opacity:'1'});stage.append(sprite);poster.style.display='none';canvas.style.display='none';document.querySelector('#portrait-video').removeAttribute('src');
stage.dataset.renderMode=frames.length?'cached-frames':'atlas';
let visible=true;
const animator=createFrameAnimator({frameCount:69,circular:true,smoothTime:.18,maxSpeed:90,render:frame=>{const f=Math.min(68,frame),col=f%9,row=Math.floor(f/9);context.clearRect(0,0,480,720);if(frames[f])context.drawImage(frames[f],0,0);else context.drawImage(atlas,col*480,row*720,480,720,0,0,480,720);sprite.dataset.frame=String(f);}});
let stageRect=stage.getBoundingClientRect();const refreshRect=()=>stageRect=stage.getBoundingClientRect();new ResizeObserver(refreshRect).observe(stage);window.addEventListener('scroll',refreshRect,{passive:true});window.addEventListener('resize',refreshRect,{passive:true});
const follow=(x,y)=>{if(document.hidden||!visible)return;const r=stageRect,dx=x-r.left-r.width*.52,dy=y-r.top-r.height*.18;if(Math.hypot(dx,dy)>15)animator.setDirection(dx,dy,-Math.PI/2);};
let inputRaf=0,lastPointer=null;
const scheduleFollow=e=>{if(document.querySelector('dialog[open]'))return;lastPointer={x:e.clientX,y:e.clientY};if(inputRaf)return;inputRaf=requestAnimationFrame(()=>{inputRaf=0;if(lastPointer)follow(lastPointer.x,lastPointer.y);});};
if('PointerEvent' in window)document.addEventListener('pointermove',scheduleFollow,{passive:true});
else{document.addEventListener('mousemove',scheduleFollow,{passive:true});document.addEventListener('touchmove',e=>{if(e.touches[0])scheduleFollow(e.touches[0]);},{passive:true});}
window.addEventListener('pagehide',()=>{if(inputRaf)cancelAnimationFrame(inputRaf);});new IntersectionObserver(([e])=>visible=e.isIntersecting).observe(stage);window.addEventListener('pagehide',()=>{animator.destroy();frames.forEach(frame=>frame.close());});
}catch(e){await videoFallback();}
}
