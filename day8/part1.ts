import * as fs from "node:fs";
import * as process from "node:process";

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

function parseData() {
  const file = isTest() ? "day8/example.txt" : "day8/input.txt";
  const input = fs.readFileSync(file, { encoding: "utf-8" }).trim();
  const coords: Coordinate[] = input.split("\n").map((line) => {
    const nums = line.split(",");
    return {
      x: Number(nums[0]),
      y: Number(nums[1]),
      z: Number(nums[2]),
    };
  });

  return coords;
}

function isTest() {
  const args = process.argv.slice(2);
  return args.indexOf("--test") !== -1;
}

function main() {
  const coords = parseData();
  const parents: number[] = [];
  for (let i = 0; i < coords.length; i++) {
    parents.push(i);
  }

  function find(x: number): number {
    if (parents[x] !== x) {
      parents[x] = find(parents[x]!);
      return parents[x];
    }

    return x;
  }

  function union(a: number, b: number) {
    parents[find(b)] = find(a);
  }

  const distances = [];
  for (let p = 0; p < coords.length - 1; p++) {
    for (let q = p + 1; q < coords.length; q++) {
      const distance = euclideanDistance(coords[p]!, coords[q]!);
      distances.push({ p, q, distance });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const cap = isTest() ? 10 : 1_000;
  distances.slice(0, cap).forEach((next) => {
    union(next.p, next.q);
  });

  const counts: Record<string, number> = {};
  for (let i = 0; i < coords.length; i++) {
    const set = find(i);
    if (!counts[set]) {
      counts[set] = 0;
    }
    counts[set]++;
  }

  const answer = Object.values(counts)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => prev * curr, 1);
  console.log(`Part 1: ${answer}`);
}

function euclideanDistance(p: Coordinate, q: Coordinate): number {
  return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2);
}

main();
