import * as fs from "node:fs";

type Direction = "L" | "R";
type RotationInstruction = `${Direction}${number}`;

function main() {
  const file = fs.readFileSync("./day1/input.txt", { encoding: "utf-8" });
  const lines = file.trim().split("\n");

  let dial = 50;
  let answer = 0;

  for (const line of lines) {
    const metadata = rotate(dial, line as RotationInstruction);
    dial = metadata.rotatedDial;
    answer += metadata.numPointsAtZero;
  }

  console.log(`Part 2: ${answer}`);
}

function rotate(dial: number, instruction: RotationInstruction) {
  const direction = instruction.charAt(0) as Direction;
  const distance = Number(instruction.slice(1));

  let rotatedDial = dial;
  const fullRotations = Math.floor(distance / 100);
  const remainingDistance = distance % 100;
  let numPointsAtZero = fullRotations;
  if (direction === "L") {
    rotatedDial -= remainingDistance;
    if (rotatedDial < 0) {
      if (dial !== 0) {
        numPointsAtZero++;
      }
      rotatedDial = 100 - Math.abs(rotatedDial);
    } else if (rotatedDial === 0) {
      numPointsAtZero++;
    }
  } else {
    rotatedDial += remainingDistance;
    if (rotatedDial > 99) {
      if (dial !== 0) {
        numPointsAtZero++;
      }
      rotatedDial -= 100;
    }
  }

  return { rotatedDial, numPointsAtZero };
}

main();
