import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type Position = { x: number, y: number };
type Instruction = { direction: "R" | "L" | "U" | "D", steps: number };
type InputType = Instruction[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(x => {
      const [d, s] = x.split(" ");

      return { direction: d, steps: parseInt(s.trim()) } as Instruction;
    })
    .value();

function touching(head: Position, tail: Position) {
  return Math.abs(head.x - tail.x) <= 1 &&
    Math.abs(head.y - tail.y) <= 1;
}

function updateTailPos(ins: Instruction, head: Position, tail: Position) {
  if (!touching(head, tail)) {
    switch (ins.direction) {
      case 'R':
        tail.x = head.x - 1;
        tail.y = head.y;
        break;
      case 'L':
        tail.x = head.x + 1;
        tail.y = head.y;
        break;
      case 'U':
        tail.x = head.x;
        tail.y = head.y + 1;
        break;
      case 'D':
        tail.x = head.x;
        tail.y = head.y - 1;
        break;
    }
  }
}

function one(input: InputType) {
  const head: Position = { x: 1, y: 5 };
  const tail: Position = _.clone(head);
  const tailHist: Position[] = [_.clone(tail)];
  const op = {
    'R': (pos: Position) => { pos.x++ },
    'L': (pos: Position) => { pos.x-- },
    'U': (pos: Position) => { pos.y-- },
    'D': (pos: Position) => { pos.y++ }
  };

  for (let instruction of input) {
    for (let i = 0; i < instruction.steps; i++) {
      op[instruction.direction](head);
      updateTailPos(instruction, head, tail);
      tailHist.push(_.clone(tail));
    }
  }

  return ch(tailHist)
    .map(({ x, y }) => `${x},${y}`)
    .uniq()
    .value()
    .length;
}

function two(input: InputType) {
  const KNOTS = 9;
  const head: Position = { x: 0, y: 0 };
  const knots: Position[] = Array(KNOTS).fill('-').map(() => _.clone(head));
  const tailHist: Position[] = [_.clone(knots[KNOTS - 1])];
  const op = {
    'R': (head: Position) => { head.x++ },
    'L': (head: Position) => { head.x-- },
    'U': (head: Position) => { head.y-- },
    'D': (head: Position) => { head.y++ }
  };

  for (let instruction of input) {
    for(let i = 0; i < instruction.steps; i++) {
      op[instruction.direction](head);
      updateTailPos(instruction, head, knots[0]);
      for(let j = 1; j < knots.length ;j++) {
        updateTailPos(instruction, knots[j - 1], knots[j]);
      }

      tailHist.push(_.clone(knots[KNOTS - 1]));
    }
  }

  return ch(tailHist)
    .map(({ x, y }) => `${x},${y}`)
    .uniq()
    .value()
    .length;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
