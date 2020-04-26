import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a = new Set();
for (let i = 0; i < n; i++) {
	a.add(input[i + 1]);
}

console.log(a.size);
