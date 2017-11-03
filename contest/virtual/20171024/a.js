"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const k = +input[1];
console.log((k <= (n / 2)) ? "YES" : "NO");
