import fs from "node:fs";
import { isTest } from "../global.ts";

export function parseData(file: string) {
  const input = fs.readFileSync(file, { encoding: "utf-8" }).trim();
  const preData = input.split("\n").map((line) => line.split(": "));
  const data: Record<string, string[]> = {};
  for (const [key, paths] of preData) {
    data[key!] = paths!.split(" ");
  }

  return data;
}
