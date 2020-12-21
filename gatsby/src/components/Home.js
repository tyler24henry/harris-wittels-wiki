import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const HomeStyles = styled.div`
    .masonry-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
    }
    #background {
        pointer-events: none;
        filter: blur(2px);
    }
    .masonry {
        columns: 3;
        column-gap: 10px;
    }
    .masonry-item {
        display: inline-block;
        vertical-align: top;
        margin-bottom: 10px;
    }
    .masonry-item, .masonry-content {
        border-radius: 4px;
        overflow: hidden;
    }
    .masonry-item {
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
        transition: filter .25s ease-in-out;
    }
    .masonry-item:hover {
        filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, .3));
    }
    .masonry-content {
        width: 193.33px;
        height: auto;
    }
    #image-wrapper {
        &:hover {
            cursor: pointer;
        }
    }
    #text {
        background: var(--black);
        color: var(--white);
        font-size: 1.5rem;
        font-weight: 500;
        padding: 1rem;
        text-align: center;
        width: calc(100% - 2rem);
        .masonry-content {
            width: 100%;
        }
    }
`;

const ImageModalWrapperStyles = styled.div`
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    .modal {
        position: relative;
        width: 600px;
        height: 100vh;
        background: #f8f7f8;
        padding: 2rem 2rem 6rem 2rem;
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        .modal-header {
            display: grid;
            grid-template-columns: 1fr;
            align-items: center;
            width: calc(500px - 2rem);
            padding: 1rem 1rem 0 1rem;
            margin: 0 auto;
            #exit-btn {
                justify-self: end;
                width: 25px;
                background: none;
                border: none;
                color: #919191;
                font-size: 2.5rem;
            }
        }
        .modal-image {
            width: 500px;
            object-fit: cover;
        }
        button {
            background: none;
            border: none;
            &[disabled]{
                pointer-events: none;
                opacity: 0;
            }
        }
        .chevron-left, .chevron-right {
            position: absolute;
            top: 310px;
            color: #919191;
            font-size: 4rem;
        }
        .chevron-left {
            left: 15px;
        }
        .chevron-right {
            right: 15px;
        }
    }
    #background-tint {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: -1;
        opacity: 0.5;
    }
`;

export const Home = ({ masonryItems }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    let imagesOnly = [...masonryItems.filter(item => item.quote === null)];

    let selectedImage;
    if(imagesOnly && selectedImageIndex !== null){
        selectedImage = [...imagesOnly][selectedImageIndex];
    }
    const isPrevIndex = selectedImageIndex > 0;
    const isNextIndex = selectedImageIndex + 1 < imagesOnly.length;
    return (
        <>
            <HomeStyles>
                <div className="masonry-wrapper" id={selectedImageIndex !== null ? 'background' : ''}>
                    <div className="masonry">
                        {masonryItems.map(item => {
                            return (
                                <div className="masonry-item" key={item.id} id={item.quote ? 'text' : ''}>
                                    {!item.quote && (
                                        <div className="masonry-content" id="image-wrapper"
                                            onClick={e => {
                                                const index = [...imagesOnly].findIndex(image => image.id === item.id);
                                                setSelectedImageIndex(index);
                                            }}
                                        >
                                            <Img fluid={item.image.asset.fluid} alt="Harris Wittels" />
                                        </div>
                                    )}
                                    {item.quote && (
                                        <div className="masonry-content">{item.quote}</div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </HomeStyles>
            {selectedImageIndex !== null && (
                <ImageModalWrapperStyles>
                    <div className="modal">
                        <div className="modal-header">
                            <button id="exit-btn" type="button" onClick={e => setSelectedImageIndex(null)}>&times;</button>
                        </div>
                        <Img className="modal-image" fluid={selectedImage.image.asset.fluid} alt="From Instagram" />
                        <button type="button" disabled={!isPrevIndex} onClick={e => setSelectedImageIndex(selectedImageIndex - 1)}><FiChevronLeft className="chevron-left" /></button>
                        <button type="button" disabled={!isNextIndex} onClick={e => setSelectedImageIndex(selectedImageIndex + 1)}><FiChevronRight className="chevron-right" /></button>
                    </div>
                    <div id="background-tint"></div>
                </ImageModalWrapperStyles>
            )}
        </>
    )  
}
