import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Tractor } from "@aircall/tractor";
import Loading from "./Loading";

describe("Loading", () => {
  afterEach(cleanup);

  test("It renders icon", () => {
    render(
      <Tractor injectStyle>
        <Loading />
      </Tractor>
    );

    const icon = screen.queryByRole("img");
    expect(icon).toBeTruthy();
  });
});
