import assert from "assert";
import fs from "fs";
import path from "path";

function getCalibrationValue(text: string): number {
  const numbers = [];

  const iterator = text[Symbol.iterator]();
  let currentCharacter = iterator.next();

  while (!currentCharacter.done && currentCharacter.value !== " ") {
    if (Number(currentCharacter.value)) {
      numbers.push(currentCharacter.value);
    }

    currentCharacter = iterator.next();
  }

  return Number([numbers[0], numbers[numbers.length - 1]].join(""));
}

assert.strictEqual(getCalibrationValue("1abc2"), 12);
assert.strictEqual(getCalibrationValue("pqr3stu8vwx"), 38);
assert.strictEqual(getCalibrationValue("a1b2c3d4e5f"), 15);
assert.strictEqual(getCalibrationValue("treb7uchet"), 77);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day1_1", "input"),
  "utf8",
  (err: NodeJS.ErrnoException, data: string) => {
    if (err) throw err;

    const sum = data
      .trim()
      .split("\n")
      .reduce<number>((acc, text) => {
        return acc + getCalibrationValue(text);
      }, 0);
    console.log(sum);
  },
);
