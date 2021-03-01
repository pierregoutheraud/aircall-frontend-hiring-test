import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import calls, {
  FETCH_CALL,
  FETCH_CALLS_PAGE,
  DISPLAY_PAGE,
  SET_CALLS,
  TOGGLE_IS_ARCHIVED,
  displayPageByNumber,
  initialState,
  DEFAULT_LIMIT,
} from "./calls";
import apiMiddleware from "../apiMiddleware";
import api from "../../lib/api";
jest.mock("../../lib/api");

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

api.call = jest.fn(() => {
  return Promise.resolve({
    nodes: [...new Array(15)].map((v, i) => ({
      id: `id${i + 1}`,
    })),
    totalCount: 10,
  });
});

describe("calls actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calls: initialState,
    });
  });

  test("displayPageByNumber fetch first time", async () => {
    store.dispatch(displayPageByNumber(1));
    expect(store.getActions()[0].type).toEqual(FETCH_CALLS_PAGE + "_REQUEST");
  });

  test("displayPageByNumber do not fetch second time", async () => {
    store = mockStore({
      calls: {
        ...initialState,
        list: [...new Array(50)].map((v, i) => ({
          id: `id${i + 1}`,
        })),
      },
    });

    store.dispatch(displayPageByNumber(1));
    expect(store.getActions()[0].type).not.toEqual(
      FETCH_CALLS_PAGE + "_REQUEST"
    );
  });
});

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
      apiLoading: false,
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
      apiLoading: false,
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

  test("should handle SET_CALLS", () => {
    const state0 = {
      ...initialState,
      data: {
        id1: { id: "id1" },
      },
    };

    const state1 = calls(state0, {
      type: SET_CALLS,
      calls: {
        id2: { id: "id2" },
        id3: { id: "id3" },
      },
    });

    expect(state1).toEqual({
      ...initialState,
      data: {
        id1: { id: "id1" },
        id2: { id: "id2" },
        id3: { id: "id3" },
      },
    });
  });

  test("should handle TOGGLE_IS_ARCHIVED", () => {
    const state0 = {
      ...initialState,
      data: {
        id1: { id: "id1", is_archived: false },
      },
    };

    const state1 = calls(state0, {
      type: TOGGLE_IS_ARCHIVED + "_REQUEST",
      callId: "id1",
    });

    expect(state1).toEqual({
      ...initialState,
      data: {
        id1: { id: "id1", is_archived: true },
      },
    });
  });
});
