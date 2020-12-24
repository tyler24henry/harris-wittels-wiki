import React, { useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { sortByDate } from '../utils/dateHelpers';
import { Disqus } from 'gatsby-plugin-disqus';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';

const PodcastAppearancesStyles = styled.div`
    .podcast-appearances-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image {
            width: 100%;
            height: 200px;
            @media (max-width: 414px) {
                height: 150px;
                overflow: hidden;
            }
            img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                object-position: 0 100%;
                @media (max-width: 414px) {
                    height: 200px;
                    object-position: 0 -50px;
                }
            }
        }
        .page-into-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                position: relative;
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 1rem;
                @media (max-width: 414px) {
                    grid-template-columns: auto 1fr;
                }
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
                    background-color: var(--black);
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
        .list-of-appearances-wrapper {
            padding-top: 4rem;
            @media (max-width: 414px) {
                margin-top: 0;
            }
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
    }
`;

export const PodcastAppearances = ({ siteImages, appearances }) => {
    const [podcastAvatar] = siteImages.filter(image => image.name === 'Harris Last Farts Ep');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let appearancesSorted = sortByDate([...appearances]);

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/podcast-appearances`,
        identifier: 'harrisWittelsWikiPodcastAppearancesPage',
        title: 'Podcast Appearances',
    }

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        appearancesSorted = [...appearancesSorted].filter(appearance => {
            const match = regex.test(appearance.podcastTitle.toLowerCase()) || regex.test(appearance.episodeTitle.toLowerCase()) || regex.test(appearance.host.toLowerCase());
            return match;
        });
    }

    return (
        <PodcastAppearancesStyles>
            <div className="podcast-appearances-wrapper">
                <div className="background-image"><img src="https://res.cloudinary.com/tyler24henry/image/upload/v1608143465/itsgooditsfunky_jofv73.jpg" alt="Podcast art" /></div>
                <div className="page-into-wrapper">
                    <div className="avatar-following-grid">
                        <Img className="podcast-avatar" fluid={podcastAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="podcast appearances" />
                        <button id="following-btn" type="button">Podcastin'</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Podcast Appearances</h2>
                    </div>
                    <p id="bio">"How’s it going everybody? This is Harris Wittels. I’ll be your tour guide through the cosmos today, sorry." - Harris Wittels, episode 1 of Analyze Phish</p>
                </div>
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
                    {appearancesSorted.length === 0 && (
                        <div className="no-content-wrapper" style={{ gridColumn: '1 / span 4'}}>
                            <p>No podcast appearances found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="disqus-wrapper">
                <Disqus config={disqusConfig} />
            </div>
        </PodcastAppearancesStyles>
    )
}
