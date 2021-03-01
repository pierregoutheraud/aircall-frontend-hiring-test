import React from "react";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import { Tractor } from "@aircall/tractor";
import Actions from "./Actions";

describe("Actions", () => {
  afterEach(cleanup);

  test("buttons send correct callbacks", () => {
    const handleArchive = jest.fn();
    const handleUnarchive = jest.fn();
    render(
      <Tractor injectStyle>
        <Actions onArchive={handleArchive} onUnarchive={handleUnarchive} />
      </Tractor>
    );

    const archiveButton = screen.queryByRole("button", { name: "archive" });
    const unarchiveButton = screen.queryByRole("button", { name: "unarchive" });

    fireEvent.click(archiveButton);
    expect(handleArchive).toHaveBeenCalledTimes(1);
    expect(handleUnarchive).toHaveBeenCalledTimes(0);

    fireEvent.click(unarchiveButton);
    expect(handleArchive).toHaveBeenCalledTimes(1);
    expect(handleUnarchive).toHaveBeenCalledTimes(1);
  });
});
