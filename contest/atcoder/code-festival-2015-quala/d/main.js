function check(n, x, s) {
    var left = 0;
    var right = 0;
    //console.log("s=",s);
    for (var i = 0; i < x.length; i++) {
        //console.log(i,"th:");
        if (i == 0)
            left = x[i] - 1;
        else
            left = Math.max(x[i] - x[i - 1] - 1 - right, 0);
        //console.log("left:",left);
        if (s < left)
            return false;
        right = Math.max(Math.floor((s - left) / 2), s - left * 2); // 右に動いてから左に折り返すか、その逆か
        //console.log("right:",right);
        if (i == x.length - 1 && right < n - x[i]) {
            return false;
        }
    }
    return true;
}
// inputに入力データ全体が入る
function Main(input) {
    // 1行目がinput[0], 2行目がinput[1], …に入る
    var input = input.trim().split("\n");
    var tmp = input[0].split(" ");
    var n = +tmp[0];
    var m = +tmp[1];
    var x = [];
    var dmax = 0;
    input.splice(0, 1); // 最初の要素(N T)を削除
    for (var i = 0; i < m; i++) {
        x[i] = +input[i];
        if (i == 0)
            dmax = x[i] - 1;
        if (i != 0 && x[i] - x[i - 1] > dmax)
            dmax = x[i] - x[i - 1];
        if (i == m - 1 && n - x[i] > dmax)
            dmax = n - x[i];
    }
    var result = 0;
    for (var i = 0; i <= dmax * 2; i++) {
        if (check(n, x, i)) {
            result = i;
            break;
        }
    }
    console.log(result);
}
//*この行以降は編集しないでください（標準入出力から一度に読み込み、Mainを呼び出します）
// 提出時にコンパイルされた.jsファイル内のコメントアウトを外すこと
//Main(require("fs").readFileSync("/dev/stdin", "utf8"));
