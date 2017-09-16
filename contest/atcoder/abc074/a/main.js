var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const n = +input[0];
const a = +input[1];
console.log(n * n - a);
