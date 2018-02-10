"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const d = [];
for (let i = 0; i < n; i++) {
    d.push(+input[i + 1]);
}
// 1:success 0:fail -1:absolutely fail
const solve = (d) => {
    const rsw = new Array(n + 1).fill(0);
    let r = 0; // 右側から張られた辺数
    let w = 0;
    while (d.length > 0) {
        console.log(rsw, d[d.length - 1], r + rsw[rsw.length - 1], d[d.length - 1] - (r + rsw[rsw.length - 1]));
        r += rsw.pop();
        w = d.pop() - r;
        const aw = Math.abs(w);
        rsw[rsw.length - 1] += 1;
        if (rsw.length - 1 - aw >= 0)
            rsw[rsw.length - 1 - aw] -= 1;
        if (rsw.length < aw)
            return -1;
    }
    console.log(`w:${w}`);
    if (w === 0)
        return 1;
    else if (w === 1)
        return 0;
    return -1;
};
console.log(["ABSOLUTELY NO", "NO", "YES"][solve(d) + 1]);
