import { partOfArrayNotUndefined, groupSortedArrayIntoArraysBy } from "./utils";

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

  //!\ The input array must already be sorted by getComparator() for this function to work
  test("groupSortedArrayIntoArraysBy", () => {
    const sortedArr = [
      { value: "42" },
      { value: "31" },
      { value: "31" },
      { value: "8" },
      { value: "8" },
      { value: "1" },
      { value: "1" },
      { value: "1" },
      { value: "1" },
    ];
    const resArray = groupSortedArrayIntoArraysBy(
      sortedArr,
      item => item.value
    );
    expect(resArray).toEqual([
      [{ value: "42" }],
      [{ value: "31" }, { value: "31" }],
      [{ value: "8" }, { value: "8" }],
      [{ value: "1" }, { value: "1" }, { value: "1" }, { value: "1" }],
    ]);
  });
});
