import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
// const [n] = input[0].split(" ").map((x: string): number => +x);
const a = [];
for(let i=0;i<n;i++){
	a.push(input[i+1].split(" ").map((x:string):number=>+x));
}

console.log(input);
