import React from 'react';
import 'normalize.css';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import { TopNav } from './TopNav';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

const SiteBorderStyles = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  @media (max-width: 414px) {
    grid-template-columns: 1fr;
  }
  .left-panel-wrapper {
    width: 200px;
    position: relative;
    @media (max-width: 414px) {
        display: none;
    }
  }
`;

const RightBodyStyles = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;
  .top-nav-wrapper {
    height: 60px;
  }
`;

const ContentStyles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 650px 1fr;
  @media(max-width: 1080px){
    grid-template-columns: 1fr;
  }
  .children-wrapper {
    padding: 2rem;
  }
  .right-panel-wrapper {
    @media(max-width: 1080px){
      display: none;
    }
  }
`;

export default function Layout({ children }) {
  return (
    <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
        <div className="left-panel-wrapper">
          <LeftPanel />
        </div>
        <RightBodyStyles>
          <div className="top-nav-wrapper">
            <TopNav />
          </div>
          <ContentStyles>
            <div className="children-wrapper">
              {children}
            </div>
            <div className="right-panel-wrapper">
              <RightPanel />
            </div>
          </ContentStyles>
        </RightBodyStyles>
    </SiteBorderStyles>
    </>
  );
}