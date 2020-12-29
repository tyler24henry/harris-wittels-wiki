import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { GoVerified } from 'react-icons/go';
import { FaRetweet } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { FiChevronRight, FiChevronLeft, FiChevronUp, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import { AiFillCaretRight } from 'react-icons/ai';
import smoothscroll from 'smoothscroll-polyfill';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "@reach/router";
import { slugify } from '../utils/slugify';
import { useClickOutside } from '../utils/useClickOutside';
import { BodyStyles } from '../styles/BodyStyles';
import { TweetsWrapper } from './Twitter';
import { PodcastAppearancesListStyles } from './PodcastAppearances';
import { ImagesWrapperStyles } from './Instagram';
import { VideosStyles } from './Videos';
import { TributesStyles } from './Tributes';
import { FoamJokesStyles } from './FoamCorner';
import { ImageModalWrapperStyles } from '../styles/ImageModalWrapper';
import { useIsChrome } from '../utils/useIsChrome';

const SearchPageWrapper = styled.div`
    .categories-nav {
        margin-top: 2rem;
        border-bottom: 1px solid #c4cfd7;
        .categories {
            display: grid;
            grid-template-columns: repeat(6, auto);
            @media(max-width: 600px){
                grid-template-columns: repeat(3, auto);
            }
            @media (max-width: 414px) {
                justify-items: center;
            }
            .category {
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                text-align: center;
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
    }
`;

export const Search = ({ siteImages, appearances, tweets, harrisImages, bits, allFoam, tributes, searchTerm }) => {
    const [selected, setSelected] = useState('Podcast Appearances');
    const [searchAvatar] = siteImages.filter(image => image.name === 'Search Avatar');
    const [harrisAvatar] = siteImages.filter(image => image.name === 'Harris Twitter Avatar');
    const [instagramAvatar] = siteImages.filter(image => image.name === 'Instagram Avatar');
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [searchPage, setSearchPage] = useState('');
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const { clickedOutside, setClickedOutside } = useClickOutside(wrapperRef);
    const { isChrome } = useIsChrome();
    const [sortBy, setSortBy] = useState('date');
    const [descending, setDescending] = useState(true);

    useEffect(() => {
        if(clickedOutside){
            setSelectedImageIndex(null);
        }
    }, [clickedOutside]);

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
            navigate(`/search/?s=${slugify(searchPage)}`);
            setSearchPage('');
            searchRef.current.blur();
        }
    }

    const sortAlphabetically = (arr, key) => {
        const sortedArr = arr.sort((a, b) => {
            const aKey = a[key].toLowerCase();
            const bKey = b[key].toLowerCase();
            if(aKey < bKey){
                return -1;
            } else if(aKey > bKey){
                return 1;
            } else {
                return 0;
            }
        });
        return sortedArr;
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

    let appearancesSorted = [];
    if(sortBy === 'date' && descending){
        appearancesSorted = sortByDate([...appearances]);
    } else if(sortBy === 'date' && !descending){
        appearancesSorted = sortByDate([...appearances]).reverse();
    } else if(sortBy === 'podcast' && descending){
        appearancesSorted = sortAlphabetically([...appearances], 'podcastTitle');
    } else if(sortBy === 'podcast' && !descending){
        appearancesSorted = sortAlphabetically([...appearances], 'podcastTitle').reverse();
    } else if(sortBy === 'episode' && descending){
        appearancesSorted = sortAlphabetically([...appearances], 'episodeTitle');
    } else if(sortBy === 'episode' && !descending){
        appearancesSorted = sortAlphabetically([...appearances], 'episodeTitle').reverse();
    } else if(sortBy === 'host' && descending){
        appearancesSorted = sortAlphabetically([...appearances], 'host');
    } else if(sortBy === 'host' && !descending){
        appearancesSorted = sortAlphabetically([...appearances], 'host').reverse();
    } 


    const tweetsByDate = sortByDate([...tweets]);

    let searchTermStr = searchTerm ? searchTerm.split('-').join(' ') : '';
    if(searchTermStr.length > 30){
        searchTermStr = `${searchTermStr.slice(0,30)}...`;
    }

    return (
        <>
            <BodyStyles>
                <div className="page-wrapper" id={selectedImageIndex !== null ? 'background' : ''}>
                    <div className="background-image" id="search-background">
                        <div className="search-wrapper">
                            <FaSearch className="search-icon" />
                            <input type="text" ref={searchRef} className="search" autoComplete="off" placeholder="Search" name="search" value={searchPage} onChange={e => setSearchPage(e.target.value)} onKeyDown={e => isEnterPressed(e)} />
                        </div>
                    </div>
                    <div className="page-details-wrapper">
                        <div className="avatar-search-phrase-grid">
                            <Img className="avatar" fluid={searchAvatar.image.asset.fluid} alt="Avatar" />
                            <button className="phrase-btn" id="searchin" type="button">Searchin'</button>
                        </div>
                        <div id="page-title-wrapper">
                            <h1>{searchTerm ? `${totalNumberResults} result${totalNumberResults === 1 ? '' : 's'} found for search term "${searchTermStr}"` : `Search this site`}</h1>
                        </div>
                    </div>
                    <SearchPageWrapper>
                        <div className="categories-nav">
                            <div className="categories">
                                <div className="category" id={selected === 'Podcast Appearances' ? 'selected' : ''} onClick={e => setSelected('Podcast Appearances')}>
                                    <p>Pods <span>({appearances.length})</span></p>
                                </div>
                                <div className="category" id={selected === 'Tweets' ? 'selected' : ''} onClick={e => setSelected('Tweets')}>
                                    <p>Tweets <span>({tweets.length})</span></p>
                                </div>
                                <div className="category" id={selected === 'Instagram' ? 'selected' : ''} onClick={e => setSelected('Instagram')}>
                                    <p>Grams <span>({harrisImages.length})</span></p>
                                </div>
                                <div className="category" id={selected === 'Videos' ? 'selected' : ''} onClick={e => setSelected('Videos')}>
                                    <p>Vids <span>({bits.length})</span></p>
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
                                <PodcastAppearancesListStyles id="search-page">
                                    <div className="header-wrapper">
                                        <div className="header-grid"
                                            onClick={e => {
                                                if(sortBy === 'podcast'){
                                                    setDescending(!descending);
                                                } else {
                                                    setDescending(false);
                                                    setSortBy('podcast');
                                                }
                                            }}
                                        >
                                            <p>Podcast</p>
                                            {sortBy === 'podcast' && descending && (
                                                <FiChevronUp className="chevron-up" />
                                            )}
                                            {sortBy === 'podcast' && !descending && (
                                                <FiChevronDown className="chevron-down" />
                                            )}
                                        </div>
                                        <div className="header-grid"
                                            onClick={e => {
                                                if(sortBy === 'episode'){
                                                    setDescending(!descending);
                                                } else {
                                                    setDescending(false);
                                                    setSortBy('episode');
                                                }
                                            }}
                                        >
                                            <p>Episode</p>
                                            {sortBy === 'episode' && descending && (
                                                <FiChevronUp className="chevron-up" />
                                            )}
                                            {sortBy === 'episode' && !descending && (
                                                <FiChevronDown className="chevron-down" />
                                            )}
                                        </div>
                                        <div className="header-grid"
                                            onClick={e => {
                                                if(sortBy === 'host'){
                                                    setDescending(!descending);
                                                } else {
                                                    setDescending(false);
                                                    setSortBy('host');
                                                }
                                            }}
                                        >
                                            <p>Host(s)</p>
                                            {sortBy === 'host' && descending && (
                                                <FiChevronUp className="chevron-up" />
                                            )}
                                            {sortBy === 'host' && !descending && (
                                                <FiChevronDown className="chevron-down" />
                                            )}
                                        </div>
                                        <div className="header-grid"
                                            onClick={e => {
                                                if(sortBy === 'date'){
                                                    setDescending(!descending);
                                                } else {
                                                    setDescending(true);
                                                    setSortBy('date');
                                                }
                                            }}
                                        >
                                            <p>Date</p>
                                            {sortBy === 'date' && descending && (
                                                <FiChevronUp className="chevron-up" />
                                            )}
                                            {sortBy === 'date' && !descending && (
                                                <FiChevronDown className="chevron-down" />
                                            )}
                                        </div>
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
                                </PodcastAppearancesListStyles>
                            )}
                            {selected === 'Podcast Appearances' && appearances.length === 0 && (
                                <div className="no-content-wrapper">
                                    <p>No podcast appearances found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                                </div>
                            )}
                            {selected === 'Tweets' && tweets.length > 0 && (
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
                                </TweetsWrapper>
                            )}
                            {selected === 'Tweets' && tweets.length === 0 && (
                                <div className="no-content-wrapper">
                                    <p>No tweets found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                                </div>
                            )}
                            {selected === 'Instagram' && harrisImages.length > 0 && (
                                <ImagesWrapperStyles>
                                    {harrisImagesSorted.map((harrisImage, index) => {
                                        return (
                                            <div className="image-wrapper" key={harrisImage.id}
                                                onClick={e => {
                                                    setClickedOutside(false);
                                                    setSelectedImageIndex(index);
                                                }}
                                            >
                                                <Img className="image" fluid={harrisImage.image.asset.fluid} alt="From Instagram" />
                                            </div>
                                        )
                                    })}
                                </ImagesWrapperStyles>
                            )}
                            {selected === 'Instagram' && harrisImages.length === 0 && (
                                <div className="no-content-wrapper">
                                    <p>No instagrams found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                                </div>
                            )}
                            {selected === 'Videos' && bits.length > 0 && (
                                <VideosStyles id="search-page">
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
                                </VideosStyles>
                            )}
                            {selected === 'Videos' && bits.length === 0 && (
                                <div className="no-content-wrapper">
                                    <p>No videos found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                                </div>
                            )}
                            {selected === 'Foam Corner' && allFoam.length > 0 && (
                                <FoamJokesStyles>
                                    {allFoam.map((foam, index) => (
                                        <p className="foam-joke" id={index === 0 ? 'first-foam' : ''}>{foam.content}</p>
                                    ))}
                                </FoamJokesStyles>
                            )}
                            {selected === 'Foam Corner' && allFoam.length === 0 && (
                                <div className="no-content-wrapper">
                                    <p>No foam corner jokes found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                                </div>
                            )}
                            {selected === 'Tributes' && tributes.length > 0 && (
                                <TributesStyles>
                                    {tributes.map((tribute, index) => (
                                        <div className="tribute" id={index === 0 ? 'first-tribute' : ''}>
                                            <AiFillCaretRight className="caret" />
                                            <a href={tribute.link} target="_blank">{tribute.title}</a>
                                        </div>
                                    ))}
                                </TributesStyles>
                            )}
                            {selected === 'Tributes' && tributes.length === 0 && (
                                <div className="no-content-wrapper">
                                    <p>No tributes found{searchTerm ? ` for search term "${searchTermStr}"` : ''}</p>
                                </div>
                            )}
                        </div>
                    </SearchPageWrapper>
                </div>
            </BodyStyles>
            {selectedImageIndex !== null && (
                <ImageModalWrapperStyles className="instagram-wrapper" id={isChrome ? 'non-safari' : 'safari'}>
                    <div className="modal" ref={wrapperRef}>
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
                            <div className="date-link-wrapper">
                                <p id="date">{selectedImage.month} {selectedImage.day}, {selectedImage.year}</p>
                                <div id="link-wrapper">
                                    <a href={selectedImage.link} title="Link to original Instagram post" target="_blank">Original link</a>
                                    <FiChevronRight className="link-icon" />
                                </div>
                            </div>
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
