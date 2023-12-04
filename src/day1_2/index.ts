import assert from "assert";
import fs from "fs";
import path from "path";

const spelledOutDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getCalibrationValue(text: string): number {
  let firstNumberAndIndex = { number: 0, index: Infinity };
  let lastNumberAndIndex = { number: 0, index: 0 };

  // Get the first and last occurance of every possible spelled out digit and use it when the index is lowest or biggest up till now.
  spelledOutDigits.forEach((spelledOutDigit, index) => {
    const firstOccurance = text.indexOf(spelledOutDigit);
    const digit = index + 1;

    if (firstOccurance > -1 && firstOccurance < firstNumberAndIndex.index) {
      firstNumberAndIndex = { number: digit, index: firstOccurance };
    }

    const lastOccurance = text.lastIndexOf(spelledOutDigit);

    if (lastOccurance > 0 && lastOccurance > lastNumberAndIndex.index) {
      lastNumberAndIndex = { number: digit, index: lastOccurance };
    }
  });

  // Get substring of text before and after found spelled out digits
  const firstCharacters = text.slice(0, firstNumberAndIndex.index);
  const lastCharacters = text.slice(lastNumberAndIndex.index);

  // Check for every character if it's a number and use it
  firstCharacters
    .split("")
    .reverse()
    .forEach((character) => {
      const number = Number(character);

      if (!number) {
        return;
      }

      firstNumberAndIndex = { number, index: 0 };
    });

  lastCharacters.split("").forEach((character) => {
    const number = Number(character);

    if (!number) {
      return;
    }

    lastNumberAndIndex = { number, index: Infinity };
  });

  return Number(`${firstNumberAndIndex.number}${lastNumberAndIndex.number}`);
}

assert.strictEqual(getCalibrationValue("two1nine"), 29);
assert.strictEqual(getCalibrationValue("eightwothree"), 83);
assert.strictEqual(getCalibrationValue("abcone2threexyz"), 13);
assert.strictEqual(getCalibrationValue("xtwone3four"), 24);
assert.strictEqual(getCalibrationValue("4nineeightseven2"), 42);
assert.strictEqual(getCalibrationValue("zoneight234"), 14);
assert.strictEqual(getCalibrationValue("7pqrstsixteen"), 76);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day1_2", "input"),
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
