import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App component", () => {
  const searchResultOne = {
    created_at: new Date("10/3/2021"),
    id_str: "1234",
    full_text: "Science is amazing http://twitter.com",
    entities: {
      hashtags: [{ text: "space" }, { text: "nasa" }],
    },
    user: {
      screen_name: "rick",
      profile_image_url: "avatar1.jpg",
    },
  };
  const searchResultTwo = {
    created_at: new Date("10/4/2021"),
    id_str: "1235",
    full_text:
      "Going on a Sci-fi adventure with my Grand father http://rickandmorty.com",
    entities: {
      hashtags: [{ text: "justinroiland" }, { text: "danharmon" }],
    },
    user: {
      screen_name: "morty",
      profile_image_url: "avatar2.jpg",
    },
  };
  const searchResults = [searchResultOne, searchResultTwo];

  test("renders basic without error", () => {
    render(<App />);

    expect(screen.getByText("Tweet Feed")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search by keyword/)
    ).toBeInTheDocument();
  });

  test("renders results as expected", async () => {
    const searchResultOnePromise = Promise.resolve({
      data: {
        statuses: [searchResultOne],
      },
    });

    const searchResultTwoPromise = Promise.resolve({
      data: {
        statuses: [searchResultTwo],
      },
    });

    mockedAxios.get.mockImplementationOnce(() => searchResultOnePromise);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Search by keyword"), {
      target: {
        value: "science",
      },
    });
    expect(screen.getByDisplayValue("science")).toBeInTheDocument();
    await act(async () => {
      render(<App />);
      await waitFor(() => [
        expect(screen.getByText(/Science is amazing/)).toBeInTheDocument(),
      ]);
    });
  });
});
