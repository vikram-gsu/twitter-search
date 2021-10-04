import React from "react";
import styled from "styled-components";
import searchResult from "../../types/search-result";
import HashTag from "../HashTag";
import { useFilter } from "../../contexts/FilterContext";

type ResultRowStylesProps = {
  seqNbr: number;
};
const ResultRowStyles = styled.div<ResultRowStylesProps>`
  display: flex;
  background-color: ${(props) =>
    props.seqNbr % 2 === 0 ? "var(--white)" : "var(--gray-100)"};
  padding: 1em;

  :hover {
    background-color: var(--gray-200);
  }
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const TweetStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em 1em 1em;
`;
const Username = styled.div`
  font-weight: bold;
  padding: 0.5em 0;
`;
const TweetContent = styled.div`
  padding: 0.5em 0;
  a {
    text-decoration: none;
    color: var(--blue-200);
    :hover {
      cursor: pointer;
    }
  }
`;

const HashTags = styled.div``;

export type ResultRowType = {
  result: searchResult;
  seqNbr: number;
};
function ResultRow({ result, seqNbr }: ResultRowType) {
  const { selectedHashTags, onHashTagClick } = useFilter()!;
  const { image_url, text, hash_tags, user_screen_name, tweet_url } = result;

  return (
    <ResultRowStyles data-testid="Result row" seqNbr={seqNbr}>
      <Avatar src={image_url} alt={"Avatar image"} />
      <TweetStyles>
        <Username>@{user_screen_name}</Username>
        <TweetContent>
          {text}
          <a href={tweet_url}>{tweet_url}</a>
        </TweetContent>
        <HashTags>
          {hash_tags.map((hashTag) => (
            <HashTag
              key={hashTag}
              value={hashTag}
              selected={selectedHashTags.has(hashTag)}
              onHashTagClick={onHashTagClick}
            />
          ))}
        </HashTags>
      </TweetStyles>
    </ResultRowStyles>
  );
}

export default React.memo(ResultRow);
