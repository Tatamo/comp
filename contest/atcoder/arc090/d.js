"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const [n, m] = input[0].split(" ").map((x) => +x);
const g = [];
for (let i = 0; i <= n; i++)
    g[i] = [];
for (let i = 0; i < m; i++) {
    const [from, to, cost] = input[i + 1].split(" ").map((x) => +x);
    g[from].push({ to, cost });
    g[to].push({ to: from, cost: -cost });
}
const stack = [];
const visited = new Array(n + 1).fill(false);
const dist = new Array(n + 1).fill(0);
let result = true;
top: for (let i = 1; i <= n; i++) {
    if (visited[i])
        continue;
    stack.push({ x: i, d: 0 });
    while (stack.length > 0) {
        const { x, d } = stack.pop();
        if (visited[x]) {
            if (dist[x] !== d) {
                result = false;
                break top;
            }
            continue;
        }
        visited[x] = true;
        dist[x] = d;
        for (const { to, cost } of g[x]) {
            stack.push({ x: to, d: d + cost });
        }
    }
}
console.log(result ? "Yes" : "No");
