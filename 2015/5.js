const fs = require("fs");
const input = fs
  .readFileSync("./5.txt")
  .toString()
  .split("\n")
  .map((l) => l.trim())
  .filter((x) => !!x);

function one(input) {
  const vowels = (w) =>
    w.split("").filter((c) => "aeiou".split("").indexOf(c) !== -1).length;

  const repeating = (w) =>
    w.split("").reduce((r, _, i) => i > 0 && (r || w[i] === w[i - 1]), false);

  const nice = (w) =>
    vowels(w) > 2 && repeating(w) && !/(ab|cd|pq|xy)/g.test(w);

  return input.filter(nice).length;
}

function two(input) {
  const twice = (w) => /([a-z][a-z]).*\1/g.test(w);
  const repeat = (w) => /([a-z]).\1/g.test(w);

  const nice = (w) => twice(w) && repeat(w);

  return input.filter(nice).length;
}

console.log(one(input));
console.log(two(input));
