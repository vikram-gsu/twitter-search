import React, { useReducer, useState } from "react";
import styled from "styled-components";
import "./App.css";

import Filter from "./containers/Filter";
import Heading from "./containers/Heading";
import Results from "./containers/Results";
import Search from "./containers/Search";
import mainReducer, {INITIAL_STATE} from "./reducers/mainReducer";
import { POSSIBLE_STATES } from "./types/app-state";

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
  const {searchText, results, allHashTags} = state;

  const handleSearchTextChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    dispatch({
      type: POSSIBLE_STATES.SET_SEARCH_TEXT,
      payload: {
        searchText: e.target.value
      }
    })
  }
  return (
    <AppStyles>
      <Heading />
      <Search searchValue={searchText} onSearchChange={handleSearchTextChange} />
      <Results results={results} />
      <Filter hashTags={allHashTags} />
    </AppStyles>
  );
}

export default App;
