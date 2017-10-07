import * as fs from "fs";

var input = fs.readFileSync("/dev/stdin", "utf8") as string;
if (input[0] == input[1] && input[2] == input[3] && input[0] != input[2]) console.log("Yes");
else console.log("No");
