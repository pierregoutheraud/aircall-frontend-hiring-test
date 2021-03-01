import React from "react";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
jest.mock("../../hooks/useRouting");
import useRouting from "../../hooks/useRouting";
import GoBack from "./GoBack";

describe("GoBack", () => {
  afterEach(cleanup);

  test("button exists and when clicked push history with previous path", () => {
    const historyPush = jest.fn();
    const prevPath = "/prev";
    useRouting.mockImplementation(() => {
      return {
        history: {
          push: historyPush,
        },
        prevPath,
      };
    });

    render(<GoBack />);
    const button = screen.queryByRole("button");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(historyPush).toHaveBeenCalledWith(prevPath);
  });
});
