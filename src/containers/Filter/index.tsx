import React from "react";
import styled from "styled-components";
import HashTag from "../../components/HashTag";
import { useFilter } from "../../contexts/FilterContext";
const FilterStyles = styled.div`
  grid-area: filter;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  padding: 1em;
  border-radius: var(--box-border-radius);
  box-shadow: var(--box-shadow);
  height: max-content;
  p {
    margin: 0;
    font-size: 1.1em;
    font-weight: bold;
    color: var(--gray-300);
    padding-bottom: 1em;
    button {
      border: none;
      background: none;
      padding: 0;
      border-radius: 10px;
      font-size: 0.75em;
      color: var(--blue-200);
      padding: 0 0.5em;
      margin-left: 0.5em;
      cursor: pointer;
      :hover {
        color: var(--blue-100);
        background-color: var(--blue-200);
      }
      :disabled {
        color: var(--gray-500);
        background-color: white;
        cursor: auto;
      }
    }
  }
  @media screen and (max-width: 467px) {
    height: auto;
    overflow: scroll;
  }
`;

type FilterProps = {
  allHashTags: string[];
};
function Filter({ allHashTags = [] }: FilterProps) {
  const { selectedHashTags, clearHashTagSelection, onHashTagClick } =
    useFilter()!;
  return (
    <FilterStyles>
      <p>
        Filter by hashtag
        <button
          disabled={selectedHashTags.size === 0}
          onClick={clearHashTagSelection}
        >
          Clear selection
        </button>
      </p>

      <div>
        {allHashTags.map((hashTag) => (
          <HashTag
            key={hashTag}
            value={hashTag}
            selected={selectedHashTags.has(hashTag)}
            onHashTagClick={onHashTagClick}
          />
        ))}
      </div>
    </FilterStyles>
  );
}

export default Filter;
