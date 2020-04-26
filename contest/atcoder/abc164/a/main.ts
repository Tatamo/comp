import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [s, w] = input[0].split(" ").map((x: string): number => +x);

console.log(s <= w ? "unsafe" : "safe");
