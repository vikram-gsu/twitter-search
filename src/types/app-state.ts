import searchResult from "./search-result";

type AppStateType = {
  currentSearchText: string;
  results: searchResult[];
  allHashTags: Set<string>;
  loading: boolean;
  loadMore: number;
  hasError: boolean;
  errorMessage?: string;
};

enum POSSIBLE_STATES {
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
  LOADING_RESULTS = "LOADING_RESULTS",
  LOADING_COMPLETE = "LOADING_COMPLETE",
  HAS_ERROR = "HAS_ERROR",
  LOAD_MORE = "LOAD_MORE",
}
export type ActionType =
  | {
      type: POSSIBLE_STATES.SET_SEARCH_TEXT;
      payload: {
        currentSearchText: string;
      };
    }
  | { type: POSSIBLE_STATES.LOADING_RESULTS }
  | {
      type: POSSIBLE_STATES.LOADING_COMPLETE;
      payload: {
        loadMore: number;
        results: searchResult[];
        hashTags: Set<string>;
      };
    }
  | {
      type: POSSIBLE_STATES.HAS_ERROR;
      payload: {
        message: string;
      };
    }
  | {
      type: POSSIBLE_STATES.LOAD_MORE;
      payload: {
        loadMore: number;
      };
    };

export { POSSIBLE_STATES };

export default AppStateType;
