import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { getIsChrome } from '../utils/detectBrowser';

const HomeStyles = styled.div`
    .masonry-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        @media (max-width: 414px) {
            width: calc(100vw - 4rem);
        }
    }
    .masonry {
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat(auto-fill, minmax(196.66px,1fr));
        grid-auto-rows: 0;
        @media (max-width: 414px) {
            grid-template-columns: repeat(auto-fill, minmax(calc(50vw - 2.5rem),1fr));
        }
    }
    .masonry-not-safari {
        columns: 3;
        column-gap: 10px;
        @media (max-width: 414px) {
            columns: 2;
            column-gap: 5px;
        }
    }
    .masonry-brick {
        display: inline-block;
        vertical-align: top;
        margin-bottom: 5px;
    }
    .masonry-brick, .masonry-content {
        border-radius: 4px;
        overflow: hidden;
    }
    .masonry-brick {
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
        transition: filter .25s ease-in-out;
    }
    .masonry-brick:hover {
        filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, .3));
    }
    .masonry-content {
        width: 196.66px;
        height: auto;
        @media (max-width: 414px) {
            width: calc(50vw - 2.5rem);
        }
    }
    #background {
        pointer-events: none;
        filter: blur(2px);
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
        @media (max-width: 414px) {
            font-size: 1.2rem;
            width: calc(50vw - 4.5rem);
        }
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
            padding: 0 2rem;
            width: calc(100vw - 4rem);
            align-items: center;
        }
        .modal-header {
            display: grid;
            grid-template-columns: 1fr;
            width: calc(500px - 2rem);
            padding: 1rem;
            margin: 0 auto;
            @media (max-width: 414px) {
                width: calc(100vw - 6rem);
                padding: 0 1rem;
                position: absolute;
                top: 20px;
                right: 20px;
            }
            #exit-btn {
                justify-self: end;
                width: 25px;
                background: none;
                border: none;
                color: #919191;
                font-size: 2.5rem;
                @media (max-width: 414px) {
                    font-size: 3.1rem;
                }
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
                height: auto;
                object-fit: contain;
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
                top: 290px;
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

export const Home = ({ masonryItems }) => {
    const [upToIndex, setUpToIndex] = useState(25);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isChrome, setIsChrome] = useState(null);

    useEffect(() => {
        if(typeof window !== `undefined` && typeof navigator !== `undefined`){
            const isChromeBrowser = getIsChrome() !== 2;
            setIsChrome(isChromeBrowser);
        }
    }, []);

    let imagesOnly = [...masonryItems.filter(item => item.quote === null)];

    let selectedImage;
    if(imagesOnly && selectedImageIndex !== null){
        selectedImage = [...imagesOnly][selectedImageIndex];
    }
    const isPrevIndex = selectedImageIndex > 0;
    const isNextIndex = selectedImageIndex + 1 < imagesOnly.length;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js";
        
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const callback = () => {
        setUpToIndex(upToIndex + 25);
    }

    useBottomScrollListener(callback, {
        offset: 400,
      })

      useEffect(() => {
        if(typeof window !== `undefined` && isChrome === false) {
            function resizeMasonryItem(item){
                /* Get the grid object, its row-gap, and the size of its implicit rows */
                var grid = document.getElementsByClassName('masonry')[0],
                    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
                    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
              
                let rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
                if(item.querySelector('#quote')){
                    const paddingHeight = 20;
                    rowSpan = Math.ceil((item.querySelector('#quote').getBoundingClientRect().height+rowGap+paddingHeight)/(rowHeight+rowGap));
                }
        
                /* Set the spanning as calculated above (S) */
                item.style.gridRowEnd = 'span '+rowSpan;
              }
            
              function resizeAllMasonryItems(){
                // Get all item class objects in one list
                var allItems = document.getElementsByClassName('masonry-brick');
              
                for(var i=0;i<allItems.length;i++){
                  resizeMasonryItem(allItems[i]);
                }
              }
            
              function waitForImages() {
                var allItems = document.getElementsByClassName('masonry-brick');
                for(var i=0;i<allItems.length;i++){
                  if(allItems.length > 40){
                    imagesLoaded( allItems[i], function(instance) {
                        var item = instance.elements[0];
                        resizeMasonryItem(item);
                      });
                  } else {
                    var item = allItems[i];
                    resizeMasonryItem(item);
                  }
                }
              }
            
              var masonryEvents = ['load', 'resize'];
              masonryEvents.forEach( function(event) {
                window.addEventListener(event, resizeAllMasonryItems);
              } );
              waitForImages();
        }
      }, [upToIndex]);

      const masonryItemsSliced = isChrome ? [...masonryItems] : [...masonryItems].slice(0,upToIndex);

    return (
        <>
            <HomeStyles>
                <div className="masonry-wrapper" id={selectedImageIndex !== null ? 'background' : ''}>
                    <div className={isChrome ? 'masonry-not-safari' : 'masonry'}>
                        {masonryItemsSliced.map(item => {
                            return (
                                <div className="masonry-brick" key={item.id} id={item.quote ? 'text' : ''}>
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
                                        <div className="masonry-content" id="quote">{item.quote}</div>
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
