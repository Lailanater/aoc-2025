import * as fs from "node:fs";

function main() {
  const line = fs.readFileSync("./day2/input.txt", { encoding: "utf-8" });
  const ranges = line.trim().split(",");
  let answer = 0;
  for (const range of ranges) {
    const [start, end] = range.split("-");
    for (let i = Number(start); i <= Number(end); i++) {
      const numStr = i.toString();
      if (numStr.length % 2 === 0) {
        const halfway = numStr.length / 2;
        const firstHalf = numStr.slice(0, halfway);
        const secondHalf = numStr.slice(halfway);
        if (firstHalf === secondHalf) {
          answer += i;
        }
      }
    }
  }
  console.log(`Part 1: ${answer}`);
}

main();
