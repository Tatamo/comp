"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Queue {
    constructor(iterable) {
        this._in = iterable === undefined ? new Array() : [...iterable];
        this._out = new Array();
    }
    get length() {
        return this._in.length + this._out.length;
    }
    _fix() {
        this._out = this._in.reverse().concat(this._out);
        this._in = new Array();
    }
    push(value) {
        this._in.push(value);
    }
    shift() {
        if (this._out.length == 0)
            this._fix();
        return this._out.pop();
    }
    toArray() {
        this._fix();
        return this._out.slice().reverse();
    }
}
exports.default = Queue;
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, k, l] = input[0].split(" ").map((x) => +x);
const ways = [];
for (let i = 0; i < n; i++) {
    ways.push([]);
}
for (let i = 1; i < 1 + k; i++) {
    const [p, q] = input[i].split(" ").map((x) => +x);
    ways[p - 1].push(q - 1);
    ways[q - 1].push(p - 1);
}
const rails = [];
for (let i = 0; i < n; i++) {
    rails.push([]);
}
for (let i = 1 + k; i < 1 + k + l; i++) {
    const [r, s] = input[i].split(" ").map((x) => +x);
    rails[r - 1].push(s - 1);
    rails[s - 1].push(r - 1);
}
const findIslands = (n, g) => {
    const result = new Array(n);
    const queue = new Queue();
    const checked = new Array(n).fill(false);
    const bfs = (node, island_id) => {
        if (checked[node])
            return;
        result[node] = island_id;
        checked[node] = true;
        for (const to of g[node]) {
            queue.push(to);
        }
    };
    let island_id = 0;
    for (let i = 0; i < n; i++) {
        if (checked[i])
            continue;
        queue.push(i);
        while (queue.length > 0) {
            bfs(queue.shift(), island_id);
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
