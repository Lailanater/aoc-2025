import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day3/input.txt", { encoding: "utf-8" });
  const banks = input.trim().split("\n");

  let answer = 0;

  for (const bank of banks) {
    let battery1Position = 0;
    let battery1 = Number(bank.charAt(battery1Position));
    for (let i = battery1Position + 1; i < bank.length - 1; i++) {
      const b = Number(bank.charAt(i));
      if (b > battery1) {
        battery1 = b;
        battery1Position = i;
      }
    }

    const battery2Position = battery1Position + 1;
    let battery2 = Number(bank.charAt(battery2Position));
    for (let i = battery2Position + 1; i < bank.length; i++) {
      const b = Number(bank.charAt(i));
      if (b > battery2) {
        battery2 = b;
      }
    }

    const jolts = `${battery1}${battery2}`;
    answer += Number(jolts);
  }
  console.log(`Part 1: ${answer}`);
}

main();
