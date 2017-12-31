import * as fs from "fs";

// UNDONE

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [h, w, n] = input[0].split(" ").map((x: string): number => +x);
const a = [];
for (let i = 0; i < n; i++) {
	a.push(input[i + 1].split(" ").map((x: string): number => +x - 1));
}

const pos2index = (x: number, y: number): number => {
	if (x < 0 || x >= w || y < 0 || y >= h) {
		return -1;
	}
	return y * n + x;
};

const index2pos = (i: number): { x: number, y: number } => {
	return {x: i % w, y: Math.floor(i / w)};
};

const map = new Map<number, number>();
for (const [y, x] of a) {
	for (let i = -1; i <= 1; i++) {
		for (let ii = -1; ii <= 1; ii++) {
			const fx = x + i;
			const fy = y + ii;
			if (fx <= 0 || fx >= w - 1 || fy <= 0 || fy >= h - 1) continue;
			const index = pos2index(fx, fy);
			if (index >= 0) {
				if (map.has(index)) {
					map.set(index, map.get(index)! + 1);
				}
				else {
					map.set(index, 1);
				}
			}
		}
	}
}

const result = new Array(10).fill(0);
let sum = 0;
for (const [index, value] of map) {
	const {x, y} = index2pos(index);
	console.error(`${x},${y} => ${value}`);
	// if (x <= 0 || x >= w - 1 || y <= 0 || y >= h - 1) continue;
	result[value] += 1;
	sum += 1;
}
result[0] = (h - 2) * (w - 2) - sum; // ここで最大の整数の範囲を超えるのでだめ

console.log(result);
