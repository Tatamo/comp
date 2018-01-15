"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class UnionFind {
    get length() {
        return this._length;
    }
    constructor(length) {
        this._length = length;
        this._parent = new Array(length);
        for (let i = 0; i < length; i++) {
            this._parent[i] = i;
        }
        this._rank = new Array(length).fill(1);
        this._size = new Array(length).fill(1);
    }
    root(node) {
        const stack = [node];
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
        const result = stack.pop();
        while (stack.length > 0) {
            this._parent[stack.pop()] = result;
        }
        return result;
    }
    size(node) {
        return this._size[this.root(node)];
    }
    check(x, y) {
        return this.root(x) === this.root(y);
    }
    unite(x, y) {
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
exports.UnionFind = UnionFind;
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, m] = input[0].split(" ").map((x) => +x);
const uf = new UnionFind(n);
for (let i = 0; i < m; i++) {
    const [a, b] = input[i + 1].split(" ").map((x) => +x);
    uf.unite(a - 1, b - 1);
}
const set = new Set();
for (let i = 0; i < n; i++) {
    set.add(uf.root(i));
}
console.log(set.size - 1);
