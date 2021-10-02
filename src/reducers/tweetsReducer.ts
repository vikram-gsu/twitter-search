import AppStateType, { ActionType, POSSIBLE_STATES } from "../types/app-state";

const INITIAL_STATE: AppStateType = {
  searchText: "",
  results: [],
  allHashTags: new Set(),
  loading: false,
  hasError: false,
};

function tweetsReducer(state: AppStateType, action: ActionType): AppStateType {
  console.log(state, action);
  switch (action.type) {
    case POSSIBLE_STATES.LOADING_RESULTS:
      return { ...state, loading: true };
    case POSSIBLE_STATES.HAS_ERROR:
      return { ...state, hasError: true, errorMessage: action.payload.message };
    case POSSIBLE_STATES.LOADING_COMPLETE:
      return {
        ...state,
        loading: false,
        hasError: false,
        results: action.payload.results,
        allHashTags: action.payload.hashTags,
      };
    default:
      return state;
  }
}
export { INITIAL_STATE };
export default tweetsReducer;
