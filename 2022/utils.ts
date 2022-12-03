import { readFileSync } from "fs";

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

export function mapLog(inp: any): any {
  console.log(inp);
  return inp;
}

export function mapLogOnce(...args: any[]) {
  let printed = false;

  return (inp: any): any => {
    if(!printed) {
      console.log(...args);
      printed = true;
    }

    return inp;
  }
}
