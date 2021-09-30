import AppStateType, { ActionType, POSSIBLE_STATES } from "../types/app-state";

const INITIAL_STATE:AppStateType = {
    searchText: '',
    results: [],
    allHashTags: [],
    loading: false,
    hasError: false
}

function mainReducer(state: AppStateType, action: ActionType): AppStateType {
  switch (action.type) {
    case POSSIBLE_STATES.SET_SEARCH_TEXT:
      return { ...state, searchText: action.payload.searchText };

    default:
      return state;
  }
}
export {INITIAL_STATE};
export default mainReducer;
