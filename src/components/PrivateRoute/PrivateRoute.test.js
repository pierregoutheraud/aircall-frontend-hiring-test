import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
jest.mock("../../hooks/useAuth");
import useAuth from "../../hooks/useAuth";
import PrivateRoute from "./privateRoute";

describe("PrivateRoute", () => {
  afterEach(cleanup);

  test("should render component if user is authenticated", () => {
    useAuth.mockImplementation(() => {
      return {
        isAuthenticated: true,
        checkAuth: () => {},
      };
    });

    const Component = () => <div>RENDERED</div>;
    render(
      <Router>
        <PrivateRoute path="/">
          <Component />
        </PrivateRoute>
      </Router>
    );

    expect(screen.queryByText("RENDERED")).toBeTruthy();
  });

  test("should NOT render component if user is NOT authenticated", () => {
    useAuth.mockImplementation(() => {
      return {
        isAuthenticated: null,
        checkAuth: () => {},
      };
    });

    const Component = () => <div>RENDERED</div>;
    render(
      <Router>
        <PrivateRoute path="/">
          <Component />
        </PrivateRoute>
      </Router>
    );

    expect(screen.queryByText("RENDERED")).toBeFalsy();
  });
});
