"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
const n = +s;
let fx = 0;
for (const c of s) {
    fx += +c;
}
console.log((n % fx === 0) ? "Yes" : "No");
