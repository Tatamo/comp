import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, p] = input[0].split(" ").map((x: string): number => +x);
const s = input[1];

console.log(input);
