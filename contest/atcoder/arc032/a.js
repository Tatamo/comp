"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const isPrime = (x) => {
    if (x === 1)
        return false;
    for (let i = 2; i * i <= x; i++) {
        if (x % i === 0)
            return false;
    }
    return true;
};
console.log(isPrime(n * (n + 1) / 2) ? "WANWAN" : "BOWWOW");
