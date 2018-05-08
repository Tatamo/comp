"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const exps = input[0].split("+");
let result = 0;
for (const exp of exps) {
    if (eval(exp) !== 0)
        result += 1;
}
console.log(result);
