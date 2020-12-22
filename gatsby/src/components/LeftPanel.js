import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { RightPanel } from './RightPanel';
import GeneralContext from './GeneralContext';
import { FiChevronRight } from 'react-icons/fi';

const LeftPanelStyles = styled.div`
    height: 100%;
    width: 200px;
    overflow-y: scroll;
    background: #f7f7f7;
    border-right: 2px solid #e2e2e2;
    z-index: 600;
    position: fixed;
    left: 0;
    top: 0;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    ::-webkit-scrollbar { /* WebKit */
        width: 0;
        height: 0;
    }
    @media (max-width: 414px) {
        top: 60px;
        width: 100vw;
        height: calc(100% - 6rem);
    }
    .close-left-panel-btn {
        display: none;
        @media (max-width: 414px) {
            color: var(--black);
            font-size: 1.2rem;
            letter-spacing: 0.1rem;
            padding: 1rem 2rem;
            border-bottom: 1px solid #e2e2e2;
            transition: all 0.4s;
            text-align: left;
            &:hover {
                background-color: #e2e2e2;
            }
        }
    }
    .link {
        color: var(--black);
        font-size: 1.2rem;
        letter-spacing: 0.1rem;
        padding: 1rem;
        &:hover {
            text-decoration: none;
        }
        @media (max-width: 414px) {
            padding: 1rem 2rem;
        }
    }
    #chevron {
      position: relative;
      text-align: center;
      padding: 12px;
      margin-bottom: 6px;
      height: 90px;
      width: 175px;
      @media (max-width: 414px) {
            width: 100vw;
        }
    }
    #chevron:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 51%;
      background: #ffffff;
      transform: skew(0deg, 6deg);
      border-bottom: 2px solid #e2e2e2;
      box-shadow: 1px 1px 3px #e2e2e2;
    }
    #chevron:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 50%;
      background: #ffffff;
      transform: skew(0deg, -6deg);
      border-bottom: 2px solid #e2e2e2;
      box-shadow: 1px 1px 3px #e2e2e2;
    }
    .site-name {
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        height: 70px;
        width: 200px;
        padding: 3.3rem 0 0 0;
        background-color: #ffffff;
        text-align: center;
        @media (max-width: 414px) {
            width: 100vw;
        }
        .link {
            color: var(--black);
            display: block;
            padding: 0;
            margin: 0;
            text-transform: uppercase;
        }
        #first-name {
            font-size: 1.8rem;
        }
        #last-name {
            font-size: 1.8rem;
        }
    }
    .links {
        padding: 4rem 0;
        display: grid;
        grid-template-columns: 1fr;
        a {
            border-top: 1px solid #e2e2e2;
            transition: all 0.4s;
            &:hover {
                background-color: #e2e2e2;
            }
        }
        #first-link {
            border-top: none;
        }
        #about, #contact {
            display: none;
            @media(max-width: 850px){
                display: block;
            }
        }
        #search {
            display: none;
            @media(max-width: 414px){
                display: block;
            }
        }
    }
    .wiki-wrapper {
        display: none;
        @media(max-width: 1080px){
            margin-top: 4rem;
            display: block;
        }
    }
`;

export const LeftPanel = () => {
    const [search, setSearch, openLeftPanel, setOpenLeftPanel] = useContext(GeneralContext);
    return (
        <LeftPanelStyles>
            <div className="site-name">
                <Link className="link" id="first-name" to="/" onClick={e => setOpenLeftPanel(false)}>Harris</Link>
                <Link className="link" id="last-name" to="/" onClick={e => setOpenLeftPanel(false)}>Wittels</Link>
            </div>
            <div id="chevron">hello</div>
            <div className="links">
                <div className="close-left-panel-btn" onClick={e => setOpenLeftPanel(false)}>Close panel</div>
                <Link className="link" id="first-link" to="/podcast-appearances" onClick={e => setOpenLeftPanel(false)}>Podcast appearances</Link>
                <Link className="link" to="/twitter" onClick={e => setOpenLeftPanel(false)}>Harris Tweets</Link>
                <Link className="link" to="/instagram" onClick={e => setOpenLeftPanel(false)}>Harris Instagram Posts</Link>
                <Link className="link" to="/youtube" onClick={e => setOpenLeftPanel(false)}>Harris on Youtube</Link>
                <Link className="link" to="/foam-corner" onClick={e => setOpenLeftPanel(false)}>Foam Corner</Link>
                <Link className="link" to="/tributes" onClick={e => setOpenLeftPanel(false)}>Tributes to Harris</Link>
                <Link className="link" id="about" to="/about" onClick={e => setOpenLeftPanel(false)}>About</Link>
                <Link className="link" id="contact" to="/contact" onClick={e => setOpenLeftPanel(false)}>Contact</Link>
                <Link className="link" id="search" to="/search" onClick={e => setOpenLeftPanel(false)}>Search</Link>
            </div>
            <div className="wiki-wrapper">
                <RightPanel />
            </div>
        </LeftPanelStyles>
    )
}
