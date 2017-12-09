"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [m, n] = input[0].split(" ").map((x) => +x);
const sieve = (n) => {
    const result = new Array(n + 1).fill(true);
    result[0] = false;
    result[1] = false;
    for (let i = 2; i * i <= n; i++) {
        for (let ii = i * 2; ii <= n; ii += i) {
            result[ii] = false;
        }
    }
    return result;
};
const stage = (p, n) => {
    const size = Math.ceil(Math.sqrt(n));
    const result = [];
    for (let i = 0; i < size; i++) {
        result[i] = new Array(size).fill(null);
    }
    const start_y = Math.floor(size / 2);
    const start_x = Math.floor((size - 1) / 2);
    const dir_y = [0, -1, 0, 1];
    const dir_x = [1, 0, -1, 0];
    let y = start_y;
    let x = start_x;
    let cnt = 1;
    let cnt_max = 2;
    let d = 0;
    for (let i = 1; i <= n; i++) {
        if (p[i]) {
            result[y][x] = i;
        }
        y += dir_y[d];
        x += dir_x[d];
        cnt -= 1;
        if (cnt == 0) {
            cnt_max += 1;
            cnt = Math.floor(cnt_max / 2);
            d = (d + 1) % 4;
        }
    }
    return result;
};
class Point {
    constructor(num) {
        this.num = num;
        this.children = new Set();
    }
    add(c) {
        this.children.add(c);
    }
    toString() {
        return this.num.toString();
    }
}
const mkgraph = (stage, n) => {
    const include = new Array(n + 1).fill(new Set());
    const size = Math.ceil(Math.sqrt(n));
    const map = new Array(size);
    for (let i = 0; i < size; i++) {
        map[i] = new Array(size).fill(new Set());
    }
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // add point
            if (stage[y][x] === null)
                continue;
            const p = new Point(stage[y][x]);
            for (const parent of map[y][x]) {
                parent.add(p);
            }
            map[y][x] = new Set();
            map[y][x].add(p);
            // influence
            for (let i = -1; i <= 1; i++) {
                const ny = y + 1;
                const nx = x + i;
                if (ny >= size || nx < 0 || nx >= size)
                    continue;
                // 包含解消しつつ追加
                outer: for (const p1 of map[y][x]) {
                    for (const p2 of map[ny][nx]) {
                        if (p2.children.has(p1))
                            continue outer;
                        else if (p1.children.has(p2))
                            map[ny][nx].delete(p2);
                    }
                    map[ny][nx].add(p1);
                }
            }
        }
    }
    return map;
};
const solve = (stage, n, start) => {
    const g = mkgraph(stage, n);
    const size = Math.ceil(Math.sqrt(n));
    let y = 0;
    let x = 0;
    top: for (let i = 0; i < size; i++) {
        for (let ii = 0; ii < size; ii++) {
            if (stage[i][ii] === start) {
                y = i;
                x = ii;
                break top;
            }
        }
    }
    const root = g[y][x].values().next().value;
};
const s = mkgraph(stage(sieve(n), n), n);
const show = () => {
    for (let i = 0; i < Math.ceil(Math.sqrt(n)); i++) {
        let str = "";
        for (let ii = 0; ii < Math.ceil(Math.sqrt(n)); ii++) {
            str += "{";
            for (const p of s[i][ii]) {
                str += p;
                str += ",";
            }
            str += "}, ";
        }
        console.log(str);
    }
    const bfs = (p) => {
        let result_sum = 0;
        let result_num = 0;
        const _bfs = (p, sum) => {
            if (p.children.size === 0) {
                if (sum > result_sum || sum == result_sum && p.num > result_num) {
                    result_sum = sum;
                    result_num = p.num;
                }
            }
        };
    };
};
