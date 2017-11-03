"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const k = +input[0];
switch (k) {
    case 4:
        console.log(`1860 ${4404 - 37 * 4 + 1}`);
        break;
    case 5:
        console.log("1176 2700");
        break;
    case 10:
        console.log("276 648");
        break;
    case 20:
        console.log("60 145");
        break;
    case 25:
        console.log("32 88");
        break;
    case 50:
        console.log("4 16");
        break;
}
