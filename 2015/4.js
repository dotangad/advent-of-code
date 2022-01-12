const crypto = require("crypto");
const input = "bgvyzdsv";

const md5 = (s) => crypto.createHash("md5").update(s).digest("hex");

const five0s = (s) => /^[0]{5}/g.test(s);
const six0s = (s) => /^[0]{6}/g.test(s);

function one(input) {
  let n = 0;

  while (!five0s(md5(input + String(n)))) n++;

  return n;
}

function two(input) {
  let n = 0;

  while (!six0s(md5(input + String(n)))) n++;

  return n;
}

console.log(one(input));
console.log(two(input));
