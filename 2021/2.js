const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/" + process.argv[2])
  .toString()
  .split("\n")
  .filter((x) => !!x)
  .map((ln) => ln.split(" ").map((x, i) => (i === 1 ? Number(x) : x)));

function one(input) {
  const instructions = {
    forward: (n, state) => [state[0] + n, state[1]],
    down: (n, state) => [state[0], state[1] + n],
    up: (n, state) => [state[0], state[1] - n],
  };

  const state = input.reduce(
    (currentState, [ins, n]) => instructions[ins](n, currentState),
    [0, 0]
  );

  return state[0] * state[1];
}

console.log(one([...input]));

function two(input) {
  const instructions = {
    forward: (n, [hor, dep, aim]) => [hor + n, dep + aim * n, aim],
    down: (n, [hor, dep, aim]) => [hor, dep, aim + n],
    up: (n, [hor, dep, aim]) => [hor, dep, aim - n],
  };

  const state = input.reduce(
    (currentState, [ins, n]) => instructions[ins](n, currentState),
    // hor, dep, aim
    [0, 0, 0]
  );

  return state[0] * state[1];
}

console.log(two([...input]));
