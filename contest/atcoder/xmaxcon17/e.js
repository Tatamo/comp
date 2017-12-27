"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
const t = input[1];
const dp = new Array(s.length + 1);
for (let i = 0; i <= s.length + 1; i++) {
    dp[i] = new Array(t.length + 2).fill(false);
}
dp[0][0] = true;
for (let i = 0; i <= s.length; i++) {
    for (let ii = 0; ii <= t.length; ii++) {
        if (!dp[i][ii])
            continue;
        if (s[i] === "A") {
            dp[i + 1][ii] = dp[i][ii];
        }
        if (t[ii] === "B") {
            dp[i][ii + 1] = dp[i][ii];
        }
        if (s[i] == t[ii]) {
            dp[i + 1][ii + 1] = dp[i][ii];
        }
    }
}
console.log(dp[s.length][t.length] ? "YES" : "NO");
