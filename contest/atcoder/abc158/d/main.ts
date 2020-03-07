import * as fs from "fs";


interface FlipQuery {
	type: "flip";
}

interface AddQuery {
	type: "add";
	to: "start" | "end";
	char: string
}

type Query = FlipQuery | AddQuery;

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];
const q = +input[1];
const queries = [];
for (let i = 0; i < q; i++) {
	const query = input[i + 2].split(" ");
	if (query[0] === "1") {
		queries.push({ type: "flip" });
	} else {
		if (query[1] === "1") {
			queries.push({ type: "add", to: "start", char: query[2] });
		} else {
			queries.push({ type: "add", to: "end", char: query[2] });
		}
	}
}
queries.reverse()
let strs: [string, string] = ["", ""];
let flip_count = 0;

for (const query of queries) {
	if (query.type === "flip") {
		flip_count++;
		continue;
	}
	else if (query.type === "add") {
		// add
		const to = (query as AddQuery).to;
		const char = (query as AddQuery).char;
		const reversed = flip_count % 2 === 1;

		let to_start = to === "start";
		if (reversed) to_start = !to_start;
		strs[to_start ? 0 : 1] += char;
	}
}

let result = strs[0];
if (flip_count % 2 === 1) {
	result += s.split("").reverse().join("");
} else {
	result += s;
}
result += strs[1].split("").reverse().join("");

console.log(result);
