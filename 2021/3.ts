import * as _ from "lodash";
import { chain as ch, parseInt } from "lodash";
import { readInput } from "./utils";

type InputType = string[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .value();

function one(input: InputType) {
  // This array has all the first bits in zipped[0], second bits in zipped[2] and so on
  const zipped = _.zip(...(input.map(x => x.split(''))));

  const gammaRate = parseInt(
    ch(zipped)
      // -> [number of 0s, number of 1s]
      .map(x =>
        ch(x)
          .countBy(_.identity)
          // -> { '0': n, '1': n }
          .values()
          .value()
      )
      .map(([z, o]) => z > o ? 0 : 1)
      .value()
      .join(''),
    2
  );

  // XORing a binary digit with 1
  // 0b0 ^ 0b1 -> 0b1
  // 0b1 ^ 0b1 -> 0b0
  const epsilonRate = parseInt(
    gammaRate
      .toString(2)
      .split('')
      .map(Number)
      .map(x => x ^ 1)
      .join(''),
    2
  );

  return gammaRate * epsilonRate;
}

function two(input: InputType) {
  let possibleO2Values = _.clone(input);
  for (let i = 0; i < input[0].length && possibleO2Values.length > 1; i++) {
    const [zeroes, ones] = ch(possibleO2Values)
      .map(x => x[i])
      .countBy(_.identity)
      .values()
      .value();

    // Filter down to those values that have the most common bit at the ith position
    if (ones >= zeroes) {
      possibleO2Values = possibleO2Values.filter(x => x[i] === '1');
    } else {
      possibleO2Values = possibleO2Values.filter(x => x[i] === '0');
    }
  }
  const o2Rating = parseInt(possibleO2Values[0], 2);

  let possibleCO2Values = _.clone(input);
  for (let i = 0; i < input[0].length && possibleCO2Values.length > 1; i++) {
    const [zeroes, ones] = ch(possibleCO2Values)
      .map(x => x[i])
      .countBy(_.identity)
      .values()
      .value();

    // Filter down to those values that have the most common bit at the ith position
    if (ones >= zeroes) {
      possibleCO2Values = possibleCO2Values.filter(x => x[i] === '0');
    } else {
      possibleCO2Values = possibleCO2Values.filter(x => x[i] === '1');
    }
  }
  const co2Rating = parseInt(possibleCO2Values[0], 2);


  return o2Rating * co2Rating;
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
