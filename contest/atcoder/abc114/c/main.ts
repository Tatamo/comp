import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];

const toNum = (x:number) => +(x.toString(4).replace(/3/g,"7").replace(/2/g,"5").replace(/1/g,"3"));
let crr = 0;
let result = 0;
loop:
while(true){
  const crr4 = crr.toString(4);
  const check = [false, false, false, false]
  for(let i=0; i<crr4.length; i++){
    if(crr4[i] === "0") {
      crr += 1;
      continue loop;
    }
    check[+crr4[i]] = true;
  }
  if(toNum(crr) > n) break;
  if (check[1] && check[2] && check[3]) result += 1;
  crr += 1;
}

console.log(result);
