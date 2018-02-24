"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = input[0];
let top = -1;
for (let i = 0; i < n.length; i++) {
    if (n[i] !== "9") {
        top = Math.max(i - 1, 0);
        break;
    }
}
let result = 0;
for (let i = 0; i < n.length; i++) {
    if (i < top)
        result += +n[i];
    else if (i === top)
        result += +n[i] - 1;
    else
        result += 9;
}
let tmp = 0;
for (let i = 0; i < n.length; i++) {
    tmp += +n[i];
}
result = Math.max(result, tmp);
console.log(result);
