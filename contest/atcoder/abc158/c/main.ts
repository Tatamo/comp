import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b] = input[0].split(" ").map((x: string): number => +x);

const lb = Math.floor(Math.min(a / 0.08, b / 0.1)) - 1;
const ub = Math.floor(Math.max(a / 0.08, b / 0.1)) + 1;

let result = -1;
for (let i = lb; i <= ub; i++) {
	if (Math.floor(i * 0.08) === a && Math.floor(i * 0.1) === b) {
		result = i;
		break;
	}
}

console.log(result);
