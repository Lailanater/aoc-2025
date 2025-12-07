import * as fs from 'node:fs';

function main() {
    const input = fs.readFileSync("day6/input.txt", {encoding: "utf-8"});
    let lines = input.split("\n");
    const maxLineLength = Math.max(...lines.map(line => line.length))
    lines = lines.map(line => line.padEnd(maxLineLength, " "))
    const opLine = lines[lines.length - 1]!;
    let prevOpIndex = 0;
    let answer = 0

    function solveMathOp(sliceEnd = maxLineLength) {
        const preNum = [];
        for (let j = 0; j < lines.length - 1; j++) {
            const line = lines[j]!;
            const digits = line.slice(prevOpIndex, sliceEnd).split("");
            preNum.push(digits)
        }
        const nums = [];
        for (let col = 0; col < preNum[0]!.length; col++) {
            let numStr = "";
            for (let row = 0; row < preNum.length; row++) {
                numStr += preNum[row]![col];
            }
            nums.push(Number(numStr));
        }
        const op = opLine.charAt(prevOpIndex);
        if (op === "*") {
            return nums.reduce((prev, curr) => prev * curr, 1)
        } else {
            return nums.reduce((prev, curr) => prev + curr, 0)
        }
    }

    for (let i = 1; i < opLine.length; i++) {
        const char = opLine.charAt(i);
        if (char === "*" || char === "+") {
            answer += solveMathOp(i - 1);
            prevOpIndex = i
        }
    }
    answer += solveMathOp();

    console.log(`Part 2: ${answer}`)
}


main();
