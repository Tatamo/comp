"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, h] = input[0].split(" ").map((x) => +x);
const [a, b, c, d, e] = input[1].split(" ").map((x) => +x);
const check = (x, y, z) => {
    return { health: h + b * x + d * y - e * z, cost: a * x + c * y };
};
let result = Infinity;
// x:普通の食事 y:質素な食事 z:食事抜き
for (let x = 0; x <= n; x++) {
    const d = n - x;
    let left = 0;
    let right = n;
    let y = 0;
    let z = n;
    // 二分探索
    while (right - left > 100) {
        y = Math.floor((left + right) / 2);
        z = d - y;
        const health = check(x, y, z).health;
        if (health <= 0)
            left = y;
        else
            right = y;
    }
    for (let i = Math.max(0, left - 3); i <= Math.min(n, right + 3); i++) {
        const { cost, health } = check(x, i, d - i);
        if (health > 0 && cost < result)
            result = cost;
    }
}
console.log(result);
