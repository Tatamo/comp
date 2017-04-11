let input = require("fs").readFileSync("/dev/stdin", "utf8").split("\n");
let n = +input.shift();
let graph = new Map();
for (let i = 0; i < n; i++) {
    let line = input.shift().split(" ");
    let r0 = +line[0];
    let c0 = +line[1];
    let r1 = +line[2];
    let c1 = +line[3];
    let p0 = r0 + "," + c0;
    let p1 = r1 + "," + c1;
    let es;
    if (!graph.has(p0)) {
        es = new Set();
    }
    else {
        es = graph.get(p0);
    }
    es.add(p1);
    graph.set(p0, es);
    if (!graph.has(p1)) {
        es = new Set();
    }
    else {
        es = graph.get(p1);
    }
    es.add(p0);
    graph.set(p1, es);
}
// edgeの数が1しかない点を削除
let flg_changed = true;
while (flg_changed) {
    flg_changed = false;
    for (let [key, p] of graph) {
        if (p.size == 1) {
            flg_changed = true;
            let edge_to = p.values().next().value;
            graph.delete(key);
            if (graph.get(edge_to).size == 1) {
                graph.delete(edge_to);
            }
            else {
                graph.get(edge_to).delete(key);
            }
        }
    }
}
if (graph.size == 0) {
    console.log("YES");
}
else {
    let flg_no = false;
    for (let [key, p] of graph) {
        if (p.size > 2) {
            flg_no = true;
            break;
        }
    }
    if (flg_no) {
        console.log("NO");
    }
    else {
        console.log("YES");
    }
}
