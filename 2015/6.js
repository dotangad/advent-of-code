const fs = require("fs");
const input = fs
  .readFileSync("./6.txt")
  .toString()
  .split("\n")
  .map((l) => l.trim())
  .filter((x) => !!x);

const DIM = 1000;

function tokens(line) {
  line = line
    .replace("turn ", "")
    .replace(/,/g, " ")
    .replace(" through ", " ")
    .split(" ");

  return [
    line[0],
    Number(line[1]),
    Number(line[3]),
    Number(line[2]),
    Number(line[4]),
  ];
}

const parseCommand = (_command) => {
  let command = _command.match(
    /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
  );
  console.log(command);
  return [
    command[1].replace("turn ", ""),
    +command[3],
    +command[2],
    +command[4],
    +command[5],
  ];
};

function one(input) {
  const GRID = Array(DIM).fill(Array(DIM).fill(false));
  // const instructions = input.map(tokens);
  const instructions = [["on", 0, 0, 0, 0]];
  const commands = {
    toggle: (x) => !x,
    on: () => true,
    off: () => false,
  };

  for (let [command, yMin, yMax, xMin, xMax] of instructions) {
    console.log({ command, yMin, yMax, xMin, xMax });
    for (let i = yMin; i <= yMax; i++) {
      for (let j = xMin; j <= xMax; j++) {
        console.log(i, j);
        GRID[i][j] = commands[command](GRID[i][j]);
      }
    }
  }

  let c = 0;
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      if (GRID[i][j]) c++;
    }
  }

  // console.log(GRID.slice(0, 20).map((x) => x.slice(0, 20)));
  return c;
}

function two(input) {
  return null;
}

console.log(input[0]);
console.log(tokens(input[0]));
console.log(parseCommand(input[0]));
console.log(one(input));
console.log(two(input));
