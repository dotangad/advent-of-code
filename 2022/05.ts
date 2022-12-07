import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type Instruction = { qty: number, src: number, dest: number };
type InputType = {
  initialState: (string | undefined)[][];
  instructions: Instruction[];
};
const [initialState, instructions] = ch(readInput(process.argv[2]))
  .split("\n\n")
  .value();

const input: InputType = {
  initialState: _.zip(...ch(initialState)
    .split('\n')
    .dropRight(1)
    .map(row => ch(row)
      .split('')
      .drop(1)
      .chunk(4)
      .map(cell => cell[0].trim())
      .value()
    )
    .value())
    .map(row => row.filter(x => !!x).reverse()),
  instructions: ch(instructions)
    .split('\n')
    .map(ln => {
      const lns = ln.split(' ').map(x => parseInt(x.trim()));
      return { qty: lns[1], src: lns[3] - 1, dest: lns[5] - 1 };
    })
    .value()
};

function one(input: InputType) {
  const finalState = _.cloneDeep(input.initialState);

  for (let { qty, src, dest } of input.instructions) {
    finalState[dest] = finalState[dest].concat(_.takeRight(finalState[src], qty).reverse());
    finalState[src] = _.dropRight(finalState[src], qty);
  }

  return finalState
    .map(stack => stack[stack.length - 1])
    .join('');
}

function two(input: InputType) {
  const finalState = _.cloneDeep(input.initialState);

  for (let { qty, src, dest } of input.instructions) {
    finalState[dest] = finalState[dest].concat(_.takeRight(finalState[src], qty));
    finalState[src] = _.dropRight(finalState[src], qty);
  }

  return finalState
    .map(stack => stack[stack.length - 1])
    .join('');
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
