"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const q = [];
for (let i = 0; i < n; i++) {
    const [t, x, y] = input[i + 1].split(" ").map((x) => +x);
    q.push({ t, x, y });
}
let current_t = 0;
let pos_x = 0;
let pos_y = 0;
console.log((() => {
    for (const { t, x, y } of q) {
        const dist = Math.abs(x - pos_x) + Math.abs(y - pos_y);
        const dt = t - current_t;
        if (dist > dt) {
            return false;
        }
        else if (dist % 2 !== t % 2) {
            return false;
        }
    }
    return true;
})() ? "Yes" : "No");
