// Harness: public cases (cases.json) + hidden-set edge cases (self-made).
const { evalExpr } = require('./solution.js');
const pub = require('./cases.json');
const edge = [
  { in: '-3+5', out: 2 },
  { in: '-(1+2)', out: -3 },
  { in: '2*-3', out: -6 },
  { in: ' 1 + 2 ', out: 3 },
  { in: '((2))', out: 2 },
  { in: '.5+.5', out: 1 },
  { in: '5.', out: 5 },
  { in: '1/3', out: 1/3 },
  { in: '2+3*4-1', out: 13 },
  { in: '10-2*3', out: 4 },
  { in: '--5', out: 5 },
  { in: '0.1+0.2', out: 0.30000000000000004 },
  { in: '3*(2+1)/2', out: 4.5 },
  { in: '100/10/2', out: 5 },
  { in: '2- -3', out: 5 },
  { in: '(2+3)*(4-1)/5', out: 3 },
  { in: '0', out: 0 },
  { in: '123.456', out: 123.456 },
];
let pass = 0, fail = 0;
for (const c of [...pub, ...edge]) {
  let got, err = null;
  try { got = evalExpr(c.in); } catch (e) { err = e; }
  const ok = err === null && Math.abs(got - c.out) < 1e-9;
  if (ok) pass++; else { fail++; console.log('FAIL', JSON.stringify(c.in), 'expected', c.out, 'got', err ? 'ERR:' + err.message : got); }
}
console.log(`PASS ${pass}/${pub.length + edge.length} (public ${pub.length}, edge ${edge.length})`);
process.exit(fail ? 1 : 0);
