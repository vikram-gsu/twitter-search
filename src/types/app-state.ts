import searchResults from "./search-results";

type AppStateType = {
  searchText: string;
  results: searchResults[];
  allHashTags: string[];
  loading: boolean;
  hasError: boolean;
  errorMessage?: string;
};

enum POSSIBLE_STATES {
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
  LOADING_RESULTS = "LOADING_RESULTS",
  LOADING_COMPLETE = "LOADING_COMPLETE",
  HAS_ERROR = "HAS_ERROR",
}
export type ActionType = {
  type: POSSIBLE_STATES;
  payload?: any;
};

export { POSSIBLE_STATES };

export default AppStateType;
