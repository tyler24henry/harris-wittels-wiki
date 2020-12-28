import React, { useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';

export const PodcastAppearancesListStyles = styled.div`
    margin-top: 4rem;
    @media (max-width: 414px) {
        margin-top: 2.5rem;
    }
    &#search-page {
        margin: 0;
    }
    .header, .podcast {
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
    .header {
        padding: 0.7rem 1rem 0.6rem 1rem;
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
                font-size: 1.1rem;
            }
        }
    }
`;

export const PodcastAppearances = ({ siteImages, appearances }) => {
    const [podcastAvatar] = siteImages.filter(image => image.name === 'Harris Last Farts Ep');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let appearancesSorted = sortByDate([...appearances]);

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
                    <div className="header">
                        <p>Podcast</p>
                        <p>Episode title</p>
                        <p>Host(s)</p>
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
