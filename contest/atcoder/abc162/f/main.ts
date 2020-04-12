import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a = input[1].split(" ").map((x: string): number => +x);

let result = -Infinity;
if (n % 2 === 0) {
	for (let b = 0; b <= 1; b++) {
		let sum = 0;
		for (let i = b; i < n; i += 2) {
			sum += a[i];
		}
		if (sum > result) result = sum;
	}
}
else {
	const rsw_r = new Array<number>(n + 1);
	rsw_r[n] = 0;
	rsw_r[n - 1] = a[n - 1];
	for (let i = n - 2; i >= 0; i--) {
		rsw_r[i] = rsw_r[i + 2] + a[i];
	}

	const diff_r = new Array<number>(n + 1);
	diff_r[n] = 0;
	for (let i = n - 1; i >= 0; i--) {
		diff_r[i] = rsw_r[i + 1] - rsw_r[i];
	}

	const diff_max_r = new Array<number>(n + 1);
	diff_max_r[n] = 0;
	diff_max_r[n - 1] = diff_r[n - 1];
	for (let i = n - 2; i >= 0; i--) {
		diff_max_r[i] = Math.max(diff_max_r[i + 2], diff_r[i]);
	}

	console.error(rsw_r);
	console.error(diff_r);
	console.error(diff_max_r);
	for (let i = 0; i < n; i += 2) {
		let tmp = rsw_r[0] + diff_r[i] + diff_max_r[i + 1];
		console.error(i, rsw_r[0] + diff_r[i], tmp);
		if (tmp > result) result = tmp;
	}
}

console.log(result);
