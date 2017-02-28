import {parser} from "./parser";

declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8").split("\n");
var d:number = +input[1];
var s:string = input[2];

let blank = ():Array<number>=>{
	let result = new Array(d+1);
	for(let i=0; i<=d; i++) result[i] = 0;
	return result;
};

console.log(parser.parse(s, (arg)=>{
	let token = arg.token;
	let tmp:Array<number>;
	if(arg.terminal == true){
		let value = arg.value;
		switch(token){
			case "DIGITS":
				tmp = blank();
				tmp[0] = +value;
				return tmp;
			case "X":
				tmp = blank();
				tmp[1] = 1;
				return tmp;
		}
	}
	else{
		let c = arg.children;
		let pattern = arg.pattern;
		switch(token){
			case "EXP":
				if(c.length == 1){
					return c[0];
				}
				else{
					tmp = c[0];
					for(let i=0; i<=d; i++){
						tmp[i] += c[2][i];
					}
				}
			case "DIVTERM":
				return c[0];
			case "TERM":
				if(c.length == 1){
					return c[0];
				}
				else{
					tmp = blank();
					// c[2]はATOMなので[1]==1 or [0]>0のいずれか
					if(c[2][1] == 1){
						for(let i=0; i<d; i++){
							tmp[i+1] = c[0][i];
						}
					}
					else if(c[2][0] > 0){
						for(let i=0; i<=d; i++){
							tmp[i] = c[0][i]*c[2][0];
						}
					}
					return tmp;
				}
			case "ATOM":
				return c[0];
			case "DIV":
				tmp = blank();
				for(let i=1; i<=d; i++){
					tmp[i-1] = c[1][i]*i;
				}
				return tmp;
		}
	}
	return null;
}).join(" "));

