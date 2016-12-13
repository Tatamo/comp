/// <reference path="./typings/index.d.ts" />
var Solver = (function () {
    function Solver(n, k, t) {
        this.n = n;
        this.k = k;
        this.t = t;
        this.edge = new Array(n);
    }
    Solver.prototype.gcd = function (x, y, z) {
        if (typeof z !== "undefined") {
            return this.gcd(this.gcd(x, y), z);
        }
        var result = x;
        var k = -1;
        var n = y;
        while (k != 0) {
            k = result % n;
            result = n;
            n = k;
        }
        return result;
    };
    Solver.prototype.lcm = function (x, y, z) {
        if (typeof z !== "undefined") {
            return this.lcm(this.lcm(x, y), z);
        }
        return x * y / this.gcd(x, y);
    };
    Solver.prototype.constructGraph = function () {
        var _loop_1 = function (i_1) {
            var to = i_1;
            this_1.t.forEach(function (v) {
                var l = v[0] - 1;
                var r = v[1] - 1;
                if (to == l) {
                    to = r;
                }
                else if (to == r) {
                    to = l;
                }
            });
            this_1.edge[i_1] = to;
        };
        var this_1 = this;
        for (var i_1 = 0; i_1 < this.n; i_1++) {
            _loop_1(i_1);
        }
    };
    Solver.prototype.solve = function () {
        var _this = this;
        this.constructGraph();
        var cycle = new Array(n);
        for (var i_2 = 0; i_2 < this.n; i_2++) {
            var c = 1;
            var now = this.edge[i_2];
            while (now != i_2) {
                now = this.edge[now];
                c++;
            }
            cycle[i_2] = c;
        }
        var result = cycle.reduce(function (l, r) {
            return _this.lcm(l, r);
        });
        console.log(result);
    };
    return Solver;
}());
var input = require("fs").readFileSync("/dev/stdin", "utf8");
input = input.split("\n");
var n, k;
n = +input.shift();
k = +input.shift();
var t = [];
for (var i = 0; i < k; i++) {
    t.push(input[i].split(" ").map(function (v) { return +v; }));
}
(new Solver(n, k, t)).solve();
