import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");

export default class Queue<T> {
	private _in: Array<T>;
	private _out: Array<T>;

	get length(): number {
		return this._in.length + this._out.length;
	}

	constructor(iterable?: Iterable<T>) {
		this._in = iterable === undefined ? new Array<T>() : [...iterable];
		this._out = new Array<T>();
	}

	private _fix() {
		if (this._in.length === 0) return;
		this._out = this._in.reverse().concat(this._out);
		this._in = new Array<T>();
	}

	push(...values: Array<T>): void {
		this._in.push(...values);
	}

	shift(): T | undefined {
		if (this._out.length === 0) this._fix();
		return this._out.pop();
	}

	toArray(): Array<T> {
		this._fix();
		return this._out.slice().reverse();
	}

	toReversedArray(prevent_copy: boolean = false): Array<T> {
		this._fix();
		if (prevent_copy) return this._out;
		return this._out.slice();
	}
}

interface Pos {
	x: number;
	y: number;
}

type Directions = "U" | "D" | "L" | "R";

/*
const symbols = {
	"x": -1,
	"#": 0,
	".": 1,
	"o": 2,
	"@": 3
};
*/

class Stage {
	private alive: boolean;
	private start: Pos;
	private current: Pos;
	private traps: Array<Pos>;
	private height: number;
	private width: number;
	private move_memory: Queue<Pos>;
	private memory_size: number;
	private memory_weight: number;
	constructor(private array: Array<Array<string>>, h: number, w: number) {
		this.alive = true;
		this.move_memory = new Queue<Pos>();
		this.memory_size = 20;
		this.memory_weight = 1;
		this.height = h;
		this.width = w;
		this.traps = [];
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				switch (this.array[y][x]) {
					case "@":
						this.start = {x, y};
						this.array[y][x] = ".";
						break;
					case "x":
						this.traps.push({x, y});
						break;
				}
			}
		}
		this.current = {x: this.start.x, y: this.start.y};
	}
	static dir2Pos(dir: Directions): Pos {
		switch (dir) {
			case "U":
				return {x: 0, y: -1};
			case "D":
				return {x: 0, y: 1};
			case "L":
				return {x: -1, y: 0};
			case "R":
				return {x: 1, y: 0};
		}
	}
	evalMove(dir: Directions): number {
		const pos = Stage.dir2Pos(dir);
		const x = this.current.x + pos.x;
		const y = this.current.y + pos.y;
		let result = this.checkMovable(dir);
		if (result === 2 || result === 1) {
			const mem: Array<Pos> = this.move_memory.toReversedArray(true);
			for (let i = 0; i < this.move_memory.length; i++) {
				const rank = this.move_memory.length - i;
				if (mem[i].x == x && mem[i].y === y) result -= this.memory_weight * rank;
			}
			return result;
		}
		else if (result === 0) return -this.memory_weight * this.memory_size;
		return result;
	}
	// 2:success (get coin) 1:success 0:no move -Infinity:trapped
	checkMovable(dir: Directions): number {
		const pos = Stage.dir2Pos(dir);
		const x = this.current.x + pos.x;
		const y = this.current.y + pos.y;
		let result = 1;
		switch (this.array[y][x]) {
			case "o":
				result = 2;
				break;
			case "#":
				result = 0;
				break;
			case "x":
				result = -Infinity;
				this.alive = false;
				break;
		}
		return result;
	}
	getMovableDirs(): Array<Directions> {
		const result: Array<Directions> = [];
		for (const d of "UDLR") {
			if (this.checkMovable(d as Directions) !== -1) {
				result.push(d as Directions);
			}
		}
		return result;
	}
	// 1:success 0:no move -1:trapped
	move(dir: "U" | "D" | "L" | "R"): number {
		const result = this.checkMovable(dir);
		if (result > 0) {
			this.array[this.current.y][this.current.x] = ".";
			const pos = Stage.dir2Pos(dir);
			this.current.x += pos.x;
			this.current.y += pos.y;
			this.move_memory.push({x: this.current.x, y: this.current.y});
			if (this.move_memory.length > this.memory_size) this.move_memory.shift();
		}
		return result;
	}
}

// n:100
// k:8
// h:50
// w:50
// t:2500
const [n, k, h, w, t] = input[0].split(" ").map((x: string): number => +x);
const all_stages: Array<Stage> = [];
for (let i = 0; i < n; i++) {
	const tmp = [];
	for (let ii = 0; ii < h; ii++) {
		tmp.push(input[1 + i * h + ii].split(""));
	}
	all_stages.push(new Stage(tmp, h, w));
}

// [0, x)の乱整数を得る
const randInt = (x: number) => {
	return Math.floor(Math.random() * x);
};

// 選ぶマップは決め打つ
const selected = [];
for (let i = 0; i < k; i++) {
	let tmp = randInt(n);
	while (selected.indexOf(tmp) !== -1) tmp = randInt(n);
	selected.push(tmp);
}

console.log(selected.join(" "));
const stages: Array<Stage> = [];
for (const index of selected) {
	stages.push(all_stages[index]);
}

let result = "";
let alives = stages.length;
const DIRS: Array<Directions> = ["U", "D", "L", "R"];
for (let i = 0; i < t && alives > 0; i++) {
	const kouho = new Array(4).fill(0);
	for (let d = 0; d < 4; d++) {
		let flg_no_move = true;
		for (const st of stages) {
			kouho[d] += st.evalMove(DIRS[d]);
			if (st.checkMovable(DIRS[d]) !== 0) flg_no_move = false;
		}
		// 全く動けない選択肢はだめ
		if (flg_no_move) kouho[d] = -Infinity;
	}
	let max: Array<number> = [];
	let max_value = -Infinity;
	for (let d = 0; d < 4; d++) {
		if (kouho[d] > max_value) {
			max = [d];
			max_value = kouho[d];
		}
		else if (kouho[d] === max_value) {
			max.push(d);
		}
	}
	if (i > 1300 && i < 1320) console.error(kouho, max);
	if (max.length === 0) {
		// 初期配置から罠に囲まれていない限り生じ得ないが
		result += DIRS[randInt(4)];
		break;
	}
	// const direction: Directions = DIRS[Math.random() < 0.9 ? max[randInt(max.length)] : randInt(max.length)];
	const select = randInt(max.length);
	let direction: Directions = DIRS[max[select]];

	result += direction;
	for (let ii = stages.length - 1; ii >= 0; ii--) {
		if (stages[ii].move(direction) === -1) {
			alives -= 1;
			stages.splice(ii, 1);
		}
	}
}
console.log(result);

