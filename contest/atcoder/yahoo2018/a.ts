import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
console.log(/^yah(.)\1/.test(input[0]) ? "YES" : "NO");
