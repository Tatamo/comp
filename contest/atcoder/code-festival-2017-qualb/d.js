"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.SYMBOL_EOF = Symbol("EOF");
class Lexer {
    constructor(def) {
        this.def = def;
        const formatted_def = [];
        // 正しいトークン定義が与えられているかチェック
        for (const def_sect of def) {
            const token_pattern = def_sect.pattern;
            if (typeof token_pattern == "string") {
                formatted_def.push(def_sect);
            }
            else if (token_pattern instanceof RegExp) {
                // フラグを整形する
                let flags = "";
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
                formatted_def.push({
                    token: def_sect.token,
                    pattern: new RegExp(token_pattern, flags)
                });
            }
            else {
                throw new Error("invalid token definition: neither string nor RegExp object");
            }
        }
        this.def = formatted_def;
    }
    exec(str) {
        const result = [];
        let lastindex = 0;
        top: while (lastindex < str.length) {
            for (let i = 0; i < this.def.length; i++) {
                const token = this.def[i].token;
                const token_pattern = this.def[i].pattern;
                let match;
                if (typeof token_pattern == "string") {
                    const last_tmp = lastindex + token_pattern.length;
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
                    const m = token_pattern.exec(str);
                    if (m === null)
                        continue; // マッチ失敗
                    match = m[0];
                    lastindex = token_pattern.lastIndex; // lastindexを進める
                }
                // tokenがnullなら処理を飛ばします
                if (token != null) {
                    // 結果に追加
                    result.push({ token, value: match });
                }
                continue top;
            }
            // マッチする規則がなかった
            throw new Error("no pattern matched");
        }
        // 最後にEOFトークンを付与
        result.push({ token: exports.SYMBOL_EOF, value: "" });
        return result;
    }
}
exports.Lexer = Lexer;
exports.lex = [
    { token: "101", pattern: /1(01)+/ },
    { token: "1", pattern: /1/ },
    { token: "0", pattern: /00+/ },
    { token: "0", pattern: /^0/ },
    { token: "0", pattern: /0$/ }
];
var input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const s = input[1].split("").map((x) => +x);
const lexer = new Lexer(exports.lex);
const tmp = lexer.exec(input[1]);
const l = [];
for (const { token, value } of tmp) {
    if (token == "1" && l.length > 0 && l[l.length - 1].token == "1") {
        l[l.length - 1].value += value;
    }
    else if (token != exports.SYMBOL_EOF) {
        l.push({ token, value });
    }
}
const c = [[]];
const stack = [];
for (const { token, value } of l) {
    if (token == "0") {
        c.push([]);
    }
    else if (token == "1") {
        let last = c[c.length - 1][c[c.length - 1].length - 1];
        if (last === undefined)
            last = null;
        const tmp = { token: "1", len: value.length, prev: last, next: null };
        c[c.length - 1].push(tmp);
        if (last !== null)
            last.next = tmp;
    }
    else {
        let last = c[c.length - 1][c[c.length - 1].length - 1];
        if (last === undefined)
            last = null;
        const tmp = { token: "101", len: Math.floor(value.length / 2), prev: last, next: null };
        c[c.length - 1].push(tmp);
        if (last !== null)
            last.next = tmp;
        if (tmp.len > 1 && tmp.len % 2 == 1) {
            stack.push(tmp);
        }
    }
}
let result = 0;
// lengthが1より大きくかつ奇数の101を展開
while (stack.length > 0) {
    const tmp = stack.pop();
    result += Math.ceil(tmp.len / 2);
    if (tmp.prev !== null) {
        result += tmp.prev.len;
        const pp = tmp.prev.prev;
        if (pp !== null && pp.token == "101") {
            pp.len += 1;
        }
    }
    if (tmp.next !== null) {
        result += tmp.next.len;
    }
}
for (const sect of c) {
    if (sect.length == 0)
        continue;
}
console.log(stack);
console.log(c);
// console.log(i);
