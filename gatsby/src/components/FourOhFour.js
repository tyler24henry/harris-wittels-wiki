import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const FourOhFourStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    h2 {
        margin-top: -4rem;
        font-size: 20rem;
        font-weight: 600;
        height: 22rem;
        color: #64ffda;
        letter-spacing: 1rem;
    }
    p {
        font-size: 3.5rem;
        font-weight: 300;
        color: white;
    }
    a {
        margin-top: 5rem;
        font-size: 2rem;
        color: #64ffda;
        border: 1px solid #64ffda;
        border-radius: 4px;
        padding: 1.2rem 2rem;
        &:hover {
            background-color: var(--greenTint);
        }
    }
`;

export const FourOhFour = () => {
    return (
        <FourOhFourStyles>
            <h2>404</h2>
            <p>Page not found</p>
            <Link to="/">Go home</Link>
        </FourOhFourStyles>
    )
}
