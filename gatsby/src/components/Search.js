import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { GoVerified } from 'react-icons/go';
import { FaRetweet } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { AiFillCaretRight } from 'react-icons/ai';
import smoothscroll from 'smoothscroll-polyfill';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "@reach/router";
import { slugify } from '../utils/slugify';

const PodcastAppearancesStyles = styled.div`
    .podcast-appearances-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            background-color: var(--black);
            width: 100%;
            height: 200px;
            @media (max-width: 414px) {
                height: 150px;
            }
            .search-wrapper {
                z-index: 10;
                position: relative;
                width: 80%;
                margin: 0 auto;
                padding-bottom: 3rem;
                .search-icon {
                    position: absolute;
                    left: 1px;
                    top: 4.5px;
                    font-size: 1.1rem;
                    color: var(--white);
                }
                .search {
                    padding: 0.1rem 0 0.2rem 2.5rem;
                    background: none;
                    border: none;
                    border-bottom: 1px solid var(--white);
                    width: calc(100% - 2.5rem);
                    font-size: 1.5rem;
                    font-weight: 500;
                    letter-spacing: 0.1rem;
                    color: var(--white);
                    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                        color: var(--white);
                        opacity: 1; /* Firefox */
                    }

                    :-ms-input-placeholder { /* Internet Explorer 10-11 */
                        color: var(--white);
                    }

                    ::-ms-input-placeholder { /* Microsoft Edge */
                        color: var(--white);
                    }
                }
            }
        }
        .page-into-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .podcast-avatar {
                    margin-top: -72px;
                    height: 134px;
                    width: 134px;
                    border-radius: 50%;
                    border: 5px solid var(--white);
                    @media (max-width: 414px) {
                        margin-top: -55px;
                        height: 105px;
                        width: 105px;
                    }
                }
                #following-btn {
                    margin-top: 1rem;
                    justify-self: end;
                    height: 39px;
                    width: 102px;
                    background-color:var(--black);;
                    color: var(--white);
                    border-radius: 9999px;
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    pointer-events: none;
                    cursor: default;
                    @media (max-width: 414px) {
                        height: 32px;
                        width: 88px;
                        font-size: 1.3rem;
                    }
                }
            }
            #name-wrapper {
                width: auto;
                margin-top: 0.5rem;
                line-height: 1.3125;
                h2 {
                    font-size: 19px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    @media (max-width: 414px) {
                        font-size: 1.5rem;
                    }
                }
            }
            #bio {
                margin-top: 1rem;
                font-size: 1.5rem;
                @media (max-width: 414px) {
                    font-size: 1.3rem;
                }
            }
        }
        .categories-nav {
            margin-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            .categories {
                display: grid;
                grid-template-columns: auto auto auto auto auto auto;
                @media (max-width: 414px) {
                    grid-template-columns: repeat(3, 1fr);
                    justify-items: center;
                }
                .category {
                    display: grid;
                    grid-template-columns: 1fr;
                    justify-items: center;
                    align-items: center;
                    height: 30px;
                    border-bottom: 2px solid var(--white);
                    &:hover {
                        cursor: pointer;
                        border-bottom: 2px solid var(--black);
                    }
                    @media (max-width: 414px) {
                        height: 23px;
                    }
                    p {
                        color: var(--black);;
                        font-size: 1.4rem;
                        font-weight: 600;
                        @media (max-width: 414px) {
                            font-size: 1rem;
                            text-align: center;
                        }
                        span {
                            font-weight: 500;
                        }
                    }
                }
                #selected {
                    border-bottom: 2px solid var(--black);
                }
            }
        }
        .results-wrapper {
            .no-content-wrapper {
                p {
                    padding: 1.2rem 1.5rem;
                    font-size: 1.5rem;
                    color: var(--black);
                    font-weight: 500;
                    @media (max-width: 414px) {
                        padding: 1rem 1.25rem;
                        font-size: 1.2rem;
                    }
                }
            }
            .list-of-appearances-wrapper {
                .header, .podcast {
                    display: grid;
                    grid-template-columns: 2.5fr 3fr 2.5fr 1.4fr;
                    gap: 0.5rem;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    background: #c4cfd7;
                    @media (max-width: 414px) {
                        padding: 0.3rem 0.6rem;
                    }
                    p {
                        font-size: 1.2rem;
                        @media (max-width: 414px) {
                            font-size: 1rem;
                        }
                    }
                }
                .header {
                    padding: 0.6rem 1rem 0.4rem 1rem;
                    p {
                        text-transform: uppercase;
                        font-weight: 600;
                        font-size: 1.1rem;
                        letter-spacing: 0.5px;
                        @media (max-width: 414px) {
                            font-size: 0.9rem;
                        }
                    }
                }
                .podcast {
                    border-top: 1px solid #c4cfd7;
                    background: none;
                    color: var(--black);
                    transition: all 0.5s;
                    &:hover {
                        background: #c4cfd7;
                        text-decoration: none;
                    }
                    p {
                        font-weight: 400;
                        @media (max-width: 414px) {
                            font-size: 1.1rem;
                        }
                    }
                }
            }
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
            .images-wrapper {
                padding: 2rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                align-items: center;
                justify-items: center;
                @media (max-width: 414px) {
                    padding: 1.5rem;
                    gap: 1.5rem;
                }
                .image-wrapper {
                    width: 100%;
                    height: 100%;
                    &:hover {
                        cursor: pointer;
                    }
                    .image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .bits-wrapper {
                .now-playing-wrapper {
                    margin-top: 2rem;
                    p {
                        padding: 1rem 3rem 1rem 3rem;
                        color: var(--black);
                        font-size: 1.6rem;
                    }
                    #now-playing {
                        font-weight: 600;
                    }
                    .video-player-wrapper {
                        margin: 0 2rem;
                        border: 1px solid #8c8c8c;
                        display: grid;
                        grid-template-columns: 1fr;
                        align-items: center;
                        justify-items: center;
                        width: calc(100% - 4.2rem);
                        border-radius: 10px;
                        overflow: hidden;
                    }
                }
                .thumbnails-wrapper {
                    margin-top: 2.5rem;
                    padding: 1.5rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 1.5rem;
                    @media (max-width: 414px) {
                        grid-template-columns: 1fr 1fr;
                        gap: 1rem;
                    }
                    .thumbnail-wrapper {
                        width: 180px;
                        @media (max-width: 414px) {
                            width: 100%;
                        }
                        &:hover {
                            cursor: pointer;
                        }
                        .image-wrapper {
                            background:  var(--black);
                            display: grid;
                            grid-template-columns: 1fr;
                            justify-items: center;
                            align-items: center;
                            .thumbnail {
                                width: 100%;
                                height: 110px;
                                object-fit: contain;
                                @media (max-width: 414px) {
                                    height: 85px;
                                }
                            }
                        }
                        .title {
                            margin-top: 0.5rem;
                            padding: 0 0.2rem;
                            font-size: 1.2rem;
                            font-weight: 600;
                            letter-spacing: 0;
                            text-align: center;
                        }
                    }
                }
            }
            .foam-jokes {
                .foam-joke {
                    padding: 1.2rem 1.5rem;
                    border-top: 1px solid #c4cfd7;
                    font-size: 1.5rem;
                    color: var(--black);
                    font-weight: 500;
                    white-space: pre-wrap;
                    @media (max-width: 414px) {
                        padding: 1rem 1.25rem;
                        font-size: 1.2rem;
                    }
                }
            }
            #first-foam {
                border-top: none;
            }
            .tributes {
                .tribute {
                    padding: 1.2rem 1.5rem;
                    border-top: 1px solid #c4cfd7;
                    font-size: 1.5rem;
                    color: var(--black);
                    font-weight: 500;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 0.8rem;
                    align-items: center;
                    @media (max-width: 414px) {
                        padding: 1rem 1.25rem;
                        font-size: 1.2rem;
                    }
                    .caret {
                        font-size: 1.2rem;
                        @media (max-width: 414px) {
                            font-size: 1rem;
                        }
                    }
                    a {
                        color: var(--black); 
                    }
                }
                #first-tribute {
                    border-top: none;
                }
            }
        }
    }
    #background {
        pointer-events: none;
        filter: blur(2px);
    }
`;

const ImageModalWrapperStyles = styled.div`
    z-index: 700;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    @media (max-width: 414px) {
        width: 100vw;
    }
    .modal {
        position: relative;
        width: 600px;
        height: calc(100% - 2rem);
        background: #f8f7f8;
        padding: 0 2rem 2rem 2rem;
        @media (max-width: 414px) {
            width: calc(100vw - 4rem);
            height: calc(100vw + 4rem);
            overflow-y: scroll;
        }   
        .modal-header {
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 1rem;
            align-items: center;
            width: calc(600px - 10rem);
            padding: 1rem;
            margin: 0 auto;
            @media (max-width: 414px) {
                width: calc(100vw - 5.5rem);
            } 
            #exit-btn {
                justify-self: end;
                width: 25px;
                background: none;
                border: none;
                color: #919191;
                font-size: 3rem;
            }
            .instagram-avatar {
                height: 35px;
                width: 35px;
                border-radius: 50%;
            }
            p {
                font-size: 1.4rem;
                font-weight: 600;
                color: var(--black);
            }
        }
        .modal-image {
            margin: 0 auto;
            width: 500px;
            height: 500px;
            object-fit: cover;
            @media (max-width: 414px) {
                width: calc(100vw - 4rem);
                height: calc(100vw - 10rem);
            } 
        }
        .sub-image-wrapper {
            #caption {
                font-size: 1.4rem;
                color: var(--black);
                width: calc(500px - 1rem);
                margin: 0 auto;
                margin-top: 1rem;
                @media (max-width: 414px) {
                    width: calc(90vw - 1rem);
                    margin: 1rem 0 0 0;
                }
                span {
                    padding-right: 0.3rem;
                    font-weight: 600;
                }
            }
            #date {
                font-size: 1.2rem;
                font-weight: 500;
                color: #919191;
                width: calc(500px - 1rem);
                margin: 0 auto;
                margin-top: 1rem;
                @media (max-width: 414px) {
                    width: calc(90vw - 1rem);
                    margin: 1rem 0 0 0;
                }
            }
        }
        button {
            background: none;
            border: none;
            &[disabled]{
                pointer-events: none;
                opacity: 0;
            }
        }
        .chevron-left, .chevron-right {
            position: absolute;
            top: 270px;
            color: #919191;
            font-size: 4rem;
            @media (max-width: 414px) {
                top: 50vw;
                font-size: 3rem;
                background: #4C516D;
                border-radius: 50%;
                color: var(--white);
                font-size: 2.8rem;
                padding: 0.4rem 0.3rem 0.4rem 0.2rem;
                opacity: 0.9;
            } 
        }
        .chevron-left {
            left: 15px;
            @media (max-width: 414px) {
                left: 2px;
            }
        }
        .chevron-right {
            right: 15px;
            @media (max-width: 414px) {
                right: 2px;
                padding: 0.4rem 0.25rem;
            }
        }
    }
    #background-tint {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: -1;
        opacity: 0.5;
    }
`;

export const Search = ({ siteImages, appearances, tweets, harrisImages, bits, allFoam, tributes, searchTerm }) => {
    const [selected, setSelected] = useState('Podcast Appearances');
    const [searchAvatar] = siteImages.filter(image => image.name === 'Search Avatar');
    const [harrisAvatar] = siteImages.filter(image => image.name === 'Harris Twitter Avatar');
    const [instagramAvatar] = siteImages.filter(image => image.name === 'Instagram Avatar');
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [search, setSearch] = useState('');
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const totalNumberResults = appearances.length + tweets.length + harrisImages.length + bits.length + allFoam.length + tributes.length;

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    const scrollToTop = () => {
        // document.body.scrollTop = document.documentElement.scrollTop = 430;
        document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
    }

    const isEnterPressed = e => {
        if(e.keyCode === 13){
            navigate(`/search/?s=${slugify(search)}`);
            setSearch('');
            searchRef.current.blur();
        }
    }

    let harrisImagesSorted = sortByDate([...harrisImages]);

    const selectedVideo = bits[selectedVideoIndex];

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    let selectedImage;
    if(harrisImages && selectedImageIndex !== null){
        selectedImage = [...harrisImagesSorted][selectedImageIndex];
    }
    const isPrevIndex = selectedImageIndex > 0;
    const isNextIndex = selectedImageIndex + 1 < harrisImages.length;

    const appearancesSorted = sortByDate([...appearances]);
    const tweetsByDate = sortByDate([...tweets]);

    let searchTermStr = searchTerm ? searchTerm.split('-').join(' ') : '';
    if(searchTermStr.length > 30){
        searchTermStr = `${searchTermStr.slice(0,30)}...`;
    }

    return (
        <>
            <PodcastAppearancesStyles>
                <div className="podcast-appearances-wrapper" id={selectedImageIndex !== null ? 'background' : ''}>
                    <div className="background-image">
                        <div className="search-wrapper">
                            <FaSearch className="search-icon" />
                            <input type="text" ref={searchRef} className="search" autoComplete="off" placeholder="Search" name="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => isEnterPressed(e)} />
                        </div>
                    </div>
                    <div className="page-into-wrapper">
                        <div className="avatar-following-grid">
                            <Img className="podcast-avatar" fluid={searchAvatar.image.asset.fluid} alt="Avatar" />
                            <button id="following-btn" type="button">Searchin'</button>
                        </div>
                        <div id="name-wrapper">
                            <h2>{searchTerm ? `${totalNumberResults} result${totalNumberResults === 1 ? '' : 's'} found for search term "${searchTermStr}"` : `Search this site`}</h2>
                        </div>
                    </div>
                    <div className="categories-nav">
                        <div className="categories">
                            <div className="category" id={selected === 'Podcast Appearances' ? 'selected' : ''} onClick={e => setSelected('Podcast Appearances')}>
                                <p>Podcast apps <span>({appearances.length})</span></p>
                            </div>
                            <div className="category" id={selected === 'Tweets' ? 'selected' : ''} onClick={e => setSelected('Tweets')}>
                                <p>Tweets <span>({tweets.length})</span></p>
                            </div>
                            <div className="category" id={selected === 'Instagram' ? 'selected' : ''} onClick={e => setSelected('Instagram')}>
                                <p>Grams <span>({harrisImages.length})</span></p>
                            </div>
                            <div className="category" id={selected === 'Youtube' ? 'selected' : ''} onClick={e => setSelected('Youtube')}>
                                <p>Youtube vids <span>({bits.length})</span></p>
                            </div>
                            <div className="category" id={selected === 'Foam Corner' ? 'selected' : ''} onClick={e => setSelected('Foam Corner')}>
                                <p>Foams <span>({allFoam.length})</span></p>
                            </div>
                            <div className="category" id={selected === 'Tributes' ? 'selected' : ''} onClick={e => setSelected('Tributes')}>
                                <p>Tributes <span>({tributes.length})</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="results-wrapper">
                        {selected === 'Podcast Appearances' && appearances.length > 0 && (
                            <div className="list-of-appearances-wrapper">
                                <div className="header">
                                    <p>Podcast</p>
                                    <p>Episode title</p>
                                    <p>Host</p>
                                    <p>Date</p>
                                </div>
                                {appearancesSorted.map(appearance => {
                                    const dateStr = `${appearance.month} ${appearance.day}, ${appearance.year}`;
                                    return (
                                        <a className="podcast" key={appearances.id} href={appearance.link} target="_blank" key={appearance.id}>
                                            <p>{appearance.podcastTitle}</p>
                                            <p>{appearance.episodeTitle}</p>
                                            <p>{appearance.host}</p>
                                            <p>{dateStr}</p>
                                        </a>
                                    )
                                })}
                            </div>
                        )}
                        {selected === 'Podcast Appearances' && appearances.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No podcast appearances found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                            </div>
                        )}
                        {selected === 'Tweets' && tweets.length > 0 && (
                            <>
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
                            </>
                        )}
                        {selected === 'Tweets' && tweets.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No tweets found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                            </div>
                        )}
                        {selected === 'Instagram' && harrisImages.length > 0 && (
                            <div className="images-wrapper">
                                {harrisImagesSorted.map((harrisImage, index) => {
                                    return (
                                        <div className="image-wrapper" key={harrisImage.id} onClick={e => setSelectedImageIndex(index)}>
                                            <Img className="image" fluid={harrisImage.image.asset.fluid} alt="From Instagram" />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {selected === 'Instagram' && harrisImages.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No instagrams found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                            </div>
                        )}
                        {selected === 'Youtube' && bits.length > 0 && (
                            <div className="bits-wrapper">
                                {selectedVideo && (
                                    <div className="now-playing-wrapper">
                                        <div className="video-player-wrapper">
                                            <ReactPlayer width='100%' url={selectedVideo.youtubeUrl} controls light />
                                        </div>
                                        <p><span id="now-playing">Now playing:</span> {selectedVideo.title}</p>
                                    </div>
                                )}
                                <div className="thumbnails-wrapper">
                                    {bits.map((bit, index) => {
                                        return (
                                            <div className="thumbnail-wrapper" key={bit.id}
                                                 onClick={e => {
                                                    setSelectedVideoIndex(index);
                                                    scrollToTop();
                                                }}
                                            >
                                                <div className="image-wrapper">
                                                    <Img className="thumbnail" fluid={bit.thumbnail.asset.fluid} alt="Thumbnail" />
                                                </div>
                                                <p className="title">{bit.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        {selected === 'Youtube' && bits.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No youtube videos found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                            </div>
                        )}
                        {selected === 'Foam Corner' && allFoam.length > 0 && (
                            <div className="foam-jokes">
                                {allFoam.map((foam, index) => (
                                    <p className="foam-joke" id={index === 0 ? 'first-foam' : ''}>{foam.content}</p>
                                ))}
                            </div>
                        )}
                        {selected === 'Foam Corner' && allFoam.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No foam corner jokes found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                            </div>
                        )}
                        {selected === 'Tributes' && tributes.length > 0 && (
                            <div className="tributes">
                                {tributes.map((tribute, index) => (
                                    <div className="tribute" id={index === 0 ? 'first-tribute' : ''}>
                                        <AiFillCaretRight className="caret" />
                                        <a href={tribute.link} target="_blank">{tribute.title}</a>
                                    </div>
                                ))}
                            </div>
                        )}
                        {selected === 'Tributes' && tributes.length === 0 && (
                            <div className="no-content-wrapper">
                                <p>No tributes found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                            </div>
                        )}
                    </div>
                </div>
            </PodcastAppearancesStyles>
            {selectedImageIndex !== null && (
                <ImageModalWrapperStyles>
                    <div className="modal">
                        <div className="modal-header">
                            <Img className="instagram-avatar" fluid={instagramAvatar.image.asset.fluid} alt="Avatar" />
                            <p>twittels</p>
                            <button type="button" id="exit-btn" onClick={e => setSelectedImageIndex(null)}>&times;</button>
                        </div>
                        <Img className="modal-image" fluid={selectedImage.image.asset.fluid} alt="From Instagram" />
                        <div className="sub-image-wrapper">
                            {selectedImage.caption && (
                                <p id="caption"><span>twittels</span> {selectedImage.caption}</p>
                            )}
                            <p id="date">{selectedImage.month} {selectedImage.day}, {selectedImage.year}</p>
                        </div>
                        <button type="button" disabled={!isPrevIndex} onClick={e => setSelectedImageIndex(selectedImageIndex - 1)}><FiChevronLeft className="chevron-left" /></button>
                        <button type="button" disabled={!isNextIndex} onClick={e => setSelectedImageIndex(selectedImageIndex + 1)}><FiChevronRight className="chevron-right" /></button>
                    </div>
                    <div id="background-tint"></div>
                </ImageModalWrapperStyles>
            )}
        </>
    )
}
