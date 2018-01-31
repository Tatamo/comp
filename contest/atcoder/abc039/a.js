"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [a, b, c] = input[0].split(" ").map((x) => +x);
console.log((a * b + b * c + c * a) * 2);
