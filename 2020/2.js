const fs = require("fs");
const input = fs.readFileSync("./2.txt").toString().split("\n");

function tokens(line) {
  const m = line.split(" ");
  const n = m[0].split("-").map(Number);
  const c = m[1][0];
  const w = m[2];
  return [n, c, w];
}

function count(str, char) {
  let cnt = 0;
  for (let i = 0; i < str.length; i++) if (str[i] === char) cnt++;

  return cnt;
}

function one(input) {
  let valid = 0;
  for (let i = 0; i < input.length; i++) {
    const [[min, max], char, pass] = tokens(input[i]);
    const cnt = count(pass, char);
    if (cnt <= max && min <= cnt) valid++;
  }

  return valid;
}

function two(input) {
  let valid = 0;
  for (let i = 0; i < input.length; i++) {
    const [[p1, p2], char, pass] = tokens(input[i]);
    const [ap1, ap2] = [pass[p1 - 1] === char, pass[p2 - 1] === char];
    if (ap1 !== ap2) valid++;
  }

  return valid;
}

console.log(one(input));
console.log(two(input));
