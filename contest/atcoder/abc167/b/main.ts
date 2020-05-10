import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b, c, k] = input[0].split(" ").map((x: string): number => +x);

console.log(a + b >= k ? Math.min(a, k) : a - (k - a - b));
