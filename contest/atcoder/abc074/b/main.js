var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const n = +input[0];
const k = +input[1];
const x = input[2].split(" ").map((x) => +x);
let result = 0;
for (const a of x) {
    result += Math.min(a, Math.abs(a - k)) * 2;
}
console.log(result);
