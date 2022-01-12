const fs = require("fs");
const input = fs
  .readFileSync("./10.txt")
  // .readFileSync("./10.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => !!x)
  .map(Number)
  .sort((a, b) => a - b);

function one(input) {
  let one = 1,
    three = 1;
  for (let i = 1; i < input.length; i++) {
    if (input[i] - input[i - 1] === 1) one++;
    if (input[i] - input[i - 1] === 3) three++;
  }

  return one * three;
}

function two(input) {
  return null;
}

console.log(one(input));
console.log(two(input));
