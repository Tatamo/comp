import * as fs from "fs";

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

	getArray(): ListGraphArray {
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
		}
	*/
	dijkstra(start: number): { dist: Array<number>, prev: Array<number> } {
		const size = this.list.length;
		const visited = new Array<boolean>(size);
		for (let i = 0; i < size; i++) visited[i] = false;
		const dist = new Array<number>(size); // startからの最短距離
		for (let i = 0; i < size; i++) dist[i] = Infinity;
		dist[start] = 0;
		const prev = new Array<number>(size); // 直前に訪れるノード
		for (let i = 0; i < size; i++) prev[i] = -1;
		prev[start] = start;
		while (true) {
			let node = -1;
			for (let i = 0; i < size; i++) {
				if (!visited[i] && (node == -1 || dist[i] < dist[node])) node = i;
			}
			if (node == -1) break;
			visited[node] = true;
			for (const {to, cost} of this.list[node]) {
				if (cost < 0) {
					throw Error("edge cannot have a cost that is less than 0");
				}
				if (dist[node] + cost < dist[to]) {
					dist[to] = dist[node] + cost;
					prev[to] = node;
				}
			}
		}
		return {dist, prev};
	}
}

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);
const g = new ListGraph(input, m, 1, {mutual_edge: true});

let result = Infinity;
for (let i = 1; i <= n; i++) {
	const costs = g.dijkstra(i).dist;
	let cost = -1;
	for (let ii = 1; ii <= n; ii++) {
		cost = Math.max(cost, costs[ii]);
	}
	result = Math.min(result,cost);
}
console.log(result);
