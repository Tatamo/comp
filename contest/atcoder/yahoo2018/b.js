"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [x, k] = input[0].split(" ").map((x) => +x);
let result = (Math.floor(x * Math.pow(0.1, k)) + 1) * Math.pow(10, k);
console.log(result);
