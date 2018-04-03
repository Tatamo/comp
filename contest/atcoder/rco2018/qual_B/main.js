"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
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
    push(...values) {
        this._in.push(...values);
    }
    shift() {
        if (this._out.length === 0)
            this._fix();
        return this._out.pop();
    }
    toArray() {
        this._fix();
        return this._out.slice().reverse();
    }
}
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
class Stage {
    constructor(h, w, _data) {
        this.h = h;
        this.w = w;
        this._data = _data;
        this._map = new Array(h).fill([]).map(() => new Array(w).fill(null));
        for (let i = 0; i < this._data.length; i++) {
            const { x, y } = this._data[i];
            this._map[y][x] = i;
        }
        // this.initGaps();
    }
    get map() {
        return this._map;
    }
    get gaps() {
        return this._gaps;
    }
    get data() {
        return this._data;
    }
    initGaps() {
        this._gaps = new BinaryHeap((a, b) => a.diff - b.diff);
        for (let index = 0; index < this._data.length; index++) {
            const pos = this._data[index];
            const prev = index === 0 ? null : this._data[index - 1];
            const next = index === this._data.length - 1 ? null : this._data[index + 1];
            const diff_prev = prev === null ? 0 : Stage.getPosDistance(pos, prev);
            const diff_next = next === null ? 0 : Stage.getPosDistance(pos, next);
            const diff = diff_prev + diff_next;
            this._gaps.push({ index, pos, prev, next, diff_prev, diff_next, diff });
        }
    }
    // 0:swapped 1:p1 moved 2:p2 moved -1:no move
    swap(p1, p2) {
        const num_p1 = this._map[p1.y][p1.x];
        const num_p2 = this._map[p2.y][p2.x];
        if (num_p1 === num_p2)
            return -1;
        let result = 0;
        if (num_p1 === null) {
            result = 2;
        }
        else if (num_p2 === null) {
            result = 1;
        }
        this._map[p1.y][p1.x] = num_p2;
        this._map[p2.y][p2.x] = num_p1;
        if (num_p1 !== null)
            this._data[num_p1] = p2;
        if (num_p2 !== null)
            this._data[num_p2] = p1;
        return result;
    }
    static getPosDistance(p1, p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
}
// h:200
// w:200
// d:16000
// k:4000
const [h, w, d, k] = input[0].split(" ").map((x) => +x);
const input_sectors = [];
for (let i = 0; i < d; i++) {
    const [y, x] = input[i + 1].split(" ").map((x) => +x);
    input_sectors.push({ x, y });
}
const st = new Stage(h, w, input_sectors);
const index2pos = (i, w) => {
    return { x: i % w, y: Math.floor(i / w) };
};
const getNextPos = (p, h, w) => {
    if (p.x + 1 < w)
        return { x: p.x + 1, y: p.y };
    else if (p.y + 1 < h)
        return { x: 0, y: p.y + 1 };
    return null;
};
// 先頭からd個を順に並べるだけ
let q = 0;
let index = 0;
const swap = (p1, p2) => {
    if (st.swap(p1, p2) !== -1) {
        q += 1;
        console.log(`${p1.y} ${p1.x} ${p2.y} ${p2.x}`);
    }
};
let flg_init = false;
while (index < d && q < k) {
    if (q < k * 7 / 8) {
        const pos_from = { x: st.data[index].x, y: st.data[index].y };
        const pos_to = index2pos(index, w);
        swap(pos_from, pos_to);
    }
    else {
        if (!flg_init) {
            st.initGaps();
            flg_init = true;
        }
        const gap = st.gaps.pop();
        if (gap.prev === null) {
            continue;
        }
        else {
            let next = getNextPos(gap.prev, h, w);
            if (next === null)
                continue;
            swap(gap.pos, next);
        }
    }
    index += 1;
}
