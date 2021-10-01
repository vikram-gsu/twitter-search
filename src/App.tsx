import React, { useReducer, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "./App.css";
import * as tempResults from "./data/sample_response.json";

import Filter from "./containers/Filter";
import Heading from "./containers/Heading";
import Results from "./containers/Results";
import Search from "./containers/Search";
import mainReducer, { INITIAL_STATE } from "./reducers/tweetsReducer";
import { POSSIBLE_STATES } from "./types/app-state";
import { formatData, getAllHashTags } from "./data/format-data";
import debounce from "./data/deboucer";

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
  const [state, dispatch] = useReducer(mainReducer, INITIAL_STATE);
  const { searchText, results, allHashTags } = state;

  const fetchResults = useCallback(async () => {
    dispatch({
      type: POSSIBLE_STATES.LOADING_RESULTS,
    });
    try {
      await debounce(async () => {
        // const {response} = axios.get()
        // console.log(tempResults.statuses);
        let results = formatData(tempResults.statuses);
        let hashTags = getAllHashTags(results);

        dispatch({
          type: POSSIBLE_STATES.LOADING_COMPLETE,
          payload: {
            results,
            hashTags,
          },
        });
      }, 500);
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
    dispatch({
      type: POSSIBLE_STATES.SET_SEARCH_TEXT,
      payload: {
        searchText: e.target.value,
      },
    });
  };

  return (
    <AppStyles>
      <Heading />
      <Search
        searchValue={searchText}
        onSearchChange={handleSearchTextChange}
      />
      <Results results={results} />
      <Filter hashTags={allHashTags} />
    </AppStyles>
  );
}

export default App;
