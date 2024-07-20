import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = {
  id: number,
  cubes: {
    red: number,
    blue: number,
    green: number,
  }[]
}[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .map(x => {
      const id = parseInt(x.split(':')[0].slice(5))
      const cubes = x.split(":")[1].split(';').map(y => {
        let red = 0, green = 0, blue = 0;
        y.split(',').forEach(x => {
          const [n, color] = x.trim().split(' ');
          if (color === 'red') red = parseInt(n)
          if (color === 'green') green = parseInt(n)
          if (color === 'blue') blue = parseInt(n)
        })

        return { red, green, blue }
      })

      return {
        id,
        cubes: cubes
      }
    })
    .value();

function one(input: InputType) {
  return ch(input)
    .filter(x => x.cubes.every(y => y.red <= 12 && y.green <= 13 && y.blue <= 14))
    .map(x => x.id)
    .sum()
    .value();
}

function two(input: InputType) {
  return ch(input)
    .map(x => {
      return {
        red: _.max(x.cubes.map(x => x.red)) || 0,
        blue: _.max(x.cubes.map(x => x.blue)) || 0,
        green: _.max(x.cubes.map(x => x.green)) || 0,
      }
    })
    .map(x => x.red * x.blue * x.green)
    .sum()
    .value();
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
