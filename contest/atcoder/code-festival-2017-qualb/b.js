"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const d = input[1].split(" ").map((x) => +x);
const m = +input[2];
const t = input[3].split(" ").map((x) => +x);
const compare = (a, b) => a - b;
d.sort(compare);
t.sort(compare);
let ii = 0;
for (let i = 0; i < n; i++) {
    if (d[i] == t[ii]) {
        ii += 1;
    }
}
if (ii == m)
    console.log("YES");
else
    console.log("NO");
