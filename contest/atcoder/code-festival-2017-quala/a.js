"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
var input = fs.readFileSync("/dev/stdin", "utf8");
if (input.substring(0, 4) == "YAKI")
    console.log("Yes");
else
    console.log("No");
