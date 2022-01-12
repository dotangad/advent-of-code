const fs = require("fs");
const { sum } = require("./utils");
const input = fs
  .readFileSync(__dirname + "/" + process.argv[2])
  .toString()
  .split("\n")
  .filter((x) => !!x)
  .map(Number);

function oneIter(input) {
  let inc = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] < input[i]) inc++;
  }

  return inc;
}

function oneRec(head, tail, count = 0) {
  if (typeof head === "object") return oneRec(head[0], head.slice(1));
  if (tail.length === 0) return count;
  if (head < tail[0]) return oneRec(tail[0], tail.slice(1), count + 1);
  else return oneRec(tail[0], tail.slice(1), count);
}

// console.log(oneIter([...input])); // 1316
console.log(oneRec([...input])); // 1316

function two(input) {
  return oneRec(input.map((_, i) => input.slice(i, i + 3)).map(sum));
}

console.log(two([...input])); // 1344
