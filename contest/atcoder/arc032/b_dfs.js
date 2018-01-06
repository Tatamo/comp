"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, m] = input[0].split(" ").map((x) => +x);
const e = [];
for (let i = 0; i < m; i++) {
    e.push(input[i + 1].split(" ").map((x) => +x));
}
const nodes = [];
for (let i = 0; i < n; i++) {
    nodes.push([]);
}
for (const [a, b] of e) {
    nodes[a - 1].push(b - 1);
    nodes[b - 1].push(a - 1);
}
const stack = [];
const visited = new Array(n).fill(false);
let result = -1;
for (let i = 0; i < n; i++) {
    if (visited[i])
        continue;
    stack.push(i);
    result += 1;
    while (stack.length > 0) {
        const node = stack.pop();
        if (visited[node])
            continue;
        visited[node] = true;
        for (const to of nodes[node]) {
            stack.push(to);
        }
    }
}
console.log(result);
