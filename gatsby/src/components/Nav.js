import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const NavStyles = styled.nav`
    padding-top: 1rem;
    .button {
        &:hover {
            text-decoration: none
        }
    }
`;

export const Nav = () => {
    return (
        <NavStyles>
            <Link to="/">Home</Link>
        </NavStyles>
    )
}
