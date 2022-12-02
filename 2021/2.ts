import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type Instruction = ["forward" | "up" | "down", number]
type InputType = Instruction[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(x => x.split(' '))
    .map(([a, b]) => ([a, Number(b)] as Instruction))
    .value();

function findPosition(
  input: InputType,
  instructionMap: { [k: string]: (coords: number[], n: number) => number[] },
  initial: number[] = [0, 0]
) {
  return ch(input)
    .reduce(
      (state, [direction, n]) => instructionMap[direction](state, n),
      initial
    )
    .value();
}

function one(
  input: InputType,
) {
  const [x, y] = findPosition(
    input,
    {
      "forward": ([x, y]: number[], n: number) => [x + n, y],
      "up": ([x, y]: number[], n: number) => [x, y - n],
      "down": ([x, y]: number[], n: number) => [x, y + n],
    }
  );

  return x * y;
}

function two(input: InputType) {
  const [x, y] = findPosition(
    input,
    {
      "forward": ([x, y, a]: number[], n: number) => [x + n, y + (a * n), a],
      "up": ([x, y, a]: number[], n: number) => [x, y, a - n],
      "down": ([x, y, a]: number[], n: number) => [x, y, a + n],
    },
    [0, 0, 0]
  );

  return x * y;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
