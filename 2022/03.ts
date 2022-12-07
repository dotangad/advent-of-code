import * as _ from "lodash";
import { chain as ch } from "lodash";
import { mapLog, mapLogOnce, readInput } from "./utils";

type InputType = string[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .value();

const priority = (c: string) =>
  c.toLowerCase().charCodeAt(0) - 96 + (c === c.toUpperCase() ? 26 : 0)

function one(input: InputType) {
  return ch(input)
    .map(x => [x.slice(0, x.length / 2), x.slice(x.length / 2)])
    // .map(mapLogOnce("Compartments -"))
    // .map(mapLog)
    .map(([c1, c2]) => _.intersection(c1.split(''), c2.split('')))
    // .map(mapLogOnce("Intersection -"))
    // .map(mapLog)
    .flatten()
    .map(priority)
    .sum()
    .value();
}

function two(input: InputType) {
  return ch(input)
    .chunk(3)
    // .map(mapLogOnce("Groups -"))
    // .map(mapLog)
    .map(x => x.map((y: any) => y.split('')))
    .map(x => _.intersection(...x))
    .flatten()
    .map(priority)
    .sum()
    .value();
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
