import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type Monkey = {
  number: number;
  insp: number; // inspections
  starting: number[];
  wl: number[]; // worry levels
  nextWl: number[];
  op: (old: number) => number; // operation
  test: number; // divisible by
  ifTrue: number; // monkey to throw to if test is true
  ifFalse: number; // monkey to throw to if test is false
};
type InputType = Monkey[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n\n")
    .filter(x => !!x)
    .map(x => {
      const lns = x.split("\n").filter(y => !!y);
      const starting = lns[1].split(":")[1].split(",").map(y => parseInt(y.trim()));
      const op = lns[2].split("=")[1].split(" ").map(y => y.trim()).filter(y => !!y);
      const operands = [op[0], op[2]], operator = op[1];

      return {
        number: parseInt(lns[0].split(" ")[1].slice(0, -1)),
        insp: 0,
        starting,
        wl: _.clone(starting),
        nextWl: _.clone(starting),
        op: (old: number) => ({
          "*": (x: number, y: number) => x * y,
          "+": (x: number, y: number) => x + y,
        }[operator === "*" ? "*" : "+"](
          operands[0] === "old" ? old : parseInt(operands[0]),
          operands[1] === "old" ? old : parseInt(operands[1])
        )),
        test: parseInt(lns[3].split(" ").slice(-1)[0].trim()),
        ifTrue: parseInt(lns[4].split(" ").slice(-1)[0].trim()),
        ifFalse: parseInt(lns[5].split(" ").slice(-1)[0].trim()),
      }
    })
    .value();

function one(input: InputType) {
  const monkeys = _.cloneDeep(input);
  const ROUNDS = 20;

  for (let r = 0; r < ROUNDS; r++) {
    for (let i = 0; i < monkeys.length && r !== 0; i++) {
      monkeys[i].wl = _.clone(monkeys[i].nextWl);
      monkeys[i].nextWl = [];
    }

    for (let i = 0; i < monkeys.length; i++) {
      // console.log(`Monkey ${i} r${r}:`);
      for (let j = 0; j < monkeys[i].wl.length; j++) {
        monkeys[i].wl[j] = Math.floor(input[i].op(input[i].wl[j]) / 3);
        monkeys[i].insp++;
        // console.log(`  WL: ${monkeys[i].wl[j]}`);

        if (monkeys[i].wl[j] % input[i].test === 0) {
          monkeys[input[i].ifTrue].nextWl.push(input[i].wl[j]);
          // console.log(`  WL div by test:`)
          // console.log(`    Passed to monkey ${monkeys[i].ifTrue}`)
        }
        else {
          monkeys[input[i].ifFalse].nextWl.push(input[i].wl[j]);
          // console.log(`  WL not div by test:`)
          // console.log(`    Passed to monkey ${monkeys[i].ifFalse}`)
        }
      }
    }
  }

  console.log(monkeys)

  return null;
}

function two(input: InputType) {
  return null;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);



