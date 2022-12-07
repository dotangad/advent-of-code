import { readFileSync } from "fs";
import path from "path";

/**
  * Read input from a file and return as a string, with some nice error handling
  */
export function readInput(fileName: string) {
  let input: string;

  try {
    input = readFileSync(path.resolve(fileName)).toString();
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
  * Log all elements inside an array, to be used as input to a `map` function
  */
export function mapLog(inp: any): any {
  console.log(inp);
  return inp;
}

/**
  * Log to console, to be used as input to a `map` function
  */
export function mapLogOnce(...args: any[]) {
  let printed = false;

  return (inp: any): any => {
    if (!printed) {
      console.log(...args);
      printed = true;
    }

    return inp;
  }
}

/**
  * Check if `a` is between `x` and `y`
  */
export function between(x: number, y: number, a: number) {
  const low = Math.min(x, y), high = Math.max(x, y);

  if (a >= low && a <= high) return true;

  return false;
}
