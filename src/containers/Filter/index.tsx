import React from "react";
import styled from "styled-components";
import HashTag from "../../components/HashTag";

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
    font-size: 1.2em;
    font-weight: bold;
    color: var(--gray-300);
    padding-bottom: 1em;
  }
`;
const NoHashTagsMessage = styled.div`
  font-style: italic;
`;

type FilterProps = {
  hashTags?: string[];
};
function Filter({ hashTags }: FilterProps) {
  return (
    <FilterStyles>
      <p>Filter by hashtag</p>
      <div>
        {hashTags &&
          hashTags.map((hashTag) => <HashTag key={hashTag} value={hashTag} />)}
        {
          (!hashTags || hashTags.length == 0) && (<NoHashTagsMessage>
            Hash tags appear here as you search for tweets
          </NoHashTagsMessage>)
        }
      </div>
    </FilterStyles>
  );
}

export default Filter;
