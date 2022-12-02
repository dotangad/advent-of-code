import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput, window } from "./utils";

type InputType = number[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .map(Number)
    .value();

function one(input: InputType) {
  return input.reduce(
    (increases, _, i) => i === 0
      ? increases
      : input[i] > input[i - 1]
        ? increases + 1
        : increases,
    0
  );
}

function two(input: InputType) {
  return one(
    ch(input)
      .map(window(3))
      .filter(x => x.length === 3)
      .map(_.sum)
      .value()
  );
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);

