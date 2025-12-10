import { parseData } from "./common.ts";

function main(): number {
  const data = parseData();
  console.log(data);
  return -1;
}

console.log(`Part 2: ${main()}`);
