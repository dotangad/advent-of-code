const fs = require("fs");
const input = fs
  .readFileSync("./6.txt")
  .toString()
  .split("\n\n")
  .map((l) => l.trim())
  .filter((x) => !!x)
  .map((l) =>
    l
      .split("\n")
      .filter((x) => !!x)
      .map((x) => x.split(""))
  );

const count = (arr, e) => arr.reduce((c, i) => (i === e ? c + 1 : c), 0);

function one(input) {
  return input
    .map((l) => new Set(l.reduce((p, c) => [...p, ...c], [])).size)
    .reduce((p, c) => p + c, 0);
}

function two(input) {
  return input
    .map((l) => [l.reduce((p, c) => [...p, ...c], []), l.length])
    .map(([arr, n]) => arr.filter((v) => count(arr, v) === n))
    .map((a) => new Set(a).size)
    .reduce((p, c) => p + c, 0);
}

console.log(one(input));
console.log(two(input));
