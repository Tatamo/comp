"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
var input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
console.log(input[0].substring(0, input[0].length - 8));
