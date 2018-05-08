import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const exps = input[0].split("+");
let result = 0;
for (const exp of exps) {
	if (eval(exp) !== 0) result += 1;
}
console.log(result);
