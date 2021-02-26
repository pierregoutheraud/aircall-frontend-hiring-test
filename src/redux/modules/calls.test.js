import calls, {
  FETCH_CALL,
  FETCH_CALLS_PAGE,
  DISPLAY_PAGE,
  SET_ARCHIVED,
  initialState,
} from "./calls";

describe("calls reducer", () => {
  test("should handle FETCH_CALL", () => {
    const state = calls(undefined, {
      type: FETCH_CALL + "_SUCCESS",
      callId: "id1",
      call: { id: "id1" },
    });

    expect(state.data).toEqual({
      id1: { id: "id1" },
    });
  });

  test("should handle SET_ARCHIVED", () => {
    const state0 = {
      ...initialState,
      data: {
        id1: { id: "id1", is_archived: false },
      },
    };

    const state = calls(state0, {
      type: SET_ARCHIVED,
      isArchived: true,
      callId: "id1",
    });

    expect(state.data).toEqual({
      id1: { id: "id1", is_archived: true },
    });
  });

  test("should handle FETCH_CALLS_PAGE_SUCCESS", () => {
    const state0 = {
      list: ["id1", "id2"],
      data: {
        id1: { id: "id1" },
        id2: { id: "id2" },
      },
      offset: 0,
      limit: 5,
      totalCount: 100,
      loading: false,
    };

    const state1 = calls(state0, {
      type: FETCH_CALLS_PAGE + "_SUCCESS",
      nodes: [{ id: "id5" }, { id: "id6" }],
      offset: 4,
      totalCount: 100,
      loading: false,
    });

    expect(state1).toEqual({
      list: ["id1", "id2", undefined, undefined, "id5", "id6"],
      data: {
        id1: { id: "id1" },
        id2: { id: "id2" },
        id5: { id: "id5" },
        id6: { id: "id6" },
      },
      offset: 4,
      limit: 5,
      totalCount: 100,
      loading: false,
    });

    const state2 = calls(state1, {
      type: FETCH_CALLS_PAGE + "_SUCCESS",
      nodes: [{ id: "id8" }, { id: "id9" }, { id: "id10" }],
      offset: 7,
      totalCount: 100,
      loading: false,
    });

    expect(state2).toEqual({
      list: [
        "id1",
        "id2",
        undefined,
        undefined,
        "id5",
        "id6",
        undefined,
        "id8",
        "id9",
        "id10",
      ],
      data: {
        id1: { id: "id1" },
        id2: { id: "id2" },
        id5: { id: "id5" },
        id6: { id: "id6" },
        id8: { id: "id8" },
        id9: { id: "id9" },
        id10: { id: "id10" },
      },
      offset: 7,
      limit: 5,
      totalCount: 100,
      loading: false,
    });
  });

  test("should handle DISPLAY_PAGE", () => {
    const state0 = {
      list: [1, 2, 3, 4, 5],
      offset: 0,
      limit: 5,
      totalCount: 100,
    };

    const state1 = calls(state0, {
      type: DISPLAY_PAGE,
      offset: 2,
    });

    expect(state1).toEqual({
      list: [1, 2, 3, 4, 5],
      offset: 2,
      limit: 5,
      totalCount: 100,
    });
  });
});
