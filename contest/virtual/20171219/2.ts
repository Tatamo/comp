import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a = input[1].split(" ").map((x: string): number => +x).sort((a, b) => a - b);

let current = 0;
let count = 0;
const r = [];
for (const v of a) {
	if (v === current) {
		count += 1;
	}
	else {
		r.push({value: current, count});
		current = v;
		count = 1;
	}
}
r.push({value: current, count});

let result = 0;
for (const p of r) {
	result += p.value <= p.count ? p.count - p.value : p.count;
}

console.log(result);

