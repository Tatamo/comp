import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, c] = input[0].split(" ").map((x: string): number => +x);

type Program = { l: number, r: number, c: number };
const p: Array<Program> = [];
for (let i = 0; i < n; i++) {
	const [l, r, c] = input[i + 1].split(" ").map((x: string): number => +x);
	p.push({l, r, c});
}

p.sort((a: Program, b: Program) => {
	if (a.c !== b.c) return a.c - b.c;
	return a.l - b.l;
});

const v: Array<Program> = [];
for (let i = 0; i < n; i++) {
	if (i !== 0 && p[i - 1].c === p[i].c && p[i - 1].r === p[i].l) {
		v[v.length - 1].r = p[i].r;
	}
	else {
		v.push(p[i]);
	}
}

const rsw: Array<number> = new Array<number>(1e5 * 2 + 2).fill(0); // ruisekiwa

for (let i = 0; i < v.length; i++) {
	rsw[v[i].l * 2 - 1]++;
	rsw[v[i].r * 2]--;
}

let max = 0;
let tmp = 0;
for (let i = 0; i < rsw.length; i++) {
	tmp += rsw[i];
	if (max < tmp) max = tmp;
}
console.log(max);
