import {Token, SYMBOL_EOF} from "parsergenerator/dist/token";
import {GrammarDefinition} from "parsergenerator/dist/grammar";
import {ParsingOperation, ParsingTable} from "parsergenerator/dist/parsingtable";
import {Parser} from "parsergenerator/dist/parser";
import {ParserFactory} from "parsergenerator/dist/factory";

export const grammar: GrammarDefinition = {
	lex: [
		{token: "DIGITS", pattern: /[1-9][0-9]*/},
		{token: "X", pattern: "x"},
		{token: "PLUS", pattern: "+"},
		{token: "ASTERISK", pattern: "*"},
		{token: "LDIV", pattern: "d{"},
		{token: "RDIV", pattern: "}"},
		{token: null, pattern: /(\r\n|\r|\n)+/},
		{token: null, pattern: /[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]+/},
		{token: "INVALID", pattern: /./}
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

export const parsing_table:ParsingTable = [
	new Map<Token, ParsingOperation>([
		["EXP", {"type":"goto","to":1}],
		["DIVTERM", {"type":"goto","to":2}],
		["TERM", {"type":"goto","to":3}],
		["DIV", {"type":"goto","to":4}],
		["ATOM", {"type":"goto","to":5}],
		["LDIV", {"type":"shift","to":6}],
		["DIGITS", {"type":"shift","to":7}],
		["X", {"type":"shift","to":8}] ]),
	new Map<Token, ParsingOperation>([
		["PLUS", {"type":"shift","to":9}],
		[SYMBOL_EOF, {"type":"accept"}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":0}],
		["PLUS", {"type":"reduce","syntax":0}],
		["RDIV", {"type":"reduce","syntax":0}] ]),
	new Map<Token, ParsingOperation>([
		["ASTERISK", {"type":"shift","to":10}],
		[SYMBOL_EOF, {"type":"reduce","syntax":2}],
		["PLUS", {"type":"reduce","syntax":2}],
		["RDIV", {"type":"reduce","syntax":2}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":3}],
		["PLUS", {"type":"reduce","syntax":3}],
		["RDIV", {"type":"reduce","syntax":3}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":4}],
		["ASTERISK", {"type":"reduce","syntax":4}],
		["PLUS", {"type":"reduce","syntax":4}],
		["RDIV", {"type":"reduce","syntax":4}] ]),
	new Map<Token, ParsingOperation>([
		["EXP", {"type":"goto","to":11}],
		["DIVTERM", {"type":"goto","to":2}],
		["TERM", {"type":"goto","to":3}],
		["DIV", {"type":"goto","to":4}],
		["ATOM", {"type":"goto","to":5}],
		["LDIV", {"type":"shift","to":6}],
		["DIGITS", {"type":"shift","to":7}],
		["X", {"type":"shift","to":8}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":6}],
		["ASTERISK", {"type":"reduce","syntax":6}],
		["PLUS", {"type":"reduce","syntax":6}],
		["RDIV", {"type":"reduce","syntax":6}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":7}],
		["ASTERISK", {"type":"reduce","syntax":7}],
		["PLUS", {"type":"reduce","syntax":7}],
		["RDIV", {"type":"reduce","syntax":7}] ]),
	new Map<Token, ParsingOperation>([
		["DIVTERM", {"type":"goto","to":12}],
		["TERM", {"type":"goto","to":3}],
		["DIV", {"type":"goto","to":4}],
		["ATOM", {"type":"goto","to":5}],
		["LDIV", {"type":"shift","to":6}],
		["DIGITS", {"type":"shift","to":7}],
		["X", {"type":"shift","to":8}] ]),
	new Map<Token, ParsingOperation>([
		["ATOM", {"type":"goto","to":13}],
		["DIGITS", {"type":"shift","to":7}],
		["X", {"type":"shift","to":8}] ]),
	new Map<Token, ParsingOperation>([
		["RDIV", {"type":"shift","to":14}],
		["PLUS", {"type":"shift","to":9}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":1}],
		["PLUS", {"type":"reduce","syntax":1}],
		["RDIV", {"type":"reduce","syntax":1}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":5}],
		["ASTERISK", {"type":"reduce","syntax":5}],
		["PLUS", {"type":"reduce","syntax":5}],
		["RDIV", {"type":"reduce","syntax":5}] ]),
	new Map<Token, ParsingOperation>([
		[SYMBOL_EOF, {"type":"reduce","syntax":8}],
		["PLUS", {"type":"reduce","syntax":8}],
		["RDIV", {"type":"reduce","syntax":8}] ])
];

export const parser:Parser = ParserFactory.create(grammar, parsing_table);

