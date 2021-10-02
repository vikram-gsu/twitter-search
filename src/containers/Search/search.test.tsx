import { screen, render, fireEvent } from "@testing-library/react";
import Search from ".";

describe("Search component", () => {
  const searchProps = {
    searchValue: "nasa",
    onSearchChange: jest.fn(),
  };
  test("renders without error", () => {
    render(<Search {...searchProps} />);
    expect(screen.getByDisplayValue("nasa")).toBeInTheDocument();
  });
  test("invokes onChange event", () => {
    render(<Search {...searchProps} />);
    fireEvent.change(screen.getByDisplayValue("nasa"), {
      target: {
        value: "space",
      },
    });

    expect(searchProps.onSearchChange).toBeCalledTimes(1);
  });
});
