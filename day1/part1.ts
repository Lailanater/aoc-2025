import * as fs from "node:fs";

type Direction = "L" | "R";
type RotationInstruction = `${Direction}${number}`;

function main() {
  const file = fs.readFileSync("./day1/input.txt", { encoding: "utf-8" });
  const lines = file.trim().split("\n");

  let dial = 50;
  let answer = 0;

  for (const line of lines) {
    dial = rotate(dial, line as RotationInstruction);
    if (dial === 0) {
      answer++;
    }
  }

  console.log(`Part 1: ${answer}`);
}

function rotate(dial: number, instruction: RotationInstruction): number {
  const direction = instruction.charAt(0) as Direction;
  const distance = Number(instruction.slice(1));

  let rotatedDial = dial;
  if (direction === "L") {
    rotatedDial -= distance;
    if (rotatedDial < 0) {
      rotatedDial = Math.abs(rotatedDial);
      rotatedDial %= 100;
      rotatedDial = 100 - rotatedDial;
      if (rotatedDial === 100) {
        rotatedDial = 0;
      }
    }
  } else {
    rotatedDial += distance;
    rotatedDial %= 100;
  }

  return rotatedDial;
}

main();
