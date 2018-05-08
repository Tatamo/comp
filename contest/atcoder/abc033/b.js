"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
// const [n] = input[0].split(" ").map((x: string): number => +x);
const a = [];
for (let i = 0; i < n; i++) {
    const [_0, _1] = input[i + 1].split(" ");
    a.push([_0, +_1]);
}
let max = -Infinity;
let result = "";
let sum = 0;
for (const [name, pop] of a) {
    if (pop > max) {
        max = pop;
        result = name;
    }
    sum += pop;
}
if (max * 2 <= sum)
    result = "atcoder";
console.log(result);
