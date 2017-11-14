"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [h, w] = input[0].split(" ").map((x) => +x);
const s = [];
const a = new Array();
for (let i = 0; i < h + 6; i++)
    a.push(new Array(w + 6).fill(0));
for (let i = 0; i < h; i++) {
    s.push(input[i + 1].split("").map((x) => x === "#" ? 1 : 0));
}
const isInS = (y, x) => {
    if (y < 0 || y >= h || x < 0 || x >= w)
        return false;
    return true;
};
const check = (s, y, x) => {
    for (let i = -1; i <= 1; i++) {
        for (let ii = -1; ii <= 1; ii++) {
            const c = isInS(y + i, x + ii) ? s[y + i][x + ii] : 1;
            if (c === 0)
                return false;
        }
    }
    return true;
};
for (let i = -3; i < h + 3; i++) {
    for (let ii = -3; ii < w + 3; ii++) {
        const c = isInS(i, ii) ? s[i][ii] : 1;
        if (c === 1) {
            if (check(s, i, ii)) {
                a[i + 3][ii + 3] = 2;
            }
            else {
                a[i + 3][ii + 3] = 1;
            }
        }
        else {
            a[i + 3][ii + 3] = 0;
        }
    }
}
for (let i = 0; i < h; i++) {
    for (let ii = 0; ii < w; ii++) {
        if (a[i + 3][ii + 3] === 2) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (a[i + 3 + dy][ii + 3 + dx] === 1) {
                        a[i + 3 + dy][ii + 3 + dx] = 3;
                    }
                }
            }
        }
    }
}
let is_possible = true;
top: for (let i = 0; i < h; i++) {
    for (let ii = 0; ii < w; ii++) {
        if (a[i + 3][ii + 3] === 1) {
            is_possible = false;
            break top;
        }
    }
}
if (!is_possible) {
    console.log("impossible");
}
else {
    console.log("possible");
    for (let i = 0; i < h; i++) {
        let result = "";
        for (let ii = 0; ii < w; ii++) {
            if (a[i + 3][ii + 3] === 2) {
                result += "#";
            }
            else {
                result += ".";
            }
        }
        console.log(result);
    }
}
