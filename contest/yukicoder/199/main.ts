declare function require(x: string): any;
// AC

var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");

var point = [];
for(var i=0; i<5; i++){
	var tmp = input[i].split(" ");
	point.push([+tmp[0], +tmp[1]]);
}

var count = 0; // 条件を満たす2点の組の数
var pair = [];
for(var p1=0; p1<5; p1++){
	for(var p2=p1+1; p2<5; p2++){
		//console.log("points: ", p1, p2);
		var flg = true;
		var cnt_p = 0; // +
		var cnt_m = 0; // -
		for(var p3=0; p3<5; p3++){
			if(p3 == p1 || p3 == p2) continue;
			var dx1 = point[p2][0] - point[p1][0];
			var dy1 = point[p2][1] - point[p1][1];
			var dx2 = point[p3][0] - point[p1][0];
			var dy2 = point[p3][1] - point[p1][1];
			var deg1 = Math.atan2(dy1, dx1);
			var deg2 = Math.atan2(dy2, dx2);
			var deg = (deg2-deg1);
			//console.log([dx1, dy1], [dx2, dy2]);
			//console.log(p1,p2,p3,"deg: ", deg*180/Math.PI);
			if(deg>Math.PI) deg -= Math.PI*2;
			if(deg<-Math.PI) deg += Math.PI*2;
			if((deg*180/Math.PI)%180 == 0) {
				flg = false;
				break;
			}
			else if(deg < 0) cnt_m += 1;
			else if(deg > 0) cnt_p += 1;
		}
		if(cnt_p == 2 && cnt_m == 1 ||
		   cnt_p == 1 && cnt_m == 2){
		}
		else{
			flg = false;
		}
		if(flg) {
			count += 1;
			pair.push([p1,p2]);
		}
		//if(flg) console.log("cnt++");
	}
}
//console.log("count: ", count);
//console.log(pair);
if(count == 5) {
	var cnt = [0,0,0,0,0];
	for(var i=0; i<5; i++){
		cnt[pair[i][0]]++;
		cnt[pair[i][1]]++;
	}
	var flg = true;
	for(var i=0; i<5; i++){
		if(cnt[i] != 2){
			flg = false;
			break;
		}
	}
	if(flg) console.log("YES");
	else console.log("NO");
}
else console.log("NO");

