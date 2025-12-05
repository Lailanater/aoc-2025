import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day4/input.txt", { encoding: "utf-8" });
  const rows = input.trim().split("\n");

  let answer = 0;
  const rollPoints = new Set<`${number},${number}`>();
  const pointsToCheck = new Set<`${number},${number}`>();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) {
      continue;
    }
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "@") {
        rollPoints.add(`${i},${j}`);
        pointsToCheck.add(`${i},${j}`);
      }
    }
  }
  while (pointsToCheck.size > 0) {
    for (const point of Array.from(pointsToCheck)) {
      pointsToCheck.delete(point);
      const p = point.split(",");
      const i = Number(p[0]);
      const j = Number(p[1]);
      let adjRolls = 0;
      const pointsToRecheck: `${number},${number}`[] = [];
      // Down
      if (rollPoints.has(`${i + 1},${j}`)) {
        pointsToRecheck.push(`${i + 1},${j}`);
        adjRolls++;
      }
      // Right
      if (rollPoints.has(`${i},${j + 1}`)) {
        pointsToRecheck.push(`${i},${j + 1}`);
        adjRolls++;
      }
      // Down-Right
      if (rollPoints.has(`${i + 1},${j + 1}`)) {
        pointsToRecheck.push(`${i + 1},${j + 1}`);
        adjRolls++;
      }
      // Down-Left
      if (rollPoints.has(`${i + 1},${j - 1}`)) {
        pointsToRecheck.push(`${i + 1},${j - 1}`);
        adjRolls++;
      }
      // Up
      if (rollPoints.has(`${i - 1},${j}`)) {
        pointsToRecheck.push(`${i - 1},${j}`);
        adjRolls++;
      }
      // Left
      if (rollPoints.has(`${i},${j - 1}`)) {
        pointsToRecheck.push(`${i},${j - 1}`);
        adjRolls++;
      }
      // Up-Left
      if (rollPoints.has(`${i - 1},${j - 1}`)) {
        pointsToRecheck.push(`${i - 1},${j - 1}`);
        adjRolls++;
      }
      // Up-Right
      if (rollPoints.has(`${i - 1},${j + 1}`)) {
        pointsToRecheck.push(`${i - 1},${j + 1}`);
        adjRolls++;
      }
      if (adjRolls < 4) {
        answer++;
        rollPoints.delete(point);
        for (const p of pointsToRecheck) {
          pointsToCheck.add(p);
        }
      }
    }
  }

  console.log(`Part 2: ${answer}`);
}

main();
