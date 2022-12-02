import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = string[][];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(x => x.split(' '))
    .value();

// X, A -> Rock, 1
// Y, B -> Paper, 2
// Z, C -> Scissors, 3
function winOnePoints(opp: string, you: string) {
  // @ts-ignore
  return {
    'A': { 'X': 3, 'Y': 6, 'Z': 0 },
    'B': { 'X': 0, 'Y': 3, 'Z': 6 },
    'C': { 'X': 6, 'Y': 0, 'Z': 3 },
  }[opp][you];
}

function movePoints(move: string) {
  return { 'X': 1, 'Y': 2, 'Z': 3 }[move];
}

function one(input: InputType) {
  return ch(input)
    .map(([opp, you]) => winOnePoints(opp, you) + movePoints(you))
    .sum()
    .value();
}

// X -> lose
// Y -> draw
// Z -> win
function findMove(opp: string, endState: string) {
  // @ts-ignore
  return {
    // Rock
    'A': { 'X': 'Z', 'Y': 'X', 'Z': 'Y' },
    // Paper
    'B': { 'X': 'X', 'Y': 'Y', 'Z': 'Z' },
    // Scissors
    'C': { 'X': 'Y', 'Y': 'Z', 'Z': 'X' },
  }[opp][endState] ?? 0;
}

function winTwoPoints(endState: string) {
  return { 'X': 0, 'Y': 3, 'Z': 6 }[endState] ?? 0;
}

function two(input: InputType) {
  return JSON.stringify(ch(input)
    // @ts-ignore
    .map(([opp, end]) => winTwoPoints(end) + movePoints(findMove(opp, end)))
    .sum()
    .value());
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
