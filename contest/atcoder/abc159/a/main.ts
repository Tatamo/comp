import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);

let result = 0;
if (n >= 2) {
	result += n * (n - 1) / 2;
}
if (m >= 2) {
	result += m * (m - 1) / 2;
}
console.log(result);
