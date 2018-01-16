"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, t, e] = input[0].split(" ").map((x) => +x);
const x = input[1].split(" ").map((x) => +x);
let flg_found = false;
for (let i = 0; i < n; i++) {
    if (t % x[i] <= e || -(t % x[i] - x[i]) <= e) {
        console.log(i + 1);
        flg_found = true;
        break;
    }
}
if (!flg_found)
    console.log(-1);
