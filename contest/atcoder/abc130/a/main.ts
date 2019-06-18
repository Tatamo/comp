import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [x, a] = input[0].split(" ").map((x: string): number => +x);
if(x<a) console.log(0);
else console.log(10);
