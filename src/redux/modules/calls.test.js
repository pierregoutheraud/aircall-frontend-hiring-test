import calls, {
  FETCH_DISPLAY_PAGE,
  DISPLAY_PAGE,
  DEFAULT_LIMIT,
} from "./calls";

describe("calls reducer", () => {
  test("should handle FETCH_DISPLAY_PAGE", () => {
    const state0 = {
      list: [1, 2],
      offset: 0,
      limit: DEFAULT_LIMIT,
      totalCount: 100,
    };

    const state1 = calls(state0, {
      type: FETCH_DISPLAY_PAGE,
      list: [5, 6],
      offset: 4,
      totalCount: 100,
    });

    expect(state1.list).toEqual([1, 2, undefined, undefined, 5, 6]);

    const state2 = calls(state1, {
      type: FETCH_DISPLAY_PAGE,
      list: [8, 9, 10],
      offset: 7,
      totalCount: 100,
    });

    expect(state2.list).toEqual([
      1,
      2,
      undefined,
      undefined,
      5,
      6,
      undefined,
      8,
      9,
      10,
    ]);
  });

  test("should handle DISPLAY_PAGE", () => {
    const state0 = {
      list: [1, 2, 3, 4, 5],
      offset: 0,
      limit: DEFAULT_LIMIT,
      totalCount: 100,
    };

    const state1 = calls(state0, {
      type: DISPLAY_PAGE,
      offset: 2,
    });

    expect(state1).toEqual({
      list: [1, 2, 3, 4, 5],
      offset: 2,
      limit: DEFAULT_LIMIT,
      totalCount: 100,
    });
  });
});
