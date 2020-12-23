import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import ReactPlayer from 'react-player/lazy';
import smoothscroll from 'smoothscroll-polyfill';
import { ShareBanner } from './ShareBanner';

const BitsStyles = styled.div`
    .page-wrapper {
        position: relative;
        margin: -5rem auto 2rem auto;
        width: 600px;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image-wrapper {
            width: calc(100% - 2px);
            height: 200px;
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            overflow: hidden;
            border: 1px solid #c4cfd7;
            border-bottom: none;
            @media (max-width: 414px) {
                height: 150px;
            }
            .background-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                @media (max-width: 414px) {
                    height: 150px;
                }
            }
        }
        .foam-corner-wrapper {
            padding: 0 1.5rem 4rem 1.5rem;
            border: 1px solid #c4cfd7;
            border-top: none;
            .avatar-following-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .foam-corner-avatar {
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
                    background-color: #f91100;
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
                display: grid;
                grid-template-columns: auto 1fr;
                justify-items: center;
                align-items: center;
                gap: 0.2rem;
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
        .bits-wrapper {
            border: 1px solid #c4cfd7;
            border-top: none;
            padding-bottom: 5rem;
            .now-playing-wrapper {
                padding-top: 2rem;
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
    }
`;

export const Youtube = ({ siteImages, bits }) => {
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [bitsAvatar] = siteImages.filter(image => image.name === 'Bits Avatar');
    const [bitsBackground] = siteImages.filter(image => image.name === 'Bits Background');

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    const selectedVideo = bits[selectedVideoIndex];

    const scrollToTop = () => {
        // document.body.scrollTop = document.documentElement.scrollTop = 430;
        document.querySelector('#bio').scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <BitsStyles>
            <div className="page-wrapper">
                <ShareBanner title="Harris Wittels Wiki - Youtube Videos" url="https://www.harriswittels.wiki/youtube" />
                <div className="background-image-wrapper">
                    <Img className="background-image" fluid={bitsBackground.image.asset.fluid} alt="Avatar" />
                </div>
                <div className="foam-corner-wrapper">
                    <div className="avatar-following-grid">
                        <Img className="foam-corner-avatar" fluid={bitsAvatar.image.asset.fluid} alt="Avatar" />
                        <button id="following-btn" type="button">Youtubin'</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Bits & Clips From Youtube</h2>
                    </div>
                    <p id="bio">“A lot of people want to do serious stuff with their comedy...but I just think motherfuckers wanna laugh” - Harris Wittels</p>
                </div>
                <div className="bits-wrapper">
                    <div className="now-playing-wrapper">
                        <div className="video-player-wrapper">
                            <ReactPlayer width='100%' url={selectedVideo.youtubeUrl} controls light />
                        </div>
                        <p><span id="now-playing">Now playing:</span> {selectedVideo.title}</p>
                    </div>
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
            </div>
        </BitsStyles>
    )
}
