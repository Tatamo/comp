import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const x = +input[0];

console.log(Math.floor(x / 500) * 1000 + Math.floor((x % 500) / 5) * 5);
