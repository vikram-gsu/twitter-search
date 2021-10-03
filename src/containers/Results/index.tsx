import React from "react";
import styled from "styled-components";
import searchResult from "../../types/search-result";
import ResultRow from "../../components/ResultRow";

const ResultsStyles = styled.div`
  grid-area: results;
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
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

type ResultsProps = {
  loading: boolean;
  results: searchResult[];
  onLoadMoreClick: () => void;
};
function Results({ loading, results, onLoadMoreClick }: ResultsProps) {
  return (
    <ResultsStyles>
      {results.map((result, seqNbr) => (
        <ResultRow key={result.id} result={result} seqNbr={seqNbr} />
      ))}
      <LoadMore>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <button onClick={onLoadMoreClick}>Load More</button>
        )}
      </LoadMore>
    </ResultsStyles>
  );
}

export default React.memo(Results);
