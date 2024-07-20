import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = String[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split('\n')
    .map(x => x.trim())
    .value()

function one(input: InputType) {
  return ch(input)
    .map(x => x.split('').filter(x => /\d+/.test(x)).join(''))
    .map(x => parseInt(`${x[0]}${_.last(x)}`))
    .sum()
    .value();
}

function two(input: InputType) {
  return ch(input)
    .map(x => x
      .replace(/one/g, 'one1one')
      .replace(/two/g, 'two2two')
      .replace(/three/g, 'three3three')
      .replace(/four/g, 'four4four')
      .replace(/five/g, 'five5five')
      .replace(/six/g, 'six6six')
      .replace(/seven/g, 'seven7seven')
      .replace(/eight/g, 'eight8eight')
      .replace(/nine/g, 'nine9nine')
    )
    .map(x => x.split('').filter(x => /\d+/.test(x)).join(''))
    .map(x => parseInt(`${x[0]}${_.last(x)}`))
    .sum()
    .value();
}


console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
