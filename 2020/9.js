const fs = require("fs");
const input = fs
  // .readFileSync("./9-test.txt")
  .readFileSync("./9.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => !!x)
  .map(Number);

function twoSum(n, arr) {
  for (let i = 0; i < arr.length; i++) {
    const k = n - arr[i];
    const idx = arr.indexOf(k);
    if (idx !== -1 && idx !== i) {
      return true;
    }
  }

  return false;
}

function one(input, preambleLen = 25) {
  for (let i = preambleLen; i < input.length; i++) {
    const preamble = input.slice(i - preambleLen, i);
    const n = input[i];
    if (!twoSum(n, preamble)) return n;
  }

  return null;
}

function two(input) {
  const fail = one(input);
  // const fail = one(input, 5);

  // console.log(input);
  for (let i = 0; i < input.length; i++) {
    let end = i + 1,
      sum = input[i] + input[end];
    while (sum <= fail && end < input.length) {
      // console.log(end, sum);
      if (sum === fail) {
        const a = input.slice(i, end + 1);
        return Math.min(...a) + Math.max(...a);
      }

      end++;
      sum += input[end];
    }
  }

  return null;
}

console.log(one(input));
// console.log(one(input, 5));
console.log(two(input));
