import * as fs from "fs";

function check(n: number) {
	const s = n + "";
	let c = s[0];
	for (let i = 0; i < s.length; i++) {
		if (Math.abs((+s[i]) - (+c)) > 1) return false;
		c = s[i];
	}
	return true;
}

let count = 0;
for (let i = 1; i <= 3234566667; i++) {
	if (i % 1e7 === 0) console.error(i);
	if (check(i)) {
		count++;
		if (count % 100 === 0) console.log(i);
	}
}

