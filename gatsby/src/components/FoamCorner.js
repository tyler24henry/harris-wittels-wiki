import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight } from 'react-icons/fi';

const FoamCornerStyles = styled.div`
    .page-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        .background-image-wrapper {
            width: calc(100% - 6rem);
            height: calc(200px - 6rem);
            padding: 3rem;
            background-color: #25231d;
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            text-align: center;
            p {
                font-size: 2rem;
                font-weight: 500;
                letter-spacing: 0.5px;
                color: var(--white);
            }
        }
        .foam-corner-wrapper {
            padding: 0 1.5rem;
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
                }
                #following-btn {
                    margin-top: 1rem;
                    justify-self: end;
                    height: 39px;
                    width: 102px;
                    background-color: #25231d;
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
                }
                .verified {
                    font-size: 19px;
                    color: #25231d;
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
        .foam-nav {
            margin-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            .foam {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid #25231d;
                p {
                    color: #25231d;
                    font-size: 1.6rem;
                    font-weight: 600;
                }
            }
            #youtube-link-wrapper {
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
        .foam-jokes {
            .foam-joke {
                padding: 1.2rem 1.5rem;
                border-top: 1px solid #c4cfd7;
                font-size: 1.5rem;
                color: var(--black);
                font-weight: 500;
                white-space: pre-wrap;
            }
        }
        #first-foam {
            border-top: none;
        }
    }
`;

export const FoamCorner = ({ siteImages, allFoam }) => {
    const [foamAvatar] = siteImages.filter(image => image.name === 'Foam Corner Avatar');
    return (
        <FoamCornerStyles>
            <div className="page-wrapper">
                <div className="background-image-wrapper">
                    <p>Wheat Thins? Call me when they're Wheat THICKS? Gimme that wheat!</p>
                </div>
                <div className="foam-corner-wrapper">
                    <div className="avatar-following-grid">
                        <Img className="foam-corner-avatar" fluid={foamAvatar.image.asset.fluid} alt="Avatar" />
                        <button id="following-btn" type="button">Foamin'</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Harris's Foam Corner</h2>
                    </div>
                    <p id="bio">“We’ve never had an edition of Harris’s Foam Corner where you didn’t have at least eight terrible ones.” - Scott Aukerman</p>
                    <p id="bio">"Okay, here it goes..." - Harris Wittels</p>
                </div>
                <div className="foam-nav">
                    <div className="foam">
                        <p>Foam</p>
                    </div>
                    <div id="youtube-link-wrapper">
                        <a href="https://www.youtube.com/playlist?list=PLBB4729D88A16451A" target="_blank">Foam Corner Youtube Playlist</a>
                        <FiChevronRight className="right-chevron" />
                    </div>
                </div>
                <div className="foam-jokes">
                    {allFoam.map((foam, index) => (
                        <p className="foam-joke" id={index === 0 ? 'first-foam' : ''}>{foam.content}</p>
                    ))}
                </div>
            </div>
        </FoamCornerStyles>
    )
}
