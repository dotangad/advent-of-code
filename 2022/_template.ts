import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = string[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .value();

function one(input: InputType) {
  return null;
}

function two(input: InputType) {
  return null;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
