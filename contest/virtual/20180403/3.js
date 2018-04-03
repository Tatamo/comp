"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const a = input[1].split(" ").map((x) => +x);
a.unshift(0);
a.push(0);
const dist = (a, b) => {
    return Math.abs(a - b);
};
let sum = 0;
for (let i = 0; i < a.length - 1; i++) {
    sum += dist(a[i], a[i + 1]);
}
for (let i = 1; i <= n; i++) {
    const prev = a[i - 1];
    const mid = a[i];
    const next = a[i + 1];
    const original_cost = dist(next, mid) + dist(mid, prev);
    const new_cost = dist(next, prev);
    console.log(sum - (original_cost - new_cost));
}
