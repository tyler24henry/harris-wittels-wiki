import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import ReactPlayer from 'react-player/lazy';
import smoothscroll from 'smoothscroll-polyfill';
import { Disqus } from 'gatsby-plugin-disqus';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';

export const VideosStyles = styled.div`
    .now-playing-wrapper {
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
            filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
            transition: filter .25s ease-in-out;
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
                filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
                transition: filter .25s ease-in-out;
                &:hover {
                    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, .3));
                }
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
`;

export const Youtube = ({ siteImages, bits }) => {
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [bitsAvatar] = siteImages.filter(image => image.name === 'Bits Avatar');
    const [bitsBackground] = siteImages.filter(image => image.name === 'Bits Background');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    const scrollToTop = () => {
        // document.body.scrollTop = document.documentElement.scrollTop = 430;
        document.querySelector('#description').scrollIntoView({ behavior: 'smooth' });
    }

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/youtube`,
        identifier: 'harrisWittelsWikiYoutubePage',
        title: 'Videos',
    }

    let bitsFiltered = [...bits];

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        bitsFiltered = [...bitsFiltered].filter(item => {
            const match = regex.test(item.title.toLowerCase());
            return match;
        });
    }

    const selectedVideo = bitsFiltered.length > 0 && bitsFiltered[selectedVideoIndex];

    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image">
                    <Img className="youtube-background" fluid={bitsBackground.image.asset.fluid} alt="Avatar" />
                </div>
                <div className="page-details-wrapper" id="youtube-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={bitsAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="videos" />
                        <button className="phrase-btn" id="watchin" type="button">Watchin'</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h2>Videos</h2>
                    </div>
                    <p id="description">“A lot of people want to do serious stuff with their comedy...but I just think motherfuckers wanna laugh” - Harris Wittels</p>
                </div>
                <VideosStyles>
                    {bitsFiltered.length > 0 && (
                        <div className="now-playing-wrapper">
                            <div className="video-player-wrapper">
                                <ReactPlayer width='100%' url={selectedVideo.youtubeUrl} controls light />
                            </div>
                            <p><span id="now-playing">Now playing:</span> {selectedVideo.title}</p>
                        </div>
                    )}
                    <div className="thumbnails-wrapper" style={{ marginTop: bitsFiltered.length === 0 && '0', padding: bitsFiltered.length === 0 && '0'}}>
                        {bitsFiltered.map((bit, index) => {
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
                        {bitsFiltered.length === 0 && (
                            <div className="no-content-wrapper" style={{ gridColumn: '1 / span 3' }}>
                                <p>No videos found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                            </div>
                        )}
                    </div>
                </VideosStyles>
            </div>
            <div className="disqus-wrapper">
                <Disqus config={disqusConfig} />
            </div>
        </BodyStyles>
    )
}
