import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const x = input[1].split(" ").map((x: string): number => +x);

const getCost = (x: number, p: number) => (x - p) ** 2;
const sumCosts = (array: Array<number>, p: number) => array.reduce((sum, x) => sum + getCost(x, p), 0);

let result = Infinity;
for (let p = 1; p <= 100; p++) {
	const cost = sumCosts(x, p);
	if (cost < result) result = cost;
}

console.log(result);
