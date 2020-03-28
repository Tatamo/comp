import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];

console.log(s[2] === s[3] && s[4] === s[5] ? "Yes" : "No");
