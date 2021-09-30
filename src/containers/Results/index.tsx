import React from "react";
import styled from "styled-components";
import searchResults from "../../types/search-results";
import ResultRow from "../../components/ResultRow";

const ResultsStyles = styled.div`
  grid-area: results;
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  /* border-radius: var(--box-border-radius); */
`;
const LoadMore = styled.div`
  button {
    border: none;
    background: none;
    color: var(--blue-200);
    cursor: pointer;
    padding: 1em;
    :hover {
      color: var(--gray-500);
    }
  }
  padding: 2em 0 1em 0;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  font-style: italic;
`;

type ResultsProps = {
  results: searchResults[];
};
function Results({ results }: ResultsProps) {
  return (
    <ResultsStyles>
      {results.map((result, seqNbr) => (
        <ResultRow key={seqNbr} result={result} seqNbr={seqNbr} />
      ))}
      {
        (!results || results.length == 0) && <NoResultsMessage>
          Results appear here as you search for tweets
        </NoResultsMessage>
      }
      {results.length > 5 && (
        <LoadMore>
          <button>Load More</button>
        </LoadMore>
      )}
    </ResultsStyles>
  );
}

export default Results;
