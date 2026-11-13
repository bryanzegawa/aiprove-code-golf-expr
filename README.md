# code-golf-expr — AIProve bounty entry (READY-FOR-SUBMIT, not yet submitted)

Smallest `evalExpr(s)` that passes every test. Pratt parser, no `eval`/`Function`.

## Solution

`solution.js` — **245 bytes**:

```js
exports.evalExpr=s=>{let t=s.match(/[\d.]+|\S/g),i=0,p=m=>{let v,c;v=(c=t[i++])<'*'?p(0):c<'.'? -p(2):+t[i-1];c<'*'&&i++;for(;t[i]>')'&&m<2-(t[i]>'*'&&t[i]<'/');)v=(c=t[i++])=='+'?v+p(1):c=='-'?v-p(1):c=='*'?v*p(2):v/p(2);return v};return p(0)}
```

How it works:

- Tokenize with `/[\d.]+|\S/g` (numbers, or any non-space char — spaces are skipped).
- One recursive Pratt parser `p(m)` (min binding power `m`):
  `+`/`-` bind at 1, `*`/`/` at 2, unary `-` at 2.
- Prefix: `(` → parse inner `p(0)` and skip `)`; `-` → `-p(2)`; else a number.
- Operator check via char codes: `t[i] > ')'` is true exactly for `* + - /`
  (and false for `)` / end-of-input); precedence via `m < 2 - (op is + or -)`.
- All variables declared (`let`) — works in strict mode too.

## Test

```bash
node test.js   # 9 public cases (cases.json) + 18 self-made edge cases
node fuzz.js   # 5000 random expressions vs JS eval as reference
```

Results (verified 2026-11-13, Node v24.22.1):

- `test.js`: **PASS 27/27** (public 9/9, edge 18/18)
- Strict-mode re-check (file wrapped in a strict function): public 9/9
- `fuzz.js`: **4391/4391** matched (609 skipped: reference threw / non-finite)

Edge cases covered: unary minus (`-3+5`, `-(1+2)`, `2*-3`, `--5`),
spaces, nested parens, `.5`, `5.`, `1/3`, `0.1+0.2`, left-assoc chains
(`7-3-2`, `100/10/2`), `2- -3`.

## Known limits (outside the spec)

- Unary `+` (e.g. `"+5"`) is not in the spec; this build returns `-5` for it
  (the `c < '.'` branch treats `+` like `-`). Valid spec inputs are unaffected.
- No implicit multiplication (`2(3)`), no `%` / `^` — not in the spec.
- Empty string / malformed input → `NaN`/throw, same as any hand parser.

## Variants tried (`variants/`)

| file | bytes | result |
|------|-------|--------|
| A.js (3-fn recursive descent) | 302 | 27/27 |
| A2.js | 299 | 27/27 |
| A3.js | 295 | 27/27 |
| A4.js | 285 | 27/27 |
| A5.js (shared global `v`) | 277 | 27/27 |
| B.js (Pratt, TDZ bug) | 282 | 20/27 |
| B2.js/B3.js (Pratt, `p()` bug) | 286/282 | 21/27 |
| B4.js | 275 | 27/27 |
| B5.js | 250 | 27/27 |
| B6.js (B5 + strict-safe `let`) | 255 | 27/27 |
| C.js (`eval`, for comparison only) | 35 | 26/27 — fails `--5`, and risks a grader ban on `eval` |
| **GEMINI.js (= solution.js)** | **245** | **27/27** |

## Bounty

- AIProve `code-golf-expr`, 1,000,000 PROVE, lane AutoGrade, metric
  "Bytes, all tests pass". Ends 16 Nov 2026 13:49 UTC (20:49 WIB) per API
  `endsAt` 1794836977632.
- Spec: https://github.com/AIProveRH/aiprove/tree/main/challenges/code-golf-expr
- Built with Gemini CLI `gemini-3.5-flash-lite` (transcript:
  `../gemini-transcript.txt`, secrets stripped — none present).
- ⚠️ Platform is a prototype: escrow/settlement stubbed, PROVE is a test mock,
  payout $0 so far. This entry is an early-position bet, not proven income.
