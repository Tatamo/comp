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

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);

const uf: UnionFind = new UnionFind(n);

for (let i = 0; i < m; i++) {
	const [a, b] = input[i + 1].split(" ").map((x: string): number => +x);
	uf.unite(a - 1, b - 1);
}

const set = new Set<number>();
for (let i = 0; i < n; i++) {
	set.add(uf.root(i));
}

console.log(set.size-1);
