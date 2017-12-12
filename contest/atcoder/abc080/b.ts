import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];
const n = +s;

let fx = 0;
for (const c of s) {
	fx += +c;
}

console.log((n % fx === 0) ? "Yes" : "No");
