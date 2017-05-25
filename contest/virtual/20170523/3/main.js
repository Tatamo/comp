var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const s = input.shift();
const n = s.length;
let result = 0;
for (let i = 0; i < n; i++) {
    if (s[i] == "p") {
        result -= 1;
    }
    else if (s[i] == "g") {
        result += 1;
    }
}
result = Math.floor(result / 2);
console.log(result);
