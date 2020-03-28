import * as fs from "fs";

interface ChildrenIndex {
	left?: number;
	right?: number;
}

type Comparator<T> = (a: T, b: T) => number;

class BinaryHeap<T> {
	private heap: Array<T>;
	private compare: Comparator<T>;

	get size(): number {
		return this.heap.length;
	}

	constructor(compare?: "min" | "max" | Comparator<T>, iterable?: Iterable<T>) {
		this.heap = new Array<T>();
		// 比較関数を用意する(デフォルトは最小優先)
		if (compare === undefined || compare === "min") {
			this.compare = (a, b) => {
				if (a < b) return -1;
				else if (b < a) return 1;
				return 0;
			};
		}
		else if (compare === "max") {
			this.compare = (a, b) => {
				if (a > b) return -1;
				else if (b > a) return 1;
				return 0;
			};
		}
		else {
			this.compare = compare as Comparator<T>;
		}

		if (iterable !== undefined) {
			for (const value of iterable) {
				this.push(value);
			}
		}
	}

	private _isValidIndex(index: number): boolean {
		return index >= 0 && index < this.heap.length;
	}

	private _parent(index: number): number {
		if (!this._isValidIndex(index)) throw new Error("index out of range");
		const parent = Math.floor((index - 1) / 2);
		if (this._isValidIndex(parent)) return parent;
		return -1;
	}

	private _children(index: number): ChildrenIndex {
		if (!this._isValidIndex(index)) throw new Error("index out of range");
		const result: ChildrenIndex = {};
		const left = index * 2 + 1;
		const right = index * 2 + 2;
		if (this._isValidIndex(left)) result.left = left;
		if (this._isValidIndex(right)) result.right = right;
		return result;
	}

	push(value: T) {
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

	peek(): T | undefined {
		return this.heap[0];
	}

	pop(): T | undefined {
		if (this.heap.length <= 1) return this.heap.pop();
		const result = this.heap[0];
		// 末尾の要素を取り出し、rootと入れ替える
		this.heap[0] = this.heap.pop()!;
		let index = 0;
		let { left, right } = this._children(index);
		while (left !== undefined) { // leftがundefinedならrightもundefined
			let swap_to = -1;
			const flg_reverse_left = this.compare(this.heap[left], this.heap[index]) < 0;
			const flg_reverse_right = right !== undefined && this.compare(this.heap[right], this.heap[index]) < 0;
			if (flg_reverse_left) {
				if (flg_reverse_right) swap_to = this.compare(this.heap[left], this.heap[right!]) < 0 ? left : right!;
				else swap_to = left;
			}
			else {
				if (flg_reverse_right) swap_to = right!;
				else break; // 正しい順序になった
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

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [x, y, a, b, c] = input[0].split(" ").map((x: string): number => +x);
const p = input[1].split(" ").map((x: string): number => +x);
const q = input[2].split(" ").map((x: string): number => +x);
const r = input[3].split(" ").map((x: string): number => +x);

interface Apple {
	color: "red" | "green" | "blank";
	value: number;
}
const heap = new BinaryHeap<Apple>((a, b) => b.value - a.value);

for (const ra of p) heap.push({ color: "red", value: ra });
for (const ga of q) heap.push({ color: "green", value: ga });
for (const ba of r) heap.push({ color: "blank", value: ba });

let red_cnt = 0;
let green_cnt = 0;
let blank_cnt = 0;
let result = 0;
while (red_cnt <= x && green_cnt <= y && red_cnt + green_cnt + blank_cnt < x + y) {
	const top = heap.pop()!;
	if (top.color === "red") {
		if (red_cnt >= x) continue;
		red_cnt++;
		result += top.value;
	}
	if (top.color === "green") {
		if (green_cnt >= y) continue;
		green_cnt++;
		result += top.value;
	}
	if (top.color === "blank") {
		blank_cnt++;
		result += top.value;
	}
}

console.log(result);
