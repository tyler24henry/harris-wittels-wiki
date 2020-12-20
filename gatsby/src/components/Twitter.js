import React from 'react';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';
import { GoVerified } from 'react-icons/go';
import { FaRetweet } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { FiChevronRight } from 'react-icons/fi';

const TwittelsStyles = styled.div`
    .twittels-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        .background-image {
            background-color: rgb(29, 161, 242);
            width: 100%;
            height: 200px;
        }
        .twitter-bio-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .twitter-avatar {
                    margin-top: -72px;
                    height: 134px;
                    width: 134px;
                    border-radius: 50%;
                    border: 5px solid var(--white);
                }
                #following-btn {
                    margin-top: 1rem;
                    justify-self: end;
                    height: 39px;
                    width: 102px;
                    background-color: rgb(29, 161, 242);
                    color: var(--white);
                    border-radius: 9999px;
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    pointer-events: none;
                    cursor: default;
                }
            }
            #name-wrapper {
                width: 150px;
                margin-top: 0.5rem;
                line-height: 1.3125;
                display: grid;
                grid-template-columns: auto 1fr;
                justify-items: center;
                align-items: center;
                gap: 0.2rem;
                h2 {
                    font-size: 19px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }
                .verified {
                    font-size: 19px;
                    color: rgb(29, 161, 242);
                }
            }
            #handle {
                color: #5B7083;
                font-size: 1.5rem;
                font-weight: 500;
                letter-spacing: 0;
            }
            #bio {
                margin-top: 1rem;
                font-size: 1.5rem;
            }
            #joined-wrapper {
                color: #5B7083;
                margin-top: 1rem;
                font-size: 1.5rem;
                font-weight: 500;
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .calendar {
                    font-size: 1.7rem;
                }
                p {
                    padding-top: 0.1rem;
                }
            }
            .followers-wrapper {
                margin-top: 1rem;
                display: flex;
                gap: 1.5rem;
                .item {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                    p {
                        color: #5B7083;
                        font-size: 1.5rem;
                    }
                    #number {
                        font-weight: 600;
                        color: var(--black);
                    }
                }
            }
        }
        .tweets-nav {
            margin-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            .tweets {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid rgba(29,161,242,1.00);
                p {
                    color: rgba(29,161,242,1.00);
                    font-size: 1.6rem;
                    font-weight: 600;
                }
            }
            #link-wrapper {
                justify-self: end;
                padding-right: 0.5rem;
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 0.8rem;
                align-items: center;
                font-size: 1.2rem;
                font-weight: 600;
                .right-chevron {
                    font-size: 1.3rem;
                    padding-bottom: 0.25rem;
                }
            }
        }
        .tweet-wrapper {
            padding: 1.2rem 1.5rem;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1.5rem;
            border-top: 1px solid #c4cfd7;
            .retweet {
                justify-self: end;
                margin-top: 0.2rem;
            }
            .retweet, #retweet-message {
                font-size: 1.4rem;
                color: #5b7082;
                font-weight: 500;
                margin-bottom: -0.9rem;
            }
            .avatar {
                width: 49px;
                height: 49px;
                border-radius: 50%;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.09);
            }
            .tweet {
                .tweet-details {
                    display: flex;
                    font-size: 1.5rem;
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
                    }
                    #details {
                        color: #5B7083;
                        font-weight: 500;
                    }
                    #bullet {
                        font-weight: 300;
                        font-size: 1rem;
                        opacity: 0.6;
                    }
                }
                #replying-to {
                    margin-top: 0.5rem;
                    color: #5B7083;
                    span {
                        color: rgb(29, 161, 242);
                    }
                }
                #content {
                    margin-top: 0.5rem;
                    color: var(--black);
                }
                .media-wrapper {
                    margin-top: 1rem;
                    max-width: 506px;
                    max-height: 285px;
                    border-radius: 10px;
                    overflow: hidden;
                    .image, .video-player {
                        max-width: 506px;
                        max-height: 285px;
                        object-fit: cover;
                    }
                }
            }
        }
        #first-tweet {
            border-top: none;
        }
    }
`;

export const Twitter = ({ tweets, harrisAvatar }) => {
    const tweetsByDate = sortByDate([...tweets]);
    return (
        <TwittelsStyles>
            <div className="twittels-wrapper">
                <div className="background-image"></div>
                <div className="twitter-bio-wrapper">
                    <div className="avatar-following-grid">
                    <Img className="twitter-avatar" fluid={harrisAvatar.image.asset.fluid} alt="Avatar" />
                        <button id="following-btn" type="button">Tweetin'</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Harris Wittels</h2>
                        <GoVerified className="verified" />
                    </div>
                    <p id="handle">@twittels</p>
                    <p id="bio">i love chillin, hangin out, havin fun and just fuckin chillin</p>
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
                <div className="tweets-nav">
                    <div className="tweets">
                        <p>Tweets</p>
                    </div>
                    <div id="link-wrapper">
                        <a href="https://twitter.com/twittels" target="_blank">Harris's Twitter</a>
                        <FiChevronRight className="right-chevron" />
                    </div>
                </div>
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
                                </div>
                                {tweet.replyingTo && (
                                    <p id="replying-to">Replying to <span>@{tweet.replyingTo}</span></p>
                                )}
                                <p id="content">{tweet.content}</p>
                                <div className="media-wrapper">
                                    {tweet.image && (
                                        <Img className="image" fluid={tweet.image.asset.fluid} alt="Image" />
                                    )}
                                    {tweet.youtubeUrl && (
                                        <ReactPlayer style={{ maxWidth: '506px', maxHeight: '285px'}} url={tweet.youtubeUrl} controls light />
                                    )}
                                </div>
                            </div>  
                        </div>
                    )
                })}
            </div>
        </TwittelsStyles>
    )
}
