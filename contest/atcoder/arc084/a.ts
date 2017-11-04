import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a = input[1].split(" ").map((x: string): number => +x);
const b = input[2].split(" ").map((x: string): number => +x);
const c = input[3].split(" ").map((x: string): number => +x);

const cmp = (a: number, b: number):number => a - b;
a.sort(cmp);
b.sort(cmp);
c.sort(cmp);

const dp = new Array<number>(n); // dp[i]: Biを用いた場合のB,Cのパターン数

let ic=n;
for(let i=n-1; i>=0; i--){
	while(ic-1 >= 0 && c[ic-1] > b[i]) ic--;
	if(i==n-1) dp[i] = n-ic;
	else dp[i] = dp[i+1]+n-ic;
}

let result = 0;
let ib = 0;
for(let i=0; i<n; i++){
	while(ib<n && b[ib] <= a[i]) ib++;
	if(ib>=n) break;
	result += dp[ib];
}

console.log(result);
