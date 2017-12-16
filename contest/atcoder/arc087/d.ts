import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");

const F = "F";
const T = "T";
const s: Array<"F" | "T"> = input[0].split("") as Array<"F" | "T">;
let [x, y] = input[1].split(" ").map((x: string): number => +x);

while (s.length > 0 && s[0] === F) {
	s.shift();
	x -= 1;
}

let dir = true; // true:x, false:y

type Query = { dir: boolean, dist: number };
const q: Array<Query> = [];
let dist = 0;
let prev: "F" | "T" = T;

let i = 0;
while (i < s.length) {
	while (i < s.length && s[i] === T) {
		dir = !dir;
		i++;
	}
	while (i < s.length && s[i] === F) {
		dist += 1;
		i++;
	}
	q.push({dir, dist});
	dist = 0;
}

const qx = q.filter((q) => q.dir).sort((a, b) => a.dist - b.dist).map((q) => q.dist);
const qy = q.filter((q) => !q.dir).sort((a, b) => a.dist - b.dist).map((q) => q.dist);

const lim_x = qx.reduce((a, b) => a + b, 0);
const lim_y = qy.reduce((a, b) => a + b, 0);

const dpx = new Array<Array<boolean>>();
for (let i = 0; i <= qx.length; i++) {
	dpx.push(new Array<boolean>(lim_x * 2 + 1).fill(false));
}
const dpy = new Array<Array<boolean>>();
for (let i = 0; i <= qy.length; i++) {
	dpy.push(new Array<boolean>(lim_y * 2 + 1).fill(false));
}

dpx[0][lim_x] = true;
dpy[0][lim_y] = true;

for (let i = 0; i < qx.length; i++) {
	for (let ii = 0; ii <= lim_x * 2; ii++) {
		if (dpx[i][ii]) {
			dpx[i + 1][ii - qx[i]] = dpx[i + 1][ii + qx[i]] = true;
		}
	}
}

for (let i = 0; i < qy.length; i++) {
	for (let ii = 0; ii <= lim_y * 2; ii++) {
		if (dpy[i][ii]) {
			dpy[i + 1][ii - qy[i]] = dpy[i + 1][ii + qy[i]] = true;
		}
	}
}

if (dpx[qx.length][x + lim_x] && dpy[qy.length][y + lim_y]) console.log("Yes");
else console.log("No");
