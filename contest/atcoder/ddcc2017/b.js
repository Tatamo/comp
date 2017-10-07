"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [a, b, c, d] = input[0].split(" ").map((x) => +x);
console.log(a * 1728 + b * 144 + c * 12 + d);
