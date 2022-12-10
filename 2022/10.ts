import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

const Noop = "noop";
const AddX = "addx";
type Instruction = { type: "noop" | "addx"; val?: number; };
type InputType = { type?: "noop" | "addx"; val?: number; }[];
// type InputType = any[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(ln => {
      const [ins, ...sp] = ln.split(" ");
      if (ins === "noop") return { type: Noop } as Instruction;
      if (ins === "addx") return { type: AddX, val: parseInt(sp[0].trim()) } as Instruction;

      return {} as Instruction;
    })
    .filter(x => !!x)
    .value();

function one(input: InputType) {
  let cycles = 1, x = 1, strengthSum = 0;

  const checkSum = () => {
    if ((cycles - 20) % 40 === 0 && cycles <= 220)
      strengthSum += x * cycles;
  }

  for (let ins of input) {
    if (ins.type === AddX) {
      cycles++;
      checkSum();
      cycles++;
      x += ins?.val ?? 0;
      checkSum();
    }

    if (ins.type === Noop) {
      cycles++;
      checkSum();
    }

    // console.log({ ins, cycles, x });
  }


  return strengthSum;
}

function two(input: InputType) {
  const HT = 6, WD = 40;
  let screen = "";
  let x = 1, cycles: number[] = [];
  
  for (let ins of input) {
    if (ins.type === AddX) {
      cycles = [...cycles, x, x];
      x += ins?.val ?? 0;
    }

    if (ins.type === Noop) {
      cycles = [...cycles, x];
    }
  }
  
  for(let cycle = 0; cycle < HT * WD; cycle++) {
    const hor = cycle % WD;
    if(hor === 0) screen += "\n";

    if(
      Math.abs(cycles[cycle] - hor) <= 1
    ) screen += "#";
    else screen += ".";

  }

  return screen;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
