declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
input.pop();

let nkx = input.shift().split(" ");
let n = +nkx[0];
let k = +nkx[1];
let x = +nkx[2]-1;

type Pair = {a:number, b:number};

let swap = new Array<Pair>(k);

let cups = new Array<number>(n+1);
for(let i=0; i<=n; i++){
	cups[i] = i;
}

let c = input.pop().split(" ").map((x:string)=>{return +x});

for(let i=0; i<k; i++){
	let line = input[i].split(" ");
	if(i == x){
		swap[i] = {a:-1,b:-1};
		continue;
	}
	let a = +line[0];
	let b = +line[1];
	swap[i]={a:a,b:b};
}


// 前から
for(let i=0; i<x;i++){
	let query = swap[i]!;
	let a = query.a;
	let b = query.b;
	let tmp = cups[a];
	cups[a] = cups[b];
	cups[b] = tmp;
}

// 後ろから
c.unshift(0);
for(let i=k-1; i>x; i--){
	let query = swap[i]!;
	let a = query.a;
	let b = query.b;
	let tmp = c[a];
	c[a] = c[b];
	c[b] = tmp;
}

let ans_a = 0;
let ans_b = 0;
for(let i=0; i<=n; i++){
	if(cups[i] != c[i]){
		if(ans_a == 0){
			ans_a = i;
		}
		else{
			ans_b = i;
			break;
		}
	}
}

console.log(ans_a, ans_b);
