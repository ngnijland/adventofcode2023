import assert from "assert";
import fs from "fs";
import path from "path";

const cubesInBag = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

type Color = keyof typeof cubesInBag;

function isGamePossible(game: string): boolean {
  const setsOfCubes = game.split("; ");

  for (let i = 0; i < setsOfCubes.length; i++) {
    const coloredCubes = setsOfCubes[i].split(", ");

    for (let j = 0; j < coloredCubes.length; j++) {
      const [number, color] = coloredCubes[j].split(" ");

      if (cubesInBag[color as Color] < Number(number)) {
        return false;
      }
    }
  }

  return true;
}

assert.strictEqual(
  isGamePossible("3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"),
  true,
);
assert.strictEqual(
  isGamePossible("1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"),
  true,
);
assert.strictEqual(
  isGamePossible(
    "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  ),
  false,
);
assert.strictEqual(
  isGamePossible(
    "1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  ),
  false,
);
assert.strictEqual(
  isGamePossible("6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"),
  true,
);

function getGameString(game: string): string {
  return game.slice(`${game.split(" ", 2).join(" ")} `.length, game.length);
}

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day2_1", "input"),
  "utf8",
  (err: NodeJS.ErrnoException, data: string) => {
    if (err) throw err;

    const possibleGames = data
      .trim()
      .split("\n")
      .reduce((acc, game, index) => {
        const gameString = getGameString(game);

        if (isGamePossible(gameString)) {
          return acc + index + 1;
        }

        return acc;
      }, 0);

    console.log(possibleGames);
  },
);
