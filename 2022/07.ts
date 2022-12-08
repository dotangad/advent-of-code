import * as _ from "lodash";
import { chain as ch } from "lodash";
import { readInput } from "./utils";

type InputType = string[];
const input: InputType =
  ch(readInput(process.argv[2]))
    .split("\n")
    .filter(x => !!x)
    .value();

/*
// Adi's solution - https://github.com/IDoEverything/adventofcode22/blob/main/src/main.rs#L17
function dirSizes(input: InputType): number[] {
  let current: number[] = [];
  let done: number[] = [];

  for (let line of input) {
    if (line.startsWith("$ cd ")) {
      const [_$, _cmd, dir] = line.split(" ");
      if (dir === "..") {
        done.push(current.pop() ?? 0);
      } else {
        current.push(0);
      }
    } else if (!line.startsWith("$") && !line.startsWith("dir")) {
      const [fsize, _fn] = line.split(" ");
      current = current.map(x => x + parseInt(fsize));
    }
  }

  return [...done, ...current];
}

function one(input: InputType) {
  return ch(dirSizes(input))
    .filter(x => x < 100000)
    .sum()
    .value();
}

function two(input: InputType) {
  const DISK_SPACE = 70000000;
  const REQUIRED_SPACE = 30000000;

  const sizes = dirSizes(input);
  const toFree = REQUIRED_SPACE - (DISK_SPACE - Math.max(...sizes));

  return ch(sizes)
    .filter(x => x > toFree)
    .min()
    .value();
}
*/

type File = {
  name: string;
  isDirectory: boolean;
  size?: number;
  parent: string;
  path: string[];
  // [item: string]: FileSystem | number;
}

function makeFileTree(input: InputType): File[] {
  let currentPath: string[] = [];
  const tree: File[] = [];

  for (let line of input) {
    if (line.startsWith('$')) {
      if (line.startsWith('$ cd ')) {
        const path = line.slice(5).trim();
        if (path === '/') {
          currentPath = ["/"];
          tree.push({ name: "/", parent: "", path: [], isDirectory: true });
        } else if (path === '..') {
          currentPath.pop();
        } else {
          currentPath.push(path)
        }
      }

      // We don't need to do anything about ls
    } else {
      const [info, fileName] = line.split(' ');
      const parent = currentPath[currentPath.length - 1];
      const file = tree.find(x => x.name === fileName && _.isEqual(x.path, currentPath));
      if (!file) {
        if (info === 'dir') {
          tree.push({
            name: fileName,
            isDirectory: true,
            parent,
            path: _.clone(currentPath)
          });
        } else {
          tree.push({
            name: fileName,
            isDirectory: false,
            size: Number(info),
            parent,
            path: _.clone(currentPath)
          });
        }
      }
    }
  }

  return tree;
}

function one(input: InputType) {
  const tree = makeFileTree(input);

  // return findSize(tree, ["/"], "a");
  return ch(tree)
    .filter(({ isDirectory }) => isDirectory)
    .map(file => findSize(tree, file))
    .filter(size => size < 100000)
    .sum()
    .value();
}

function findSize(tree: File[], file: File) {
  const { path, name } = file;

  // console.log('findSize called', path, name);
  // console.log(file);
  if (file.isDirectory === false && file.size) {
    // console.log("File is not directory, call end", path, name, file.size);
    return file.size;
  };

  // console.log("File is directory, starting recursion", path, name);

  const dirPath = [...path, name];

  const children: any = tree
    .filter(({ path }) => _.isEqual(path, dirPath))
    .map(child => {
      // console.log('Recursive findSize call');
      const s = findSize(tree, child);
      // console.log('Recursive findSize call returned', s, child.path, child.name);
      return s;
    });

  return _.sum(children);
}

function two(input: InputType) {
  const DISK_SPACE = 70000000;
  const REQUIRED_SPACE = 30000000;

  const tree = makeFileTree(input);
  const unusedSpace = DISK_SPACE - findSize(tree, tree[0]);
  const requiredSpace = REQUIRED_SPACE - unusedSpace;

  return ch(tree)
    .filter(({ isDirectory }) => isDirectory)
    .map(file => findSize(tree, file))
    .filter(x => x > requiredSpace)
    .sort()
    .min()
    .value();
}

console.log(`Part 1: ${one(input)}`);
console.log(`Part 2: ${two(input)}`);
