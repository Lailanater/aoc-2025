import process from "node:process";

export function isTest() {
  const args = process.argv.slice(2);
  return args.indexOf("--test") !== -1;
}
