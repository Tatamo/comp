declare function require(x: string): any;

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

const [a,b,c,d,e,f] = input[0].split(" ").map((x:string):number=>+x);

let result_water = -1;
let result_sugar = -1;
// mizu
top:
for(let n=1; a*n<=30; n++){
	for(let i=0; i<=n; i++){
		const water = 100*a*i+100*b*(n-i);
		if(water > f) continue;

		// satou
		const sugar_limit = (a*i+b*(n-i))*e;
		for(let m=0; c*m<=sugar_limit; m++){
			for(let ii=0; ii<=m; ii++){
				const sugar = c*ii+d*(m-ii);
				if(water + sugar > f || sugar>sugar_limit) continue;
				
				if(sugar == sugar_limit){
					result_water = water;
					result_sugar = sugar;
					break top;
				}

				if(result_water == -1 || result_sugar == -1){
					result_water = water;
					result_sugar = sugar;
				}
				else if(sugar/(water+sugar)>result_sugar/(result_water+result_sugar)){
					result_water = water;
					result_sugar = sugar;
				}
			}
		}
	}
}

//console.log(a,b,c,d,e,f);
console.log(result_water+result_sugar, result_sugar);
