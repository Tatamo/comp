import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m, a, b] = input[0].split(" ").map((x: string): number => +x);

type Tile = "." | "<" | ">" | "v" | "^";
const map: Array<Array<Tile>> = new Array(n).fill([]).map(() => new Array(m).fill("."));

const _a = Math.max(0, a - (n % 2 === 1 ? Math.floor(m / 2) : 0));
const _b = Math.max(0, b - (m % 2 === 1 ? Math.floor(n / 2) : 0));

const l = Math.floor(n / 2) * Math.floor(m / 2);
const is_odd = n % 2 === 1 && m % 2 === 1;

console.error(input[0]);
console.error(_a, _b);
console.error(_a - _a % 2 + _b - _b % 2 + _a % 2 * 2 + _b % 2 * 2, l);

let flg_yes = false;
// ^<>
// v.^
// <>v
// の並びを使うかどうか
let need_ex = false;
if (is_odd) {
	if (_a + _b <= l * 2) {
		flg_yes = true;
		if (_a - _a % 2 + _b - _b % 2 + _a % 2 * 2 + _b % 2 * 2 > l * 2) {
			need_ex = true;
		}
	}
}
else {
	if (_a - _a % 2 + _b - _b % 2 + _a % 2 * 2 + _b % 2 * 2 <= l * 2) {
		flg_yes = true;
	}
}
console.error(flg_yes, need_ex);
if (!flg_yes) {
	console.log("NO");
}
else {
	let blocks = l;
	let ra = a;
	let rb = b;
	if (n % 2 === 1) {
		for (let i = 0; i + 1 < m && ra > 0; i += 2) {
			// for (let i = m - 3; i >= 0 && ra > 0; i -= 2) {
			map[n - 1][i] = "<";
			map[n - 1][i + 1] = ">";
			ra -= 1;
		}
	}
	if (m % 2 === 1) {
		for (let i = 0; i + 1 < n && rb > 0; i += 2) {
			// for (let i = n - 3; i >= 0 && rb > 0; i -= 2) {
			map[i][m - 1] = "^";
			map[i + 1][m - 1] = "v";
			rb -= 1;
		}
	}
	let x = 0;
	let y = 0;
	if (need_ex) {
		while (ra > 1 || rb > 1) {
			if (ra > 1) {
				map[y][x] = "<";
				map[y][x + 1] = ">";
				ra -= 1;
				if (ra > 0) {
					map[y + 1][x] = "<";
					map[y + 1][x + 1] = ">";
					ra -= 1;
				}
			}
			else {
				map[y][x] = "^";
				map[y + 1][x] = "v";
				rb -= 1;
				if (rb > 0) {
					map[y][x + 1] = "^";
					map[y + 1][x + 1] = "v";
					rb -= 1;
				}
			}
			if (x + 3 < m) {
				x += 2;
			}
			else if (y + 3 < n) {
				y += 2;
				x = 0;
			}
			else {
				break;
			}
		}
		map[n - 3][m - 3] = "<";
		map[n - 3][m - 2] = ">";
		map[n - 3][m - 1] = "^";
		map[n - 2][m - 3] = "^";
		map[n - 2][m - 2] = ".";
		map[n - 2][m - 1] = "v";
		map[n - 1][m - 3] = "v";
		map[n - 1][m - 2] = "<";
		map[n - 1][m - 1] = ">";
	}
	else {
		while (ra > 0 || rb > 0) {
			if (ra > 0) {
				map[y][x] = "<";
				map[y][x + 1] = ">";
				ra -= 1;
				if (ra > 0) {
					map[y + 1][x] = "<";
					map[y + 1][x + 1] = ">";
					ra -= 1;
				}
			}
			else {
				map[y][x] = "^";
				map[y + 1][x] = "v";
				rb -= 1;
				if (rb > 0) {
					map[y][x + 1] = "^";
					map[y + 1][x + 1] = "v";
					rb -= 1;
				}
			}
			if (x + 3 < m) {
				x += 2;
			}
			else if (y + 3 < n) {
				y += 2;
				x = 0;
			}
			else {
				break;
			}
		}
	}
	console.log("YES");
	for (const row of map) {
		console.log(row.join(""));
	}
}
