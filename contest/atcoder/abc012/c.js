"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
for (let i = 1; i <= 9; i++) {
    for (let ii = 1; ii <= 9; ii++) {
        if (n + i * ii === 2025) {
            console.log(`${i} x ${ii}`);
        }
    }
}
