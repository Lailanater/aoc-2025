import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day4/input.txt", { encoding: "utf-8" });
  const rows = input.trim().split("\n");

  let answer = 0;
  const set = new Set<`${number},${number}`>();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) {
      continue;
    }
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "@") {
        set.add(`${i},${j}`);
      }
    }
  }
  for (const entry of set.values()) {
    const points = entry.split(",");
    const i = Number(points[0]);
    const j = Number(points[1]);
    let adjRolls = 0;
    // Down
    if (set.has(`${i + 1},${j}`)) {
      adjRolls++;
    }
    // Right
    if (set.has(`${i},${j + 1}`)) {
      adjRolls++;
    }
    // Down-Right
    if (set.has(`${i + 1},${j + 1}`)) {
      adjRolls++;
    }
    // Down-Left
    if (set.has(`${i + 1},${j - 1}`)) {
      adjRolls++;
    }
    // Up
    if (set.has(`${i - 1},${j}`)) {
      adjRolls++;
    }
    // Left
    if (set.has(`${i},${j - 1}`)) {
      adjRolls++;
    }
    // Up-Left
    if (set.has(`${i - 1},${j - 1}`)) {
      adjRolls++;
    }
    // Up-Right
    if (set.has(`${i - 1},${j + 1}`)) {
      adjRolls++;
    }
    if (adjRolls < 4) {
      answer++;
    }
  }

  console.log(`Part 1: ${answer}`);
}

main();
