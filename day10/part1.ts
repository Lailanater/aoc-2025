import { parseData } from "./common.ts";

function main(): number {
  const data = parseData();

  let answer = 0;
  for (const problem of data) {
    const state: boolean[] = new Array(problem.lightDiagram.length).fill(false);
    const set = new Set<string>();
    set.add(stateToKey(state));
    const dp = [set];

    let i = 1;
    while (true) {
      const set = new Set<string>();
      for (const button of problem.buttons) {
        for (const key of dp[i - 1]!.values()) {
          const state = pressButton(keyToState(key), button);
          set.add(stateToKey(state));
        }
      }
      if (set.has(stateToKey(problem.lightDiagram))) {
        break;
      }
      dp[i] = set;
      i++;
    }
    answer += i;
  }

  return answer;
}

function stateToKey(state: boolean[]): string {
  return state.join(",");
}

function keyToState(key: string): boolean[] {
  return key.split(",").map((boolStr) => boolStr === "true");
}

function pressButton(state: boolean[], button: number[]): boolean[] {
  const clone = new Array(state.length);
  for (let i = 0; i < state.length; i++) {
    clone[i] = state[i]!;
  }

  for (const index of button) {
    clone[index] = !clone[index];
  }

  return clone;
}

console.log(`Part 1: ${main()}`);
