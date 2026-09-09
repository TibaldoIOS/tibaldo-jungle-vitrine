import {pots} from './layout.js';
// All distances are metres; the visitor has a 23 cm collision radius.
export const EYE_HEIGHT=1.65;
const radius=.23;
export const obstacles=[
 {x:-2.42,z:-1.5,w:.45,d:1.15},{x:-2.42,z:-3,w:.45,d:1.15},{x:2.43,z:-5.6,w:.4,d:1.55},
 {x:-2.60,z:-3.98,w:.30,d:.34},{x:2.60,z:-3.98,w:.30,d:.34},
 ...pots
];
export function allowed(x,z){
 if(x< -2.60+radius||x>2.60-radius||z>-.12-radius||z< -7.30+radius)return false;
 return obstacles.every(o=>o.r?Math.hypot(x-o.x,z-o.z)>=o.r+radius:
 Math.hypot(Math.max(Math.abs(x-o.x)-o.w/2,0),Math.max(Math.abs(z-o.z)-o.d/2,0))>=radius);
}
export function move(position,dx,dz){
 // Substeps prevent tunnelling through an obstacle after a slow frame.
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.04));
 for(let i=0;i<steps;i++){
  if(allowed(position.x+dx/steps,position.z))position.x+=dx/steps;
  if(allowed(position.x,position.z+dz/steps))position.z+=dz/steps;
 }
 return position;
}
export function clearSegment(a,b){
 const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.035));
 for(let i=0;i<=n;i++)if(!allowed(a.x+(b.x-a.x)*i/n,a.z+(b.z-a.z)*i/n))return false;
 return true;
}
export function route(start,end){
 if(!allowed(end.x,end.z))return [];
 if(clearSegment(start,end))return [end];
 const step=.16, nx=31,nz=43;
 const point=(i)=>({x:-2.4+(i%nx)*step,z:-.4-Math.floor(i/nx)*step});
 const valid=Array.from({length:nx*nz},(_,i)=>allowed(point(i).x,point(i).z));
 function nearest(p){let best=-1,dist=Infinity;for(let i=0;i<valid.length;i++)if(valid[i]){const q=point(i),d=Math.hypot(q.x-p.x,q.z-p.z);if(d<dist&&clearSegment(p,q)){best=i;dist=d;}}return best;}
 const a=nearest(start),b=nearest(end);if(a<0||b<0)return [];
 const prev=new Int32Array(nx*nz).fill(-1),queue=[a];prev[a]=a;
 for(let k=0;k<queue.length&&prev[b]<0;k++){
  const i=queue[k],x=i%nx,z=Math.floor(i/nx);
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
   const xx=x+dx,zz=z+dz,j=zz*nx+xx;
   if(xx<0||xx>=nx||zz<0||zz>=nz||!valid[j]||prev[j]>=0||!clearSegment(point(i),point(j)))continue;
   prev[j]=i;queue.push(j);
  }
 }
 if(prev[b]<0)return [];
 const path=[end];for(let i=b;i!==a;i=prev[i])path.push(point(i));path.push(point(a));path.reverse();
 const smooth=[];let at=start,k=0;while(k<path.length){let j=k;while(j+1<path.length&&clearSegment(at,path[j+1]))j++;smooth.push(path[j]);at=path[j];k=j+1;}return smooth;
}
