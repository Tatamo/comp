declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

let n = +input.shift();
let a = input.shift().split(" ").map((x:string)=>{return +x});

a.sort((x:number,y:number)=>{return x-y;});

let b = [];
for(let i=0; i<a.length; i++){
	if(b[a[i]] === undefined) {
		b[a[i]] = 1;
	}
	else{
		b[a[i]]++;
	}
}

let d=0;
let v=0;
for(let x of b){
	if(x === undefined) continue;
	v++;
	if(x%2==0){
		d++;
	}
}

if(d%2==0){
	console.log(v);
}
else{
	console.log(v-1);
}
