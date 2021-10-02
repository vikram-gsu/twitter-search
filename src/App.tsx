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
import { POSSIBLE_STATES } from "./types/app-state";
import { formatData, getAllHashTags } from "./data/format-data";
import { FilterProvider } from "./contexts/FilterContext";
import useDebounce from "./hooks/useDebounce";

const AppStyles = styled.div`
  display: grid;
  grid-template-areas:
    ". header  header ."
    ". search  filter ."
    ". results filter .";
  grid-template-columns: 20vw 40vw 18vw 22vw;
  grid-template-rows: 6em 4em 1fr;
  grid-gap: 1em;
`;

function App() {
  const [state, dispatch] = useReducer(tweetsReducer, INITIAL_STATE);
  const [selectedHashTags, setSelectedHashTags] = useState(new Set<string>());
  const [currentSearchText, setCurrentSearchText] = useState(
    INITIAL_STATE.searchText
  );
  const searchText = useDebounce(currentSearchText, 1000);

  const { results, allHashTags } = state;

  const fetchResults = useCallback(async () => {
    dispatch({
      type: POSSIBLE_STATES.LOADING_RESULTS,
    });
    try {
      if (searchText.length !== 0) {
        const response = await axios.get(
          `https://twitter-api-backend-vikram.herokuapp.com/getData/${searchText}`
        );
        let results = formatData(response.data.statuses);
        let hashTags = getAllHashTags(results);

        dispatch({
          type: POSSIBLE_STATES.LOADING_COMPLETE,
          payload: {
            results,
            hashTags,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: POSSIBLE_STATES.HAS_ERROR,
        payload: {
          errorMessage: e,
        },
      });
    }
  }, [searchText]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleSearchTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentSearchText(e.target.value);
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
        onHashTagClick: onHashTagSelect,
      }}
    >
      <AppStyles>
        <Heading />
        <Search
          searchValue={currentSearchText}
          onSearchChange={handleSearchTextChange}
        />
        <Results results={filteredResults} />
        <Filter allHashTags={allHashTags} />
      </AppStyles>
    </FilterProvider>
  );
}

export default App;
