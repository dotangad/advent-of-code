const fs = require("fs");
const { sum } = require("./utils");
const input = fs
  .readFileSync(__dirname + "/" + process.argv[2])
  .toString()
  .split("\n")
  .filter((x) => !!x);

function transpose(matrix) {
  const transposed = Array(matrix[0].length)
    .fill("-")
    .map(() => Array(matrix.length));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }

  return transposed;
}

function mostCommonBit(bin) {
  const count = bin.reduce(
    ([z, o], c) => (c === "1" ? [z, ++o] : [++z, o]),
    [0, 0]
  );

  return count[0] > count[1] ? 0 : 1;
}

function invert(bin) {
  return bin
    .split("")
    .map((c) => String(Number(!Number(c))))
    .join("");
}

function one(input) {
  const gamma = transpose(input).map(mostCommonBit).join("");
  const epsilon = invert(gamma);

  return Number(`0b${gamma}`) * Number(`0b${epsilon}`);
}

function col(input, n) {
  return input.map((x) => x[n]).join("");
}

function two(input) {
  let inputCopy = [...input];
  for (let i = 0; i < input[0].length && inputCopy.length > 1; i++) {
    const mcb = mostCommonBit(col(inputCopy, i).split(""));
    inputCopy = inputCopy.filter((x) => x[i] == mcb);
  }
  const oxy = parseInt(inputCopy[0], 2);

  inputCopy = [...input];
  for (let i = 0; i < input[0].length && inputCopy.length > 1; i++) {
    const lcb = Number(!Boolean(mostCommonBit(col(inputCopy, i).split(""))));
    inputCopy = inputCopy.filter((x) => x[i] == lcb);
  }
  const co2 = parseInt(inputCopy[0], 2);

  return co2 * oxy;
}

console.log(one([...input]));
console.log(two([...input]));
