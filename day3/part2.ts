import * as fs from "node:fs";

function main() {
  const input = fs.readFileSync("day3/input.txt", { encoding: "utf-8" });
  const banks = input.trim().split("\n");

  let answer = 0;

  for (const bank of banks) {
    let jolts = "";
    let startPosition = 0;
    for (let i = 12; i > 0; i--) {
      const batterInfo = nextBattery(bank, i, startPosition);
      startPosition = batterInfo.batteryPosition + 1;
      jolts += batterInfo.battery;
    }
    answer += Number(jolts);
  }
  console.log(`Part 2: ${answer}`);
}

function nextBattery(
  bank: string,
  remainingBatteries: number,
  startPosition = 0,
) {
  const batteryInfo = {
    battery: Number(bank.charAt(startPosition)),
    batteryPosition: startPosition,
  };
  for (let i = startPosition + 1; i <= bank.length - remainingBatteries; i++) {
    const b = Number(bank.charAt(i));
    if (b > batteryInfo.battery) {
      batteryInfo.battery = b;
      batteryInfo.batteryPosition = i;
    }
  }

  return batteryInfo;
}

main();
