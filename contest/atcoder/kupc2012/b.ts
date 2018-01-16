import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const l = input[0][0];
const r = input[0][input[0].length-1];
console.log(r==="x"&&l==="x"?"x":"o");
