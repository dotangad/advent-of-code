const fs = require("fs");
const input = fs
  .readFileSync("./8.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim())
  .filter((x) => !!x)
  .map((x) => x.split(" "))
  .map((x) => [x[0], Number(x[1])]);

function one(input) {
  const executed = [];
  let accumulator = 0,
    i = 0;
  while (i > -1 && i < input.length) {
    if (executed.indexOf(i) !== -1) return accumulator;
    executed.push(i);

    if (input[i][0] === "acc") accumulator += input[i][1];
    if (input[i][0] === "jmp") i += input[i][1];
    else i++;
  }

  return accumulator;
}

function fix(input) {
  for (let c = 0; c < input.length; c++) {
    if (input[c][0] === "nop" || input[c][0] === "jmp") {
      const nInput = input.map((l) => l.map((x) => x));
      nInput[c][0] = input[c][0] === "nop" ? "jmp" : "nop";

      const executed = [];
      let i = 0,
        repeat = false;
      while (i > -1 && i < nInput.length) {
        if (executed.indexOf(i) !== -1) {
          repeat = true;
          break;
        }
        executed.push(i);

        if (nInput[i][0] === "jmp") i += nInput[i][1];
        else i++;
      }

      if (!repeat) return nInput;
    }
  }

  return null;
}

console.log(one(input));
console.log(one(fix(input)));
