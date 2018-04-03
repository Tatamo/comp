import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [x, k] = input[0].split(" ").map((x: string): number => +x);

let result = (Math.floor(x * Math.pow(0.1, k))+1)*Math.pow(10,k);

console.log(result);
