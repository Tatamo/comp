"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const a0 = input[1].split(" ").map((x) => +x);
const a1 = input[2].split(" ").map((x) => +x);
const s0 = [];
for (let i = 0; i < n; i++) {
    if (i === 0)
        s0[i] = a0[i];
    else
        s0[i] = a0[i] + s0[i - 1];
}
const s1 = [];
for (let i = n - 1; i >= 0; i--) {
    if (i === n - 1)
        s1[i] = a1[i];
    else
        s1[i] = a1[i] + s1[i + 1];
}
let result = -1;
for (let i = 0; i < n; i++) {
    const sum = s0[i] + s1[i];
    if (sum > result)
        result = sum;
}
console.log(result);
