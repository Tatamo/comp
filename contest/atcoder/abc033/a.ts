import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = Number.parseInt(input[0], 10);
console.log(n % 1111 === 0 ? "SAME" : "DIFFERENT");
