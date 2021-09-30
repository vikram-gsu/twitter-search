import React from "react";
import styled from "styled-components";

const SearchStyles = styled.div`
  grid-area: search;
  input {
    width: 100%;
    height: 2em;
    padding: 1.2em;
    border: 1px solid var(--gray-200);
    border-radius: var(--textbox-border-radius);
    :hover {
      outline: 1px solid var(--blue-200);
    }
    :focus {
      outline: 2px solid var(--blue-200);
    }
  }
`;

type SearchProps = {
  searchValue?: string;
  onSearchChange: (e:React.ChangeEvent<HTMLInputElement>)=>void
};
function Search({ searchValue = "", onSearchChange }: SearchProps) {
  return (
    <SearchStyles>
      <input
        type="search"
        value={searchValue}
        placeholder="Search by keyword"
        onChange={onSearchChange}
      />
    </SearchStyles>
  );
}

export default Search;
