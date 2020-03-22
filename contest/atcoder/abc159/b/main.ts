import * as fs from "fs";

function checkKaibun(str: string): boolean {
	for (let i = 0; i < Math.floor(str.length / 2); i++) {
		if (str[i] !== str[str.length - 1 - i]) return false;
	}
	return true;
}

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const s = input[0];

const n = s.length;
if (checkKaibun(s) && checkKaibun(s.substring(0, (n - 1) / 2)) && checkKaibun(s.substring((n + 3) / 2 - 1, n))) {
	console.log('Yes');
} else {
	console.log('No');
}
