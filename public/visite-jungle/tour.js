import * as THREE from 'three';
import {Reflector} from './vendor/addons/Reflector.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {allowed,move,route,EYE_HEIGHT} from './navigation.js';
const host=document.querySelector('#view'),status=document.querySelector('#status');
const mobile=matchMedia('(pointer:coarse)').matches,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch(e){document.querySelector('#loading').textContent='La 3D n’est pas disponible dans ce navigateur.';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;host.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#d6d8d1');
scene.add(new THREE.HemisphereLight(0xfff2df,0x715037,.75));
const sun=new THREE.DirectionalLight(0xffe7c9,2.4);sun.position.set(-3,5,4);sun.target.position.set(1,0,-5);sun.castShadow=true;
sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);Object.assign(sun.shadow.camera,{left:-6,right:6,top:8,bottom:-5,near:.5,far:24});sun.shadow.normalBias=.02;sun.shadow.bias=-.00015;scene.add(sun,sun.target);
for(const z of [-1.6,-4.1,-6.6]){const l=new THREE.PointLight(0xffe6c6,24,8,2);l.position.set(0,2.72,z);scene.add(l);}
// Soft central shadow light anchors pots even away from the window.
const fill=new THREE.PointLight(0xffc787,24,10,2);fill.position.set(-.35,2.17,-3.55);fill.castShadow=true;fill.shadow.mapSize.set(512,512);fill.shadow.normalBias=.025;scene.add(fill);
const camera=new THREE.PerspectiveCamera(mobile?66:64,innerWidth/innerHeight,.045,50);camera.rotation.order='YXZ';camera.position.set(1.83,EYE_HEIGHT,-.48);
const stops=[{x:1.83,z:-.48,yaw:.23,pitch:0},{x:1.1,z:-3.55,yaw:1.55,pitch:-.15},{x:1.2,z:-1.15,yaw:-.8,pitch:0},{x:-.5,z:-6.10,yaw:Math.PI,pitch:0}];
let yaw=.23,pitch=0,loaded=false,waypoints=[],destination=null;const velocity={x:0,z:0};
const keys=new Set(),stick={x:0,y:0},dot=document.querySelector('#dot');
function cancelWalk(){waypoints=[];destination=null;document.querySelectorAll('[data-stop]').forEach(b=>b.setAttribute('aria-pressed','false'));}
function go(i){if(!loaded)return;canvas.focus({preventScroll:true});keys.clear();stick.x=stick.y=0;destination=stops[i];waypoints=route(camera.position,destination);document.querySelectorAll('[data-stop]').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));}
document.querySelectorAll('[data-stop]').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.stop)));
const draco=new DRACOLoader().setDecoderPath('./vendor/draco/').setWorkerLimit(2);
new GLTFLoader().setDRACOLoader(draco).load('./jungle.glb?v=style3',g=>{
 scene.add(g.scene);
 const mirror=new Reflector(new THREE.PlaneGeometry(.36,2.1),{textureWidth:mobile?256:512,textureHeight:mobile?512:1024,color:0xe5e5e5,clipBias:.003});mirror.position.set(-1.36,1.05,-7.36);scene.add(mirror);
 g.scene.traverse(o=>{if(!o.isMesh)return;const materials=Array.isArray(o.material)?o.material:[o.material];
 o.castShadow=true;o.receiveShadow=true;if(materials.some(m=>m.name==='Miroir')){o.visible=false;return;}
 for(const m of materials){if(/Ampoule/.test(m.name))o.castShadow=false;if(/Vitrage/.test(m.name)){o.castShadow=false;m.depthWrite=false;}if(/Feuillage|Nervures|leaves|Leaf/i.test(m.name)){m.side=THREE.DoubleSide;}
 if(/Plafond|Enduit/.test(o.name))o.castShadow=false;
 for(const key of ['map','normalMap','roughnessMap'])if(m[key])m[key].anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
 }
 });renderer.shadowMap.needsUpdate=true;loaded=true;status.hidden=true;status.style.display='none';
},e=>{if(e.total)document.querySelector('#loading').textContent='Chargement… '+Math.round(e.loaded/e.total*100)+' %';},()=>{document.querySelector('#loading').textContent='Le chargement a échoué. Vérifiez votre connexion puis rechargez la page.';});
const keymap={ArrowUp:'forward',z:'forward',w:'forward',ArrowDown:'back',s:'back',ArrowLeft:'turnleft',ArrowRight:'turnright',q:'left',a:'left',d:'right'};
addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,button,a'))return;const k=keymap[e.key.toLowerCase()]||keymap[e.key];if(k){e.preventDefault();keys.add(k);cancelWalk();}});
addEventListener('keyup',e=>keys.delete(keymap[e.key.toLowerCase()]||keymap[e.key]));
function reset(){keys.clear();stick.x=stick.y=0;velocity.x=velocity.z=0;drag=null;joystickPointer=null;knob.style.transform='translate(-50%,-50%)';}
addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden){reset();cancelWalk();}});
let drag=null;const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label','Visite : ZQSD pour marcher, flèches gauche et droite pour tourner.');
canvas.addEventListener('pointerdown',e=>{if(!loaded)return;canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,y:e.clientY};cancelWalk();});
function look(dx,dy){yaw-=dx*(mobile?.004:.0025);pitch=THREE.MathUtils.clamp(pitch-dy*(mobile?.004:.0025),-.95,.95);}
canvas.addEventListener('pointermove',e=>{if(document.pointerLockElement===canvas){look(e.movementX,e.movementY);return;}if(!drag||drag.id!==e.pointerId)return;look(e.clientX-drag.x,e.clientY-drag.y);drag.x=e.clientX;drag.y=e.clientY;});
for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,e=>{if(drag?.id===e.pointerId)drag=null;});
const mouse=document.querySelector('#mouse');mouse.hidden=mobile;
mouse.addEventListener('click',()=>{canvas.focus();if(canvas.requestPointerLock){const p=canvas.requestPointerLock();p?.catch(()=>{mouse.textContent='Glissez pour regarder';});}});
document.addEventListener('pointerlockchange',()=>{mouse.textContent=document.pointerLockElement===canvas?'Échap pour libérer la souris':'Regard à la souris';});
const joystick=document.querySelector('#joystick'),knob=document.querySelector('#knob');let joystickPointer=null;
function stickMove(e){const r=joystick.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;const max=r.width*.33,len=Math.hypot(dx,dy),scale=Math.min(1,max/(len||1));stick.x=dx*scale/max;stick.y=dy*scale/max;knob.style.transform=`translate(calc(-50% + ${dx*scale}px),calc(-50% + ${dy*scale}px))`;}
joystick.addEventListener('pointerdown',e=>{if(!loaded)return;joystickPointer=e.pointerId;joystick.setPointerCapture(e.pointerId);cancelWalk();stickMove(e);});
joystick.addEventListener('pointermove',e=>{if(e.pointerId===joystickPointer)stickMove(e);});
for(const type of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(type,e=>{if(e.pointerId===joystickPointer){joystickPointer=null;stick.x=stick.y=0;knob.style.transform='translate(-50%,-50%)';}});
function angleDiff(target,current){return Math.atan2(Math.sin(target-current),Math.cos(target-current));}
const clock=new THREE.Clock();function frame(){requestAnimationFrame(frame);const dt=Math.min(clock.getDelta(),.045);let tx=0,tz=0;
 if(loaded){
 if(waypoints.length){const p=waypoints[0],dx=p.x-camera.position.x,dz=p.z-camera.position.z,dist=Math.hypot(dx,dz);if(dist<.065){waypoints.shift();}else{const v=Math.min(1.05,dist/dt);tx=dx/dist*v;tz=dz/dist*v;yaw+=angleDiff(Math.atan2(-dx,-dz),yaw)*Math.min(1,dt*3);}}
 else if(destination){yaw+=angleDiff(destination.yaw,yaw)*Math.min(1,dt*4);pitch+=(destination.pitch-pitch)*Math.min(1,dt*4);if(Math.abs(angleDiff(destination.yaw,yaw))<.01)destination=null;}
 else{let f=(keys.has('forward')?1:0)-(keys.has('back')?1:0)-stick.y,s=(keys.has('right')?1:0)-(keys.has('left')?1:0)+stick.x;const mag=Math.max(1,Math.hypot(f,s));f/=mag;s/=mag;yaw+=((keys.has('turnleft')?1:0)-(keys.has('turnright')?1:0))*dt*1.35;tx=(-Math.sin(yaw)*f+Math.cos(yaw)*s)*1.15;tz=(-Math.cos(yaw)*f-Math.sin(yaw)*s)*1.15;}
 const blend=reduced?1:1-Math.exp(-dt*12);velocity.x+=(tx-velocity.x)*blend;velocity.z+=(tz-velocity.z)*blend;move(camera.position,velocity.x*dt,velocity.z*dt);
 }
 camera.position.y=EYE_HEIGHT;camera.rotation.set(pitch,yaw,0);dot.setAttribute('cx',(camera.position.x+2.71)*10);dot.setAttribute('cy',75+camera.position.z*10);renderer.render(scene,camera);
}frame();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
document.querySelector('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch{}});
if(!document.documentElement.requestFullscreen)document.querySelector('#fullscreen').hidden=true;
document.querySelector('#hint').textContent=mobile?'Pouce gauche pour marcher · Glissez à droite pour regarder':'ZQSD pour marcher · Flèches pour tourner · Glissez pour regarder';
