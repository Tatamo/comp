import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, s] = input[0].split(" ").map((x: string): number => +x);
const a = input[1].split(" ").map((x: string): number => +x);

const dp = new Array<Array<number>>();
for (let i = 0; i <= n; i++) {
	dp.push([]);
}

for (let x = 0; x <= s; x++) {
	dp[0][x] = 0;
}

for (let i = 1; i <= n; i++) {
	dp[i][0] = 0;
}

for (let i = 1; i <= n; i++) {
	for (let x = 0; x <= s; x++) {
		dp[i][x] = dp[i - 1][x] + dp[i - 1][Math.max(0, x - a[i - 1])] + (a[i - 1] === x ? 1 : 0);
	}
}

// f0r[r] = f(0,r)
/*
const f0r: Array<number> = new Array(n + 1);
f0r[0] = 0;
for (let i = 1; i <= n; i++) {
	f0r[i] = f0r[i - 1] + dp[i][s];
}
*/
const f0r: Array<number> = [];
for (let i = 0; i <= n; i++) {
	f0r.push(dp[i][s]);
}

let result = 0;
for (let l = 1; l <= n; l++) {
	for (let r = l; r <= n; r++) {
		result += f0r[r] - f0r[l-1];
		console.log(f0r[r] ,f0r[l], f0r[r] - f0r[l-1]);
	}
}

console.log(JSON.stringify(dp, undefined, 0));
console.log(result);
