"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const MOD = 1000000007;
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, A, B] = input[0].split(" ").map((x) => +x);
const a = input[1].split(" ").map((x) => +x).sort((a, b) => a - b);
let nokori = B;
const powmod = (n, x, mod = Infinity) => {
    if (x <= 0)
        return 1;
    if (x % 2 == 0)
        return powmod(n * n % mod, x / 2, mod);
    else
        return n * powmod(n, x - 1, mod) % mod;
};
const findMin = (a) => {
    if (a.length == 0)
        return -1;
    let min = Infinity;
    let min_i = -1;
    for (let i = 0; i < a.length; i++) {
        if (a[i] < min) {
            min = a[i];
            min_i = i;
        }
    }
    return min_i;
};
while (nokori > 0) {
    const min_i = findMin(a);
    if (a[0] * A >= a[n - 1])
        break;
    a[min_i] *= A;
    nokori -= 1;
    a.sort((a, b) => a - b);
}
const times = new Array(n).fill(0);
for (let i = 0; i < nokori % n; i++) {
    times[i] += 1;
}
a.sort((a, b) => a - b);
for (let i = 0; i < n; i++) {
    a[i] = a[i] * powmod(A, times[i], MOD) % MOD;
    console.log(a[i]);
}
