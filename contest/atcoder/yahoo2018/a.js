"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
console.log(/^yah(.)\1/.test(input[0]) ? "YES" : "NO");
