"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [N] = input[0].split(" ").map((x) => +x);
top: for (let h = 1; h <= 3500; h++) {
    for (let n = 1; n <= 3500; n++) {
        const w = N * h * n / (4 * h * n - N * n - N * h);
        if (w > 0 && Number.isInteger(w)) {
            console.log(h, n, w);
            break top;
        }
    }
}
