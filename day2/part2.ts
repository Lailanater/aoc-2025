import * as fs from "node:fs";

function main() {
  const line = fs.readFileSync("./day2/input.txt", { encoding: "utf-8" });
  const ranges = line.trim().split(",");
  let answer = 0;
  for (const range of ranges) {
    const [start, end] = range.split("-");
    for (let i = Number(start); i <= Number(end); i++) {
      const numStr = i.toString();
      for (let j = 1; j <= Math.floor(numStr.length / 2); j++) {
        if (numStr.length % j === 0) {
          let sequence: string = "";
          let isValid = false;
          for (let k = 0; k < numStr.length / j; k++) {
            const s = k * j;
            const e = s + j;
            const slice = numStr.slice(s, e);
            if (sequence === "") {
              sequence = slice;
            } else {
              if (slice !== sequence) {
                isValid = true;
                break;
              }
            }
          }
          if (!isValid) {
            answer += i;
            break;
          }
        }
      }
    }
  }
  console.log(`Part 2: ${answer}`);
}

main();
