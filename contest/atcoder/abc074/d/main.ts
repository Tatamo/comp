type MatrixGraphArray = Array<Array<number>>;


interface MatrixGraphConstructorOption {
	zero_as_no_edge: boolean
}

class MatrixGraph {
	private matrix: MatrixGraphArray;
	private _size: number;
	get size(): number {
		return this._size;
	}

	constructor(input: MatrixGraphArray, option?: MatrixGraphConstructorOption);
	constructor(input: Array<string>, n: number, index_offset?: number, option?: MatrixGraphConstructorOption);
	constructor(input: MatrixGraphArray | Array<string>, a?: number | MatrixGraphConstructorOption, index_offset?: number, option?: MatrixGraphConstructorOption) {
		if (input.length == 0) {
			this.matrix = [];
		}
		else if (Array.isArray(input[0])) {
			this.initArray(<MatrixGraphArray>input, <MatrixGraphConstructorOption>a);
		}
		else if (a !== undefined) {
			this.initString(<Array<string>>input, <number>a, index_offset, option);
		}
		else {
			throw Error("invalid graph input");
		}
	}

	private initArray(input: MatrixGraphArray, option?: MatrixGraphConstructorOption) {
		const flg_fill_inf: boolean = option !== undefined ? option.zero_as_no_edge : false;
		this._size = input.length;
		this.matrix = new Array<Array<number>>(this.size);
		for (let i = 0; i < this.size; i++) {
			this.matrix[i] = input[i].slice();
			if(flg_fill_inf) {
				for (let ii = 0; ii < this.size; ii++) {
					if(i != ii && this.matrix[i][ii] == 0){
						this.matrix[i][ii] = Infinity;
					}
				}
			}
		}
	}

	private initString(input: Array<string>, n: number, index_offset?: number, option?: MatrixGraphConstructorOption) {
		const flg_fill_inf: boolean = option !== undefined ? option.zero_as_no_edge : false;
		this._size = n;
		this.matrix = new Array<Array<number>>(this.size);
		const offset = index_offset !== undefined ? index_offset : 0;
		for (let i = 0; i < this.size; i++) {
			this.matrix[i] = input[i + offset].split(" ").map((x: string): number => +x);
			if(flg_fill_inf) {
				for (let ii = 0; ii < this.size; ii++) {
					if(i != ii && this.matrix[i][ii] == 0){
						this.matrix[i][ii] = Infinity;
					}
				}
			}
		}
	}

	getArray(): MatrixGraphArray {
		// コピーを返す
		let result = new Array<Array<number>>(this.size);
		for (let i = 0; i < this.size; i++) {
			result[i] = this.matrix[i].slice();
		}
		return result;
	}

	warshallFloyd(): MatrixGraphArray {
		// initialize
		let result: MatrixGraphArray = Array<Array<number>>(this.size);
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

declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

const n = +input[0];

const g = new MatrixGraph(input, n, 1);

const a = g.getArray();
const b = g.warshallFloyd();

let flg_failed = false;
top:
for(let i = 0; i < n; i++){
	for(let ii = 0; ii < n; ii++){
		if(a[i][ii] != b[i][ii]){
			flg_failed = true;
			break top;
		}
	}
}

if(flg_failed){
	console.log(-1);
}
else{
	let result = 0;
	for(let u=0; u<n; u++){
		loop2:
		for(let v=u+1; v<n; v++){
			for(let w=0; w<n; w++){
				if(w==u || w==v) continue;
				if(a[u][v] == a[u][w]+a[w][v]){
					// a[u][v]の辺はなくてもいい
					continue loop2;
				}
			}
			result += a[u][v];
		}
	}
	console.log(result);
}

