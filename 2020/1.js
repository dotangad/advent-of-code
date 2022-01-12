const fs = require("fs");
const numbers = fs
  .readFileSync("./1.txt")
  .toString()
  .split("\n")
  .filter((x) => /^\d+$/.test(x))
  .map(Number);

function one(numbers, sum = 2020, skip = -1) {
  for (let i = 0; i < numbers.length; i++) {
    if (i === skip) continue;

    const number = numbers[i];
    const idx = numbers.indexOf(sum - number);

    if (idx !== -1) {
      return number * (sum - number);
    }
  }

  return null;
}

function two(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    const n = one(numbers, 2020 - numbers[i], i);
    if (n) return n * numbers[i];
  }

  return null;
}

console.log(one(numbers));
console.log(two(numbers));
