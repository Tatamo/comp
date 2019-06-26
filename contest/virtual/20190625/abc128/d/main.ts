import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, k] = input[0].split(" ").map((x: string): number => +x);
const v = input[1].split(" ").map((x: string): number => +x);

const rsw = new Array(n + 1);
rsw[0] = 0;
for (let i = 0; i < n; i++) {
  rsw[i + 1] = rsw[i] + v[i];
}
const sum = (from: number, until: number) => {
  if (from < 0) from = 0;
  if (from > rsw.length) from = rsw.length - 1;
  if (until < 0) until = 0;
  if (until > rsw.length) until = rsw.length - 1;
  return rsw[until] - rsw[from];
}
const left = (x: number) => sum(0, x);
const right = (x: number) => sum(n - x, n);

let result = 0;

for (let l = 0; l <= k; l++) {
  for (let r = 0; l + r <= k && l + r <= n; r++) {
    // k-l-rが宝石を捨てられる回数
    // ただしl+r個より多くは捨てられない
    const p = Math.min(l + r, k - l - r);
    const js = [];
    // 左からl個
    js.push(...v.slice(0, l));
    // 右からr個
    js.push(...v.slice(n - r));
    // 持っている宝石を価値でソート
    js.sort((a, b) => a - b);

    let drop = 0;
    for (let i = 0; i < p; i++) {
      // 負の価値の宝石がなくなったら取り出さない
      if (js[i] >= 0) break;
      drop += js[i];
    }
    const score = left(l) + right(r) - drop;
    if (result < score) result = score;
  }
}
console.log(result);
