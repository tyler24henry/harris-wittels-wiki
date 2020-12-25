import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { sortByDate } from '../utils/dateHelpers';
import { useClickOutside } from '../utils/useClickOutside';
import { Disqus } from 'gatsby-plugin-disqus';
import { SearchSection } from './SearchSection';
import GeneralContext from './GeneralContext';
import { BodyStyles } from '../styles/BodyStyles';
import { ImageModalWrapperStyles } from '../styles/ImageModalWrapper';
import { useIsChrome } from '../utils/useIsChrome';

export const ImagesWrapperStyles = styled.div`
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    justify-items: center;
    @media (max-width: 414px) {
        padding: 1.5rem;
        gap: 1.5rem;
    }
    .image-wrapper {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
        transition: filter .25s ease-in-out;
        &:hover {
            cursor: pointer;
            filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, .3));
        }
        .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    #empty {
        padding: 0;
        justify-items: start;
    }
`;

export const Instagram = ({ instagramAvatar, images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const wrapperRef = useRef(null);
    const { clickedOutside, setClickedOutside } = useClickOutside(wrapperRef);
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);
    const { isChrome } = useIsChrome();

    useEffect(() => {
        if(clickedOutside){
            setSelectedImageIndex(null);
        }
    }, [clickedOutside]);
    
    let harrisImagesSorted = sortByDate([...images]);

    if(searchSection){
        const regex = new RegExp(searchSection.toLowerCase());
        harrisImagesSorted = [...harrisImagesSorted].filter(item => {
            const match = item.caption && regex.test(item.caption?.toLowerCase());
            return match;
        });
    }

    let selectedImage;
    if(images && selectedImageIndex !== null){
        selectedImage = [...harrisImagesSorted][selectedImageIndex];
    }
    const isPrevIndex = selectedImageIndex > 0;
    const isNextIndex = selectedImageIndex + 1 < harrisImagesSorted.length;

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/instagram`,
        identifier: 'harrisWittelsWikiInstagramPage',
        title: 'Instagram Posts',
    }

    return (
        <>
            <BodyStyles>
                <div className="page-wrapper" id={selectedImageIndex !== null ? 'background' : ''}>
                    <div className="background-image" id="instagram-background"></div>
                    <div className="page-details-wrapper">
                        <div className="avatar-search-phrase-grid">
                            <Img className="avatar" fluid={instagramAvatar.image.asset.fluid} alt="Avatar" />
                            <SearchSection section="instagram posts" />
                            <button className="phrase-btn" id="grammin" type="button">Grammin'</button>
                        </div>
                        <div id="page-title-wrapper">
                            <h2>harris wittels</h2>
                        </div>
                        <p id="handle">@twittels</p>
                        <div className="followers-wrapper">
                            <div className="item">
                                <p id="number">153</p>
                                <p>Posts</p>
                            </div>
                            <div className="item">
                                <p id="number">12.7K</p>
                                <p>Followers</p>
                            </div>
                            <div className="item">
                                <p id="number">386</p>
                                <p>Following</p>
                            </div>
                        </div>
                    </div>
                    <div className="mid-page-nav">
                        <div className="nav-header" id="instagram-nav-header">
                            <p>Posts</p>
                        </div>
                        <div id="link-wrapper">
                            <a href="https://www.instagram.com/twittels/" target="_blank">Harris's Instagram</a>
                            <FiChevronRight className="link-icon" />
                        </div>
                    </div>
                    <ImagesWrapperStyles id={harrisImagesSorted.length === 0 ? 'empty' : ''}>
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
                        {harrisImagesSorted.length === 0 && (
                            <div className="no-content-wrapper" style={{ gridColumn: '1 / span 2'}}>
                                <p>No Instagram posts found{searchSection ? ` for search term "${searchSection}"` : ''}</p>
                            </div>
                        )}
                    </ImagesWrapperStyles>
                </div>
                <div className="disqus-wrapper">
                    <Disqus config={disqusConfig} />
                </div>
            </BodyStyles>
            {selectedImageIndex !== null && (
                <ImageModalWrapperStyles id={isChrome ? 'non-safari' : 'safari'}>
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
