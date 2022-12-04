import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput, between } from "./utils";

type Section = { start: number; end: number; };
type InputType = Section[][];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(x =>
      x.split(',')
        .map(y => {
          const [b, e] = y.split('-')
            .map(z => parseInt(z.trim()))
          return { start: b, end: e };
        })
    )
    .value();

function one(input: InputType) {
  const sectionContained = (s1: Section, s2: Section) => {
    // S1 contains S2 if S2 starts after S1 and ends before
    if (s2.start >= s1.start && s2.end <= s1.end) return true
    // S2 contains S1 if S1 starts after S2 and ends before
    if (s1.start >= s2.start && s1.end <= s2.end) return true

    return false;
  }

  return ch(input)
    .map(([s1, s2]) => sectionContained(s1, s2))
    .countBy(_.identity)
    .value()['true'];
}

function two(input: InputType) {
  const sectionOverlap = (s1: Section, s2: Section) => {
    // An overlap happens when a section either begins or ends inside another section
    // i.e. the beginning or end is within the bounds of the other section
    if (
      between(s1.start, s1.end, s2.start) ||
      between(s1.start, s1.end, s2.end)
    ) return true;
    if (
      between(s2.start, s2.end, s1.start) ||
      between(s2.start, s2.end, s1.end)
    ) return true;

    return false;
  }

  return ch(input)
    .map(([s1, s2]) => sectionOverlap(s1, s2))
    .countBy(_.identity)
    .value()['true'];
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
