/// <reference path="./typings/index.d.ts" />
declare function require(x: string): any;

class Solver{
	constructor(public t:Array<number>){
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
	solve(){
		var l23 = this.lcm(this.t[1],this.t[2]);
		var speed2 = l23/this.t[1];
		var speed3 = l23/this.t[2];
		var progress2 = 0;
		var progress3 = 0;
		var sec = 0;
		while(true){
			sec++;
			progress2 += speed2;
			progress3 += speed3;
			if(progress2 + speed2 + progress3 + speed3 > l23){
				break;
			}
		}
		var distance = l23 - progress2 - progress3;
		var bunbo_tmp = speed2+speed3;
		var bunshi_tmp = distance;
		var bunbo = bunbo / this.gcd(bunbo_tmp, bunshi_tmp);
		var bunshi = bunshi / this.gcd(bunbo_tmp, bunshi_tmp) + sec * bunbo;
		
		/*
		// 1秒あたりに見るべきステップ数
		var T = this.lcm(this.t[0],this.t[1],this.t[2]);
		// 1往復の長さ
		var len = T*T;

		var speed = [T/this.t[0], T/this.t[1], T/this.t[2]];
		var check = (x,y,z) =>{
			if(x == y  && y == z || len-x == y && y == z ||
			   x == len-y && len-y == z || x == y && y == len-z){
				return true;
			}
			return false;
		}
		var progress = [0,0,0];
		var result_step:number;
		console.log("speed:",speed);
		for(var i=0; i<len*2; i++){
			console.log("i:",i);
			console.log("progress:",progress);
			if(i != 0){
				if(check(progress[0], progress[1], progress[2])){
					result_step = i;
					break;
				}
			}
			for(var ii=0; ii<3; ii++){
				progress[ii] += speed[ii];
				progress[ii] = progress[ii]%len;
			}
		}
		var g = this.gcd(result_step, len);
		console.log("len:",len);
		console.log("step:",result_step);
		console.log("gcd:",g);
		var time = result_step/T;
		console.log(time);
		*/
	}
}

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

var t = [];
for(var i=0; i<3; i++){
	t.push(+input[i]);
}

(new Solver(t)).solve();
