"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = Number.parseInt(input[0], 10);
console.log(n % 1111 === 0 ? "SAME" : "DIFFERENT");
