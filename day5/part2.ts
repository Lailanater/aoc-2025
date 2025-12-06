import * as fs from "node:fs";

type Range = {
  start: number;
  end: number;
};

function main() {
  const input = fs.readFileSync("day5/input.txt", { encoding: "utf-8" });
  const lines = input.trim().split("\n");
  const freshRules = new Set<Range>();
  let i = 0;
  let line = lines[i];
  while (line !== "" && line !== undefined) {
    const [start, end] = line.split("-");
    const range = {
      start: Number(start),
      end: Number(end),
    };
    for (const rule of Array.from(freshRules)) {
      if (
        (rule.start <= range.start && rule.end >= range.start) ||
        (rule.start <= range.end && rule.end >= range.end) ||
        (range.start <= rule.start && range.end >= rule.start) ||
        (range.start <= rule.end && range.end >= rule.end)
      ) {
        freshRules.delete(rule);
        range.start = Math.min(rule.start, range.start);
        range.end = Math.max(rule.end, range.end);
        freshRules.add(range);
      }
    }
    freshRules.add(range);

    line = lines[++i];
  }

  let answer = 0;
  for (const rule of freshRules) {
    answer += rule.end - rule.start + 1;
  }
  console.log(`Part 2: ${answer}`);
}

main();
