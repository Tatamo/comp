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
