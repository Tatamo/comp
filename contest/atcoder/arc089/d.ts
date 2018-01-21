import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, k] = input[0].split(" ").map((x: string): number => +x);

interface Point {
	x: number;
	y: number;
	c: string;
}

const p: Array<Point> = [];
for (let i = 0; i < n; i++) {
	const [_x, _y, c] = input[i + 1].split(" ");
	p.push({x: +_x, y: +_y, c});
}

interface Rect {
	x: number;
	y: number;
}

const areas: Array<Rect> = [];
for (let {x, y, c} of p) {
	if (c === "W") x += k;
	x = x % (2 * k);
	y = y % (2 * k);
	for (let i = 0; i < 4; i++) {
		for (let ii = 0; ii < 4; ii++) {
			if ((i + ii) % 2 !== 0) continue;
			areas.push({x: x + ii * k, y: y + i * k});
		}
	}
}
const rsw: Array<Array<number>> = []; // ruisekiwa
for (let i = 0; i < 4 * k; i++) {
	rsw.push(new Array(4 * k).fill(0));
}

for (let {x, y} of areas) {
	let r = x + k; // right
	let b = y + k; // bottom
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (y < 4 * k && x < 4 * k) rsw[y][x] += 1;
	if (y < 4 * k && r < 4 * k) rsw[y][r] -= 1;
	if (b < 4 * k && x < 4 * k) rsw[b][x] -= 1;
	if (b < 4 * k && r < 4 * k) rsw[b][r] += 1;
}

for (let y = 0; y < 4 * k; y++) {
	for (let x = 1; x < 4 * k; x++) {
		rsw[y][x] += rsw[y][x - 1];
	}
}

for (let y = 1; y < 4 * k; y++) {
	for (let x = 0; x < 4 * k; x++) {
		rsw[y][x] += rsw[y - 1][x];
	}
}

let result = 0;

for (let y = 2 * k; y < 4 * k; y++) {
	for (let x = 2 * k; x < 4 * k; x++) {
		if (rsw[y][x] > result) result = rsw[y][x];
	}
}

console.log(result);