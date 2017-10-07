import * as fs from "fs";

var input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, c] = input[0].split(" ").map((x: string): number => +x);

const l = [];
for (let i = 0; i < n; i++) {
	l[i] = +input[i + 1];
}
l.sort((a, b) => a - b);

let left = 0;
let right = n - 1;
let d = 0;

while (left < right) {
	if (l[left] + l[right] + 1 <= c) {
		d += 1;
		left += 1;
		right -= 1;
	}
	else {
		right -= 1;
	}
}
console.log(n - d);
