import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b, n] = input[0].split(" ").map((x: string): number => +x);

const x = n < b ? n : b - 1;
console.log(Math.floor(x * a / b));
