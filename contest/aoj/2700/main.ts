declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

var index = 0;
while(true){
	let n:number = +input[index++];
	if(n==0) break;
	let s:Array<string> = [];
	for(let i=0; i<n; i++){
		s.push(input[index++]);
	}

	s = s.map((name)=>{
		let result = "";
		let flg = true;
		for(let c of name){
			if(flg){
				result += c;
				flg = false;
			}
			if(/[aiueo]/.test(c)){
				flg = true;
			}
		}
		return result;
	}).sort();

	let countDuplicate = (s1: string, s2: string)=>{
		let l = Math.min(s1.length, s2.length);
		for(let i = 0; i<l; i++){
			if(s1[i] != s2[i]){
				return i;
			}
		}
		if(s1.length == s2.length) return -1;
		return l;
	};

	let result = 0;
	for(let i=0; i<n; i++){
		if(i==0) continue;
		let c = countDuplicate(s[i-1],s[i]);
		if(c == -1) {
			result = -2;
			break;
		}
		if(c > result){
			result = c;
		}
	}
	console.log(result+1);
}
