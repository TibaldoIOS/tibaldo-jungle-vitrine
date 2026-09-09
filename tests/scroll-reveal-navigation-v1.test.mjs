import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source=readFileSync(new URL('../app/ScrollReveal.tsx',import.meta.url),'utf8');
function mount(reduced=false) {
  let effect, deps, mutation, cleanup;
  const observed=[];
  const root=new Set();
  class Element {
    classes=new Set();
    classList={add:(name)=>this.classes.add(name)};
    matches(){return true;}
    querySelectorAll(){return [];}
  }
  const first=new Element();
  let disconnected=0;
  const context={exports:{},HTMLElement:Element,Number,Math,WeakSet,
    require:(name)=>name==='react'?{useEffect:(fn,d)=>{effect=fn;deps=d;}}:{usePathname:()=>'/plantes'},
    document:{documentElement:{classList:{add:n=>root.add(n),remove:n=>root.delete(n)}},body:{},querySelector:()=>null,querySelectorAll:s=>s==='[data-reveal]'?[first]:[]},
    window:{matchMedia:()=>({matches:reduced}),IntersectionObserver:true,requestAnimationFrame:()=>1,cancelAnimationFrame(){},addEventListener(){},removeEventListener(){}},
    IntersectionObserver:class{observe(e){observed.push(e);}unobserve(){}disconnect(){disconnected++;}},
    MutationObserver:class{constructor(fn){mutation=fn;}observe(){}disconnect(){disconnected++;}},
  };
  vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
  context.exports.default(); cleanup=effect();
  return {first,observed,root,Element,late:e=>mutation([{addedNodes:[e]}]),deps,cleanup,disconnected:()=>disconnected};
}
test('route changes refresh the reveal controller rather than reuse stale page nodes',()=>{
  const m=mount(); assert.equal(m.deps[0],'/plantes'); assert.equal(m.observed.length,1);m.cleanup();assert.equal(m.root.has('reveal-ready'),false);assert.equal(m.disconnected(),2);
});
test('late route/streamed content is visible even before any intersection callback',()=>{
  const m=mount();const late=new m.Element();const child=new m.Element();late.querySelectorAll=()=>[child];m.late(late);assert.ok(late.classes.has('is-visible'));assert.ok(child.classes.has('is-visible'));m.cleanup();
});
test('reduced motion reveals both initial and late content without animation dependency',()=>{
  const m=mount(true);assert.ok(m.first.classes.has('is-visible'));const late=new m.Element();m.late(late);assert.ok(late.classes.has('is-visible'));m.cleanup();assert.equal(m.root.has('reveal-ready'),false);
});
test('no reload, timeout workaround or swallowed exception is introduced',()=>{
  assert.doesNotMatch(source,/location\.reload|setTimeout|catch\s*\(/);
});
