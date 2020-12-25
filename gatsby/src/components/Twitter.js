import React, { useContext } from 'react';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';
import { GoVerified } from 'react-icons/go';
import { FaRetweet } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { Disqus } from 'gatsby-plugin-disqus';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';

export const TweetsWrapper = styled.div`
    .tweet-wrapper {
        padding: 1.2rem 1.5rem;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1.5rem;
        border-top: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            padding: 1rem;
        }
        .retweet {
            justify-self: end;
            margin-top: 0.2rem;
        }
        .retweet, #retweet-message {
            font-size: 1.4rem;
            color: #5b7082;
            font-weight: 500;
            margin-bottom: -0.9rem;
            @media (max-width: 414px) {
                font-size: 1.2rem;
            }
        }
        .avatar {
            width: 49px;
            height: 49px;
            border-radius: 50%;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.09);
            @media (max-width: 414px) {
                width: 40px;
                height: 40px;
            }
        }
        .tweet {
            width: 100%;
            overflow: hidden;
            .tweet-details {
                position: relative;
                width: 100%;
                display: flex;
                font-size: 1.5rem;
                flex-wrap: wrap;
                @media (max-width: 414px) {
                    font-size: 1.1rem;
                }
                #handle, #retweet-name {
                    font-weight: 600;
                    color: var(--black);
                }
                #retweet-name {
                    margin-right: 0.7rem;
                }
                .verified {
                    color: rgba(29,161,242,1.00);
                    margin: 0 0.7rem 0 0.3rem;
                    @media (max-width: 414px) {
                        margin: 0 0.4rem 0 0.3rem;
                    }
                }
                #details {
                    color: #5B7083;
                    font-weight: 500;
                }
                #bullet {
                    font-weight: 300;
                    font-size: 1rem;
                    opacity: 0.6;
                    @media (max-width: 414px) {
                        font-size: 0.9rem;
                    }
                }
                .original-link {
                    color: #5B7083;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
            #replying-to {
                margin-top: 0.5rem;
                color: #5B7083;
                @media (max-width: 414px) {
                    font-size: 1.1rem;
                }
                span {
                    color: rgb(29, 161, 242);
                }
            }
            #content {
                margin-top: 0.5rem;
                color: var(--black);
                @media (max-width: 414px) {
                    font-size: 1.2rem;
                }
            }
            .media-wrapper {
                margin-top: 1rem;
                width: 100%;
                max-height: 285px;
                border-radius: 10px;
                overflow: hidden;
                .image, .video-player {
                    width: 100%;
                    max-height: 285px;
                    object-fit: cover;
                }
            }
        }
    }
    #first-tweet {
        border-top: none;
    }
`;

export const Twitter = ({ tweets, harrisAvatar }) => {
    let tweetsByDate = sortByDate([...tweets]);
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/twitter`,
        identifier: 'harrisWittelsWikiTwitterPage',
        title: '@twittels Tweets',
    }

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        tweetsByDate = [...tweetsByDate].filter(item => {
            const match = regex.test(item.content.toLowerCase()) || regex.test(item.replyingTo?.toLowerCase()) || regex.test(item.retweetName?.toLowerCase()) || regex.test(item.retweetHandle?.toLowerCase());
            return match;
        });
    }

    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image" id="twitter-background"></div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={harrisAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="tweets" />
                        <button className="phrase-btn" type="button">Tweetin'</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h2>Harris Wittels</h2>
                        <GoVerified className="verified" />
                    </div>
                    <p id="handle">@twittels</p>
                    <p id="description">i love chillin, hangin out, havin fun and just fuckin chillin</p>
                    <div id="joined-wrapper">
                        <VscCalendar className="calendar" />
                        <p>Joined December 2008</p>
                    </div>
                    <div className="followers-wrapper">
                        <div className="item">
                            <p id="number">1,202</p>
                            <p>Following</p>
                        </div>
                        <div className="item">
                            <p id="number">86.6K</p>
                            <p>Followers</p>
                        </div>
                    </div>
                </div>
                <div className="mid-page-nav">
                    <div className="nav-header">
                        <p>Tweets</p>
                    </div>
                    <div id="link-wrapper">
                        <a href="https://twitter.com/twittels" target="_blank">Harris's Twitter</a>
                        <FiChevronRight className="link-icon" />
                    </div>
                </div>
                <TweetsWrapper>
                    {tweetsByDate.map((tweet, index) => {
                        const date = `${tweet.month} ${tweet.day}, ${tweet.year}`;
                        const name = tweet.isRetweet ? tweet.retweetName : 'Harris Wittels';
                        const handle = tweet.isRetweet ? tweet.retweetHandle : 'twittels';
                        return (
                            <div className="tweet-wrapper" key={tweet.id} id={index === 0 ? 'first-tweet' : ''}>
                                {tweet.isRetweet && (
                                    <>
                                        <FaRetweet className="retweet" />
                                        <p id="retweet-message">Harris Wittels Retweeted</p>
                                    </>
                                )}
                                <Img className="avatar" fluid={tweet.isRetweet ? tweet.retweetAvatar.asset.fluid : harrisAvatar.image.asset.fluid} alt="Avatar" />
                                <div className="tweet">
                                    <div className="tweet-details">
                                        <p id={tweet.isRetweet ? 'retweet-name' : 'handle'}>{name}</p>
                                        {!tweet.isRetweet && (
                                            <GoVerified className="verified" />
                                        )}
                                        <p id="details">@{handle} <span id="bullet">&bull;</span> {date}</p>
                                        <a className="original-link" href={tweet.link} title="Link to original tweet" target="_blank"><FiExternalLink /></a>
                                    </div>
                                    {tweet.replyingTo && (
                                        <p id="replying-to">Replying to <span>@{tweet.replyingTo}</span></p>
                                    )}
                                    <p id="content">{tweet.content}</p>
                                    <div className="media-wrapper">
                                        {tweet.image && (
                                            <Img className="image" width='100%' fluid={tweet.image.asset.fluid} alt="Image" />
                                        )}
                                        {tweet.youtubeUrl && (
                                            <ReactPlayer width="100%" url={tweet.youtubeUrl} controls light />
                                        )}
                                    </div>
                                </div>  
                            </div>
                        )
                    })}
                    {tweetsByDate.length === 0 && (
                        <div className="no-content-wrapper">
                            <p>No tweets found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                        </div>
                    )}
                </TweetsWrapper>
            </div>
            <div className="disqus-wrapper">
                <Disqus config={disqusConfig} />
            </div>
        </BodyStyles>
    )
}
