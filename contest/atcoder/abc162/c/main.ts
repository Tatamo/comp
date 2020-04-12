import * as fs from "fs";

const memo: Array<Array<number>> = [];
function gcd(x: number, y: number): number {
	if (y === 0) return x;
	if (memo[y] === undefined) memo[y] = [];
	if (memo[y][x] === undefined) {
		return memo[y][x] = gcd(y, x % y);
	}
	return memo[y][x];
}
const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const k = +input[0];

let result = 0;
for (let a = 1; a <= k; a++) {
	for (let b = 1; b <= k; b++) {
		const temp = gcd(Math.max(a, b), Math.min(a, b));
		for (let c = 1; c <= k; c++) {
			result += gcd(Math.max(temp, c), Math.min(temp, c));
		}
	}
}
console.log(result);
