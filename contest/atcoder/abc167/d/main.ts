import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0].split(" ")[0];
let _k = BigInt(input[0].split(" ")[1]);
const a = input[1].split(" ").map((x: string): number => (+x) - 1);

let current = 0;
const visited = new Map();
let count = 0;
while (!visited.has(current)) {
	visited.set(current, count);
	current = a[current];
	count++;
}
const d = BigInt(visited.get(current)!);
const loop_length = BigInt(count) - d;
const k = _k < d + loop_length ? Number(_k) : Number(d + ((_k - d) % loop_length));
current = 0;
for (let i = 0; i < k; i++) {
	current = a[current];
}
console.log(current + 1);
