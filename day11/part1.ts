import { isTest } from "../global.ts";
import { parseData } from "./common.ts";

function main(): number {
  const file = isTest() ? "day11/example1.txt" : "day11/input.txt";
  const data = parseData(file);

  function findNumPathsToOut(path = "you"): number {
    const paths = data[path]!;

    if (paths.indexOf("out") !== -1) {
      return 1;
    }

    return paths.reduce((sum, path) => sum + findNumPathsToOut(path), 0);
  }

  return findNumPathsToOut();
}

console.log(`Part 1: ${main()}`);
