"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ListGraph {
    get edges() {
        return this._edges;
    }
    get size() {
        return this.list.length;
    }
    constructor(input, a, index_offset, option) {
        // set default option
        if (typeof a !== "number")
            option = a;
        if (option === undefined) {
            option = { no_input_cost: false, mutual_edge: false };
        }
        else {
            if (option.no_input_cost === undefined)
                option.no_input_cost = false;
            if (option.mutual_edge === undefined)
                option.mutual_edge = false;
        }
        // コンストラクタ引数によって振り分け
        if (typeof a === "number") {
            if (index_offset === undefined)
                index_offset = 0;
            this.initString(input, a, index_offset, option);
        }
        else if (input.length == 0 || Array.isArray(input[0])) {
            this.initArray(input);
        }
        else {
            throw Error("invalid graph input");
        }
    }
    initArray(input) {
        this._edges = 0;
        this.list = new Array(input.length);
        for (let i = 0; i < input.length; i++) {
            this.list[i] = new Array();
            for (const edge of input[i]) {
                this.list[i].push({ to: edge.to, cost: edge.cost });
                this._edges += 1;
            }
        }
    }
    initString(input, edges, index_offset, option) {
        this._edges = edges;
        this.list = new Array();
        for (let i = 0; i < this.edges; i++) {
            const [from, to, _cost] = input[i + index_offset].split(" ").map((x) => +x);
            let cost = _cost;
            if (option.no_input_cost)
                cost = 1; // コストが与えられない場合すべてコスト1
            // 未定義部分は[]で埋める
            const len = Math.max(from, to) + 1;
            while (this.list.length < len) {
                this.list.push(new Array());
            }
            // 辺を張る
            this.list[from].push({ to, cost });
            if (option.mutual_edge)
                this.list[to].push({ to: from, cost }); // 双方向に辺を張る
        }
        if (option.mutual_edge)
            this._edges *= 2;
    }
    getArray(prevent_copy = false) {
        if (prevent_copy)
            return this.list;
        // コピーを返す
        const result = new Array(this.list.length);
        for (let i = 0; i < this.list.length; i++) {
            result[i] = new Array();
            for (const edge of this.list[i]) {
                result[i].push({ to: edge.to, cost: edge.cost });
            }
        }
        return result;
    }
    dijkstra(start) {
        const size = this.list.length;
        const visited = new Array(size);
        for (let i = 0; i < size; i++)
            visited[i] = false;
        const min_cost = new Array(size); // startからの最短距離
        min_cost.fill(Infinity);
        min_cost[start] = 0;
        const prev = new Array(size); // 直前に訪れるノード
        prev.fill(-1);
        prev[start] = start;
        while (true) {
            let node = -1;
            for (let i = 0; i < size; i++) {
                if (!visited[i] && (node == -1 || min_cost[i] < min_cost[node]))
                    node = i;
            }
            if (node == -1)
                break;
            visited[node] = true;
            for (const { to, cost } of this.list[node]) {
                if (cost < 0) {
                    throw Error("edge cannot have a cost that is less than 0");
                }
                if (min_cost[node] + cost < min_cost[to]) {
                    min_cost[to] = min_cost[node] + cost;
                    prev[to] = node;
                }
            }
        }
        return { cost: min_cost, prev };
    }
    // O(VE)
    bellmanFord(start) {
        const size = this.list.length;
        const min_cost = new Array(size); // startからの最短距離
        min_cost.fill(Infinity);
        min_cost[start] = 0;
        const prev = new Array(size); // 直前に訪れるノード
        prev.fill(-1);
        prev[start] = start;
        const correct = new Array(size); // 正しい最短経路が求まっているかどうか
        correct.fill(true);
        let loop_count = 0;
        let flg_contain_negative = false;
        let flg_update = true;
        while (flg_update) {
            flg_update = false;
            for (let from = 0; from < size; from++) {
                for (const { to, cost } of this.list[from]) {
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
            if (loop_count == size * 2)
                break; // 頂点の数*2回より多くループする意味はない
        }
        if (flg_contain_negative) {
            // 正しく最短距離が求められない頂点の結果はnullとする
            const min_cost_with_undefined = min_cost;
            const prev_with_undefined = prev;
            for (let i = 0; i < size; i++) {
                if (!correct[i]) {
                    min_cost_with_undefined[i] = prev_with_undefined[i] = null;
                }
            }
            return { has_negative_loop: true, cost: min_cost_with_undefined, prev: prev_with_undefined };
        }
        else {
            return { has_negative_loop: false, cost: min_cost, prev };
        }
    }
}
exports.ListGraph = ListGraph;
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, x] = input[0].split(" ").map((x) => +x);
const h = input[1].split(" ").map((x) => +x);
const g = new ListGraph(input, n - 1, 2, { mutual_edge: true, no_input_cost: true }).getArray(true);
const stack = [];
const dfs = (pos, back) => {
    // console.log("dfs:", pos, back);
    let len = 1;
    let skip = h[pos - 1] !== 1;
    // 掘り下げる
    for (const { to } of g[pos]) {
        if (to === back)
            continue;
        const tmp = dfs(to, pos);
        if (!tmp.skip) {
            skip = false;
            len += tmp.len;
            // console.log(len);
        }
    }
    if (skip)
        len = 0;
    return { len, skip };
};
// スタックオーバーフローする
console.log(Math.max((dfs(x, 0).len - 1) * 2, 0));
