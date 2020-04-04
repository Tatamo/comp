import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);
const a = input[1].split(" ").map((x: string): number => +x);
a.sort((x, y) => y - x);
const sum = a.reduce((prev, curr) => prev + curr, 0);
const threshold = sum / (m * 4);
console.log(a[m - 1] >= threshold ? "Yes" : "No");
