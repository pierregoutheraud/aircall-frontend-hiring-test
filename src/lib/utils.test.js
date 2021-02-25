import { partOfArrayNotUndefined } from "./utils";

describe("utils", () => {
  test("partOfArrayNotUndefined", () => {
    expect(partOfArrayNotUndefined([1, 2, undefined, undefined], 2, 3)).toEqual(
      false
    );
    expect(partOfArrayNotUndefined([undefined, undefined], 8, 9)).toEqual(
      false
    );
    expect(partOfArrayNotUndefined([], 2, 3)).toEqual(false);
    expect(partOfArrayNotUndefined([1, 2], 2, 3)).toEqual(false);
    expect(partOfArrayNotUndefined([1, 2], 0, 1)).toEqual(true);
    expect(partOfArrayNotUndefined(new Array(50), 10, 20)).toEqual(false);
    expect(partOfArrayNotUndefined([], 10, 20)).toEqual(false);
  });
});
