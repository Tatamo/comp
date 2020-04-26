import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b, c, d] = input[0].split(" ").map((x: string): number => +x);
const hp = [a, c];
while (hp[0] > 0 && hp[1] > 0) {
	hp[1] -= b;
	hp[0] -= d;
}

if (hp[1] <= 0) {
	console.log("Yes");
} else {
	console.log("No");
}
