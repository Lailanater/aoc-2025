import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day7/input.txt", { encoding: "utf-8" });
  const diagram = input.split("\n").map((line) => line.split(""));

  const row = 0;
  let col = 0;
  while (diagram[row]![col] !== "S") {
    col++;
  }

  const cache = new Map();
  function quantum(row: number, col: number, timelines = 0): number {
    const key = `${row},${col},${timelines}`;
    if (cache.has(key)) {
      return cache.get(key);
    }
    if (row === diagram.length - 1) {
      return 1;
    }

    const belowSymbol = diagram[row + 1]?.[col];
    if (belowSymbol === "^") {
      const split =
        quantum(row + 1, col - 1, timelines) +
        quantum(row + 1, col + 1, timelines);
      cache.set(key, split);
    } else {
      cache.set(key, quantum(row + 1, col, timelines));
    }
    return cache.get(key);
  }
  const timelines = quantum(row, col);

  console.log(`Part 2: ${timelines}`);
}

main();
