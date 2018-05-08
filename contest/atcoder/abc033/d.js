"use strict";
// WA
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
const n = +input[0];
const points = [];
const RESOLUTION = 360;
for (let i = 0; i < n; i++) {
    const [x, y] = input[i + 1].split(" ").map((x) => +x);
    points.push({ x, y, index: i, id: i });
}
const rotate = (p, d) => {
    return { x: p.x * Math.cos(d) - p.y * Math.sin(d), y: p.x * Math.sin(d) + p.y * Math.cos(d) };
};
console.time("test");
const dist = new Array(n).fill([]).map(() => new Array(n));
for (let i = 0; i < n; i++) {
    for (let ii = i; ii < n; ii++) {
        const dx = points[i].x - points[ii].x;
        const dy = points[i].y - points[ii].y;
        const len = Math.sqrt(dx * dx + dy * dy);
        dist[i][ii] = len;
        dist[ii][i] = len;
    }
}
const map = new Array(n).fill([]).map(() => []);
const sorted = [];
for (let d = 0; d < RESOLUTION; d++) {
    const arr = [];
    for (const p of points) {
        const tmp = Object.assign({}, p);
        arr.push(tmp);
    }
    arr.sort((a, b) => {
        const ax = rotate(a, d * Math.PI / 180).x;
        const bx = rotate(b, d * Math.PI / 180).x;
        return ax - bx;
    });
    for (let i = 0; i < arr.length; i++) {
        arr[i].index = i;
        map[arr[i].id].push(i);
    }
    sorted.push(arr);
}
const sp = (i1, i2, i3) => {
    const a = dist[i1][i2];
    const b = dist[i2][i3];
    const c = dist[i3][i1];
    return a * a + b * b + c * c - 2 * Math.max(a * a, b * b, c * c);
};
let tyokkaku = 0;
let eikaku = 0;
for (let i = 0; i < n; i++) {
    for (let ii = i + 1; ii < n; ii++) {
        const degree = (Math.round(Math.atan2(points[ii].y - points[i].y, points[ii].x - points[i].x) / Math.PI * 180) + 360) % 360;
        const arr = sorted[degree];
        let begin = Math.min(map[i][degree], map[ii][degree]);
        let end = Math.max(map[i][degree], map[ii][degree]);
        let tmp_eikaku = 0;
        for (let j = Math.max(0, begin - 10); j < Math.min(end + 10, n); j++) {
            if (i <= j || ii <= j)
                continue;
            if (i === j || ii === j)
                continue;
            const s = sp(i, ii, j);
            // if (Math.abs(s) < 1e-10) console.log([i, ii, j], s);
            if (Math.abs(s) < 1e-10) {
                tyokkaku += 1;
            }
            else if (s > 0)
                tmp_eikaku += 1;
        }
        /*
        for (let j = Math.max(0, begin - 10); j < begin; j++) {
            if (i === j || ii === j) continue;
            const s = sp(i, ii, j);
            if (Math.abs(s) < 1e-10) console.log([i, ii, j], s);
            if (Math.abs(s) < 1e-10) tyokkaku += 1;
            else if (s > 0) tmp_eikaku += 1;
        }
        for (let j = begin; j <= end; j++) {
            if (i === j || ii === j) continue;
            const s = sp(i, ii, j);
            if (Math.abs(s) < 1e-10) console.log([i, ii, j], s);
            if (Math.abs(s) < 1e-10) {
                tyokkaku += 1;
                tmp_eikaku -= 1;
            }
            else if (s < 0) tmp_eikaku -= 1;
        }
        for (let j = end + 1; j < Math.min(end + 10, n); j++) {
            if (i === j || ii === j) continue;
            const s = sp(i, ii, j);
            if (Math.abs(s) < 1e-10) console.log([i, ii, j], s);
            if (Math.abs(s) < 1e-10) tyokkaku += 1;
            else if (s > 0) tmp_eikaku += 1;
        }
        */
        eikaku += tmp_eikaku;
    }
}
console.log(eikaku, tyokkaku, n * (n - 1) * (n - 2) / 6 - (eikaku + tyokkaku));
