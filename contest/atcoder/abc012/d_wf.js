"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class MatrixGraph {
    get size() {
        return this._size;
    }
    constructor(input, a, index_offset, option) {
        // set default option
        if (typeof a !== "number")
            option = a;
        if (option === undefined) {
            option = { zero_as_no_edge: false };
        }
        else {
            if (option.zero_as_no_edge === undefined)
                option.zero_as_no_edge = false;
        }
        this.zero_as_no_edge = option.zero_as_no_edge;
        // コンストラクタ引数によって振り分け
        if (typeof (a) === "number") {
            this.initString(input, a, index_offset !== undefined ? index_offset : 0, option);
        }
        else if (input.length == 0 || Array.isArray(input[0])) {
            this.initArray(input, option);
        }
        else {
            throw Error("invalid graph input");
        }
    }
    initArray(input, option) {
        this._size = input.length;
        this.matrix = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.matrix[i] = input[i].slice();
            if (option.zero_as_no_edge) {
                for (let ii = 0; ii < this.size; ii++) {
                    if (i != ii && this.matrix[i][ii] == 0) {
                        this.matrix[i][ii] = Infinity;
                    }
                }
            }
        }
    }
    initString(input, n, index_offset, option) {
        this._size = n;
        this.matrix = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.matrix[i] = input[i + index_offset].split(" ").map((x) => +x);
            if (option.zero_as_no_edge) {
                for (let ii = 0; ii < this.size; ii++) {
                    if (i != ii && this.matrix[i][ii] == 0) {
                        this.matrix[i][ii] = Infinity;
                    }
                }
            }
        }
    }
    getArray() {
        // コピーを返す
        const result = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            result[i] = this.matrix[i].slice();
        }
        return result;
    }
    toList() {
        const result = new Array(this.size);
        for (let i = 0; i < this.size; i++)
            result[i] = new Array();
        for (let from = 0; from < this.size; from++) {
            for (let to = 0; to < this.size; to++) {
                if (from == to && this.matrix[from][to] == 0)
                    continue;
                else if (this.zero_as_no_edge && this.matrix[from][to] == 0)
                    continue;
                else if (this.matrix[from][to] == Infinity)
                    continue;
                result[from].push({ to, cost: this.matrix[from][to] });
            }
        }
        return result;
    }
    warshallFloyd() {
        // initialize
        const result = Array(this.size);
        for (let i = 0; i < this.size; i++) {
            result[i] = this.matrix[i].slice();
        }
        // wf
        for (let i = 0; i < this.size; i++) {
            for (let ii = 0; ii < this.size; ii++) {
                for (let iii = 0; iii < this.size; iii++) {
                    result[ii][iii] = Math.min(result[ii][iii], result[ii][i] + result[i][iii]);
                }
            }
        }
        return result;
    }
}
exports.MatrixGraph = MatrixGraph;
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
    getArray() {
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
    toMatrix() {
        const size = this.list.length;
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = new Array(size);
            for (let ii = 0; ii < size; ii++) {
                if (i == ii)
                    result[i][ii] = 0;
                else
                    result[i][ii] = Infinity;
            }
        }
        for (let from = 0; from < this.list.length; from++) {
            for (const { to, cost } of this.list[from]) {
                result[from][to] = cost;
            }
        }
        return result;
    }
    dijkstra(start) {
        const size = this.list.length;
        const visited = new Array(size);
        for (let i = 0; i < size; i++)
            visited[i] = false;
        const dist = new Array(size); // startからの最短距離
        for (let i = 0; i < size; i++)
            dist[i] = Infinity;
        dist[start] = 0;
        const prev = new Array(size); // 直前に訪れるノード
        for (let i = 0; i < size; i++)
            prev[i] = -1;
        prev[start] = start;
        while (true) {
            let node = -1;
            for (let i = 0; i < size; i++) {
                if (!visited[i] && (node == -1 || dist[i] < dist[node]))
                    node = i;
            }
            if (node == -1)
                break;
            visited[node] = true;
            for (const { to, cost } of this.list[node]) {
                if (cost < 0) {
                    throw Error("edge cannot have a cost that is less than 0");
                }
                if (dist[node] + cost < dist[to]) {
                    dist[to] = dist[node] + cost;
                    prev[to] = node;
                }
            }
        }
        return { dist, prev };
    }
}
exports.ListGraph = ListGraph;
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, m] = input[0].split(" ").map((x) => +x);
const g = new MatrixGraph(new ListGraph(input, m, 1, { mutual_edge: true }).toMatrix());
const wf = g.warshallFloyd();
let result = Infinity;
for (let i = 1; i <= n; i++) {
    let cost = -1;
    for (let ii = 1; ii <= n; ii++) {
        cost = Math.max(cost, wf[i][ii]);
    }
    result = Math.min(result, cost);
}
console.log(result);
