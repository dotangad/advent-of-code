#!/usr/bin/env zx

const [day, type] = process.argv.splice(3);

if (
  !/\d+/.test(day) ||
  Number(day) < 1 ||
  Number(day) > 25 ||
  !["sample", "final"].includes(type)
) {
  console.log("Usage: ./data <day> <sample/final>");
  process.exit(1);
}

const dayClean = day.padStart(2, "0");
await $`pbpaste > ../in/2023/${dayClean}.${type}.txt`;
