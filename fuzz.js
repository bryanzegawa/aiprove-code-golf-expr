const { evalExpr } = require('./solution.js');
function rnd(n){return Math.floor(Math.random()*n)}
function num(){const d=['0','1','2','3','7','9','0.5','3.5','10','100','0.1','2.25'];return d[rnd(d.length)]}
function expr(d){
  if(d<=0||rnd(3)===0){
    let n=num(); if(rnd(4)===0)n='-'+n; if(rnd(5)===0)n='('+n+')';
    return rnd(6)===0?' '+n+' ':n;
  }
  const op=['+','-','*','/'][rnd(4)];
  let e=expr(d-1)+op+expr(d-1);
  if(rnd(2)===0)e='('+e+')';
  return e;
}
let pass=0,fail=0;
for(let k=0;k<5000;k++){
  const s=expr(3);
  let ref,got;
  try{ref=eval(s)}catch(e){continue}
  if(!isFinite(ref))continue;
  try{got=evalExpr(s)}catch(e){fail++;console.log('THROW',s,e.message);continue}
  if(Math.abs(got-ref)<1e-9*(1+Math.abs(ref)))pass++;else{fail++;if(fail<=10)console.log('MISMATCH',JSON.stringify(s),'ref',ref,'got',got)}
}
console.log(`FUZZ pass ${pass} fail ${fail} (5000 random exprs)`);
process.exit(fail?1:0);
