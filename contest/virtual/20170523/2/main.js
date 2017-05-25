var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const s = input.shift();
const n = s.length;
let dp = [];
for (let i = 0; i < n; i++) {
    dp[i] = [];
}
for (let i = 0; i < n; i++) {
    for (let ii = i; ii < n; ii++) {
        if (ii == i) {
            dp[i][ii] = +s[ii];
        }
        else {
            dp[i][ii] = dp[i][ii - 1] * 10 + (+s[ii]);
        }
    }
}
let result = 0;
const lim = 1 << (n - 1);
for (let b = 0; b < lim; b++) {
    let l = 0;
    for (let i = 0; i < n; i++) {
        if (b & 1 << i) {
            result += dp[l][i];
            l = i + 1;
        }
        else if (i == n - 1) {
            result += dp[l][i];
        }
    }
}
console.log(result);
