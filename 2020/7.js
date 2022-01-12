const fs = require("fs");
const input = fs
  .readFileSync("./7.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => !!x);

function normalise(input) {
  input = input.map((l) =>
    l
      .replace(/\./, "")
      .split("contain")
      .map((x) => x.trim())
      .map((x, i) =>
        i === 1 ? (x === "no other bags" ? [] : x.split(", ")) : x
      )
      .map((x, i) =>
        i === 1
          ? x.map((c) => c.split(" "))
          : x.split(" ").slice(0, 2).join(" ")
      )
      .map((x, i) =>
        i === 1 ? x.map((l) => [Number(l[0]), `${l[1]} ${l[2]}`]) : x
      )
  );

  const inputMap = {};
  for (let i = 0; i < input.length; i++) {
    inputMap[input[i][0]] = input[i][1].map(([_, c]) => c);
  }

  return inputMap;
}

function search(bags, input) {
  if (bags === []) return false;

  if (bags.indexOf("shiny gold") !== -1) {
    return true;
  }

  for (let i = 0; i < bags.length; i++) {
    if (search(input[bags[i]], input)) return true;
  }

  return false;
}

function one(input) {
  let counter = 0;
  const arrI = Object.entries(input);
  for (let i = 0; i < arrI.length; i++) {
    counter += Number(search(arrI[i][1], input));
  }
  return counter;
}

function searchTwo(bags, input) {
  if (bags === []) return 0;

  return (
    bags.length +
    bags
      .map(([n, bag]) => n * searchTwo(input[bag], input))
      .reduce((p, c) => p + c, 0)
  );
}

function two(input) {
  input = input.map((l) =>
    l
      .replace(/\./, "")
      .split("contain")
      .map((x) => x.trim())
      .map((x, i) =>
        i === 1 ? (x === "no other bags" ? [] : x.split(", ")) : x
      )
      .map((x, i) =>
        i === 1
          ? x.map((c) => c.split(" "))
          : x.split(" ").slice(0, 2).join(" ")
      )
      .map((x, i) =>
        i === 1 ? x.map((l) => [Number(l[0]), `${l[1]} ${l[2]}`]) : x
      )
  );

  const inputMap = {};
  for (let i = 0; i < input.length; i++) {
    inputMap[input[i][0]] = input[i][1];
  }

  console.log(inputMap["shiny gold"]);
  return searchTwo(inputMap["shiny gold"], inputMap);
}

console.log(one(normalise(input)));
console.log(two(input));
