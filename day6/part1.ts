import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day6/input.txt", { encoding: "utf-8" });
  const lines = input
    .split("\n")
    .map((line) => line.replaceAll(/\s+/g, " ").split(" "));

  let answer = 0;
  for (let col = 0; col < lines[0]!.length; col++) {
    const op = lines[lines.length - 1]![col]!;

    let solution = Number(lines[0]![col]);
    for (let row = 1; row < lines.length - 1; row++) {
      const num = Number(lines[row]![col]);
      if (op === "+") {
        solution += num;
      } else {
        solution *= num;
      }
    }
    answer += solution;
  }

  console.log(`Part 1: ${answer}`);
}

main();
