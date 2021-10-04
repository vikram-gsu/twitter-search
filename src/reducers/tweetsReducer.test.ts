import AppStateType, { ActionType, POSSIBLE_STATES } from "../types/app-state";
import searchResult from "../types/search-result";
import tweetsReducer, { INITIAL_STATE } from "./tweetsReducer";

const searchResultOne: searchResult = {
  created_at: new Date("10/3/2021"),
  id: "1234",
  image_url: "avatar1.jpg",
  user_screen_name: "rick",
  text: "Science is amazing",
  tweet_url: "http://twitter.com/rick",
  hash_tags: ["science", "aliens"],
};

const searchResultTwo: searchResult = {
  created_at: new Date("10/4/2021"),
  id: "1235",
  image_url: "avatar2.jpg",
  user_screen_name: "Morty",
  text: "Going on adventures with Rick",
  tweet_url: "http://twitter.com/morty",
  hash_tags: ["danharmon", "hbo"],
};
const stateOne: AppStateType = {
  currentSearchText: "science",
  results: [searchResultOne],
  allHashTags: new Set(searchResultOne.hash_tags),
  loading: false,
  loadMore: 1,
  hasError: false,
};

describe("Tweets reducer", () => {
  test("Set search text", () => {
    const initialState = INITIAL_STATE;
    const action: ActionType = {
      type: POSSIBLE_STATES.SET_SEARCH_TEXT,
      payload: {
        currentSearchText: "science",
      },
    };

    const expectedState: AppStateType = {
      ...initialState,
      currentSearchText: "science",
      loadMore: 0,
    };
    const newState = tweetsReducer(initialState, action);
    expect(newState).toStrictEqual(expectedState);
  });

  test("Handles loading state", () => {
    const initialState = INITIAL_STATE;
    const action: ActionType = {
      type: POSSIBLE_STATES.LOADING_RESULTS,
    };

    const expectedState: AppStateType = {
      ...initialState,
      loading: true,
    };
    const newState = tweetsReducer(initialState, action);
    expect(newState).toStrictEqual(expectedState);
  });

  test("Gets expected state when initial loading completes", () => {
    const initialState = INITIAL_STATE;
    const action: ActionType = {
      type: POSSIBLE_STATES.LOADING_COMPLETE,
      payload: {
        loadMore: 1,
        results: [searchResultOne],
        hashTags: new Set(searchResultOne.hash_tags),
      },
    };

    const expectedState: AppStateType = {
      ...initialState,
      loading: false,
      loadMore: 1,
      results: [searchResultOne],
      allHashTags: new Set(searchResultOne.hash_tags),
    };
    const newState = tweetsReducer(initialState, action);
    expect(newState).toStrictEqual(expectedState);
  });

  test("Gets expected state when second load completes", () => {
    const initialState = stateOne;
    const action: ActionType = {
      type: POSSIBLE_STATES.LOADING_COMPLETE,
      payload: {
        loadMore: 2,
        results: [searchResultTwo],
        hashTags: new Set(searchResultTwo.hash_tags),
      },
    };

    const expectedState: AppStateType = {
      ...initialState,
      loading: false,
      loadMore: 2,
      results: [searchResultOne, searchResultTwo],
      allHashTags: new Set([
        ...searchResultOne.hash_tags,
        ...searchResultTwo.hash_tags,
      ]),
    };
    const newState = tweetsReducer(initialState, action);
    expect(newState).toStrictEqual(expectedState);
  });
});
