"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const ANS = "XmasContest2017";
const [h, w] = input[0].split(" ").map((x) => +x);
const a = [];
for (let i = 0; i < h; i++) {
    a.push(input[i + 1].split(""));
}
const read = ["", "", "", ""];
const range = [
    [0, h - 1, 1, 0, w - 1, 1, "v"],
    [0, w - 1, 1, h - 1, 0, -1, "h"],
    [h - 1, 0, -1, w - 1, 0, -1, "v"],
    [w - 1, 0, -1, 0, h - 1, 1, "h"]
];
for (let d = 0; d < 4; d++) {
    for (let i = range[d][0];; i += range[d][2]) {
        for (let ii = range[d][3];; ii += range[d][5]) {
            const c = (range[d][6] === "v") ? a[i][ii] : a[ii][i];
            if (c !== ".") {
                read[d] += c;
                break;
            }
            if (ii === range[d][4])
                break;
        }
        if (i === range[d][1])
            break;
    }
    read[d] = read[d].replace(/\*/g, "");
}
let flg_ac = true;
for (let i = 0; i < 4; i++) {
    if (read[i] !== ANS) {
        console.error(`ERROR: rotate ${i * 90} degree is "${read[i]}"`);
        flg_ac = false;
    }
}
if (flg_ac)
    console.error("OK");
