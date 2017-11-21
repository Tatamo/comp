"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
const a = new Array(26).fill(0);
for (let c of s) {
    a[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
}
let flg = false;
for (let i = 0; i < 26; i++) {
    if (a[i] === 0) {
        console.log(String.fromCharCode("a".charCodeAt(0) + i));
        flg = true;
        break;
    }
}
if (!flg) {
    console.log("None");
}
