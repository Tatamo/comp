const randint = (x: number) => {
	return Math.floor(Math.random() * x);
};
const n = 2000;
console.log(n);
for (let i = 0; i < n; i++) {
	console.log(`${randint(10000)} ${randint(10000)}`);
}
