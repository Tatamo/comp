class MatrixGraph {
    get size() {
        return this._size;
    }
    constructor(input, a, index_offset, option) {
        if (input.length == 0) {
            this.matrix = [];
        }
        else if (Array.isArray(input[0])) {
            this.initArray(input, a);
        }
        else if (a !== undefined) {
            this.initString(input, a, index_offset, option);
        }
        else {
            throw Error("invalid graph input");
        }
    }
    initArray(input, option) {
        const flg_fill_inf = option !== undefined ? option.zero_as_no_edge : false;
        this._size = input.length;
        this.matrix = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.matrix[i] = input[i].slice();
            if (flg_fill_inf) {
                for (let ii = 0; ii < this.size; ii++) {
                    if (i != ii && this.matrix[i][ii] == 0) {
                        this.matrix[i][ii] = Infinity;
                    }
                }
            }
        }
    }
    initString(input, n, index_offset, option) {
        const flg_fill_inf = option !== undefined ? option.zero_as_no_edge : false;
        this._size = n;
        this.matrix = new Array(this.size);
        const offset = index_offset !== undefined ? index_offset : 0;
        for (let i = 0; i < this.size; i++) {
            this.matrix[i] = input[i + offset].split(" ").map((x) => +x);
            if (flg_fill_inf) {
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
        let result = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            result[i] = this.matrix[i].slice();
        }
        return result;
    }
    warshallFloyd() {
        // initialize
        let result = Array(this.size);
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
var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
const n = +input[0];
const g = new MatrixGraph(input, n, 1);
const a = g.getArray();
const b = g.warshallFloyd();
let flg_failed = false;
top: for (let i = 0; i < n; i++) {
    for (let ii = 0; ii < n; ii++) {
        if (a[i][ii] != b[i][ii]) {
            flg_failed = true;
            break top;
        }
    }
}
if (flg_failed) {
    console.log(-1);
}
else {
    let result = 0;
    for (let u = 0; u < n; u++) {
        loop2: for (let v = u + 1; v < n; v++) {
            for (let w = 0; w < n; w++) {
                if (w == u || w == v)
                    continue;
                if (a[u][v] == a[u][w] + a[w][v]) {
                    // a[u][v]の辺はなくてもいい
                    continue loop2;
                }
            }
            result += a[u][v];
        }
    }
    console.log(result);
}
