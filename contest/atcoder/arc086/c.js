"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, k] = input[0].split(" ").map((x) => +x);
const a = input[1].split(" ").map((x) => +x).sort((a, b) => a - b);
const m = new Map();
for (const v of a) {
    if (!m.has(v)) {
        m.set(v, 1);
    }
    else {
        m.set(v, m.get(v) + 1);
    }
}
const z = Array.from(m.entries()).sort((a, b) => a[1] - b[1]);
let s = m.size; // syurui
let result = 0;
for (const [non_used, v] of z) {
    if (s <= k)
        break;
    result += v;
    s -= 1;
}
console.log(result);
