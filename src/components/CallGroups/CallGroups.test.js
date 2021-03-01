import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
jest.mock("../../hooks/useRouting");
import CallGroups from "./CallGroups";

describe("CallGroups", () => {
  afterEach(cleanup);

  test("create correct number of groups depending on created_at value", () => {
    function Call({ id }) {
      return <div>{id} </div>;
    }

    const calls = [
      {
        id: "id1",
        created_at: "2021-01-01T18:00:00",
      },
      {
        id: "id2",
        created_at: "2021-01-01T18:00:00",
      },
      {
        id: "id3",
        created_at: "2021-01-02T18:00:00",
      },
      {
        id: "id4",
        created_at: "2021-01-02T18:00:00",
      },
      {
        id: "id5",
        created_at: "2021-01-02T18:00:00",
      },
      {
        id: "id6",
        created_at: "2021-01-03T18:00:00",
      },
      {
        id: "id7",
        created_at: "2021-01-03T18:00:00",
      },
      {
        id: "id8",
        created_at: "2021-01-03T18:00:00",
      },
      {
        id: "id9",
        created_at: "2021-01-03T18:00:00",
      },
      {
        id: "id10",
        created_at: "2021-01-05T18:00:00",
      },
    ].map(call => {
      return (
        <Call key={call.id} {...call}>
          {call.id}
        </Call>
      );
    });

    render(<CallGroups>{calls}</CallGroups>);

    const groups = screen.queryAllByRole("listbox");
    expect(groups.length).toEqual(4);
  });
});
