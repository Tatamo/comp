"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, a, b] = input[0].split(" ").map((x) => +x);
console.log(Math.min(n * a, b));
