import * as fs from "fs";
let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m, k] = input[0].split(" ").map((x: string): number => +x);

let flg_yes = false;
top:
for (let h = 0; h <= n; h++) {
	for (let w = 0; w <= m; w++) {
		const num = h*m+w*n-h*w*2;
		if(num == k) {
			flg_yes = true;
			break top;
		}
	}
}

if(flg_yes) console.log("Yes");
else console.log("No");
