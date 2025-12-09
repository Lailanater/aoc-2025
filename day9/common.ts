import fs from "node:fs";
import { isTest } from "../global.ts";

export function parseData() {
  const file = isTest() ? "day9/example.txt" : "day9/input.txt";
  return fs
    .readFileSync(file, { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((point) => {
      const [col, row] = point.split(",");
      return {
        row: Number(row),
        col: Number(col),
      };
    });
}
