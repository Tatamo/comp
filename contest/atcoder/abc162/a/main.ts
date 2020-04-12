import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];

console.log(s.indexOf("7")!==-1?"Yes":"No");
