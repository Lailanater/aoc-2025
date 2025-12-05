import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day5/input.txt", { encoding: "utf-8" });
  const lines = input.trim().split("\n");
  let passedNewline = false;
  const freshIdRules = [];
  let answer = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === undefined) {
      continue;
    }
    if (line === "") {
      passedNewline = true;
      continue;
    }

    if (passedNewline) {
      for (const rule of freshIdRules) {
        if (Number(line) >= rule.start && Number(line) <= rule.end) {
          answer++;
          break;
        }
      }
    } else {
      const [start, end] = line.split("-");
      freshIdRules.push({
        start: Number(start),
        end: Number(end),
      });
    }
  }

  console.log(`Part 1: ${answer}`);
}

main();
