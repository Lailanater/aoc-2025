#!/usr/bin/env bash

DAY="$1"

if [[ -z "$DAY" ]]; then
  echo -e "Must provide a date to get the input for\n"
  echo "Usage: $0 <num>"
  exit 1
fi

mkdir -p "day$DAY"

curl -s -o "day$DAY/input.txt" "https://adventofcode.com/2025/day/$DAY/input" \
  -H "Cookie: session=$SESSION"

touch "day$DAY/example.txt"

if [[ ! -f "day$DAY/common.ts" ]]; then
  echo -n "import fs from \"node:fs\";
import { isTest } from \"../global.ts\";

export function parseData() {
 const file = isTest() ? \"day$DAY/example.txt\" : \"day$DAY/input.txt\";
 return fs.readFileSync(file, { encoding: \"utf-8\" }).trim();
}" > "day$DAY/common.ts"
fi

if [[ ! -f "day$DAY/part1.ts" ]]; then
  echo -n 'import { parseData } from "./common.ts";

function main(): number {
 const data = parseData();
 return -1;
}

console.log(`Part 1: ${main()}`);' > "day$DAY/part1.ts"
fi

if [[ ! -f "day$DAY/part2.ts" ]]; then
  echo -n 'import { parseData } from "./common.ts";

function main(): number {
 const data = parseData();
 return -1;
}

console.log(`Part 2: ${main()}`);' > "day$DAY/part2.ts"
fi