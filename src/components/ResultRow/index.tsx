import React from "react";
import styled from "styled-components";
import searchResults from "../../types/search-results";
import HashTag from "../HashTag";

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
`;

const HashTags = styled.div``;

type ResultRowType = {
  result: searchResults;
  seqNbr: number;
};
function ResultRow({ result, seqNbr }: ResultRowType) {
  const { image_url, text, hash_tags, user_screen_name, tweet_url } = result;
  return (
    <ResultRowStyles seqNbr={seqNbr}>
      <Avatar></Avatar>
      <TweetStyles>
        <Username>@{user_screen_name}</Username>
        <TweetContent>{text}{tweet_url}</TweetContent>
        <HashTags>
          {hash_tags.map((hashTag) => (
            <HashTag key={hashTag} value={hashTag} />
          ))}
        </HashTags>
      </TweetStyles>
    </ResultRowStyles>
  );
}

export default ResultRow;
