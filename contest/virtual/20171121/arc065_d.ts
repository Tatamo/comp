import * as fs from "fs";

export default class Queue<T> {
	private _in: Array<T>;
	private _out: Array<T>;

	get length(): number {
		return this._in.length + this._out.length;
	}

	constructor(iterable?: Iterable<T>) {
		this._in = iterable === undefined ? new Array<T>() : [...iterable];
		this._out = new Array<T>();
	}

	private _fix() {
		this._out = this._in.reverse().concat(this._out);
		this._in = new Array<T>();
	}

	push(value: T): void {
		this._in.push(value);
	}

	shift(): T | undefined {
		if (this._out.length == 0) this._fix();
		return this._out.pop();
	}

	toArray(): Array<T> {
		this._fix();
		return this._out.slice().reverse();
	}
}

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, k, l] = input[0].split(" ").map((x: string): number => +x);

const ways: Array<Array<number>> = [];
for (let i = 0; i < n; i++) {
	ways.push([]);
}

for (let i = 1; i < 1 + k; i++) {
	const [p, q] = input[i].split(" ").map((x: string): number => +x);
	ways[p - 1].push(q - 1);
	ways[q - 1].push(p - 1);
}

const rails: Array<Array<number>> = [];
for (let i = 0; i < n; i++) {
	rails.push([]);
}

for (let i = 1 + k; i < 1 + k + l; i++) {
	const [r, s] = input[i].split(" ").map((x: string): number => +x);
	rails[r - 1].push(s - 1);
	rails[s - 1].push(r - 1);
}

const findIslands = (n: number, g: Array<Array<number>>): Array<number> => {
	const result: Array<number> = new Array(n);
	const queue: Queue<number> = new Queue();
	const checked: Array<boolean> = new Array(n).fill(false);
	const bfs = (node: number, island_id: number) => {
		if (checked[node]) return;
		result[node] = island_id;
		checked[node] = true;
		for (const to of g[node]) {
			queue.push(to);
		}
	};
	let island_id = 0;
	for (let i = 0; i < n; i++) {
		if (checked[i]) continue;
		queue.push(i);
		while (queue.length > 0) {
			bfs(queue.shift()!, island_id);
		}
		island_id += 1;
	}
	return result;
};

const w_islands = findIslands(n, ways);
const r_islands = findIslands(n, rails);

const counts = new Map();
for (let i = 0; i < n; i++) {
	const label = w_islands[i] + "|" + r_islands[i];
	if (counts.has(label)) {
		counts.set(label, counts.get(label) + 1);
	}
	else {
		counts.set(label, 1);
	}
}

let result = "";
for (let i = 0; i < n; i++) {
	result += counts.get(w_islands[i] + "|" + r_islands[i]);
	result += " ";
}
console.log(result);
