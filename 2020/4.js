const fs = require("fs");
const input = fs
  .readFileSync("./4.txt")
  .toString()
  .split("\n\n")
  .filter((x) => !!x)
  .map((x) =>
    x
      .replace(/\n/g, " ")
      .split(" ")
      .filter((y) => !!y)
      .map((z) => z.split(":"))
  );

const validation = {
  byr: (b) => Number(b) >= 1920 && Number(b) <= 2002,
  iyr: (b) => Number(b) >= 2010 && Number(b) <= 2020,
  eyr: (b) => Number(b) >= 2020 && Number(b) <= 2030,
  hcl: (cl) => /^\#[0-9a-f]{6}$/g.test(cl),
  pid: (id) => /^\d{9}$/g.test(id),
  ecl: (cl) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(cl) !== -1,
  hgt: (h) => {
    if (!/^\d+(cm|in)$/g.test(h)) return false;
    const [n, unit] = [Number(h.slice(0, -2)), h.slice(-2)];

    if (unit === "cm") return n >= 150 && n <= 193;
    if (unit === "in") return n >= 59 && n <= 76;
    return false;
  },
  cid: () => true,
};

function one(input) {
  return [...input]
    .map((x) => x.map((y) => y[0]))
    .filter((fields) => {
      const reqd = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
      let n = 0;
      for (let f of fields) {
        if (reqd.indexOf(f) !== -1) n++;
      }

      return n == 7;
    }).length;
}

function two(input) {
  return [...input]
    .filter((i) => {
      fields = i.map((y) => y[0]);
      const reqd = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
      let n = 0;
      for (let f of fields) {
        if (reqd.indexOf(f) !== -1) n++;
      }

      return n == 7;
    })
    .filter((i) => i.map((x) => validation[x[0]](x[1])).indexOf(false) === -1)
    .length;
}

console.log(one(input));
console.log(two(input));
