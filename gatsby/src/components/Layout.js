import React from 'react';
import 'normalize.css';
import { Footer } from './Footer';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import { Nav } from './Nav';

const SiteBorderStyles = styled.div`
`;

const ContentStyles = styled.div`
  width: 80vw;
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 8rem;
  a {
    text-decoration: none;
    transition: all 0.4s;
    &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red);
    }
  }
`;

export default function Layout({ children }) {
  return (
    <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
      <ContentStyles>
        <Nav />
        {children}
        <Footer />
      </ContentStyles>
    </SiteBorderStyles>
    </>
  );
}