"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
// const [n] = input[0].split(" ").map((x: string): number => +x);
const a = [];
for (let i = 0; i < n; i++) {
    a.push(input[i + 1].split(" ").map((x) => +x));
}
console.log(input);
