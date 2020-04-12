import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const s = input[1];

const rsw_r = { R: new Array(n + 1), G: new Array(n + 1), B: new Array(n + 1) };
rsw_r["R"][n] = rsw_r["G"][n] = rsw_r["B"][n] = 0;
for (let i = n - 1; i >= 0; i--) {
	rsw_r["R"][i] = rsw_r["R"][i + 1];
	rsw_r["G"][i] = rsw_r["G"][i + 1];
	rsw_r["B"][i] = rsw_r["B"][i + 1];
	rsw_r[s[i] as "R" | "G" | "B"][i]++;
}

const patterns = ["RGB", "RBG", "GBR", "GRB", "BRG", "BGR"];

let result = 0;
for (const pt of patterns) {
	for (let i = 0; i < n; i++) {
		if (s[i] !== pt[0]) continue;
		for (let d = 1; i + d < n; d++) {
			if (s[i + d] !== pt[1]) continue;
			result += rsw_r[pt[2] as "R" | "G" | "B"][i + d];
			if (i + d + d < n && s[i + d + d] === pt[2]) result--;
		}
	}
}
console.log(result)