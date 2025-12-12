import { isTest } from "../global.ts";
import { parseData } from "./common.ts";

function main(): number {
  const file = isTest() ? "day11/example2.txt" : "day11/input.txt";
  const data = parseData(file);
  return -1;
}

console.log(`Part 2: ${main()}`);
