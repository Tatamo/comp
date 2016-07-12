// AC
class Task{
	public delta;
	constructor(public a:number, public b:number){
		this.delta = a-b;
	}
}

// inputに入力データ全体が入る
function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    var input = input.split("\n");
    var tmp = input[0].split(" ");
    var n = +tmp[0];
    var T = +tmp[1];
    var tasks = [];
	var sum_a = 0; // Aの総和
	var sum_b = 0; // Bの総和
    input.splice(0, 1); // 最初の要素(N T)を削除
    for (var i = 0; i < n; i++) {
        var tmp = input[i].split(" ");
        tasks.push(new Task(+tmp[0], +tmp[1]));
		sum_a += +tmp[0];
		sum_b += +tmp[1];
    }
	// deltaが大きい順に並べます
    tasks.sort((a, b) => {
        if (a.delta < b.delta)
            return 1;
        else if (a.delta > b.delta)
            return -1;
        else
            return 0;
    });

	if(sum_b > T){
		console.log(-1);
		return;
	}
	var sum = sum_a;
	var result=0;
	for(var i=0;i<n; i++){
		if(sum <= T){
			break;
		}
		result += 1;
		//console.log(result, sum, tasks[i].delta);
		sum -= tasks[i].delta;
	}

    console.log(result);
}
//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
// 提出時に出力後jsファイル内のコメントアウトを外すこと
//Main(require("fs").readFileSync("/dev/stdin", "utf8"));
