"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").split("\n");
let line = 0;
const t = +input[line++];
const C = 0;
const J = 1;
const getOpposite = (p) => {
    if (p === C)
        return J;
    if (p === J)
        return C;
    throw new Error();
};
const solve = (problem_number, ac, aj, times) => {
    let remain = [720, 720];
    let fixed = [0, 0];
    let fix_section = [[], []];
    let ftime = 0;
    let exchange = 0;
    for (let i = 0; i < ac + aj; i++) {
        let prev = times[(ac + aj + i - 1) % (ac + aj)];
        const time = times[i];
        if (time.person !== prev.person) {
            ftime += (1440 + time.l - prev.r) % 1440;
            exchange += 1;
        }
        else {
            const d = (1440 + time.l - prev.r) % 1440;
            fixed[time.person] += d;
            if (d !== 0) {
                fix_section[time.person].push(d);
            }
        }
        remain[time.person] -= time.r - time.l;
    }
    if (fixed[C] > remain[C] || fixed[J] > remain[J]) {
        if (fixed[C] > remain[C] && fixed[J] > remain[J])
            console.log("おかしい！！！！！！！");
        const destruct_fix_person = fixed[C] > remain[C] ? C : J;
        fix_section[destruct_fix_person].sort((a, b) => a - b);
        let remaining = remain[getOpposite(destruct_fix_person)] - ftime - fixed[getOpposite(destruct_fix_person)];
        while (remaining > 0 && fix_section[destruct_fix_person].length > 0) {
            const pop = fix_section[destruct_fix_person].pop();
            remaining -= pop;
            if (pop === 0)
                break;
            exchange += 2;
        }
    }
    console.log(`Case #${problem_number + 1}: ${exchange}`);
};
for (let i = 0; i < t; i++) {
    const [ac, aj] = input[line++].split(" ").map((x) => +x);
    const times = [];
    for (let ii = 0; ii < ac; ii++) {
        const [l, r] = input[line++].split(" ").map((x) => +x);
        times.push({ person: C, l, r });
    }
    for (let ii = 0; ii < aj; ii++) {
        const [l, r] = input[line++].split(" ").map((x) => +x);
        times.push({ person: J, l, r });
    }
    times.sort((a, b) => a.l - b.l);
    solve(i, ac, aj, times);
}
