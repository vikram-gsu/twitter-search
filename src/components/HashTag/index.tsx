import React from "react";
import styled from "styled-components";

type HashTagStyleProps = {
  selected: boolean;
};
const HashTagStyles = styled.button<HashTagStyleProps>`
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "var(--blue-200)" : "var(--blue-100)"};
  color: ${({ selected }) =>
    selected ? "var(--blue-100)" : "var(--blue-200)"};
  display: inline-block;
  padding: 0.5em 1.2em;
  margin: 0.4em;
  border-radius: 20px;
  text-align: center;
  :hover {
    color: var(--white);
    background-color: var(--blue-200);
  }
`;
export type HashTagProps = {
  value: string;
  selected: boolean;
  onHashTagClick: (currentSelection: string) => void;
};
function HashTag({ value, selected, onHashTagClick }: HashTagProps) {
  return (
    <HashTagStyles onClick={() => onHashTagClick(value)} selected={selected}>
      #{value}
    </HashTagStyles>
  );
}

export default HashTag;
