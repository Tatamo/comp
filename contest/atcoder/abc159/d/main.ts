import * as fs from "fs";

function calcCombination(n: number) {
	return n * (n - 1) / 2;
}

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a = input[1].split(" ").map((x: string): number => +x);

const dict: Array<number> = [];
for (const ball of a) {
	if (dict[ball] === undefined) dict[ball] = 0;
	dict[ball] += 1;
}

// pre-calc
const combinations = new Array(n + 1);
for (const value of dict) {
	if (value === undefined) continue;
	if (combinations[value] === undefined) {
		combinations[value] = calcCombination(value);
	}
	if (combinations[value - 1] === undefined) {
		combinations[value - 1] = calcCombination(value - 1);
	}
}

let all_sum = 0;
for (const value of dict) {
	if(value === undefined) continue;
	all_sum += combinations[value];
}

for (let i = 0; i < n; i++) {
	const count: number = dict[a[i]];
	const ans = all_sum - combinations[count] + combinations[count - 1];
	console.log(ans);
}
