import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day7/input.txt", { encoding: "utf-8" });
  const diagram = input.split("\n").map((line) => line.split(""));

  let splits = 0;
  for (let row = 0; row < diagram.length; row++) {
    for (let col = 0; col < diagram[row]!.length; col++) {
      const symbol = diagram[row]![col]!;
      if (symbol === "S" || symbol === "|") {
        const belowSymbol = diagram[row + 1]?.[col];
        if (belowSymbol === ".") {
          diagram[row + 1]![col] = "|";
        } else if (belowSymbol === "^") {
          const left = diagram[row + 1]?.[col - 1];
          const right = diagram[row + 1]?.[col + 1];
          if (left === ".") {
            diagram[row + 1]![col - 1] = "|";
          }
          if (right === ".") {
            diagram[row + 1]![col + 1] = "|";
          }
          if (left === "." || right === ".") {
            splits++;
          }
        }
      }
    }
  }

  console.log(`Part 1: ${splits}`);
}

main();
