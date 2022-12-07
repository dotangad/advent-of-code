import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = number[][];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split('\n\n')
    .map(l => l.split('\n').map(Number))
    .value()

function one(input: InputType) {
  return ch(input)
    .map(x => _.sum(x))
    .max()
    .value();
}

function two(input: InputType) {
  return ch(input)
    .map(x => _.sum(x))
    .sortBy(Number)
    // sort function is ascending, so takeRight instead of take
    .takeRight(3)
    .sum()
    .value();
}


console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
