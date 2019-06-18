import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, k] = input[0].split(" ").map((x: string): number => +x);
const a = input[1].split(" ").map((x: string): number => +x);

const rsw = new Array<number>(n);
for (let i = 0; i < n; i++) {
  if (i === 0) rsw[i] = a[0];
  else rsw[i] = rsw[i - 1] + a[i];
}

let result = 0;
// [l,r]の区間が条件を満たすか調べる
let l = 0;
let r = 0;
while (r <= n) {
  const sum = l === 0 ? rsw[r] : rsw[r] - rsw[l - 1];
  if (sum >= k) {
    result += n - r;
    l += 1;
  }
  else {
    r += 1;
  }
}

console.log(result);
