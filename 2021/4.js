const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/" + process.argv[2])
  .toString()
  .split("\n")
  .filter((x) => !!x);

function one(input) {
  console.log(input);
}

function two(input) {}

console.log(one([...input]));
console.log(two([...input]));
