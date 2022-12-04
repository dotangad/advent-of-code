import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput, between } from "./utils";

type Section = number[];
type InputType = Section[][];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(x =>
      x.split(',')
        .map(y =>
          y.split('-')
            .map(z => parseInt(z.trim()))
        ))
    .value();

function one(input: InputType) {
  const sectionContained = (s1: Section, s2: Section) => {
    const [s1b, s1e] = s1;
    const [s2b, s2e] = s2;

    if (s2b >= s1b && s2e <= s1e) return true
    if (s1b >= s2b && s1e <= s2e) return true

    return false;
  }

  return ch(input)
    .map(([s1, s2]) => sectionContained(s1, s2))
    .countBy(_.identity)
    .value()['true'];
}

function two(input: InputType) {
  const sectionOverlap = (s1: Section, s2: Section) => {
    const [s1b, s1e] = s1;
    const [s2b, s2e] = s2;

    if(between(s1b, s1e, s2b) || between(s1b, s1e, s2e)) return true;
    if(between(s2b, s2e, s1b) || between(s2b, s2e, s1e)) return true;

    return false;
  }

  return ch(input)
    .map(([s1, s2]) => sectionOverlap(s1, s2))
    .countBy(_.identity)
    .value()['true'];
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
