"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://not-522.appspot.com/contest/6038450935431168
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [a, b] = input[0].split(" ").map((x) => +x);
console.log(Math.ceil((a + b) / 2));
