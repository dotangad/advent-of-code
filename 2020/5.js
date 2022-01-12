const fs = require("fs");
const input = fs
  .readFileSync("./5.txt")
  .toString()
  .split("\n")
  .filter((x) => !!x);

const half = (arr) => [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)];
const tokens = (line) => [line.slice(0, -3), line.slice(-3)];
const seatId = (r, c) => r * 8 + c;
const createArr = (n) =>
  Array(n)
    .fill("-")
    .map((_, i) => i);
const find = (i, a, f) =>
  a.length === 1 ? a[0] : find(i.slice(1), half(a)[Number(i[0] !== f)], f);
const occupieds = (input) =>
  input.map((i) => [
    find(tokens(i)[0], createArr(128), "F"),
    find(tokens(i)[1], createArr(8), "L"),
  ]);
const seatIds = (occupieds) => occupieds.map(([r, c]) => seatId(r, c));

function one(input) {
  return Math.max(...seatIds(occupieds(input)));
}

function two(input) {
  const s = seatIds(occupieds(input));
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i] - 2) !== -1 && s.indexOf(s[i] - 1) === -1)
      return s[i] - 1;
  }

  return null;
}

console.log(one(input));
console.log(two(input));
