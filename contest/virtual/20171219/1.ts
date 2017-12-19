// https://not-522.appspot.com/contest/6038450935431168
import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [a, b] = input[0].split(" ").map((x: string): number => +x);

console.log(Math.ceil((a + b) / 2));
