"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const a = [];
for (let i = 0; i < n; i++) {
    a.push({ side: 0, pos: +input[i + 1] });
}
for (let i = 0; i < n; i++) {
    a.push({ side: 1, pos: +input[i + n + 1] });
}
a.sort((a, b) => {
    return a.pos - b.pos;
});
const MOD = 1e9 + 7;
let stack = 0;
let side = -1;
let result = 1;
for (const obj of a) {
    if (stack === 0) {
        stack++;
        side = obj.side;
    }
    else if (obj.side === side) {
        stack++;
    }
    else {
        result *= stack;
        result %= MOD;
        stack -= 1;
    }
}
console.log(result);
