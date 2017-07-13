var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
var index = 0;
while (true) {
    var n = +input[index++];
    if (n == 0)
        break;
    var s = [];
    for (var i = 0; i < n; i++) {
        s.push(input[index++]);
    }
    s = s.map(function (name) {
        var result = "";
        var flg = true;
        for (var _i = 0, name_1 = name; _i < name_1.length; _i++) {
            var c = name_1[_i];
            if (flg) {
                result += c;
                flg = false;
            }
            if (/[aiueo]/.test(c)) {
                flg = true;
            }
        }
        return result;
    }).sort();
    var countDuplicate = function (s1, s2) {
        var l = Math.min(s1.length, s2.length);
        for (var i = 0; i < l; i++) {
            if (s1[i] != s2[i]) {
                return i;
            }
        }
        if (s1.length == s2.length)
            return -1;
        return l;
    };
    var result = 0;
    for (var i = 0; i < n; i++) {
        if (i == 0)
            continue;
        var c = countDuplicate(s[i - 1], s[i]);
        if (c == -1) {
            result = -2;
            break;
        }
        if (c > result) {
            result = c;
        }
    }
    console.log(result + 1);
}
