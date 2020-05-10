import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];
const t = input[1];

console.log(t.substring(0, t.length - 1) === s ? "Yes" : "No");
