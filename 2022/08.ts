import * as _ from "lodash";
import { ceil, chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = number[][];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .map(x => x
      .split("")
      .map(y => parseInt(y.trim())))
    .value();

function isVisibile(trees: InputType, x: number, y: number) {
  // Trees at the edge are visible
  if (
    x === 0 || x === trees[0].length - 1 ||
    y === 0 || y === trees.length - 1
  ) return true;


  // A tree is visible if -

  // - all trees above it in the same column are shorter than it
  let aboveMax = -1;
  for(let i = 0; i < y; i++) {
    if(trees[i][x] > aboveMax) aboveMax = trees[i][x];
  }
  if(aboveMax < trees[y][x]) return true;

  // - all trees below it in the same column are shorter than it
  let belowMax = -1;
  for(let i = y + 1; i < trees.length; i++) {
    if(trees[i][x] > belowMax) belowMax = trees[i][x];
  }
  if(belowMax < trees[y][x]) return true;

  // - all trees to the left of it in the same row are shorter than it
  let leftMax = -1;
  for(let i = 0; i < x; i++) {
    if(trees[y][i] > leftMax) leftMax = trees[y][i];
  }
  if(leftMax < trees[y][x]) return true;

  // - all trees to the right of it in the same row are shorter than it
  let rightMax = -1;
  for(let i = x + 1; i < trees[0].length; i++) {
    if(trees[y][i] > rightMax) rightMax = trees[y][i];
  }
  if(rightMax < trees[y][x]) return true;


  return false;
}

function scenicScore(trees: InputType, x: number, y: number) {
  // +1s are to compensate for 0 indexing
  const vis = {
    up: (y + 1) - 1,
    down: trees.length - (y + 1),
    left: (x + 1) - 1,
    right: trees[0].length - (x + 1)
  };

  for(let i = y - 1; i >= 0; i--) {
    // console.log('up', x, i, trees[i][x])
    if(trees[i][x] >= trees[y][x]) {
      vis.up = Math.abs(y - i);
      break;
    }
  }

  for(let i = y + 1; i < trees.length; i++) {
    // console.log('down', x, i, trees[i][x])
    if(trees[i][x] >= trees[y][x]) {
      vis.down = Math.abs(y - i);
      break;
    }
  }

  for(let i = x - 1; i >= 0; i--) {
    // console.log('left', i, y, trees[y][i])
    if(trees[y][i] >= trees[y][x]) {
      vis.left = Math.abs(x - i);
      break;
    }
  }

  for(let i = x + 1; i <= trees[0].length; i++) {
    // console.log('left', i, y, trees[y][i])
    if(trees[y][i] >= trees[y][x]) {
      vis.right = Math.abs(x - i);
      break;
    }
  }

  // console.log(vis);
  return vis.up * vis.down * vis.left * vis.right;
}

function one(input: InputType) {
  // above test - 
  // return isVisibile(input, 1, 1);
  // below/left test -
  // return isVisibile(input, 2, 3);
  // right test -
  // return isVisibile(input, 1, 2);

  return ch(input)
    .map((row, y) => row.map((_, x) => isVisibile(input, x, y)))
    .flatten()
    .countBy(_.identity)
    .value()['true'];
}

function two(input: InputType) {
  // console.log(input);
  // return scenicScore(input, 2, 3);
  return ch(input)
    .map((row, y) => row.map((_, x) => scenicScore(input, x, y)))
    .flatten()
    .max()
    .value();
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
