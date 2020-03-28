import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [k, n] = input[0].split(" ").map((x: string): number => +x);
const a = input[1].split(" ").map((x: string): number => +x);

let sum = 0;
let prev = k + a[0];
let max_d = 0;
for (let i = n - 1; i >= 0; i--) {
	const d = prev - a[i]
	sum += d;
	if (d > max_d) max_d = d;
	prev = a[i];
}

console.log(sum - max_d);
