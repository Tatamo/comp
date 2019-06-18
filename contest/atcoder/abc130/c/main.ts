import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [w, h, x, y] = input[0].split(" ").map((x: string): number => +x);

// 重心を求める
const cx = w/2;
const cy = h/2;

let pattern = 0;
if(cx===x && cy===y){
  // 重心と与えられた点が一致する場合は分割方法は無数にある
  pattern = 1;
}

console.log(w*h/2, pattern);
