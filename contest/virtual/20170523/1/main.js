var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
let n = +input.shift();
//let a = input.shift().split(" ").map((x:string)=>{return +x});
//a.sort((x:number,y:number)=>{return x-y;});
let t = [];
let a = [];
for (let i = 0; i < n; i++) {
    [t[i], a[i]] = input[i].split(" ").map((x) => { return +x; });
}
let c_t = 1;
let c_a = 1;
for (let i = 0; i < n; i++) {
    console.log("t[i]:", t[i], ",c_t", c_t);
    console.log("a[i]:", a[i], ",c_a", c_a);
    if (t[i] >= c_t && a[i] >= c_a) {
        c_t = t[i];
        c_a = a[i];
    }
    else {
        let m = Math.max(Math.ceil(c_t / t[i]), Math.ceil(c_a / a[i]));
        c_t = t[i] * m;
        c_a = a[i] * m;
    }
    console.log(c_t, c_a);
}
console.log(c_t, c_a, c_t + c_a);
