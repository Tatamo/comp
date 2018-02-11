"use strict";
var visualizer;
(function (visualizer) {
    /**
     * lineno は ユーザにエラーメッセージを表示するとき用。1-indexed で渡すこと
     */
    var getInt = function (s, lineno) {
        if (s == null) {
            throw new Error("\u6570\u5024\u306E\u30D1\u30FC\u30B9\u306B\u5931\u6557\u3057\u307E\u3057\u305F at line: " + lineno);
        }
        if (s.match(/^\d+$/)) {
            return parseInt(s);
        }
        throw new Error("\u6570\u5024\u306E\u30D1\u30FC\u30B9\u306B\u5931\u6557\u3057\u307E\u3057\u305F at line: " + lineno);
    };
    var deepcopy = function (source) {
        var ret = new Map();
        source.forEach(function (v, k) {
            ret.set(k, v);
        });
        return ret;
    };
    var Board = /** @class */ (function () {
        function Board(problem_input) {
            var _this = this;
            var lines = problem_input.trim().split("\n");
            var firstLine = lines.shift();
            if (firstLine == undefined)
                throw new Error("WA: \u5165\u529B\u30D5\u30A1\u30A4\u30EB\u304C\u7A7A\u3067\u3059");
            var hwdk = firstLine.trim().split(" ");
            if (hwdk.length != 4)
                throw new Error("WA: \u5165\u529B\u30D5\u30A1\u30A4\u30EB\u306E1\u884C\u76EE\u306E\u51FA\u529B\u5024\u306F4\u3064\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
            _a = hwdk.map(function (v) { return getInt(v, 1); }), this.h = _a[0], this.w = _a[1], this.d = _a[2], this.k = _a[3];
            this.A = new Array(this.h * this.w);
            this.C = new Array(this.h * this.w);
            for (var i = 0; i < this.h * this.w; i++) {
                this.A[i] = -1;
                this.C[i] = 0;
            }
            lines.forEach(function (line, i) {
                var vars = line.trim().split(" ");
                if (vars.length != 2)
                    throw new Error("WA: \u5165\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + (i + 2) + "\u884C\u76EE\u306E\u51FA\u529B\u5024\u306F2\u3064\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
                var _a = vars.map(function (v) { return getInt(v, i + 2); }), y = _a[0], x = _a[1];
                if (x < 0 || x >= _this.w)
                    throw new Error("WA: \u5165\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + (i + 2) + "\u884C\u76EE\u306E\u5EA7\u6A19\u306E\u5024\u304C\u7570\u5E38\u3067\u3059");
                if (y < 0 || y >= _this.h)
                    throw new Error("WA: \u5165\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + (i + 2) + "\u884C\u76EE\u306E\u5EA7\u6A19\u306E\u5024\u304C\u7570\u5E38\u3067\u3059");
                _this.A[y * _this.w + x] = i;
            });
            var _a;
        }
        Board.prototype.initialFrame = function (Y, X) {
            var keyFrame = new KeyFrame(this, new Map(), new Map());
            var frame = new Frame();
            frame.keyFrame = keyFrame;
            frame.turn = 0;
            frame.turnFromKey = 0;
            frame.x1 = frame.y1 = frame.x2 = frame.y2 = -1;
            frame.cost = 0;
            {
                var hy = -1, hx = -1;
                var abs = Math.abs;
                for (var i = 0; i < this.d; i++) {
                    var y = Y[i];
                    var x = X[i];
                    if (hy >= 0) {
                        var cost = abs(hy - y) + abs(hx - x);
                        this.C[y * this.w + x] += cost;
                        this.C[hy * this.w + hx] += cost;
                        frame.cost += cost;
                    }
                    _a = [y, x], hy = _a[0], hx = _a[1];
                }
            }
            return frame;
            var _a;
        };
        Board.prototype.calcFrames = function (contestant_output) {
            var _this = this;
            var frames = [];
            var DA = new Map();
            var DC = new Map();
            var Y = new Array(this.d);
            var X = new Array(this.d);
            for (var y = 0; y < this.h; y++) {
                for (var x = 0; x < this.w; x++) {
                    var f = this.A[y * this.w + x];
                    Y[f] = y;
                    X[f] = x;
                }
            }
            var cur = this.initialFrame(Y, X);
            frames.push(cur);
            var moveLines = contestant_output.trim().split("\n");
            if (moveLines.length > this.k)
                throw new Error("WA: swap\u56DE\u6570\u306F" + this.k + "\u56DE\u4EE5\u4E0B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
            moveLines.forEach(function (line, i) {
                if (line.length == 0)
                    return;
                var vars = line.trim().split(" ");
                if (vars.length != 4)
                    throw new Error("WA: \u51FA\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + i + "\u884C\u76EE\u306E\u51FA\u529B\u5024\u306F4\u3064\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
                var _a = vars.map(function (v) { return getInt(v, i + 1); }), y1 = _a[0], x1 = _a[1], y2 = _a[2], x2 = _a[3];
                if (y1 < 0 || y1 >= _this.h)
                    throw new Error("WA: \u51FA\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + i + "\u884C\u76EE\u306E\u5EA7\u6A19\u306E\u5024\u304C\u7570\u5E38\u3067\u3059");
                if (x1 < 0 || x1 >= _this.w)
                    throw new Error("WA: \u51FA\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + i + "\u884C\u76EE\u306E\u5EA7\u6A19\u306E\u5024\u304C\u7570\u5E38\u3067\u3059");
                if (y2 < 0 || y2 >= _this.h)
                    throw new Error("WA: \u51FA\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + i + "\u884C\u76EE\u306E\u5EA7\u6A19\u306E\u5024\u304C\u7570\u5E38\u3067\u3059");
                if (x2 < 0 || x2 >= _this.w)
                    throw new Error("WA: \u51FA\u529B\u30D5\u30A1\u30A4\u30EB\u306E" + i + "\u884C\u76EE\u306E\u5EA7\u6A19\u306E\u5024\u304C\u7570\u5E38\u3067\u3059");
                cur = cur.calcNextFrame(DA, DC, Y, X, y1, x1, y2, x2);
                frames.push(cur);
            });
            return frames;
        };
        return Board;
    }());
    var FRAMES_PER_KEYFRAME = 10;
    var KeyFrame = /** @class */ (function () {
        function KeyFrame(board, A, C) {
            this.board = board;
            this.A = A;
            this.C = C;
        }
        return KeyFrame;
    }());
    var Frame = /** @class */ (function () {
        function Frame() {
            this.ps = [[], []];
            /**
             * A[y*w+x] := (y, x) に書かれている fragment の番号。負の場合は空。
             * 値が存在しないときは keyFrame の状態を参照
             */
            this.A = new Map();
            /**
             * C[y*w+x] := (y, x) に書かれている fragment のコスト。
             * 値が存在しないときは keyFrame の状態を参照
             */
            this.C = new Map();
        }
        /**
         * (y, x) に書かれている fragment番号。空なら負値
         */
        Frame.prototype.fragmentAt = function (yx) {
            var v;
            v = this.A.get(yx);
            if (v !== undefined)
                return v;
            v = this.keyFrame.A.get(yx);
            if (v !== undefined)
                return v;
            return this.keyFrame.board.A[yx];
        };
        /**
         * (y, x) に書かれている fragment のコスト。空なら負値
         */
        Frame.prototype.costAt = function (yx) {
            var v;
            v = this.C.get(yx);
            if (v !== undefined)
                return v;
            v = this.keyFrame.C.get(yx);
            if (v !== undefined)
                return v;
            return this.keyFrame.board.C[yx];
        };
        Frame.prototype.calcNextFrame = function (DA, DC, Y, X, y1, x1, y2, x2) {
            var next = this.nextFrame = new Frame();
            next.turn = this.turn + 1;
            _a = [y1, x1, y2, x2], next.y1 = _a[0], next.x1 = _a[1], next.y2 = _a[2], next.x2 = _a[3];
            var keyFrame = this.keyFrame;
            var board = this.keyFrame.board;
            next.turnFromKey = this.turnFromKey + 1;
            if (next.turnFromKey == FRAMES_PER_KEYFRAME) {
                // keyframe を作り直す
                keyFrame = new KeyFrame(board, deepcopy(DA), deepcopy(DC));
                next.turnFromKey = 0;
                next.A = new Map();
                next.C = new Map();
            }
            else {
                next.A = deepcopy(this.A);
                next.C = deepcopy(this.C);
            }
            next.keyFrame = keyFrame;
            var w = board.w;
            var yx1 = y1 * w + x1;
            var yx2 = y2 * w + x2;
            // swap 前にかかれていた fragment の番号
            var f1 = this.fragmentAt(yx1);
            var f2 = this.fragmentAt(yx2);
            var calcD = function (a, b, c) {
                if (b < 0 || b >= board.d)
                    return 0;
                var by = Y[b];
                var bx = X[b];
                var cost = 0;
                if (a >= 0) {
                    var y = Y[a];
                    var x = X[a];
                    cost += Math.abs(y - by) + Math.abs(x - bx);
                }
                if (c < board.d) {
                    var y = Y[c];
                    var x = X[c];
                    cost += Math.abs(y - by) + Math.abs(x - bx);
                }
                return cost;
            };
            var curCost1 = calcD(f1 - 1, f1, f1 + 1);
            var curCost2 = calcD(f2 - 1, f2, f2 + 1);
            // swap 処理
            next.A.set(yx1, f2);
            next.A.set(yx2, f1);
            DA.set(yx1, f2);
            DA.set(yx2, f1);
            if (f1 >= 0)
                Y[f1] = y2;
            if (f1 >= 0)
                X[f1] = x2;
            if (f2 >= 0)
                Y[f2] = y1;
            if (f2 >= 0)
                X[f2] = x1;
            var newCost1 = calcD(f1 - 1, f1, f1 + 1);
            var newCost2 = calcD(f2 - 1, f2, f2 + 1);
            var uu = function (f) {
                if (0 <= f && f < board.d) {
                    var c = calcD(f - 1, f, f + 1);
                    var yx = Y[f] * board.w + X[f];
                    next.C.set(yx, c);
                    DC.set(yx, c);
                    return [Y[f], X[f]];
                }
                return [-1, -1];
            };
            next.ps[0].push(uu(f1 - 1));
            next.ps[0].push(uu(f1));
            next.ps[0].push(uu(f1 + 1));
            next.ps[1].push(uu(f2 - 1));
            next.ps[1].push(uu(f2));
            next.ps[1].push(uu(f2 + 1));
            next.cost = this.cost + (newCost1 + newCost2) - (curCost1 + curCost2);
            return next;
            var _a;
        };
        return Frame;
    }());
    visualizer.init = function () {
        var file1 = document.getElementById("file1");
        var file2 = document.getElementById("file2");
        var costInput = document.getElementById("cost");
        var scoreInput = document.getElementById("score");
        // controls
        var seek = document.getElementById("seek");
        var pos = document.getElementById("pos");
        var firstButton = document.getElementById("firstButton");
        var prevButton = document.getElementById("prevButton");
        var playButton = document.getElementById("playButton");
        var nextButton = document.getElementById("nextButton");
        var lastButton = document.getElementById("lastButton");
        var maxfps = document.getElementById("maxfps");
        var colormode = document.getElementById("colormode");
        var linemode = document.getElementById("linemode");
        var swapX1 = document.getElementById("swapx1");
        var swapY1 = document.getElementById("swapy1");
        var swapX2 = document.getElementById("swapx2");
        var swapY2 = document.getElementById("swapy2");
        var exportButton = document.getElementById("exportButton");
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext('2d');
        if (ctx == null) {
            return function () {
                alert('未対応ブラウザです');
            };
        }
        var load_to = function (file, callback) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onloadend = function () {
                callback(reader.result);
            };
        };
        var prevFrame = null;
        var id = null;
        var run = function (value1, value2) {
            scoreInput.value = costInput.value = '0';
            seek.min = seek.max = pos.value = seek.value = '0';
            pos.step = seek.step = '1';
            var board;
            try {
                board = new Board(value1);
            }
            catch (e) {
                alert(e);
                console.warn(e);
                scoreInput.value = costInput.value = 'ERROR at input';
                return;
            }
            var frames;
            try {
                frames = board.calcFrames(value2);
            }
            catch (e) {
                alert(e);
                console.warn(e);
                scoreInput.value = costInput.value = 'WA';
                return;
            }
            // 以下、表示のための変数と関数
            canvas.width = 800;
            canvas.height = 800;
            var width = canvas.width;
            var height = canvas.height;
            var cell_width = Math.floor(width / board.w);
            var cell_height = Math.floor(height / board.h);
            var ctop = function (y) {
                return y * cell_height;
            };
            var clef = function (x) {
                return x * cell_width;
            };
            // 位置による色
            var posColors = new Array(board.d);
            for (var f = 0; f < board.d; f++) {
                var h = 300 * f / board.d + 60;
                posColors[f] = "hsl(" + Math.round(h) + ", 100%, 50%)";
            }
            // コストによる色
            var maxCost = (board.h + board.w) * 2;
            var redThreashold = maxCost * 0.5;
            var cosColors = new Array(maxCost + 1);
            for (var c = 0; c <= maxCost; c++) {
                var cost = c;
                var h = 0;
                var l = 50;
                if (cost < redThreashold) {
                    h = 240 - 240 * (cost / redThreashold);
                }
                else {
                    l = Math.round(50 + 50 * (0.5 - cost / redThreashold));
                }
                cosColors[c] = "hsl(" + Math.round(h) + ", 100%, " + l + "%)";
            }
            var costColorMode = colormode.checked;
            var lineMode = linemode.checked;
            var drawSwapLines = function (frame) {
                var drawLine = function (y1, x1, y2, x2) {
                    if (y1 == -1 || y2 == -1)
                        return;
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(clef(x1) + cell_width / 2, ctop(y1) + cell_height / 2);
                    ctx.lineTo(clef(x2) + cell_width / 2, ctop(y2) + cell_height / 2);
                    ctx.stroke();
                };
                var drawLines = function (ps) {
                    var y = -1, x = -1;
                    for (var _i = 0, ps_1 = ps; _i < ps_1.length; _i++) {
                        var _a = ps_1[_i], ny = _a[0], nx = _a[1];
                        drawLine(y, x, ny, nx);
                        y = ny;
                        x = nx;
                    }
                };
                drawLines(frame.ps[0]);
                drawLines(frame.ps[1]);
            };
            var draw = function (frame) {
                var drawPos = function () {
                    var drawFragment = function (f, y, x, needClear) {
                        if (f < 0) {
                            if (!needClear)
                                return;
                            ctx.strokeStyle = ctx.fillStyle = '#fff';
                        }
                        else {
                            ctx.strokeStyle = ctx.fillStyle = posColors[f];
                        }
                        y = ctop(y);
                        x = clef(x);
                        ctx.fillRect(x, y, cell_width, cell_height);
                    };
                    if (prevFrame != null && prevFrame.turn == frame.turn - 1) {
                        // 差分描画1
                        var f1 = frame.fragmentAt(frame.y1 * board.w + frame.x1);
                        var f2 = frame.fragmentAt(frame.y2 * board.w + frame.x2);
                        drawFragment(f1, frame.y1, frame.x1, true);
                        drawFragment(f2, frame.y2, frame.x2, true);
                    }
                    else if (prevFrame != null && prevFrame.turn == frame.turn + 1) {
                        // 差分描画2
                        var f1 = frame.fragmentAt(prevFrame.y1 * board.w + prevFrame.x1);
                        var f2 = frame.fragmentAt(prevFrame.y2 * board.w + prevFrame.x2);
                        drawFragment(f1, prevFrame.y1, prevFrame.x1, true);
                        drawFragment(f2, prevFrame.y2, prevFrame.x2, true);
                    }
                    else {
                        // 全描画
                        ctx.strokeStyle = ctx.fillStyle = '#fff';
                        ctx.fillRect(0, 0, width, height);
                        var yx = 0;
                        for (var y = 0; y < board.h; y++) {
                            for (var x = 0; x < board.w; x++) {
                                var f = frame.fragmentAt(yx++);
                                drawFragment(f, y, x, false);
                            }
                        }
                    }
                };
                var drawCos = function () {
                    var drawFragment = function (y, x, needClear) {
                        var cost = frame.costAt(y * board.w + x);
                        if (cost == 0) {
                            if (!needClear)
                                return;
                            ctx.strokeStyle = ctx.fillStyle = '#fff';
                        }
                        else {
                            ctx.strokeStyle = ctx.fillStyle = cosColors[cost];
                        }
                        y = ctop(y);
                        x = clef(x);
                        ctx.fillRect(x, y, cell_width, cell_height);
                    };
                    if (prevFrame != null && prevFrame.turn == frame.turn - 1) {
                        // 差分描画1
                        for (var _i = 0, _a = frame.ps[0]; _i < _a.length; _i++) {
                            var _b = _a[_i], y = _b[0], x = _b[1];
                            drawFragment(y, x, true);
                        }
                        for (var _c = 0, _d = frame.ps[1]; _c < _d.length; _c++) {
                            var _e = _d[_c], y = _e[0], x = _e[1];
                            drawFragment(y, x, true);
                        }
                    }
                    else if (prevFrame != null && prevFrame.turn == frame.turn + 1) {
                        // 差分描画2
                        for (var _f = 0, _g = prevFrame.ps[0]; _f < _g.length; _f++) {
                            var _h = _g[_f], y = _h[0], x = _h[1];
                            drawFragment(y, x, true);
                        }
                        for (var _j = 0, _k = prevFrame.ps[1]; _j < _k.length; _j++) {
                            var _l = _k[_j], y = _l[0], x = _l[1];
                            drawFragment(y, x, true);
                        }
                    }
                    else {
                        // 全描画
                        ctx.strokeStyle = ctx.fillStyle = '#fff';
                        ctx.fillRect(0, 0, width, height);
                        for (var y = 0; y < board.h; y++) {
                            for (var x = 0; x < board.w; x++) {
                                drawFragment(y, x, false);
                            }
                        }
                    }
                };
                if (lineMode)
                    prevFrame = null;
                var drawFunc = costColorMode ? drawCos : drawPos;
                drawFunc();
                if (lineMode)
                    drawSwapLines(frame);
                prevFrame = frame;
            };
            // 以下、ボタン類のコールバックとか
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // 表示するやつ
            var d = function () {
                var frame = frames[parseInt(seek.value)];
                draw(frame);
                costInput.value = frame.cost.toString();
                var score = Math.floor((Math.max(0, frames[0].cost - frame.cost) + 99) / 100);
                scoreInput.value = score.toString();
                if (frame.turn != 0) {
                    swapX1.value = frame.x1.toString();
                    swapY1.value = frame.y1.toString();
                    swapX2.value = frame.x2.toString();
                    swapY2.value = frame.y2.toString();
                }
                else {
                    swapX1.value = swapY1.value = swapX2.value = swapY2.value = '';
                }
            };
            var fps = parseInt(maxfps.value);
            var updateInterval = 1000 / fps;
            // 最終フレームを表示
            pos.value = pos.max = seek.value = seek.max = (frames.length - 1).toString();
            d();
            seek.onchange = seek.oninput = function () {
                pos.value = seek.value;
                d();
            };
            pos.onchange = function () {
                seek.value = pos.value;
                d();
            };
            firstButton.onclick = function () {
                seek.value = pos.value = seek.min;
                d();
            };
            var gotoPrevFrame = prevButton.onclick = function () {
                var f = parseInt(seek.value);
                if (f > 0) {
                    f--;
                    pos.value = seek.value = f.toString();
                    d();
                }
            };
            var gotoNextFrame = nextButton.onclick = function () {
                var f = parseInt(seek.value);
                if (f < frames.length - 1) {
                    f++;
                    pos.value = seek.value = f.toString();
                    d();
                }
            };
            lastButton.onclick = function () {
                pos.value = seek.value = seek.max;
                d();
            };
            // 矢印キー左右で移動
            window.onkeydown = function (e) {
                if (e.target == seek)
                    return;
                switch (e.keyCode) {
                    case 37:
                        gotoPrevFrame();
                        break;
                    case 39:
                        gotoNextFrame();
                        break;
                }
            };
            colormode.onchange = function () {
                costColorMode = colormode.checked;
                d();
            };
            linemode.onchange = function () {
                lineMode = linemode.checked;
                d();
            };
            var play = function () {
                if (seek.value == seek.max) {
                    seek.value = '0';
                }
                var stop = function () {
                    if (id != null) {
                        clearInterval(id);
                        playButton.onclick = play;
                        id = null;
                    }
                };
                id = setInterval(function () {
                    var f = parseInt(seek.value);
                    if (f < frames.length - 1) {
                        f++;
                        pos.value = seek.value = f.toString();
                        d();
                    }
                    else {
                        stop();
                    }
                }, updateInterval);
                playButton.onclick = stop;
            };
            maxfps.onchange = function () {
                var v = parseInt(maxfps.value);
                updateInterval = 1000 / v;
                if (id != null) {
                    clearInterval(id);
                    play();
                }
            };
            exportButton.onclick = function () {
                var dataURL = canvas.toDataURL('image/png');
                var anchor = document.createElement('a');
                anchor.href = dataURL;
                anchor.download = 'visualizer.png';
                var e = document.createEvent('MouseEvent');
                e.initEvent("click", true, true);
                anchor.dispatchEvent(e);
                // anchor.dispatchEvent(new CustomEvent('click'));
            };
            playButton.onclick = play;
            playButton.focus();
        };
        return function () {
            if (id != null)
                clearInterval(id);
            prevFrame = null;
            id = null;
            file1.files && load_to(file1.files[0], function (value1) {
                file2.files && load_to(file2.files[0], function (value2) {
                    run(value1.trim(), value2.trim());
                });
            });
        };
    };
})(visualizer || (visualizer = {}));
window.onload = function () {
    document.getElementById("run").onclick = visualizer.init();
};
//# sourceMappingURL=visualizer.js.map