import React from "react";
import configureStore from "redux-mock-store";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import useCalls from "./useCalls";
jest.mock("../redux/modules/calls");
import {
  listenToCallsUpdates,
  displayPageByNumber,
  selectCalls,
  archiveCalls,
  unarchiveCalls,
} from "../redux/modules/calls";
import apiMiddleware from "../redux/apiMiddleware";
import { initialState as callsInitialState } from "../redux/modules/calls";
import { initialState as authInitialState } from "../redux/modules/auth";

const middlewares = [thunk, apiMiddleware];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: { ...authInitialState },
  calls: { ...callsInitialState },
});

describe("useCall", () => {
  beforeEach(() => {
    const TestComponent = function () {
      useCalls(2);
      return <div>test</div>;
    };

    [
      listenToCallsUpdates,
      displayPageByNumber,
      archiveCalls,
      unarchiveCalls,
    ].map(fn => fn.mockImplementation(() => ({ type: "TEST " })));
    selectCalls.mockImplementation(() => []);

    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
  });

  afterEach(cleanup);

  test("It calls listenToCallsUpdates and displayPageByNumber", () => {
    expect(listenToCallsUpdates).toHaveBeenCalledTimes(1);
    expect(displayPageByNumber).toHaveBeenCalledTimes(1);
    expect(displayPageByNumber).toHaveBeenCalledWith(2);
  });

  test("It handle checked calls array", () => {});
});
