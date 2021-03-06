import * as fs from "fs";

interface ChildrenIndex {
	left?: number;
	right?: number;
}

export type Comparator<T> = (a: T, b: T) => number;

export default class BinaryHeap<T> {
	private heap: Array<T>;
	private compare: Comparator<T>;

	get size(): number {
		return this.heap.length;
	}

	constructor(compare?: "min" | "max" | Comparator<T>, iterable?: Iterable<T>) {
		this.heap = new Array<T>();
		// 比較関数を用意する(デフォルトは最小優先)
		if (compare === undefined || compare === "min") {
			this.compare = (a, b) => {
				if (a < b) return -1;
				else if (b < a) return 1;
				return 0;
			};
		}
		else if (compare === "max") {
			this.compare = (a, b) => {
				if (a > b) return -1;
				else if (b > a) return 1;
				return 0;
			};
		}
		else {
			this.compare = compare;
		}

		if (iterable !== undefined) {
			for (const value of iterable) {
				this.push(value);
			}
		}
	}

	private _isValidIndex(index: number): boolean {
		return index >= 0 && index < this.heap.length;
	}

	private _parent(index: number): number {
		if (!this._isValidIndex(index)) throw new Error("index out of range");
		const parent = Math.floor((index - 1) / 2);
		if (this._isValidIndex(parent)) return parent;
		return -1;
	}

	private _children(index: number): ChildrenIndex {
		if (!this._isValidIndex(index)) throw new Error("index out of range");
		const result: ChildrenIndex = {};
		const left = index * 2 + 1;
		const right = index * 2 + 2;
		if (this._isValidIndex(left)) result.left = left;
		if (this._isValidIndex(right)) result.right = right;
		return result;
	}

	push(value: T) {
		// 末尾に追加
		this.heap.push(value);
		let index = this.heap.length - 1;
		let parent = this._parent(index);
		// 親との順序関係が正しくなるまで要素の入れ替えを行う
		while (parent >= 0 && this.compare(this.heap[index], this.heap[parent]) < 0) {
			const tmp = this.heap[parent];
			this.heap[parent] = this.heap[index];
			this.heap[index] = tmp;
			index = parent;
			parent = this._parent(index);
		}
	}

	peek(): T | undefined {
		return this.heap[0];
	}

	pop(): T | undefined {
		if (this.heap.length <= 1) return this.heap.pop();
		const result = this.heap[0];
		// 末尾の要素を取り出し、rootと入れ替える
		this.heap[0] = this.heap.pop()!;
		let index = 0;
		let {left, right} = this._children(index);
		while (left !== undefined) { // leftがundefinedならrightもundefined
			let swap_to = -1;
			const flg_reverse_left = this.compare(this.heap[left], this.heap[index]) < 0;
			const flg_reverse_right = right !== undefined && this.compare(this.heap[right], this.heap[index]) < 0;
			if (flg_reverse_left) {
				if (flg_reverse_right) swap_to = this.compare(this.heap[left], this.heap[right!]) < 0 ? left : right!;
				else swap_to = left;
			}
			else {
				if (flg_reverse_right) swap_to = right!;
				else break; // 正しい順序になった
			}
			// 順序が逆転していた場合、2つの子のうち順序が前の(根に近くあるべき)ものと入れ替える
			const tmp = this.heap[swap_to];
			this.heap[swap_to] = this.heap[index];
			this.heap[index] = tmp;

			index = swap_to;
			const children = this._children(index);
			left = children.left;
			right = children.right;
		}
		return result;
	}
}

export interface ListGraphEdge {
	to: number;
	cost: number;
}

export type ListGraphArray = Array<Array<ListGraphEdge>>;

export interface ListGraphConstructorOption {
	no_input_cost?: boolean;
	mutual_edge?: boolean;
}

export class ListGraph {
	private list: ListGraphArray;
	private _edges: number;
	get edges(): number {
		return this._edges;
	}

	get size(): number {
		return this.list.length;
	}

	constructor(input: ListGraphArray, option?: ListGraphConstructorOption);
	constructor(input: Array<string>, edges: number, index_offset?: number, option?: ListGraphConstructorOption);
	constructor(input: ListGraphArray | Array<string>, a?: ListGraphConstructorOption | number, index_offset?: number, option?: ListGraphConstructorOption) {
		// set default option
		if (typeof a !== "number") option = a;
		if (option === undefined) {
			option = {no_input_cost: false, mutual_edge: false};
		}
		else {
			if (option.no_input_cost === undefined) option.no_input_cost = false;
			if (option.mutual_edge === undefined) option.mutual_edge = false;
		}

		// コンストラクタ引数によって振り分け
		if (typeof a === "number") {
			if (index_offset === undefined) index_offset = 0;
			this.initString(input as Array<string>, a, index_offset, option);
		}
		else if (input.length == 0 || Array.isArray(input[0])) {
			this.initArray(input as ListGraphArray);
		}
		else {
			throw Error("invalid graph input");
		}
	}

	private initArray(input: ListGraphArray) {
		this._edges = 0;
		this.list = new Array<Array<ListGraphEdge>>(input.length);
		for (let i = 0; i < input.length; i++) {
			this.list[i] = new Array<ListGraphEdge>();
			for (const edge of input[i]) {
				this.list[i].push({to: edge.to, cost: edge.cost});
				this._edges += 1;
			}
		}
	}

	private initString(input: Array<string>, edges: number, index_offset: number, option: ListGraphConstructorOption) {
		this._edges = edges;
		this.list = new Array<Array<ListGraphEdge>>();
		for (let i = 0; i < this.edges; i++) {
			const [from, to, _cost] = input[i + index_offset].split(" ").map((x: string): number => +x);
			let cost = _cost;
			if (option.no_input_cost) cost = 1; // コストが与えられない場合すべてコスト1

			// 未定義部分は[]で埋める
			const len = Math.max(from, to) + 1;
			while (this.list.length < len) {
				this.list.push(new Array<ListGraphEdge>());
			}

			// 辺を張る
			this.list[from].push({to, cost});
			if (option.mutual_edge) this.list[to].push({to: from, cost}); // 双方向に辺を張る
		}
		if (option.mutual_edge) this._edges *= 2;
	}

	getArray(prevent_copy: boolean = false): ListGraphArray {
		if (prevent_copy) return this.list;
		// コピーを返す
		const result = new Array<Array<ListGraphEdge>>(this.list.length);
		for (let i = 0; i < this.list.length; i++) {
			result[i] = new Array<ListGraphEdge>();
			for (const edge of this.list[i]) {
				result[i].push({to: edge.to, cost: edge.cost});
			}
		}
		return result;
	}

	/*
	toMatrix(): MatrixGraphArray {
		const size = this.list.length;
		const result = new Array<Array<number>>(size);
		for (let i = 0; i < size; i++) {
			result[i] = new Array<number>(size);
			for (let ii = 0; ii < size; ii++) {
				if (i == ii) result[i][ii] = 0;
				else result[i][ii] = Infinity;
			}
		}
		for (let from = 0; from < this.list.length; from++) {
			for (const {to, cost} of this.list[from]) {
				result[from][to] = cost;
			}
		}
		return result;
	}*/

	dijkstra(start: number): { cost: Array<number>, prev: Array<number> } {
		const size = this.list.length;
		const visited = new Array<boolean>(size);
		for (let i = 0; i < size; i++) visited[i] = false;
		const min_cost = new Array<number>(size); // startからの最短距離
		min_cost.fill(Infinity);
		min_cost[start] = 0;
		const prev = new Array<number>(size); // 直前に訪れるノード
		prev.fill(-1);
		prev[start] = start;

		while (true) {
			let node = -1;
			for (let i = 0; i < size; i++) {
				if (!visited[i] && (node == -1 || min_cost[i] < min_cost[node])) node = i;
			}
			if (node == -1) break;
			visited[node] = true;
			for (const {to, cost} of this.list[node]) {
				if (cost < 0) {
					throw Error("edge cannot have a cost that is less than 0");
				}
				if (min_cost[node] + cost < min_cost[to]) {
					min_cost[to] = min_cost[node] + cost;
					prev[to] = node;
				}
			}
		}
		return {cost: min_cost, prev};
	}

	// BinaryHeapを用いたダイクストラ
	dijkstraFast(start: number): { cost: Array<number>, prev: Array<number> } {
		const size = this.list.length;

		// 最短距離の小さい順に取り出すヒーブ
		const heap = new BinaryHeap<{ min_cost: number, node_index: number }>((a, b) => {
			if (a.min_cost != b.min_cost) return a.min_cost - b.min_cost;
			return a.node_index - b.node_index;
		}, [{min_cost: 0, node_index: start}]);
		const min_cost = new Array<number>(size); // startからの最短距離
		min_cost.fill(Infinity);
		min_cost[start] = 0;
		const prev = new Array<number>(size); // 直前に訪れるノード
		prev.fill(-1);
		prev[start] = start;

		while (heap.size > 0) {
			const top = heap.pop()!;
			if (min_cost[top.node_index] < top.min_cost) continue; // 取り出した値が最短距離でない場合、無視する
			for (const {to, cost} of this.list[top.node_index]) {
				if (cost < 0) {
					throw Error("edge cannot have a cost that is less than 0");
				}
				if (min_cost[top.node_index] + cost < min_cost[to]) {
					min_cost[to] = min_cost[top.node_index] + cost;
					prev[to] = top.node_index;
					heap.push({min_cost: min_cost[to], node_index: to});
				}
			}
		}
		return {cost: min_cost, prev};
	}
}


let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);
const g = new ListGraph(input, m, 1, {mutual_edge: true});

let result = Infinity;
for (let i = 1; i <= n; i++) {
	const costs = g.dijkstraFast(i).cost;
	let cost = -1;
	for (let ii = 1; ii <= n; ii++) {
		cost = Math.max(cost, costs[ii]);
	}
	result = Math.min(result, cost);
}
console.log(result);
