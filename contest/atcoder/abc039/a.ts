import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");

const [a, b, c] = input[0].split(" ").map((x: string): number => +x);

console.log((a*b+b*c+c*a)*2);
