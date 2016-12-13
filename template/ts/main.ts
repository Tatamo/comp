/// <reference path="./typings/index.d.ts" />
declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
