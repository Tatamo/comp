import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
let result = 0
for(let i=1;i<=n;i++){
	if(i%3===0 || i%5===0)continue;
	result+=i;
}

console.log(result);
