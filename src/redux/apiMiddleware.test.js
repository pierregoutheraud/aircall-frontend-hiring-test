import api from "../lib/api";
import apiMiddleware from "./apiMiddleware";
jest.mock("../lib/api");

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = action => apiMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe("apiMiddleware", () => {
  beforeEach(() => {
    api.get.mockClear();
  });

  test("passes through normal action", () => {
    const { next, invoke } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("success", async () => {
    const mockData = {
      hasNextPage: true,
      nodes: [],
      totalCount: 100,
    };
    api.call = jest.fn(() => Promise.resolve(mockData));

    const { store, invoke } = create();

    const onSuccess = jest.fn((data, dispatch, getState) => data);
    const endpoint = "/calls?offset=0&limit=10";
    const type = "TEST";
    const method = "GET";
    const action = {
      useApi: true,
      type: "TEST",
      method,
      endpoint,
      onSuccess,
    };

    await invoke(action);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: type + "_REQUEST",
      loading: true,
    });

    expect(api.call).toHaveBeenCalledWith(method, endpoint, null);
    expect(onSuccess).toHaveBeenCalledWith(
      mockData,
      store.dispatch,
      store.getState
    );

    expect(store.dispatch).toHaveBeenCalledWith({
      type: type + "_SUCCESS",
      loading: false,
      hasNextPage: true,
      nodes: [],
      totalCount: 100,
    });
  });

  test("error", async () => {
    api.call = jest.fn(() => Promise.reject());

    const { store, invoke } = create();

    const endpoint = "/calls?offset=0&limit=10";
    const type = "TEST";
    const action = {
      useApi: true,
      type: "TEST",
      method: "GET",
      endpoint,
    };

    await invoke(action);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: type + "_REQUEST",
      loading: true,
    });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: type + "_FAILURE",
      loading: false,
    });
  });
});
