import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const a = input.map((x: string): number => +x);
console.log(Math.min(a[0], a[1]) + Math.min(a[2], a[3]));
