import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import GeneralContext from './GeneralContext';

import { FacebookShareButton, TwitterShareButton, RedditShareButton, PocketShareButton } from 'react-share';
import { FaGetPocket, FaRedditAlien } from 'react-icons/fa';
import { AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

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
        display: none;
    }
    @media (max-width: 414px) {
        width: 65vw;
        height: 100vh;
        z-index: 1001;
        display: grid;
        grid-template-rows: 60px 1fr;
        border-right: none;
    }
    #chevron {
      position: relative;
      text-align: center;
      padding: 12px;
      margin-bottom: 6px;
      height: 90px;
      width: 175px;
      @media (max-width: 414px) {
            display: none;
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
            display: none;
        }
        .link {
            color: var(--black);
            display: block;
            padding: 0;
            margin: 0;
            text-transform: uppercase;
        }
        #first-name, #last-name {
            font-size: 1.8rem;
        }
    }
    .hamburger-wrapper {
        display: none;
        @media(max-width: 414px){
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 1rem;
            align-items: center;
            height: 60px;
            padding: 0 1rem 0 2rem;
            background: #161616;
        }
        #hamburger-btn {
            padding: 0;
            background: none;
            height: 18px;
            border: none;
            color: var(--white);
            font-size: 1.8rem;
        }
        #harris-wittels {
            justify-self: start;
            font-size: 1.7rem;
            letter-spacing: 1px;
            text-decoration: none;
            color: var(--white);
            &:hover {
                text-decoration: none;
                cursor: pointer;
            }
        }
    }
    .link, .share-wrapper {
        color: var(--black);
        font-size: 1.2rem;
        letter-spacing: 0.1rem;
        padding: 1rem;
        &:hover {
            text-decoration: none;
        }
        @media(max-width: 414px){
            font-size: 1.6rem;
        }
    }
    .links {
        padding: 4rem 0;
        display: grid;
        grid-template-columns: 1fr;
        @media (max-width: 414px) {
            padding: 0.5rem 0 0 0;
            border-right: 2px solid #e2e2e2;
            display: block;
        }
        a {
            border-top: 1px solid #e2e2e2;
            transition: all 0.4s;
            display: block;
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
    .share-wrapper {
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 0 1rem;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 1.5rem;
        align-items: end;
        height: 25px;
        /* @media(max-width: 414px){
            grid-gap: 1rem;
            width: calc(65vw - 2rem);
            margin: 0 auto;
            bottom: auto;
            top: calc(100vh - 88px);
        } */
        @media(max-width: 414px){
            display: none;
        }
        #share {
            position: relative;
            color: var(--black);
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: 0.1rem;
            padding-bottom: 0.45rem;
        }
        .share-icons {
            display: grid;
            grid-template-columns: repeat(4, auto);
            grid-gap: 1.5rem;
            align-items: center;
            font-size: 1.6rem;
            color: var(--black);
            @media(max-width: 414px){
                width: 80%;
                justify-items: end;
            }
        }
    }
`;

export const LeftPanel = () => {
    const [search, setSearch, openLeftPanel, setOpenLeftPanel] = useContext(GeneralContext);
    const url = "https://www.harriswittels.wiki";
    const title = "Harris Wittels Tribute Site";
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const isFanPostsPage = currentUrl ? currentUrl.slice(currentUrl.length - 9) === 'fan-posts' : false;
    
    return (
        <LeftPanelStyles>
            <div className="site-name">
                <Link className="link" id="first-name" to="/" onClick={e => setOpenLeftPanel(false)}>Harris</Link>
                <Link className="link" id="last-name" to="/" onClick={e => setOpenLeftPanel(false)}>Wittels</Link>
            </div>
            <div id="chevron"></div>
            <div className="hamburger-wrapper">
                <button type="button" id="hamburger-btn" onClick={e => setOpenLeftPanel(false)}><GiHamburgerMenu /></button>
                <Link to="/" id="harris-wittels" onClick={e => setOpenLeftPanel(false)}>Harris Wittels</Link>
            </div>
            <div className="links">
                <Link className="link" id="first-link" to="/" onClick={e => setOpenLeftPanel(false)}>Home</Link>
                <Link className="link" to="/podcast-appearances" onClick={e => setOpenLeftPanel(false)}>Podcast Appearances</Link>
                <Link className="link" to="/twitter" onClick={e => setOpenLeftPanel(false)}>Tweets</Link>
                <Link className="link" to="/instagram" onClick={e => setOpenLeftPanel(false)}>Instagram Posts</Link>
                <Link className="link" to="/videos" onClick={e => setOpenLeftPanel(false)}>Videos</Link>
                <Link className="link" to="/foam-corner" onClick={e => setOpenLeftPanel(false)}>Foam Corner</Link>
                <Link className="link" to="/tributes" onClick={e => setOpenLeftPanel(false)}>Tributes</Link>
                {!isFanPostsPage && (
                    <Link className="link" to="/fan-posts" onClick={e => setOpenLeftPanel(false)}>Fan Posts</Link>
                )}
                <Link className="link" to="/create-fan-post" onClick={e => setOpenLeftPanel(false)}>Create Post</Link>
                <Link className="link" id="about" to="/about" onClick={e => setOpenLeftPanel(false)}>About</Link>
                <Link className="link" id="contact" to="/contact" onClick={e => setOpenLeftPanel(false)}>Contact</Link>
                <Link className="link" id="search" to="/search" onClick={e => setOpenLeftPanel(false)}>Search</Link>
            </div>
            <div className="share-wrapper">
                <p id="share">Share</p>
                <div className="share-icons">
                    <TwitterShareButton
                        url={url}
                        title={title}
                        className="share-button"
                    >
                        <AiOutlineTwitter id="twitter" />
                    </TwitterShareButton>
                    <FacebookShareButton
                        url={url}
                        title={title}
                        className="share-button"
                    >
                        <AiFillFacebook />
                    </FacebookShareButton>
                    <RedditShareButton
                        url={url}
                        title={title}
                        className="share-button"
                    >
                        <FaRedditAlien />
                    </RedditShareButton>
                    <PocketShareButton
                        url={url}
                        title={title}
                        className="share-button"
                    >
                        <FaGetPocket id="pocket" />
                    </PocketShareButton>
                </div>
            </div>
        </LeftPanelStyles>
    )
}
