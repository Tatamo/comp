(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var parser_1 = require("./parser");
var input = require("fs").readFileSync("/dev/stdin", "utf8").split("\n");
var d = +input[1];
var s = input[2];
var blank = function () {
    var result = new Array(d + 1);
    for (var i = 0; i <= d; i++)
        result[i] = 0;
    return result;
};
console.log(parser_1.parser.parse(s, function (arg) {
    var token = arg.token;
    var tmp;
    if (arg.terminal == true) {
        var value = arg.value;
        switch (token) {
            case "DIGITS":
                tmp = blank();
                tmp[0] = +value;
                return tmp;
            case "X":
                tmp = blank();
                tmp[1] = 1;
                return tmp;
        }
    }
    else {
        var c = arg.children;
        var pattern = arg.pattern;
        switch (token) {
            case "EXP":
                if (c.length == 1) {
                    return c[0];
                }
                else {
                    tmp = c[0];
                    for (var i = 0; i <= d; i++) {
                        tmp[i] += c[2][i];
                    }
                }
            case "DIVTERM":
                return c[0];
            case "TERM":
                if (c.length == 1) {
                    return c[0];
                }
                else {
                    tmp = blank();
                    // c[2]はATOMなので[1]==1 or [0]>0のいずれか
                    if (c[2][1] == 1) {
                        for (var i = 0; i < d; i++) {
                            tmp[i + 1] = c[0][i];
                        }
                    }
                    else if (c[2][0] > 0) {
                        for (var i = 0; i <= d; i++) {
                            tmp[i] = c[0][i] * c[2][0];
                        }
                    }
                    return tmp;
                }
            case "ATOM":
                return c[0];
            case "DIV":
                tmp = blank();
                for (var i = 1; i <= d; i++) {
                    tmp[i - 1] = c[1][i] * i;
                }
                return tmp;
        }
    }
    return null;
}).join(" "));

},{"./parser":6,"fs":undefined}],2:[function(require,module,exports){
"use strict";
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var ParserFactory = (function () {
    function ParserFactory() {
    }
    ParserFactory.create = function (grammar, parsing_table, default_fallback) {
        var lexer = new lexer_1.Lexer(grammar.lex);
        return new parser_1.Parser(lexer, grammar.syntax, parsing_table, default_fallback);
    };
    return ParserFactory;
}());
exports.ParserFactory = ParserFactory;

},{"./lexer":3,"./parser":4}],3:[function(require,module,exports){
"use strict";
var token_1 = require("./token");
var Lexer = (function () {
    function Lexer(def) {
        this.def = def;
        // 正しいトークン定義が与えられているかチェック
        for (var i = 0; i < this.def.length; i++) {
            var token_pattern = this.def[i].pattern;
            if (typeof token_pattern == "string") {
                continue;
            }
            else if (token_pattern instanceof RegExp) {
                // フラグを整形する
                var flags = "";
                // gフラグは邪魔なので取り除く
                // i,m,uフラグがあれば維持する
                if (token_pattern.ignoreCase) {
                    flags += "i";
                }
                if (token_pattern.multiline) {
                    flags += "m";
                }
                if (token_pattern.unicode) {
                    flags += "u";
                }
                // yフラグは必ずつける
                flags += "y";
                // フラグをつけなおして新しい正規表現オブジェクトにする
                this.def[i].pattern = new RegExp(token_pattern, flags);
                continue;
            }
            throw new Error("invalid token definition: neither string nor RegExp object");
        }
    }
    Lexer.prototype.exec = function (str) {
        var result = [];
        var lastindex = 0;
        while (lastindex < str.length) {
            for (var i = 0; i < this.def.length; i++) {
                var token = this.def[i].token;
                var token_pattern = this.def[i].pattern;
                var match;
                if (typeof token_pattern == "string") {
                    var last_tmp = lastindex + token_pattern.length;
                    if (str.substring(lastindex, last_tmp) != token_pattern)
                        continue;
                    if (last_tmp < str.length && /\w/.test(token_pattern.slice(-1)) && /\w/.test(str[last_tmp]))
                        continue; // ヒットした文字の末尾が\wで、そのすぐ後ろが\wの場合はスキップ
                    match = token_pattern;
                    lastindex += token_pattern.length;
                }
                else {
                    // token_pattern: RegExp
                    token_pattern.lastIndex = lastindex;
                    var m = token_pattern.exec(str);
                    if (m === null)
                        continue; // マッチ失敗
                    match = m[0];
                    lastindex = token_pattern.lastIndex; // lastindexを進める
                }
                // tokenがnullなら処理を飛ばします
                if (token != null) {
                    result.push({ token: token, value: match });
                }
                break;
            }
        }
        // 最後にEOFトークンを付与
        result.push({ token: token_1.SYMBOL_EOF, value: "" });
        return result;
    };
    return Lexer;
}());
exports.Lexer = Lexer;

},{"./token":5}],4:[function(require,module,exports){
"use strict";
var Parser = (function () {
    function Parser(lexer, syntax, parsingtable, default_callback) {
        this.lexer = lexer;
        this.syntax = syntax;
        this.parsingtable = parsingtable;
        this.setDefaultCallback(default_callback);
    }
    Parser.prototype.setDefaultCallback = function (default_callback) {
        if (default_callback === null || default_callback === undefined) {
            this.default_callback = null;
        }
        else {
            this.default_callback = default_callback;
        }
    };
    Parser.prototype.parse = function (input, cb) {
        return this._parse(this.lexer.exec(input), cb);
    };
    // parsingtableはconflictを含む以外は正しさが保証されているものと仮定する
    // inputsは正しくないトークンが与えられる可能性を含む
    // TODO: 詳細な例外処理、エラー検知
    Parser.prototype._parse = function (inputs, cb) {
        var _this = this;
        var read_index = 0; // 次に読むべき入力記号のインデックス
        var inputs_length = inputs.length;
        var state_stack = [0]; // 現在読んでいる構文解析表の状態番号を置くスタック
        var result_stack = []; // 解析中のASTノードを置くスタック
        var flg_error = false;
        var callback;
        if (cb !== null && cb !== undefined)
            callback = cb;
        else if (this.default_callback !== null && this.default_callback !== undefined)
            callback = this.default_callback;
        else {
            // デフォルトコールバックも設定されていない場合は抽象構文木を構築する
            callback = function (arg) {
                if (arg.terminal == true) {
                    return {
                        type: arg.token,
                        value: arg.value,
                        children: []
                    };
                }
                else {
                    return {
                        type: arg.token,
                        value: null,
                        children: arg.children
                    };
                }
            };
        }
        // 構文解析する
        while (read_index < inputs_length) {
            var token = inputs[read_index].token;
            var state = state_stack[state_stack.length - 1];
            if (!this.parsingtable[state].has(token)) {
                // 未定義
                console.log("parse failed: unexpected token:", token);
                flg_error = true;
                break;
            }
            var action = this.parsingtable[state].get(token);
            if (action.type == "shift") {
                // shiftオペレーション
                // 次の状態をスタックに追加
                state_stack.push(action.to);
                result_stack.push(callback({ token: token, value: inputs[read_index].value, terminal: true }));
                // 入力を一つ消費
                read_index += 1;
            }
            else if (action.type == "reduce") {
                // reduceオペレーション
                var syntax_item = this.syntax[action.syntax];
                var rnum = syntax_item.pattern.length;
                // 対応する規則の右辺の記号の数だけスタックからポップする
                for (var i = 0; i < rnum; i++)
                    state_stack.pop();
                // rnumの数だけスタックからポップする
                var children = rnum == 0 ? [] : result_stack.slice(rnum * -1);
                // rnumが0でないなら、右辺の記号の数だけスタックからポップする
                if (rnum != 0) {
                    result_stack = result_stack.slice(0, rnum * -1);
                }
                result_stack.push(callback({ token: syntax_item.ltoken, children: children, pattern: syntax_item.pattern, terminal: false }));
                // このままgotoオペレーションを行う
                state = state_stack[state_stack.length - 1];
                token = syntax_item.ltoken;
                if (!this.parsingtable[state].has(token)) {
                    // 未定義
                    console.log("parse failed: unexpected token:", token);
                    flg_error = true;
                    break;
                }
                action = this.parsingtable[state].get(token);
                if (action.type != "goto") {
                    // gotoアクションでなければおかしい
                    console.log("parse failed: goto operation expected after reduce operation");
                    flg_error = true;
                    break;
                }
                state_stack.push(action.to);
            }
            else if (action.type == "accept") {
                // 構文解析完了
                break;
            }
            else if (action.type == "conflict") {
                console.log("conflict found:");
                console.log("current state " + state + ":", JSON.stringify(this.parsingtable[state]));
                console.log("shift:", action.shift_to, ",reduce:", action.reduce_syntax);
                action.shift_to.forEach(function (to) {
                    console.log("shift to " + to.toString() + ":", JSON.stringify(_this.parsingtable[to]));
                });
                action.reduce_syntax.forEach(function (syntax) {
                    console.log("reduce syntax " + syntax.toString() + ":", JSON.stringify(_this.parsingtable[syntax]));
                });
                console.log("parser cannot parse conflicted syntax");
                flg_error = true;
                break;
            }
        }
        if (flg_error) {
            console.log("parse failed.");
        }
        if (result_stack.length != 1) {
            console.log("failed to construct tree.");
        }
        return result_stack[0];
    };
    return Parser;
}());
exports.Parser = Parser;

},{}],5:[function(require,module,exports){
"use strict";
exports.SYMBOL_EOF = Symbol("EOF");
exports.SYMBOL_SYNTAX = Symbol("S'");
exports.SYMBOL_DOT = Symbol(".");

},{}],6:[function(require,module,exports){
"use strict";
var token_1 = require("parsergenerator/dist/token");
var factory_1 = require("parsergenerator/dist/factory");
exports.grammar = {
    lex: [
        { token: "DIGITS", pattern: /[1-9][0-9]*/ },
        { token: "X", pattern: "x" },
        { token: "PLUS", pattern: "+" },
        { token: "ASTERISK", pattern: "*" },
        { token: "LDIV", pattern: "d{" },
        { token: "RDIV", pattern: "}" },
        { token: null, pattern: /(\r\n|\r|\n)+/ },
        { token: null, pattern: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]+/ },
        { token: "INVALID", pattern: /./ }
    ],
    syntax: [
        {
            ltoken: "EXP",
            pattern: ["DIVTERM"]
        },
        {
            ltoken: "EXP",
            pattern: ["EXP", "PLUS", "DIVTERM"]
        },
        {
            ltoken: "DIVTERM",
            pattern: ["TERM"]
        },
        {
            ltoken: "DIVTERM",
            pattern: ["DIV"]
        },
        {
            ltoken: "TERM",
            pattern: ["ATOM"]
        },
        {
            ltoken: "TERM",
            pattern: ["TERM", "ASTERISK", "ATOM"]
        },
        {
            ltoken: "ATOM",
            pattern: ["DIGITS"]
        },
        {
            ltoken: "ATOM",
            pattern: ["X"]
        },
        {
            ltoken: "DIV",
            pattern: ["LDIV", "EXP", "RDIV"]
        }
    ],
    start_symbol: "EXP"
};
exports.parsing_table = [
    new Map([
        ["EXP", { "type": "goto", "to": 1 }],
        ["DIVTERM", { "type": "goto", "to": 2 }],
        ["TERM", { "type": "goto", "to": 3 }],
        ["DIV", { "type": "goto", "to": 4 }],
        ["ATOM", { "type": "goto", "to": 5 }],
        ["LDIV", { "type": "shift", "to": 6 }],
        ["DIGITS", { "type": "shift", "to": 7 }],
        ["X", { "type": "shift", "to": 8 }]
    ]),
    new Map([
        ["PLUS", { "type": "shift", "to": 9 }],
        [token_1.SYMBOL_EOF, { "type": "accept" }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 0 }],
        ["PLUS", { "type": "reduce", "syntax": 0 }],
        ["RDIV", { "type": "reduce", "syntax": 0 }]
    ]),
    new Map([
        ["ASTERISK", { "type": "shift", "to": 10 }],
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 2 }],
        ["PLUS", { "type": "reduce", "syntax": 2 }],
        ["RDIV", { "type": "reduce", "syntax": 2 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 3 }],
        ["PLUS", { "type": "reduce", "syntax": 3 }],
        ["RDIV", { "type": "reduce", "syntax": 3 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 4 }],
        ["ASTERISK", { "type": "reduce", "syntax": 4 }],
        ["PLUS", { "type": "reduce", "syntax": 4 }],
        ["RDIV", { "type": "reduce", "syntax": 4 }]
    ]),
    new Map([
        ["EXP", { "type": "goto", "to": 11 }],
        ["DIVTERM", { "type": "goto", "to": 2 }],
        ["TERM", { "type": "goto", "to": 3 }],
        ["DIV", { "type": "goto", "to": 4 }],
        ["ATOM", { "type": "goto", "to": 5 }],
        ["LDIV", { "type": "shift", "to": 6 }],
        ["DIGITS", { "type": "shift", "to": 7 }],
        ["X", { "type": "shift", "to": 8 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 6 }],
        ["ASTERISK", { "type": "reduce", "syntax": 6 }],
        ["PLUS", { "type": "reduce", "syntax": 6 }],
        ["RDIV", { "type": "reduce", "syntax": 6 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 7 }],
        ["ASTERISK", { "type": "reduce", "syntax": 7 }],
        ["PLUS", { "type": "reduce", "syntax": 7 }],
        ["RDIV", { "type": "reduce", "syntax": 7 }]
    ]),
    new Map([
        ["DIVTERM", { "type": "goto", "to": 12 }],
        ["TERM", { "type": "goto", "to": 3 }],
        ["DIV", { "type": "goto", "to": 4 }],
        ["ATOM", { "type": "goto", "to": 5 }],
        ["LDIV", { "type": "shift", "to": 6 }],
        ["DIGITS", { "type": "shift", "to": 7 }],
        ["X", { "type": "shift", "to": 8 }]
    ]),
    new Map([
        ["ATOM", { "type": "goto", "to": 13 }],
        ["DIGITS", { "type": "shift", "to": 7 }],
        ["X", { "type": "shift", "to": 8 }]
    ]),
    new Map([
        ["RDIV", { "type": "shift", "to": 14 }],
        ["PLUS", { "type": "shift", "to": 9 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 1 }],
        ["PLUS", { "type": "reduce", "syntax": 1 }],
        ["RDIV", { "type": "reduce", "syntax": 1 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 5 }],
        ["ASTERISK", { "type": "reduce", "syntax": 5 }],
        ["PLUS", { "type": "reduce", "syntax": 5 }],
        ["RDIV", { "type": "reduce", "syntax": 5 }]
    ]),
    new Map([
        [token_1.SYMBOL_EOF, { "type": "reduce", "syntax": 8 }],
        ["PLUS", { "type": "reduce", "syntax": 8 }],
        ["RDIV", { "type": "reduce", "syntax": 8 }]
    ])
];
exports.parser = factory_1.ParserFactory.create(exports.grammar, exports.parsing_table);

},{"parsergenerator/dist/factory":2,"parsergenerator/dist/token":5}]},{},[1]);
