// https://not-522.appspot.com/contest/5744513607794688
import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const k = +input[1];
console.log((k <= (n / 2))? "YES" : "NO");
