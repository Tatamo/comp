import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
let line = 0;
const t = +input[line++];

type Cake = { r: number, h: number };

const solve = (problem_number: number, k: number, n: number, cakes: Array<Cake>) => {
	cakes.sort((a, b) => a.r !== b.r ? a.r - b.r : a.h - b.h);
	const _cakes = [...cakes];
	let result = -Infinity;
	for (let i = k - 1; i < n; i++) {
		cakes = [..._cakes];
		const largest = cakes.splice(i, 1)[0];

		cakes.sort((a, b) => a.r * a.h - b.r * b.h);

		const selected: Array<Cake> = [largest];
		for (let ii = 0; ii < k - 1; ii++) selected.push(cakes.pop()!);
		let ans = largest.r * largest.r;
		for (const {r, h} of selected) {
			ans += 2 * r * h;
		}
		ans *= Math.PI;
		if (ans > result) result = ans;
	}
	console.log(`Case #${problem_number + 1}: ${result}`);
};

for (let i = 0; i < t; i++) {
	const [n, k] = input[line++].split(" ").map((x: string): number => +x);
	const cakes: Array<Cake> = [];
	for (let ii = 0; ii < n; ii++) {
		const [r, h] = input[line++].split(" ").map((x: string): number => +x);
		cakes.push({r, h});
	}
	// console.log(i, k, n, cakes);
	solve(i, k, n, cakes);
}
