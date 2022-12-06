import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = string[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("")
    .value();

function one(input: InputType) {
  let sopMarker = -1;
  for(let i = 4; i < input.length; i++) {
    const last4 = input.slice(i - 4, i);
    if (_.uniq(last4).length === 4) {
      sopMarker = i;
      break;
    }
  }

  return sopMarker;
}

function two(input: InputType) {
  let somMarker = -1;
  for(let i = 14; i < input.length; i++) {
    const last14 = input.slice(i - 14, i);
    if (_.uniq(last14).length === 14) {
      somMarker = i;
      break;
    }
  }

  return somMarker;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
