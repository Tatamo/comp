import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];
let result = Infinity;
for (let i = 0; i + 2 < s.length; i++) {
  const tmp = Math.abs(+s.substring(i, i + 3) - 753);
  if (tmp < result) result = tmp;
}

console.log(result);
