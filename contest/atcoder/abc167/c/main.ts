import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m, x] = input[0].split(" ").map((x: string): number => +x);
const a = [];
for (let i = 0; i < n; i++) {
	a.push(input[i + 1].split(" ").map((x: string): number => +x));
}


let min_cost = Infinity;
for (let b = 1; b < 1 << n; b++) {
	let cost = 0;
	const u = new Array(m).fill(0);
	for (let i = 0; i < n; i++) {
		if ((b & (1 << i)) > 0) {
			for (let ii = 0; ii < m; ii++) {
				u[ii] += a[i][ii + 1];
			}
			cost += a[i][0];
		}
	}
	if (u.every(v => v >= x) && cost < min_cost) {
		min_cost = cost;
	}
}

console.log(min_cost === Infinity ? -1 : min_cost);
