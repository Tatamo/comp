import * as fs from "fs";
const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const a = input[0].split("").map(x => +x);

const divisor = 2019;

let result = 0;
let prev = new Array<number>(divisor).fill(0);
let curr = new Array<number>(divisor).fill(0);
for (let i = 0; i < a.length; i++) {
	curr[a[i]]++;
	if (i !== 0) {
		for (let ii = 0; ii < divisor; ii++) {
			if (prev[ii] === 0) continue;
			const rem = (ii * 10 + a[i]) % divisor;
			curr[rem] += prev[ii];
		}
	}
	result += curr[0];
	prev = curr;
	curr = new Array<number>(divisor).fill(0);
}
console.error(prev);

/*
const dp = new Array<Array<number>>();
for (let i = 0; i < a.length; i++) {
	dp.push(new Array<number>(divisor).fill(0));
}

for (let i = 0; i < a.length; i++) {
	dp[i][a[i]]++;
	if (i === 0) continue;
	for (let ii = 0; ii < divisor; ii++) {
		if (dp[i - 1][ii] === 0) continue;
		const rem = (ii * 10 + a[i]) % divisor;
		dp[i][rem] += dp[i - 1][ii];
	}
}

let result = 0;
for (let i = 0; i < a.length; i++) {
	result += dp[i][0];
}
*/
console.log(result);
