import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Tractor } from "@aircall/tractor";
import Call from "./Call";
import { toHHMMSS } from "../../lib/utils";

const from = "+33193209569";
const to = "+33193243017";
const via = "+33103395843";
const duration = 26034;
const created_at = "2021-02-25T18:15:34.729Z";

const mockCallData = {
  id: "262a8e8e-37a9-4183-8c8b-7ee5b346d75d",
  duration,
  is_archived: false,
  from,
  to,
  direction: "outbound",
  call_type: "missed",
  via,
  created_at,
  notes: [
    {
      id: "8f32905b-cf92-4ead-b48b-cb58b674da75",
      content: "Cumque consequatur sit ex eius sit eum est alias.",
    },
    {
      id: "00d2d226-1ed2-45f2-a3bd-d69e32305207",
      content: "In consequatur sit qui aliquid sed doloribus.",
    },
  ],
};

describe("Call", () => {
  afterEach(cleanup);

  function _render(props) {
    return render(
      <Tractor injectStyle>
        <Call {...props} />
      </Tractor>
    );
  }

  test("It renders checkbox", () => {
    _render({
      ...mockCallData,
      hasCheckbox: true,
    });

    let checkbox = screen.queryByRole("checkbox");
    expect(checkbox).toBeTruthy();

    cleanup();

    _render({
      ...mockCallData,
      hasCheckbox: false,
    });

    checkbox = screen.queryByRole("checkbox");
    expect(checkbox).toBeFalsy();
  });

  test("It renders phone numbers", () => {
    _render({ ...mockCallData, hasVia: true });
    expect(screen.queryByText(from)).toBeTruthy();
    expect(screen.queryByText(to)).toBeTruthy();
    expect(screen.queryByText(via)).toBeTruthy();

    cleanup();

    _render({ ...mockCallData, hasVia: false });
    expect(screen.queryByText(from)).toBeTruthy();
    expect(screen.queryByText(to)).toBeTruthy();
    expect(screen.queryByText(via)).toBeFalsy();
  });

  test("It renders duration of call", () => {
    _render(mockCallData);
    expect(screen.queryByText(toHHMMSS(duration / 1000))).toBeTruthy();
  });

  test("It renders date and time", () => {
    _render({ ...mockCallData, hasTime: false, hasDate: false });

    const createdAtDate = new Date(created_at);
    const date = createdAtDate.toLocaleDateString("en-US");
    const time = createdAtDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(screen.queryByText(date)).toBeFalsy();
    expect(screen.queryByText(time)).toBeFalsy();

    cleanup();

    _render({ ...mockCallData, hasTime: true, hasDate: true });
    expect(screen.queryByText(date)).toBeTruthy();
    expect(screen.queryByText(time)).toBeTruthy();
  });

  test("It renders archive icon", () => {
    _render({ ...mockCallData, is_archived: false });
    expect(
      screen.queryByRole("button", { name: "is not archived" })
    ).toBeTruthy();

    cleanup();

    _render({ ...mockCallData, is_archived: true });
    expect(screen.queryByRole("button", { name: "is archived" })).toBeTruthy();
  });

  test("It renders notes", () => {
    const contentNote1 = "note1";
    const contentNote2 = "note2";

    _render({
      ...mockCallData,
      notes: [
        { id: "id1", content: contentNote1 },
        { id: "id2", content: contentNote2 },
      ],
      hasNotes: false,
    });

    expect(screen.queryByText(contentNote1)).toBeFalsy();
    expect(screen.queryByText(contentNote2)).toBeFalsy();

    cleanup();

    _render({
      ...mockCallData,
      notes: [
        { id: "id1", content: contentNote1 },
        { id: "id2", content: contentNote2 },
      ],
      hasNotes: true,
    });

    expect(screen.queryByText(contentNote1)).toBeTruthy();
    expect(screen.queryByText(contentNote2)).toBeTruthy();
  });
});
