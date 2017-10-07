"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
var input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [h, w] = input[0].split(" ").map((x) => +x);
const [a, b] = input[1].split(" ").map((x) => +x);
const m = [];
for (let i = 0; i < h; i++) {
    m.push(input[i + 2].split("").map((x) => x === "S" ? 1 : 0));
}
let tateyoko = 0;
for (let i = 0; i < Math.ceil(h / 2); i++) {
    for (let ii = 0; ii < Math.ceil(w / 2); ii++) {
        if (m[i][ii] == 1 && m[h - i - 1][ii] == 1 && m[i][w - ii - 1] == 1 && m[h - i - 1][w - ii - 1] == 1) {
            tateyoko += 1;
            m[i][ii] = 0;
            m[h - i - 1][ii] = 0;
            m[i][w - ii - 1] = 0;
            m[h - i - 1][w - ii - 1] = 0;
        }
    }
}
let tate = 0;
for (let i = 0; i < Math.ceil(h / 2); i++) {
    for (let ii = 0; ii < w; ii++) {
        if (m[i][ii] == 1 && m[h - i - 1][ii] == 1) {
            tate += 1;
        }
    }
}
let yoko = 0;
for (let i = 0; i < h; i++) {
    for (let ii = 0; ii < Math.ceil(w / 2); ii++) {
        if (m[i][ii] == 1 && m[i][w - ii - 1] == 1) {
            yoko += 1;
        }
    }
}
let d = a + b;
top: for (let i = 0; i < h; i++) {
    for (let ii = 0; ii < w; ii++) {
        if (m[i][ii] == 1) {
            d = 0;
            break top;
        }
    }
}
if (d == 0) {
    let flg = true;
    for (let i = 0; i < Math.ceil(h / 2); i++) {
        for (let ii = 0; ii < w; ii++) {
            if (m[i][ii] != m[h - i - 1][ii]) {
                flg = false;
            }
        }
    }
    if (flg)
        d = a;
    flg = true;
    for (let i = 0; i < h; i++) {
        for (let ii = 0; ii < Math.ceil(w / 2); ii++) {
            if (m[i][ii] != m[i][w - ii - 1]) {
                flg = false;
            }
        }
    }
    if (flg)
        d = b;
}
console.log(a + b - d + tateyoko * (a + b + Math.max(a, b)) + Math.max(tate * a, yoko * b));
