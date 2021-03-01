import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import CallGroup from "./CallGroup";

describe("CallGroup", () => {
  afterEach(cleanup);

  test("render every child and label", () => {
    const label = "testLabel";

    render(
      <CallGroup label={label}>
        <div key="1" role="listitem">
          1
        </div>
        <div key="2" role="listitem">
          2
        </div>
        <div key="3" role="listitem">
          3
        </div>
      </CallGroup>
    );

    const title = screen.queryByText(label);
    expect(title).toBeTruthy();

    const children = screen.queryAllByRole("listitem");
    expect(children.length).toEqual(3);

    const childrenWrappers = screen.queryAllByRole("listitem-wrapper");
    expect(childrenWrappers.length).toEqual(3);
  });
});
