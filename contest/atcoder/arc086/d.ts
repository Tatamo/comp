import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a: Array<number> = input[1].split(" ").map((x: string): number => +x);

let min = Infinity;
let min_i = -1;
let max = -Infinity;
let max_i = -1;
for (let i = 0; i < n; i++) {
	if (a[i] < min) {
		min = a[i];
		min_i = i;
	}
	if (a[i] > max) {
		max = a[i];
		max_i = i;
	}
}

let positive = true;
if (max < 0) positive = false;
else if (min < 0) {
	if (-min > max) positive = false;
}

const result = [];

if (positive && min < 0) {
	for (let i = 0; i < n; i++) {
		if (a[i] < 0) {
			a[i] += max;
			result.push([max_i, i]);
		}
	}
}

else if (!positive && max > 0) {
	for (let i = 0; i < n; i++) {
		if (a[i] > 0) {
			a[i] += min;
			result.push([min_i, i]);
		}
	}
}

console.error(a);

if (positive) {
	for (let i = 1; i < n; i++) {
		if (a[i - 1] <= a[i]) continue;
		a[i] += a[i - 1];
		result.push([i - 1, i]);
	}
}

else {
	for (let i = n - 2; i >= 0; i--) {
		if (a[i] <= a[i + 1]) continue;
		a[i] += a[i + 1];
		result.push([i + 1, i]);
	}
}

console.log(result.length);
for (let p of result) {
	console.log(p[0] + 1, p[1] + 1);
}

console.error(a);