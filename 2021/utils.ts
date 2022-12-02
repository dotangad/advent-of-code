import { readFileSync } from "fs";
import * as _ from "lodash";

export function readInput(fileName: string) {
  let input: string;

  try {
    input = readFileSync(String(fileName)).toString();
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      console.log("No input file found, please run the following command after copying input - ");
      console.log("./data <day> <sample/final>");
      process.exit(1);
    }

    console.log(e);
    process.exit(1);
  }

  return input;
}

/**
  * Create a window around an array element
  */
export function window(size: number): (<T>(n: T, i: number, arr: _.List<T>) => T[]) {
  return (_n, i, arr) =>
    _.slice(
      arr,
      Math.max(0, i - (size / 2)),
      Math.min(arr.length, i + (size / 2))
    )
}
