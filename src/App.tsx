import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import styled from "styled-components";
import axios from "axios";
import "./App.css";

import Filter from "./containers/Filter";
import Heading from "./containers/Heading";
import Results from "./containers/Results";
import Search from "./containers/Search";
import tweetsReducer, { INITIAL_STATE } from "./reducers/tweetsReducer";
import AppStateType, { ActionType, POSSIBLE_STATES } from "./types/app-state";
import { formatData, getAllHashTags } from "./api/format-data";
import { FilterProvider } from "./contexts/FilterContext";
import useDebounce from "./hooks/useDebounce";
import searchResult from "./types/search-result";

const AppStyles = styled.div`
  display: grid;
  grid-template-areas:
    ". header  header ."
    ". search  filter ."
    ". results filter .";
  grid-template-columns: 20vw 40vw 18vw 22vw;
  grid-template-rows: 6em 4em 1fr;
  grid-gap: 1em;
  @media screen and (max-width: 467px) {
    grid-template-areas:
      "header"
      "search"
      "filter"
      "results";
    grid-template-columns: 1fr;
    grid-template-rows: 4em 4em 12em 1fr;
    grid-gap: 1em;
  }
`;

const CurrentStateMessage = styled.div`
  grid-area: results;
`;

function App() {
  const [state, dispatch] = useReducer<
    (state: AppStateType, action: ActionType) => AppStateType
  >(tweetsReducer, INITIAL_STATE);
  const [selectedHashTags, setSelectedHashTags] = useState(new Set<string>());

  const {
    currentSearchText,
    loading,
    loadMore,
    results,
    allHashTags,
    hasError,
    errorMessage,
  } = state;
  const searchText = useDebounce(currentSearchText, 1000);

  const requestEndPoint = "https://twitter-api-backend-vikram.herokuapp.com";
  const fetchResults = useCallback(async () => {
    dispatch({
      type: POSSIBLE_STATES.LOADING_RESULTS,
    });
    try {
      if (searchText.length !== 0) {
        let searchEndpoint = `${requestEndPoint}/${searchText}`;
        let oldestResult: searchResult | null = null;
        if (loadMore) {
          oldestResult = results[results.length - 1];
          searchEndpoint = `${searchEndpoint}&max_id=${oldestResult.id}`;
        }

        const response = await axios.get(searchEndpoint);
        let currentResults = formatData(response.data.statuses);
        if (oldestResult) {
          currentResults = currentResults.filter(
            (result) => result.id !== oldestResult!.id
          );
        }
        let hashTags = getAllHashTags(currentResults);

        dispatch({
          type: POSSIBLE_STATES.LOADING_COMPLETE,
          payload: {
            loadMore,
            results: currentResults,
            hashTags,
          },
        });
      } else {
        dispatch({
          type: POSSIBLE_STATES.LOADING_COMPLETE,
          payload: {
            loadMore: 0,
            results: [],
            hashTags: new Set(),
          },
        });
      }
    } catch (e) {
      dispatch({
        type: POSSIBLE_STATES.HAS_ERROR,
        payload: {
          message: e as string,
        },
      });
    }
  }, [loadMore, searchText]);

  useEffect(() => {
    fetchResults();
  }, [loadMore, fetchResults]);

  const handleSearchTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch({
      type: POSSIBLE_STATES.SET_SEARCH_TEXT,
      payload: {
        currentSearchText: e.target.value,
      },
    });
  };

  const onHashTagSelect = (currentSelection: string): void => {
    let newHashTags = new Set(selectedHashTags);
    if (selectedHashTags.has(currentSelection)) {
      newHashTags.delete(currentSelection);
    } else {
      newHashTags.add(currentSelection);
    }
    setSelectedHashTags(newHashTags);
  };

  const clearHashTagSelection = () => {
    setSelectedHashTags(new Set());
  };

  const onLoadMoreClick = () => {
    dispatch({
      type: POSSIBLE_STATES.LOAD_MORE,
      payload: {
        loadMore: loadMore + 1,
      },
    });
  };

  const filteredResults = useMemo(
    () =>
      selectedHashTags.size === 0
        ? results
        : results.filter(
            (result) =>
              result.hash_tags.filter((hashTag) =>
                selectedHashTags.has(hashTag)
              ).length > 0
          ),
    [results, selectedHashTags]
  );

  return (
    <FilterProvider
      value={{
        selectedHashTags: selectedHashTags,
        clearHashTagSelection: clearHashTagSelection,
        onHashTagClick: onHashTagSelect,
      }}
    >
      <AppStyles>
        <Heading />
        <Search
          searchValue={currentSearchText}
          onSearchChange={handleSearchTextChange}
        />
        {loading && filteredResults.length === 0 && (
          <CurrentStateMessage>Loading...</CurrentStateMessage>
        )}
        {hasError && <CurrentStateMessage>{errorMessage}</CurrentStateMessage>}
        {filteredResults.length > 0 && (
          <Results
            results={filteredResults}
            onLoadMoreClick={onLoadMoreClick}
            loading={loading}
          />
        )}
        {allHashTags.size > 0 && (
          <Filter allHashTags={Array.from(allHashTags)} />
        )}
      </AppStyles>
    </FilterProvider>
  );
}

export default App;
