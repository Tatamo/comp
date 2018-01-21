import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];

interface Query {
	t: number;
	x: number;
	y: number;
}

const q: Array<Query> = [];
for (let i = 0; i < n; i++) {
	const [t, x, y] = input[i + 1].split(" ").map((x: string): number => +x);
	q.push({t, x, y});
}

let current_t = 0;
let pos_x: number = 0;
let pos_y: number = 0;

console.log((() => {
	for (const {t, x, y} of q) {
		const dist = Math.abs(x - pos_x) + Math.abs(y - pos_y);
		const dt = t - current_t;
		if (dist > dt) {
			return false;
		}
		else if (dist % 2 !== t % 2) {
			return false;
		}
	}
	return true;
})() ? "Yes" : "No");
