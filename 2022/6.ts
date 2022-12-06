import * as _ from "lodash";
import { readInput } from "./utils";

type InputType = string;
const input: InputType = readInput(process.argv[2]);

function firstUniqueSequence(input: string, length: number) {
  let found = -1;
  for (let i = length; i < input.length; i++) {
    const last4 = input.slice(i - length, i);

    if (_.uniq(last4).length === length) {
      found = i;
      break;
    }
  }

  return found;
}

function one(input: InputType) {
  return firstUniqueSequence(input, 4);
}

function two(input: InputType) {
  return firstUniqueSequence(input, 14);
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
