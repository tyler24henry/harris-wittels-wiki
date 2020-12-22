import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { sortByDate } from '../utils/dateHelpers';

const ImagesStyles = styled.div`
    .images-page-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image {
            background-color: #833AB4;
            width: 100%;
            height: 200px;
            @media (max-width: 414px) {
                height: 150px;
            }
        }
        .instagram-bio-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .instagram-avatar {
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
                    background-color: #833AB4;
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
                width: 150px;
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
            #handle {
                color: #5B7083;
                font-size: 1.5rem;
                font-weight: 500;
                letter-spacing: 0;
                @media (max-width: 414px) {
                    font-size: 1.3rem;
                }
            }
            .followers-wrapper {
                margin-top: 1rem;
                display: flex;
                .item {
                    display: flex;
                    align-items: center;
                    margin-right: 1.5rem;
                    p {
                        color: #5B7083;
                        font-size: 1.5rem;
                        @media (max-width: 414px) {
                            font-size: 1.3rem;
                        }
                    }
                    #number {
                        font-weight: 600;
                        color: var(--black);
                        margin-right: 0.5rem;
                         @media (max-width: 414px) {
                            margin-right: 0.35rem;
                        }
                    }
                }
            }
        }
        .posts-nav {
            margin-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            .posts {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid #833AB4;
                @media (max-width: 414px) {
                    width: 110px;
                    height: 34px;
                }
                p {
                    color: #833AB4;
                    font-size: 1.6rem;
                    font-weight: 600;
                    @media (max-width: 414px) {
                        font-size: 1.3rem;
                    }
                }
            }
            #link-wrapper {
                justify-self: end;
                padding-right: 0.5rem;
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 0.8rem;
                align-items: center;
                font-size: 1.2rem;
                font-weight: 600;
                @media (max-width: 414px) {
                    font-size: 1.1rem;
                }
                .right-chevron {
                    font-size: 1.3rem;
                    padding-bottom: 0.25rem;
                    @media (max-width: 414px) {
                        font-size: 1.2rem;
                        padding-bottom: 0.1rem;
                    }
                }
            }
        }
        .images-wrapper {
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
                &:hover {
                    cursor: pointer;
                }
                .image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    #background {
        pointer-events: none;
        filter: blur(2px);
    }
`;

const ImageModalWrapperStyles = styled.div`
    z-index: 700;
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
    @media (max-width: 414px) {
        width: 100vw;
        height: 100vh;
    }
    .modal {
        position: relative;
        width: 600px;
        height: 100vh;
        background: #f8f7f8;
        padding: 2rem 2rem 6rem 2rem;
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        @media (max-width: 414px) {
            padding: 0 2rem 0 2rem;
            width: calc(100vw - 4rem);
        }
        .modal-header {
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 1rem;
            align-items: center;
            width: calc(500px - 2rem);
            padding: 1rem;
            margin: 0 auto;
            @media (max-width: 414px) {
                width: calc(100vw - 6rem);
                padding: 0 1rem;
            }
            #exit-btn {
                justify-self: end;
                width: 25px;
                background: none;
                border: none;
                color: #919191;
                font-size: 2.5rem;
            }
            .instagram-avatar {
                height: 35px;
                width: 35px;
                border-radius: 50%;
            }
            p {
                font-size: 1.4rem;
                font-weight: 600;
                color: var(--black);
            }
        }
        .modal-image {
            width: 500px;
            height: 500px;
            object-fit: cover;
            @media (max-width: 414px) {
                width: 100%;
                height: 100%;
            }
        }
        .sub-image-wrapper {
            #caption {
                font-size: 1.4rem;
                color: var(--black);
                width: calc(500px - 1rem);
                margin: 0 auto;
                margin-top: 1rem;
                @media (max-width: 414px) {
                    width: calc(90vw - 1rem);
                    margin: 1rem 0 0 0;
                }
                span {
                    padding-right: 0.3rem;
                    font-weight: 600;
                }
            }
            #date {
                font-size: 1.2rem;
                font-weight: 500;
                color: #919191;
                width: calc(500px - 1rem);
                margin: 0 auto;
                margin-top: 1rem;
                @media (max-width: 414px) {
                    width: calc(90vw - 1rem);
                    margin: 1rem 0 0 0;
                }
            }
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
            @media (max-width: 414px) {
                top: 40%;
            }
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

export const Instagram = ({ instagramAvatar, images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    let harrisImagesSorted = sortByDate([...images]);
    let selectedImage;
    if(images && selectedImageIndex !== null){
        selectedImage = [...harrisImagesSorted][selectedImageIndex];
    }
    const isPrevIndex = selectedImageIndex > 0;
    const isNextIndex = selectedImageIndex + 1 < images.length;

    return (
        <>
            <ImagesStyles>
                <div className="images-page-wrapper" id={selectedImageIndex !== null ? 'background' : ''}>
                    <div className="background-image"></div>
                    <div className="instagram-bio-wrapper">
                        <div className="avatar-following-grid">
                            <Img className="instagram-avatar" fluid={instagramAvatar.image.asset.fluid} alt="Avatar" />
                            <button id="following-btn" type="button">Grammin'</button>
                        </div>
                        <div id="name-wrapper">
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
                    <div className="posts-nav">
                        <div className="posts">
                            <p>Posts</p>
                        </div>
                        <div id="link-wrapper">
                            <a href="https://www.instagram.com/twittels/" target="_blank">Harris's Instagram</a>
                            <FiChevronRight className="right-chevron" />
                        </div>
                    </div>
                    <div className="images-wrapper">
                        {harrisImagesSorted.map((harrisImage, index) => {
                            return (
                                <div className="image-wrapper" key={harrisImage.id} onClick={e => setSelectedImageIndex(index)}>
                                    <Img className="image" fluid={harrisImage.image.asset.fluid} alt="From Instagram" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </ImagesStyles>
            {selectedImageIndex !== null && (
                <ImageModalWrapperStyles>
                    <div className="modal">
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
                            <p id="date">{selectedImage.month} {selectedImage.day}, {selectedImage.year}</p>
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
