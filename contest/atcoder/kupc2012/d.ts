import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);

interface Prof {
	l: number;
	r: number;
}

const p: Array<Prof> = [];
for (let i = 0; i < m; i++) {
	const [l, r] = input[i + 1].split(" ").map((x: string): number => +x);
	p.push({l, r});
}

p.sort((a: Prof, b: Prof) => {
	if (a.l !== b.l) return a.l - b.l;
	return a.r - b.r;
});

let covered = 0;
let index = -1;
let tmp_p = null;
let result = 0;
let flg_failed = false;
while (true) {
	for (let i = index + 1; i < m; i++) {
		if (p[i].l > covered + 1) break;
		if (tmp_p === null || p[i].r > tmp_p.r) {
			tmp_p = p[i];
			index = i;
		}
	}
	if (tmp_p === null) {
		flg_failed = true;
		break;
	}
	covered = tmp_p.r;
	result += 1;
	if (covered >= n) break;
	if (index >= m - 1 && tmp_p.r < n) {
		flg_failed = true;
		break;
	}
	tmp_p = null;
}

if (flg_failed) {
	console.log("Impossible");
}
else {
	console.log(result);
}
