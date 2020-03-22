import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const l = +input[0];

console.log(Math.pow(l/3,3).toFixed(6));
