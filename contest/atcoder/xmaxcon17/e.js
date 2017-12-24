"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
const t = input[1];
const solve = (s, t) => {
    /*
    わかりませんでした
     */
    return true;
};
if (s.replace(/[AB]/g, "") != t.replace(/[AB]/g, "")) {
    console.log("NO");
}
else {
    const ss = s.split(/[^AB]/);
    const ts = t.split(/[^AB]/);
    if (ss.length !== ts.length)
        console.error("something wrong");
    let flg_ok = true;
    for (let i = 0; i < ss.length; i++) {
        if (!solve(ss[i], ts[i])) {
            console.log("NO");
            flg_ok = false;
        }
    }
    if (flg_ok)
        console.log("YES");
}
