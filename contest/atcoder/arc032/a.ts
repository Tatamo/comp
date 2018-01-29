import * as fs from "fs";

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];

const isPrime = (x: number): boolean => {
	if (x === 1) return false;
	for (let i = 2; i * i <= x; i++) {
		if (x % i === 0) return false;
	}
	return true;
};

console.log(isPrime(n * (n + 1) / 2) ? "WANWAN" : "BOWWOW");
