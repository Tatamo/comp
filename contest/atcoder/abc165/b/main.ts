import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const x = BigInt(input[0]);

let current = 100n;
let result = 0;
while(current<x){
	current *= 101n;
	current /= 100n;
	result++;
}

console.log(result);
