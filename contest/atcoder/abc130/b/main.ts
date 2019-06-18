import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, x] = input[0].split(" ").map((x: string): number => +x);
const l = input[1].split(" ").map((x: string): number => +x);

let result = 1;
let sum = 0;
for (let i = 0; i < n; i++) {
  sum += l[i];
  if (sum > x) break;
  result++;
}
console.log(result);
