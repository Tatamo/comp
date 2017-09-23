import * as fs from "fs";
var input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const [h, w] = input[0].split(" ").map((x: string): number => +x);
const a = new Array<number>(26);
for (let i = 0; i < 26; i++) a[i] = 0;

for (let i = 0; i < h; i++) {
	for (let ii = 0; ii < w; ii++) {
		const index = input[i + 1][ii].charCodeAt(0) - "a".charCodeAt(0);
		a[index] += 1;
	}
}
a.sort().reverse();

let c4 = Math.floor(h / 2) * Math.floor(w / 2);
let c2 = 0;
let c1 = 0;
if (w % 2 != 0 && h % 2 != 0) {
	c2 = Math.floor(w / 2) + Math.floor(h / 2);
	c1 = 1;
}
else if (w % 2 != 0) {
	c2 = Math.floor(h / 2);
}
else if (h % 2 != 0) {
	c2 = Math.floor(w / 2);
}

// 貪欲
let index = 0;
while (c4 > 0 && index < 26) {
	if (a[index] >= 4) {
		a[index] -= 4;
		c4 -= 1;
	}
	else {
		index += 1;
	}
}
if(c4>0){
	console.log("No");
}
else{
	let index = 0;
	while (c2 > 0 && index < 26) {
		if (a[index] >= 2) {
			a[index] -= 2;
			c2 -= 1;
		}
		else {
			index += 1;
		}
	}
	if(c2>0){
		console.log("No");
	}
	else{
		let index = 0;
		while (c1 > 0 && index < 26) {
			if (a[index] >= 1) {
				a[index] -= 1;
				c1 -= 1;
			}
			else {
				index += 1;
			}
		}
		if(c2>0){
			console.log("No");
		}
		else{
			let flg_yes = true;
			for(let i=0; i<26; i++){
				if(a[i]!=0) {
					flg_yes = false;
					break;
				}
			}
			if(flg_yes) console.log("Yes");
			else console.log("No");
		}
	}
}
