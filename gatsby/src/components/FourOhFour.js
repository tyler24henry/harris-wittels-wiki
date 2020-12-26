import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const FourOhFourStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    h2 {
        margin-top: -2rem;
        font-size: 20rem;
        font-weight: 600;
        height: 22rem;
        color: var(--black);
        letter-spacing: 1rem;
        @media(max-width: 414px){
            margin-top: -4rem;
            font-size: 16rem;
        }
    }
    p {
        font-size: 3.5rem;
        font-weight: 300;
        color: var(--black);
        @media(max-width: 414px){
            font-size: 3rem;
            margin-top: -4rem;
        }
    }
    a {
        margin-top: 5rem;
        font-size: 2rem;
        color: var(--black);
        border: 1px solid var(--black);
        border-radius: 4px;
        padding: 1.2rem 2rem;
        transition: all 0.4s;
        &:hover {
            background-color: var(--black);
            color: var(--white);
            text-decoration: none;
        }
        @media(max-width: 414px){
            margin-top: 2.5rem;
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
