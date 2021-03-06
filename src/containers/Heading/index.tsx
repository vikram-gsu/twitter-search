import React from 'react';
import styled from 'styled-components';

const HeadingStyles = styled.div`
    grid-area: header;
    padding: 2em 0;
    font-size: 1.5em;
    font-weight: bold;
    @media screen and (max-width: 467px){
        padding: 1em;
    }
`;

function Heading() {
    return (
        <HeadingStyles>
            Tweet Feed
        </HeadingStyles>
    )
}

export default Heading
