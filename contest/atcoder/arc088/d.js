"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const s = input[0];
const result = (() => {
    let k = Math.floor(s.length / 2);
    let l = k;
    let r = k;
    let tmp = "";
    if (s.length % 2 === 0) {
        l -= 1;
        if (s[l] === s[r]) {
            tmp = s[l];
            k += 1;
        }
        else {
            return k;
        }
    }
    else {
        tmp = s[l];
        k += 1;
    }
    while (l >= 0 && r < s.length) {
        l -= 1;
        r += 1;
        if (tmp !== s[l] || tmp !== s[r])
            return k;
        k += 1;
    }
    return k;
})();
console.log(result);
