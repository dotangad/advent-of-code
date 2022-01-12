const fs = require("fs");
const input = fs
  .readFileSync("./3.txt")
  .toString()
  .split("\n")
  .filter((x) => !!x)
  .map((x) => x.split(""));

const tree = (x) => x === "#";
const open = (x) => x === ".";
const ROW_LEN = input[0].length;

function one(input) {
  return slope(input, 3, 1);
}

function slope(input, right, down) {
  let trees = 0;
  for (let i = down, j = right; i < input.length; i += down) {
    if (tree(input[i][j % ROW_LEN])) trees++;
    j += right;
    j %= ROW_LEN;
  }

  return trees;
}

function stringify(input) {
  return input.map((x) => x.join("")).join("\n");
}

function paint(input, right, down) {
  input = [...input];
  for (let i = down; i < input.length; i += down) {
    const y = i,
      x = (i * right) % ROW_LEN;
    tree(input[y][x]) ? (input[y][x] = "X") : (input[y][x] = "O");
  }

  return stringify(input);
}

function two(input) {
  return (
    slope(input, 1, 1) *
    slope(input, 3, 1) *
    slope(input, 5, 1) *
    slope(input, 7, 1) *
    slope(input, 1, 2)
  );
}

console.log(one(input));
console.log(two(input));
