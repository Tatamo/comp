import * as fs from "fs";

const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const n = +input[0];
const a = [];
for (let i = 0; i < n; i++) {
  const sp = input[i + 1].split(" ");
  a.push({ name: sp[0], score: +sp[1], id: i + 1 });
}

a.sort((x, y) => {
  if (x.name < y.name) return -1;
  if (x.name > y.name) return 1;
  return y.score - x.score;
});

for(const {id} of a){
  console.log(id);
}
