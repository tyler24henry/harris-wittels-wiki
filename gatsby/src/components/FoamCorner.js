import React, { useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight } from 'react-icons/fi';
import { Disqus } from 'gatsby-plugin-disqus';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';

export const FoamJokesStyles = styled.div`
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
    #first-foam {
        border-top: none;
    }
`;

export const FoamCorner = ({ siteImages, allFoam }) => {
    const [foamAvatar] = siteImages.filter(image => image.name === 'Foam Corner Avatar');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/foam-corner`,
        identifier: 'harrisWittelsWikiFoamCornerPage',
        title: 'Foam Corner',
    }

    let allFoamFiltered = [...allFoam];

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        allFoamFiltered = [...allFoamFiltered].filter(foam => {
            const match = regex.test(foam.content.toLowerCase());
            return match;
        });
    }

    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image-wrapper">
                    <p>Wheat Thins? Call me when they're Wheat THICKS? Gimme that wheat!</p>
                </div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={foamAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="foam corner jokes" />
                        <button className="phrase-btn" id="foamin" type="button">Foamin'</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h2>Harris's Foam Corner</h2>
                    </div>
                    <p id="description">“We’ve never had an edition of Harris’s Foam Corner where you didn’t have at least eight terrible ones.” - Scott Aukerman</p>
                    <p id="description">"Okay, here it goes..." - Harris Wittels</p>
                </div>
                <div className="mid-page-nav">
                    <div className="nav-header" id="foam-nav-header">
                        <p>Foam</p>
                    </div>
                    <div id="link-wrapper">
                        <a href="https://www.youtube.com/playlist?list=PLBB4729D88A16451A" target="_blank">Foam Corner Youtube Playlist</a>
                        <FiChevronRight className="link-icon" />
                    </div>
                </div>
                <FoamJokesStyles>
                    {allFoamFiltered.map((foam, index) => (
                        <p className="foam-joke" id={index === 0 ? 'first-foam' : ''}>{foam.content}</p>
                    ))}
                    {allFoamFiltered.length === 0 && (
                        <div className="no-content-wrapper">
                            <p>No foam corner jokes found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                        </div>
                    )}
                </FoamJokesStyles>
            </div>
            <div className="disqus-wrapper">
                <Disqus config={disqusConfig} />
            </div>
        </BodyStyles>
    )
}
