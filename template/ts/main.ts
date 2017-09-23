declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const n = +input[0];
const a = [];
for(let i=0;i<n;i++){
	a.push(input[i+1].split(" ").map((x:string):number=>+x));
}

console.log(input);