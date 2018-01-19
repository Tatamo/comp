import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, t] = input[0].split(" ").map((x: string): number => +x);
const a = input[1].split(" ").map((x: string): number => +x);

let min = Infinity;
let max_diff = -Infinity;
let count = 0;

for (const v of a) {
	if (v < min) min = v;
	if (v - min > max_diff) {
		max_diff = v - min;
		count = 1;
	}
	else if (v - min === max_diff) {
		count += 1;
	}
}

console.log(count);
