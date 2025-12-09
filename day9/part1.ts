import { parseData } from "./common.ts";

type Point = {
  row: number;
  col: number;
};

function main(): number {
  const data = parseData();
  let maxArea = -1;
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      maxArea = Math.max(area(data[i]!, data[j]!), maxArea);
    }
  }
  return maxArea;
}

function area(a: Point, b: Point) {
  const r = Math.abs(a.row - b.row) + 1;
  const c = Math.abs(a.col - b.col) + 1;
  return r * c;
}

console.log(`Part 1: ${main()}`);
