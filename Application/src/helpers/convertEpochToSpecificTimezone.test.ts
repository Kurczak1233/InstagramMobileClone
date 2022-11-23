import each from "jest-each";

import { convertEpochToSpecificTimezone } from "./convertEpochToSpecificTimezone";

describe("Convert time", () => {
  each([
    [1669217967 * 1000, new Date(2022, 10, 23, 16, 39, 27)],
    [null, undefined],
    [0, undefined],
    [-2000, undefined],
    [-Infinity, undefined],
    [NaN, undefined],
    ["", undefined],
    [{}, undefined],
  ]).it(
    "Should convert the numbers to hours correctly",
    (initialValue, expected) => {
      const result = convertEpochToSpecificTimezone(initialValue);

      expect(result).toEqual(expected);
    }
  );
});
