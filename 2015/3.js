const fs = require("fs");
const input = fs
  .readFileSync("./3.txt")
  .toString()
  .split("")
  .filter((x) => !!x);

function one(input) {
  const visited = new Set();
  let x = 0,
    y = 0;

  visited.add(`${y}  ${x}`);
  for (let c of input) {
    if (c === "^") y++;
    if (c === "v") y--;
    if (c === ">") x++;
    if (c === "<") x--;

    visited.add(`${y}  ${x}`);
  }

  return visited.size;
}

function two(input) {
  const santa = input.filter((_, i) => !(i % 2));
  const robosanta = input.filter((_, i) => i % 2);
  const visited = new Set();
  let x = 0,
    y = 0;

  visited.add(`${y}  ${x}`);
  for (let c of santa) {
    if (c === "^") y++;
    if (c === "v") y--;
    if (c === ">") x++;
    if (c === "<") x--;

    visited.add(`${y}  ${x}`);
  }

  y = x = 0;
  for (let c of robosanta) {
    if (c === "^") y++;
    if (c === "v") y--;
    if (c === ">") x++;
    if (c === "<") x--;

    visited.add(`${y}  ${x}`);
  }

  return visited.size;
}

console.log(one(input));
console.log(two(input));
