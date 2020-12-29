import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export const PodcastAppearancesListStyles = styled.div`
    margin-top: 4rem;
    @media (max-width: 414px) {
        margin-top: 2.5rem;
    }
    &#search-page {
        margin: 0;
    }
    .header-wrapper, .podcast {
        display: grid;
        grid-template-columns: 2.5fr 3fr 2.5fr 1.4fr;
        grid-gap: 0.5rem;
        align-items: center;
        padding: 0.5rem 1rem;
        background: #e2e2e2;
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
    .header-wrapper {
        padding: 0.7rem 1rem 0.6rem 1rem;
        .header-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 1rem;
            align-items: center;
            @media (max-width: 414px) {
                grid-gap: 0.4rem;
            }
            p {
                text-transform: uppercase;
                font-weight: 600;
                font-size: 1.1rem;
                letter-spacing: 0.5px;
                &:hover {
                    cursor: pointer;
                    color: #4682fc;
                }
                @media (max-width: 414px) {
                    font-size: 0.9rem;
                    padding-top: 0.2rem;
                }
            }
            .chevron-up, .chevron-down {
                background: #4682fc;
                color: var(--white);
                font-size: 1.4rem;
                border-radius: 3px;
                &:hover {
                    cursor: pointer;
                }
                @media (max-width: 414px) {
                    font-size: 1.1rem;
                }
            }
        }
    }
    .podcast {
        border-top: 1px solid #f7f7f7;
        background: none;
        color: var(--black);
        transition: all 0.5s;
        &:hover {
            background: #f7f7f7;
            text-decoration: none;
        }
        p {
            font-weight: 400;
            @media (max-width: 414px) {
                font-size: 1rem;
            }
        }
    }
`;

export const PodcastAppearances = ({ siteImages, appearances }) => {
    const [podcastAvatar] = siteImages.filter(image => image.name === 'Harris Last Farts Ep');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);
    const [sortBy, setSortBy] = useState('date');
    const [descending, setDescending] = useState(true);

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

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        appearancesSorted = [...appearancesSorted].filter(appearance => {
            const match = regex.test(appearance.podcastTitle.toLowerCase()) || regex.test(appearance.episodeTitle.toLowerCase()) || regex.test(appearance.host.toLowerCase());
            return match;
        });
    }

    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image"><img src="https://res.cloudinary.com/tyler24henry/image/upload/v1608143465/itsgooditsfunky_jofv73.jpg" alt="Podcast art" /></div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={podcastAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="podcast appearances" />
                        <button className="phrase-btn" id="podcastin" type="button">Podcastin'</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h1>Podcast Appearances</h1>
                    </div>
                    <p id="description">"How’s it going everybody? This is Harris Wittels. I’ll be your tour guide through the cosmos today, sorry." - Harris Wittels, episode 1 of Analyze Phish</p>
                </div>
                <PodcastAppearancesListStyles>
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
                    {appearancesSorted.length === 0 && (
                        <div className="no-content-wrapper" style={{ gridColumn: '1 / span 4'}}>
                            <p>No podcast appearances found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                        </div>
                    )}
                </PodcastAppearancesListStyles>
            </div>
        </BodyStyles>
    )
}
