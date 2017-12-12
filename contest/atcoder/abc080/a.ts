import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, a, b] = input[0].split(" ").map((x: string): number => +x);

console.log(Math.min(n*a,b));
