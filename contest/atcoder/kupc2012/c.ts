import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, k] = input[0].split(" ").map((x: string): number => +x);
const b = [];
for (let i = 0; i < k; i++) {
	b.push(input[i + 1].split(" ").map((x: string): number => +x).slice(1));
}

const r = +input[k + 1];
const bad: Array<Array<boolean>> = [];
for (let i = 0; i <= n; i++) {
	bad.push(new Array(n + 1).fill(false));
}
for (let i = 0; i < r; i++) {
	const [p, q] = input[k + 2 + i].split(" ").map((x: string): number => +x);
	bad[p][q] = true;
	bad[q][p] = true;
}

const feel_bad = new Array<boolean>(n + 1).fill(false);
for (const boat of b) {
	const len = boat.length;
	for (let i = 0; i < len; i++) {
		for (let ii = 0; ii < len; ii++) {
			if (bad[boat[i]][boat[ii]]) {
				feel_bad[boat[i]] = true;
				feel_bad[boat[ii]] = true;
				break;
			}
		}
	}
}

let result = 0;
for (let i = 0; i <= n; i++) if (feel_bad[i]) result += 1;

console.log(result);
