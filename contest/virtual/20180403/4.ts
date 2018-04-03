import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b] = input[0].split(" ").map((x: string): number => +x);

const h = 100;
const w = 100;

const larger = a > b ? 1 : 0;
const s = Math.min(a, b);
const d = Math.abs(a - b);

const ans: Array<Array<0 | 1>> = new Array(h).fill([]).map(() => new Array(w).fill(-1 * (larger - 1)));

let cnt = 0;
let cnt_row = 0;
let x = 0;
let y = 0;

let flip = larger === 0;
let flg_terminal = false;
let remain = Math.max(a, b);

// よくわからないがこれを入れるとうまくいく
if (Math.min(a,b) >= 101 && Math.min(a, b) % 100 === 1) remain--;

if (s > 1) {
	while (true) {
		if (!flg_terminal) {
			if (flip) {
				ans[y][x] = 1;
				ans[y][x + 1] = 0;
				if (!flg_terminal && larger === 0) cnt_row++;
			}
			else {
				ans[y][x] = 0;
				ans[y][x + 1] = 1;
				if (!flg_terminal && larger === 1) cnt_row++;
			}
		}
		else {
			ans[y][x] = larger;
			ans[y][x + 1] = larger;
			if (x - 1 >= 0 && ans[y][x - 1] === larger) remain++;
		}
		if (cnt < s - 1) cnt++;
		if (cnt === s - 1) {
			if (!flg_terminal && ans[y][x] === larger) remain++;
			flg_terminal = true;
			if (y === h - 1) break;
		}
		if (!flg_terminal) flip = !flip;

		y += 1;
		if (y >= h) {
			cnt_row = 0;
			y = 0;
			x += 2;
		}
	}
	y = 0;
	x += 2;
}
while (y < h) {
	ans[y++][x] = larger;
}
y = 0;
x += 2;


remain = remain - (s - 1) + (cnt_row - 1);

// console.error(`${larger}(${["B:#", "A:."][larger]})`, s, cnt_row, remain);

while (remain > 0) {
	ans[y][x] = larger;
	remain--;
	y += 2;
	if (y >= h) {
		y = 0;
		x += 2;
	}
}

console.log(h, w);
for (const row of ans) {
	let line = "";
	for (const v of row) {
		if (v === 1) {
			line += ".";
		}
		else {
			line += "#";
		}
	}
	console.log(line);
}

const ans_checker = (ans: Array<Array<0 | 1>>, h: number, w: number) => {
	const checked: Array<Array<boolean>> = new Array(h).fill([]).map(() => new Array(w).fill(false));
	const fill = (y: number, x: number, color: number): boolean => {
		if (ans[y][x] !== color) return false;
		if (checked[y][x]) return false;
		checked[y][x] = true;
		const dx = [-1, 1, 0, 0];
		const dy = [0, 0, -1, 1];
		for (let i = 0; i < 4; i++) {
			const ny = y + dy[i];
			const nx = x + dx[i];
			if (ny < 0 || ny >= h || nx < 0 || nx >= h) continue;
			fill(ny, nx, color);
		}
		return true;
	};
	const islands = [0, 0];
	for (let i = 0; i < h; i++) {
		for (let ii = 0; ii < w; ii++) {
			const c = ans[i][ii];
			if (fill(i, ii, c)) islands[c]++;
		}
	}
	console.error(`A: ${islands[1]}, B:${islands[0]}`);
	return islands;
};

/*
try {
	ans_checker(ans, h, w);
}
catch {

}
*/

