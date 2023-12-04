import assert from "assert";
import fs from "fs";
import path from "path";

function getPowerOfFewestNumberOfCubes(game: string): number {
  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  type Color = keyof typeof cubes;

  const setsOfCubes = game.split("; ");

  for (let i = 0; i < setsOfCubes.length; i++) {
    const coloredCubes = setsOfCubes[i].split(", ");
    for (let j = 0; j < coloredCubes.length; j++) {
      const [number, color] = coloredCubes[j].split(" ");
      const currentNumber = Number(number);

      if (cubes[color as Color] < currentNumber) {
        cubes[color as Color] = currentNumber;
      }
    }
  }

  return cubes.red * cubes.green * cubes.blue;
}

assert.strictEqual(
  getPowerOfFewestNumberOfCubes(
    "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  ),
  48,
);
assert.strictEqual(
  getPowerOfFewestNumberOfCubes(
    "1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  ),
  12,
);
assert.strictEqual(
  getPowerOfFewestNumberOfCubes(
    "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  ),
  1560,
);
assert.strictEqual(
  getPowerOfFewestNumberOfCubes(
    "1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  ),
  630,
);
assert.strictEqual(
  getPowerOfFewestNumberOfCubes(
    "6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ),
  36,
);

function getGameString(game: string): string {
  return game.slice(`${game.split(" ", 2).join(" ")} `.length, game.length);
}

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day2_1", "input"),
  "utf8",
  (err: NodeJS.ErrnoException, data: string) => {
    if (err) throw err;

    const sumOfPower = data
      .trim()
      .split("\n")
      .reduce((acc, game) => {
        const gameString = getGameString(game);

        return acc + getPowerOfFewestNumberOfCubes(gameString);
      }, 0);

    console.log(sumOfPower);
  },
);
