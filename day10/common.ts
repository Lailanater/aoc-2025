import fs from "node:fs";
import { isTest } from "../global.ts";

export function parseData() {
  const file = isTest() ? "day10/example.txt" : "day10/input.txt";
  const input = fs.readFileSync(file, { encoding: "utf-8" }).trim();

  return input
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => {
      const diagram = line[0]!;
      const numLights = diagram.length - 2;

      const lightDiagram: boolean[] = new Array(numLights);
      for (let i = 0; i < numLights; i++) {
        const light = diagram.charAt(i + 1);
        lightDiagram[i] = light === "#";
      }

      const buttons = line.slice(1, -1).map((something) => {
        return something
          .slice(1, -1)
          .split(",")
          .map((num) => Number(num));
      });

      const joltages = line[line.length - 1]!.slice(1, -1)
        .split(",")
        .map((num) => Number(num));

      return {
        lightDiagram,
        buttons,
        joltages,
      };
    });
}
