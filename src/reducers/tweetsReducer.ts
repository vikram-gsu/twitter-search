import AppStateType, { ActionType, POSSIBLE_STATES } from "../types/app-state";

const INITIAL_STATE: AppStateType = {
  currentSearchText: "",
  results: [],
  allHashTags: new Set(),
  loading: false,
  loadMore: 0,
  hasError: false
};

function tweetsReducer(state: AppStateType, action: ActionType): AppStateType {
  switch (action.type) {
    case POSSIBLE_STATES.SET_SEARCH_TEXT:
      return {
        ...state,
        currentSearchText: action.payload.currentSearchText,
        results: [],
        loadMore: 0,
      };
    case POSSIBLE_STATES.LOADING_RESULTS:
      return { ...state, loading: true };
    case POSSIBLE_STATES.HAS_ERROR:
      return { ...state, hasError: true, errorMessage: action.payload.message };
    case POSSIBLE_STATES.LOADING_COMPLETE:
      if (action.payload.loadMore > 0) {
        return {
          ...state,
          loading: false,
          hasError: false,
          loadMore: action.payload.loadMore,
          results: [...state.results, ...action.payload.results],
          allHashTags: new Set([
            ...Array.from(state.allHashTags),
            ...Array.from(action.payload.hashTags),
          ]),
        };
      }
      return {
        ...state,
        loading: false,
        hasError: false,
        loadMore: action.payload.loadMore,
        results: action.payload.results,
        allHashTags: action.payload.hashTags,
      };
    case POSSIBLE_STATES.LOAD_MORE:
      return {
        ...state,
        loadMore: action.payload.loadMore,
      };
    default:
      return state;
  }
}
export { INITIAL_STATE };
export default tweetsReducer;
