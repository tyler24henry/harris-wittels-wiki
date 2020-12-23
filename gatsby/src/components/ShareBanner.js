import React from 'react';
import { FacebookShareButton, TwitterShareButton, RedditShareButton, EmailShareButton, PocketShareButton } from 'react-share';
import { FiTwitter, FiFacebook, FiMail, FiPocket } from 'react-icons/fi';
import { ImReddit } from 'react-icons/im';
import styled from 'styled-components';

const ShareBannerStyles = styled.div`
    z-index: 9;
    position: sticky;
    left: 0;
    top: calc(100vh - 6rem);
    width: ${props => props.homePage ? `calc(100% + 3.1px)` : `100%`};
    @media(max-width: 414px) {
        top: calc(100vh - 5rem);
        width: ${props => props.homePage ? `calc(100% - 2px)` : `100%`};
    }
    .share-wrapper {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        align-items: center;
        font-size: 2rem;
        color: var(--white);
        justify-items: center;
        height: 50px;
        #share {
            font-size: 1.3rem;
            font-weight: 500;
            color: var(--white);
            letter-spacing: 1px;
            background: #a3a3a3;
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
        }
        button {
            box-shadow: none;
            padding: 0;
            border: none;
            width: 100%;
            height: 100%;
            border-radius: 0;
        }
        #twitter {
            padding-top: 0.5rem;
            font-size: 1.7rem;
        }
        #facebook {
            padding-top: 0.3rem;
        }
        #reddit {
            padding-top: 0.1rem;
        }
        #mail, #pocket {
            padding-top: 0.3rem;
        }
        #mail, #pocket {
            font-size: 1.9rem;
        }
    }
`;

export const ShareBanner = ({ title, url, homePage, homePageDidMount }) => {
    return (
        <ShareBannerStyles homePage={homePage} style={{ opacity: homePage && !homePageDidMount ? '0' : '1'}}>
            <div className="share-wrapper">
                <div id="share">Share</div>
                <TwitterShareButton
                    url={url}
                    title={title}
                    className="share-button"
                    style={{ backgroundColor: '#6cccff'}}
                >
                    <FiTwitter id="twitter" />
                </TwitterShareButton>
                <FacebookShareButton
                    url={url}
                    title={title}
                    className="share-button"
                    style={{ backgroundColor: '#6c94f6'}}
                >
                    <FiFacebook id="facebook" />
                </FacebookShareButton>
                <RedditShareButton
                    url={url}
                    title={title}
                    className="share-button"
                    style={{ backgroundColor: '#FF4500'}}
                >
                    <ImReddit id="reddit" />
                </RedditShareButton>
                <EmailShareButton
                    url={url}
                    title={title}
                    className="share-button"
                    style={{ backgroundColor: '#BB001B'}}
                >
                    <FiMail id="mail" />
                </EmailShareButton>
                <PocketShareButton
                    url={url}
                    title={title}
                    className="share-button"
                    style={{ backgroundColor: '#f73153'}}
                >
                    <FiPocket id="pocket" />
                </PocketShareButton>
            </div>
        </ShareBannerStyles>
    )
}
