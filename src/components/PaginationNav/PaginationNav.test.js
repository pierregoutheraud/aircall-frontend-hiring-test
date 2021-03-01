import React from "react";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import { Tractor } from "@aircall/tractor";
import PaginationNav from "./PaginationNav";

describe("PaginationNav", () => {
  afterEach(cleanup);

  function _render(props) {
    return render(
      <Tractor injectStyle>
        <PaginationNav {...props} />
      </Tractor>
    );
  }

  test("Display current page", () => {
    _render({ page: 5, maxPage: 10 });
    const currentButton = screen.queryByRole("button", {
      name: "current page",
    });
    expect(currentButton).toBeTruthy();
    expect(currentButton).toHaveTextContent("5");
  });

  test("Display correct number of pages buttons at first page and last page", () => {
    _render({ page: 1, maxPage: 10 });
    const buttons = screen.queryAllByRole("button", { name: "page button" });
    expect(buttons.length).toBe(2);
  });

  test("Display correct number of pages at max page", () => {
    _render({ page: 10, maxPage: 10 });
    const buttons = screen.queryAllByRole("button", { name: "page button" });
    expect(buttons.length).toBe(2);
  });

  test("Display 2 other pages on each side of the current page", () => {
    _render({ page: 4, maxPage: 10, disabled: false, onPage: () => {} });
    const buttons = screen.queryAllByRole("button", { name: "page button" });
    expect(buttons.map(button => button.textContent)).toEqual([
      "2",
      "3",
      "5",
      "6",
    ]);
  });

  test("Left and next page arrow buttons are working", () => {
    const onPage = jest.fn();
    _render({ page: 4, maxPage: 6, disabled: false, onPage });
    const previousPage = screen.getByRole("button", { name: "previous page" });
    fireEvent.click(previousPage);
    expect(onPage).toHaveBeenCalledWith(3);

    const nextPage = screen.getByRole("button", {
      name: "next page",
    });
    fireEvent.click(nextPage);
    expect(onPage).toHaveBeenCalledWith(5);
  });
});
