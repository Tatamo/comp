"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const a = input.map((x) => +x);
console.log(Math.min(a[0], a[1]) + Math.min(a[2], a[3]));
