"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const k = +input[0];
// const [n] = input[0].split(" ").map((x: string): number => +x);
const solve = (k, tyokkei) => {
    const r = tyokkei / k / 2; // r:整数は保証される
    let sum = 0;
    for (let i = 1; i <= r; i++) {
        for (let ii = 1; ii <= r; ii++) {
            if (i * i + ii * ii <= r * r) {
                sum += 1;
            }
        }
    }
    return sum * 4;
};
const solve2 = (k, tyokkei) => {
    const r = tyokkei / k / 2; // r:小数点以下.5
    let sum = 0;
    for (let i = 0.5; i <= r; i++) {
        for (let ii = 0.5; ii <= r; ii++) {
            if (i * i + ii * ii <= r * r) {
                sum += 1;
            }
        }
    }
    return sum * 4 - Math.floor(r) * 4 + 1;
};
console.log(`${solve(k, 200)} ${solve2(k, 300)}`);
