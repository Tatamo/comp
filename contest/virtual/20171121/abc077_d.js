"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class BinaryHeap {
    constructor(compare, iterable) {
        this.heap = new Array();
        // 比較関数を用意する(デフォルトは最小優先)
        if (compare === undefined || compare === "min") {
            this.compare = (a, b) => {
                if (a < b)
                    return -1;
                else if (b < a)
                    return 1;
                return 0;
            };
        }
        else if (compare === "max") {
            this.compare = (a, b) => {
                if (a > b)
                    return -1;
                else if (b > a)
                    return 1;
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
    get size() {
        return this.heap.length;
    }
    _isValidIndex(index) {
        return index >= 0 && index < this.heap.length;
    }
    _parent(index) {
        if (!this._isValidIndex(index))
            throw new Error("index out of range");
        const parent = Math.floor((index - 1) / 2);
        if (this._isValidIndex(parent))
            return parent;
        return -1;
    }
    _children(index) {
        if (!this._isValidIndex(index))
            throw new Error("index out of range");
        const result = {};
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        if (this._isValidIndex(left))
            result.left = left;
        if (this._isValidIndex(right))
            result.right = right;
        return result;
    }
    push(value) {
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
    peek() {
        return this.heap[0];
    }
    pop() {
        if (this.heap.length <= 1)
            return this.heap.pop();
        const result = this.heap[0];
        // 末尾の要素を取り出し、rootと入れ替える
        this.heap[0] = this.heap.pop();
        let index = 0;
        let { left, right } = this._children(index);
        while (left !== undefined) {
            let swap_to = -1;
            const flg_reverse_left = this.compare(this.heap[left], this.heap[index]) < 0;
            const flg_reverse_right = right !== undefined && this.compare(this.heap[right], this.heap[index]) < 0;
            if (flg_reverse_left) {
                if (flg_reverse_right)
                    swap_to = this.compare(this.heap[left], this.heap[right]) < 0 ? left : right;
                else
                    swap_to = left;
            }
            else {
                if (flg_reverse_right)
                    swap_to = right;
                else
                    break; // 正しい順序になった
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
exports.default = BinaryHeap;
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
    // TODO: 無向グラフに
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
    // BinaryHeapによる優先度付きキューを用いたダイクストラ
    dijkstraPQ(start) {
        const size = this.list.length;
        // 最短距離の小さい順に取り出すヒーブ
        const heap = new BinaryHeap((a, b) => {
            if (a.min_cost != b.min_cost)
                return a.min_cost - b.min_cost;
            return a.node_index - b.node_index;
        }, [{ min_cost: 0, node_index: start }]);
        const min_cost = new Array(size); // startからの最短距離
        min_cost.fill(Infinity);
        min_cost[start] = 0;
        const prev = new Array(size); // 直前に訪れるノード
        prev.fill(-1);
        prev[start] = start;
        while (heap.size > 0) {
            const top = heap.pop();
            if (min_cost[top.node_index] < top.min_cost)
                continue; // 取り出した値が最短距離でない場合、無視する
            for (const { to, cost } of this.list[top.node_index]) {
                if (cost < 0) {
                    throw Error("edge cannot have a cost that is less than 0");
                }
                if (min_cost[top.node_index] + cost < min_cost[to]) {
                    min_cost[to] = min_cost[top.node_index] + cost;
                    prev[to] = top.node_index;
                    heap.push({ min_cost: min_cost[to], node_index: to });
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
    // 2部グラフ判定
    // TODO: 有向グラフ対応
    isBigraph() {
        const size = this.list.length;
        const color = new Array(size + 1).fill(0);
        const stack = [];
        for (let i = 0; i < size; i++) {
            if (color[i] != 0)
                continue;
            color[i] = 1;
            stack.push(i);
            while (stack.length > 0) {
                const node = stack.pop();
                for (const edge of this.list[node]) {
                    if (color[edge.to] == color[node])
                        return { result: false };
                    if (color[edge.to] == 0) {
                        color[edge.to] = -color[node];
                        stack.push(edge.to);
                    }
                }
            }
        }
        return { result: true, colors: color };
    }
}
exports.ListGraph = ListGraph;
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const k = +input[0];
const a = [];
for (let i = 0; i < k; i++) {
    a.push([]);
}
for (let i = 1; i < k; i++) {
    a[i].push({ to: (i + 1) % k, cost: 1 });
    a[i].push({ to: (i * 10) % k, cost: 0 });
}
const g = new ListGraph(a);
console.log(g.dijkstraPQ(1).cost[0] + 1);
