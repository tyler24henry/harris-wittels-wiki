import React, { useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { AiFillCaretRight } from 'react-icons/ai';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';

export const TributesStyles = styled.div`
    .tribute {
        padding: 1.2rem 1.5rem;
        border-top: 1px solid #c4cfd7;
        font-size: 1.5rem;
        color: var(--black);
        font-weight: 500;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 0.8rem;
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
`;

export const Tributes = ({ tributesAvatar, tributes }) => {
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);

    let tributesFiltered = [...tributes];

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        tributesFiltered = [...tributesFiltered].filter(item => {
            const match = regex.test(item.title.toLowerCase());
            return match;
        });
    }

    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image">
                    <img id="tributes-background" src="https://res.cloudinary.com/tyler24henry/image/upload/v1608259230/weloveyouharris_evmdk0.jpg" alt="Background banner" />
                </div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={tributesAvatar.image.asset.fluid} alt="Avatar" />
                        <SearchSection section="tributes" />
                        <button className="phrase-btn" id="missin" type="button">Missin'</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h1>Tributes to Harris</h1>
                    </div>
                    <div className="soundcloud-embed-wrapper">
                        <iframe id="soundcloud-player" style={{border: 'none', height: '130px', width: '100%'}} scrolling="no" allow="autoplay" 
                            src="https://w.soundcloud.com/player/?url=https://soundcloud.com/gabriel-mariani-3/harris">
                        </iframe>
                    </div>
                </div>
                <div className="mid-page-nav">
                    <div className="nav-header" id="tributes-nav-header">
                        <p>Tributes</p>
                    </div>
                </div>
                <TributesStyles>
                    {tributesFiltered.map((tribute, index) => (
                        <div className="tribute" id={index === 0 ? 'first-tribute' : ''} key={tribute.id}>
                            <AiFillCaretRight className="caret" />
                            <a href={tribute.link} target="_blank">{tribute.title}</a>
                        </div>
                    ))}
                    {tributesFiltered.length === 0 && (
                        <div className="no-content-wrapper">
                            <p>No tributes found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                        </div>
                    )}
                </TributesStyles>
            </div>
        </BodyStyles>
    )
}
