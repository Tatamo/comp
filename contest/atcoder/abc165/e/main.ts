import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);

let sep = Math.floor(n / 2) + (n % 2 === 1 && ((n - 1) / 2) % 2 === 1 ? 1 : 0);

let cnt = 0;

let l_right = sep - 1;
if (l_right % 2 === 0) l_right -= 1;
for (let i = 0; i < l_right - i && cnt < m; i++) {
	console.log(`${i + 1} ${l_right - i + 1}`);
	cnt++;
}

let r_left = sep;
let r_right = n - 1;
if ((r_right - r_left) % 2 === 1) r_right -= 1;

for (let i = 0; r_left + i < r_right - i && cnt < m; i++) {
	console.log(`${r_left + i + 1} ${r_right - i + 1}`);
	cnt++;
}
