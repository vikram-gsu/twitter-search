import React from 'react'
import styled from 'styled-components';

const HashTagStyles = styled.a`
    text-decoration: none;
    cursor:pointer;
    background-color: var(--blue-100);
    color: var(--blue-200);
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
type HashTagProps = {
    value: string
}
function HashTag({value}: HashTagProps) {
    return (
        <HashTagStyles>
            #{value}
        </HashTagStyles>
    )
}

export default HashTag;
