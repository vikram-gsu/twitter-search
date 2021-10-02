import { screen, fireEvent, render } from "@testing-library/react";
import ResultRow, { ResultRowType } from ".";
import { FilterProvider } from "../../contexts/FilterContext";

describe("ResultRow component", () => {
  const resultRowProps: ResultRowType = {
    seqNbr: 1,
    result: {
      image_url: "http://image.jpg",
      text: "test tweet text",
      hash_tags: ["nasa", "space"],
      user_screen_name: "buzzaldrin",
      tweet_url: "http://link-to-tweet.com",
    },
  };
  const filterContextValue = {
    selectedHashTags: new Set(["nasa", "space"]),
    onHashTagClick: jest.fn(),
  };
  test("renders as expected", () => {
    render(
      <FilterProvider value={{ ...filterContextValue }}>
        <ResultRow {...resultRowProps} />
      </FilterProvider>
    );

    expect(screen.getByText(resultRowProps.result.text)).toBeInTheDocument();
    expect(
      screen.getByText(`#${resultRowProps.result.hash_tags[0]}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`#${resultRowProps.result.hash_tags[1]}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`@${resultRowProps.result.user_screen_name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(resultRowProps.result.tweet_url)
    ).toBeInTheDocument();
  });
});
