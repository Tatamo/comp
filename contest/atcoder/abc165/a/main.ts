import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const k = +input[0];
const [a, b] = input[1].split(" ").map((x: string): number => +x);

let result = false;
for (let i = a; i <= b; i++) {
	if (i % k === 0) result = true;
}

console.log(result ? "OK" : "NG");
