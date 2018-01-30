"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
const kenban = "WBWBWWBWBWBW";
const ans = ["Do", "Re", "Mi", "Fa", "So", "La", "Si"];
let p = kenban.repeat(3);
for (let i = 0; i < 7; i++) {
    if (p.slice(0, 20) === s) {
        console.log(ans[i]);
        break;
    }
    do {
        p = p.slice(1);
    } while (p[0] !== "W");
}
