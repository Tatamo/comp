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

	// O(VE)
	bellmanFord(start: number): { has_negative_loop: false, cost: Array<number>, prev: Array<number> } | { has_negative_loop: true, cost: Array<number | null>, prev: Array<number | null> } {
		const size = this.list.length;
		const min_cost = new Array<number>(size); // startからの最短距離
		min_cost.fill(Infinity);
		min_cost[start] = 0;
		const prev = new Array<number>(size); // 直前に訪れるノード
		prev.fill(-1);
		prev[start] = start;
		const correct = new Array<boolean>(size); // 正しい最短経路が求まっているかどうか
		correct.fill(true);
		let loop_count = 0;
		let flg_contain_negative = false;
		let flg_update = true;
		while (flg_update) {
			flg_update = false;
			for (let from = 0; from < size; from++) {
				for (const {to, cost} of this.list[from]) {
					if (min_cost[from] != Infinity && min_cost[to] > min_cost[from] + cost) {
						min_cost[to] = min_cost[from] + cost;
						prev[to] = from;
						flg_update = true;
						if (flg_contain_negative) {
							// V回目以降に最短距離が更新されるなら、負閉路を通っているので正しくない
							correct[to] = false;
						}
					}
				}
			}
			loop_count += 1;
			if (loop_count == size) {
				// 頂点の数だけ更新してもループがとまらない -> 負閉路が存在する
				flg_contain_negative = true;
			}
			if (loop_count == size * 2) break; // 頂点の数*2回より多くループする意味はない
		}
		if (flg_contain_negative) {
			// 正しく最短距離が求められない頂点の結果はnullとする
			const min_cost_with_undefined: Array<number | null> = min_cost;
			const prev_with_undefined: Array<number | null> = prev;
			for (let i = 0; i < size; i++) {
				if (!correct[i]) {
					min_cost_with_undefined[i] = prev_with_undefined[i] = null;
				}
			}
			return {has_negative_loop: true, cost: min_cost_with_undefined, prev: prev_with_undefined};
		}
		else {
			return {has_negative_loop: false, cost: min_cost, prev};
		}
	}
}

let input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [n, m] = input[0].split(" ").map((x: string): number => +x);
const g = new ListGraph(input, m, 1, {mutual_edge: true});

// 2部グラフ判定
const color: Array<number> = new Array(n + 1).fill(0);
/*
// スタックオーバーフローする
const dfs = (node: number, c: number): boolean => {
	if (node < 0 || node > n) return true;
	color[node] = c;
	for (const edge of g.getArray(true)[node]) {
		if (color[edge.to] == c) return false;
		if (color[edge.to] == 0 && !dfs(edge.to, -c)) return false;
	}
	return true;
};
*/

const dfs = (n: number): boolean => {
	const stack = [n];
	color[n] = 1;
	while (stack.length > 0) {
		const node = stack.pop()!;
		for (const edge of g.getArray(true)[node]) {
			if (color[edge.to] == color[node]) return false;
			if(color[edge.to] == 0){
				color[edge.to] = -color[node];
				stack.push(edge.to);
			}
		}
	}
	return true;
};

if (dfs(1)) {
	let b = 0;
	let w = 0;
	for (const c of color) {
		if (c == 1) b += 1;
		else if (c == -1) w += 1;
	}
	console.log(b * w - m);
}
else {
	console.log(n * (n - 1) / 2 - m);
}
