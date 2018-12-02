import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];

if(n === 7 || n===5 || n===3){
  console.log("YES");
}
else{
  console.log("NO");
}
