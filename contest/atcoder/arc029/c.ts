import * as fs from "fs";

export class UnionFind {
	private _parent: Array<number>;
	private _rank: Array<number>;
	private _size: Array<number>;
	private _length: number;
	get length(): number {
		return this._length;
	}

	constructor(length: number) {
		this._length = length;
		this._parent = new Array(length);
		for (let i = 0; i < length; i++) {
			this._parent[i] = i;
		}
		this._rank = new Array(length).fill(1);
		this._size = new Array(length).fill(1);
	}

	root(node: number): number {
		const stack: Array<number> = [node];
		while (true) {
			const top = stack[stack.length - 1];
			const p = this._parent[top];
			if (p === top) {
				break;
			}
			else {
				stack.push(p);
			}
		}
		const result = stack.pop()!;
		while (stack.length > 0) {
			this._parent[stack.pop()!] = result;
		}
		return result;
	}

	size(node: number): number {
		return this._size[this.root(node)];
	}

	check(x: number, y: number): boolean {
		return this.root(x) === this.root(y);
	}

	unite(x: number, y: number) {
		x = this.root(x);
		y = this.root(y);
		if (this._rank[x] >= this._rank[y]) {
			this._parent[y] = this._parent[x];
			if (this._rank[x] === this._rank[y]) {
				this._rank[y] += 1;
			}
			this._size[x] += this._size[y];
		}
		else {
			this._parent[x] = this._parent[y];
			this._size[y] = this._size[x];
		}
		return 0;
	}
}


const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);
const a = [];
let min_build_cost = Infinity;
let min_build_index = -1;
for (let i = 0; i < n; i++) {
	a.push(+input[i + 1]);
	if (a[i] < min_build_cost) {
		min_build_cost = a[i];
		min_build_index = i + 1;
	}
}

const g = [];
for (let i = 0; i < m; i++) {
	const [from, to, cost] = input[i + n + 1].split(" ").map((x: string): number => +x);
	g.push({from, to, cost});
}

for (let i = 1; i <= n; i++) {
	g.push({from: 0, to: i, cost: a[i - 1]});
}

// Prim's Algorithm
g.sort((a, b) => a.cost - b.cost);

const uf = new UnionFind(n);
const min_tree = [];
let result = 0;
for (const edge of g) {
	if (uf.check(edge.from - 1, edge.to - 1)) continue;
	uf.unite(edge.from - 1, edge.to - 1);
	min_tree.push(edge);
	result += edge.cost;
}
console.log(result);
