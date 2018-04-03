"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const [d, x] = input[1].split(" ").map((x) => +x);
const a = [];
for (let i = 0; i < n; i++) {
    a.push(+input[i + 2]);
}
let sum = x;
for (const delta of a) {
    sum += 1 + Math.floor((d - 1) / delta);
}
console.log(sum);
