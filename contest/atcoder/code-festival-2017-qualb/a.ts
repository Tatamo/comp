import * as fs from "fs";

var input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
console.log(input[0].substring(0, input[0].length - 8));
