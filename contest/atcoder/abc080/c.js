"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const f = [];
for (let i = 0; i < n; i++) {
    f.push(Number.parseInt(input[i + 1].replace(/\s/g, ""), 2));
}
const p = [];
for (let i = 0; i < n; i++) {
    p.push(input[i + n + 1].split(" ").map((x) => +x));
}
const bitCount = (i) => {
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
};
let result = -Infinity;
for (let time = 1; time < 0b10000000000; time++) {
    let profit = 0;
    for (let i = 0; i < n; i++) {
        const ci = bitCount(f[i] & time);
        profit += p[i][ci];
    }
    if (profit > result) {
        result = profit;
    }
}
console.log(result);
