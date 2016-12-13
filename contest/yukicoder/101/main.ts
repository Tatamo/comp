/// <reference path="./typings/index.d.ts" />
// AC
declare function require(x: string): any;

class Solver{
	edge:Array<number>;
	constructor(public n:number, public k:number, public t:Array<Array<number>>){
		this.edge = new Array<number>(n);
	}
	// 2数,3数の最大公約数
	gcd(x:number, y:number):number;
	gcd(x:number, y:number, z:number):number;
	gcd(x:number, y:number, z?:number):number{
		if(typeof z !== "undefined"){
			return this.gcd(this.gcd(x,y),z);
		}
		var result = x;
		var k=-1;
		var n=y;
		while(k!=0){
			k = result%n;
			result = n;
			n = k;
		}
		return result;
	}
	// 2数,3数の最小公倍数
	lcm(x:number, y:number):number;
	lcm(x:number, y:number, z:number):number;
	lcm(x:number, y:number, z?:number):number{
		if(typeof z !== "undefined"){
			return this.lcm(this.lcm(x,y),z);
		}
		return x*y/this.gcd(x,y);
	}
	constructGraph(){
		for(let i=0; i<this.n; i++){
			let to = i;
			this.t.forEach((v)=>{
				let l = v[0]-1;
				let r = v[1]-1;
				if(to == l){
					to = r;
				}
				else if(to == r){
					to = l;
				}
			});
			this.edge[i] = to;
		}
	}
	solve(){
		this.constructGraph();
		let cycle = new Array(n);
		for(let i=0; i<this.n; i++){
			let c = 1;
			let now = this.edge[i];
			while(now != i){
				now = this.edge[now];
				c++;
			}
			cycle[i] = c;
		}
		let result = cycle.reduce((l, r)=>{
			return this.lcm(l,r);
		});
		console.log(result);
	}
}

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

let n,k;
n = +input.shift();
k = +input.shift();
var t = [];
for(var i=0; i<k; i++){
	t.push(input[i].split(" ").map((v)=>{return +v;}));
}

(new Solver(n, k, t)).solve();
