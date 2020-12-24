import React, { useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { AiFillCaretRight } from 'react-icons/ai';
import { Disqus } from 'gatsby-plugin-disqus';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';

const TributesStyles = styled.div`
    .page-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image-wrapper {
            width: 100%;
            height: 200px;
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            @media (max-width: 414px) {
                height: 150px;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: 0 61%;
                @media (max-width: 414px) {
                    object-position: 0 66%;
                }
            }
        }
        .foam-corner-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                position: relative;
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 1rem;
                @media (max-width: 414px) {
                    grid-template-columns: auto 1fr;
                }
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
                    background-color: #000000;
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
            .soundcloud-embed-wrapper {
                margin-top: 2.5rem;
                width: 100%;
                height: 130px;
                @media (max-width: 414px) {
                    height: 115px;
                }
            }
        }
        .foam-nav {
            padding-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            @media (max-width: 414px) {
                padding-top: 3.5rem;
            }
            .foam {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid #000000;
                @media (max-width: 414px) {
                    width: 110px;
                    height: 34px;
                }
                p {
                    color: #000000;
                    font-size: 1.6rem;
                    font-weight: 600;
                    @media (max-width: 414px) {
                        font-size: 1.3rem;
                    }
                }
            }
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
`;

export const Tributes = ({ siteImages, tributes }) => {
    const [tributesAvatar] = siteImages.filter(image => image.name === 'Tribute Avatar');
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/tributes`,
        identifier: 'harrisWittelsWikiTributesPage',
        title: 'Tributes',
    }

    let tributesFiltered = [...tributes];

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        tributesFiltered = [...tributesFiltered].filter(item => {
            const match = regex.test(item.title.toLowerCase());
            return match;
        });
    }

    return (
        <TributesStyles>
            <div className="page-wrapper">
                <div className="background-image-wrapper">
                    <img src="https://res.cloudinary.com/tyler24henry/image/upload/v1608259230/weloveyouharris_evmdk0.jpg" alt="Background banner" />
                </div>
                <div className="foam-corner-wrapper">
                    <div className="avatar-following-grid">
                        <Img className="foam-corner-avatar" fluid={tributesAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="tributes" />
                        <button id="following-btn" type="button">Missin'</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Tributes to Harris</h2>
                    </div>
                    <div className="soundcloud-embed-wrapper">
                        <iframe id="soundcloud-player" style={{border: 'none', height: '130px', width: '100%'}} scrolling="no" allow="autoplay" 
                            src="https://w.soundcloud.com/player/?url=https://soundcloud.com/gabriel-mariani-3/harris">
                        </iframe>
                    </div>
                </div>
                <div className="foam-nav">
                    <div className="foam">
                        <p>Tributes</p>
                    </div>
                </div>
                <div className="tributes">
                    {tributesFiltered.map((tribute, index) => (
                        <div className="tribute" id={index === 0 ? 'first-tribute' : ''}>
                            <AiFillCaretRight className="caret" />
                            <a href={tribute.link} target="_blank">{tribute.title}</a>
                        </div>
                    ))}
                    {tributesFiltered.length === 0 && (
                        <div className="no-content-wrapper">
                            <p>No tributes found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="disqus-wrapper">
                <Disqus config={disqusConfig} />
            </div>
        </TributesStyles>
    )
}
