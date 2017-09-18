declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const a = [];
for(let i=0;i<n;i++){
	a.push(input[i].split(" ").map((x:string):number=>+x));
}

console.log(input);