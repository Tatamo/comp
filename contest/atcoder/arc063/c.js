"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
let c = s[0];
let result = 0;
for (let i = 0; i < s.length; i++) {
    if (c !== s[i]) {
        result += 1;
        c = s[i];
    }
}
console.log(result);
