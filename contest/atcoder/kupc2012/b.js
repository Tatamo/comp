"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const l = input[0][0];
const r = input[0][input[0].length - 1];
console.log(r === "x" && l === "x" ? "x" : "o");
