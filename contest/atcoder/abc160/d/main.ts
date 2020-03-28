import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, _x, _y] = input[0].split(" ").map((x: string): number => +x);
// 1-indexedを0-indexedに変換
const x = _x - 1;
const y = _y - 1;

function distance(i: number, j: number, { x, y }: { x: number, y: number }) {
	return Math.min(j - i, Math.abs(x - i) + Math.abs(y - j) + 1);
}

const result = new Array(n - 1).fill(0);
let cnt = 0;
for (let i = 0; i < n; i++) {
	for (let j = i + 1; j < n; j++) {
		result[distance(i, j, { x, y }) - 1]++;
		cnt++;
	}
}
console.log(result.join("\n"));
