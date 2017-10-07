import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b, c, d] = input[0].split(" ").map((x: string): number => +x);

console.log(a * 1728 + b * 144 + c * 12 + d);
