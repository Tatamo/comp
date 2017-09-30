"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, k] = input[0].split(" ").map((x) => +x);
const a = [];
for (let i = 0; i < n; i++) {
    const tmp = input[i + 1].split(" ").map((x) => +x);
    a.push(tmp);
}
const f = [k];
let flg = 1;
for (let i = 0; i < 30; i++) {
    if ((flg & k) != 0) {
        const tmp = k;
        f.push((k >> (i + 1) << (i + 1)) + (1 << i) - 1); // 下からi桁目を0に、そこから下全て1に
    }
    flg <<= 1;
}
let ans = -1;
for (const s of f) {
    let result = 0;
    for (let i = 0; i < n; i++) {
        if ((s | a[i][0]) == s) {
            result += a[i][1];
        }
    }
    ans = Math.max(ans, result);
}
console.log(ans);
