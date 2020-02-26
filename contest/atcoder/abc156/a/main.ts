import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, r] = input[0].split(" ").map((x: string): number => +x);

console.log(r + 100 * Math.max(0, 10 - n));
