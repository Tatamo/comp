import * as fs from "fs";
var input = fs.readFileSync("/dev/stdin", "utf8") as string;
if (input.substring(0, 4) == "YAKI") console.log("Yes");
else console.log("No");
