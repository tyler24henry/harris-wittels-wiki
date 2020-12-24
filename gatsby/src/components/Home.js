import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { getIsChrome } from '../utils/detectBrowser';
import { useClickOutside } from '../utils/useClickOutside';
import { ImageModalWrapperStyles } from '../styles/ImageModalWrapper';

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
        width: calc(100% - 1.7rem);
        @media (max-width: 414px) {
            font-size: 1.2rem;
            width: calc(50vw - 4.5rem);
        }
        .masonry-content {
            width: 100%;
        }
    }
    #show {
        display: block;
    }
    #hide {
        display: none;
        opacity: 0;
        pointer-events: none;
        z-index: -9999;
        position: absolute;
        top: -9999px;
    }
`;

export const Home = ({ masonryItems }) => {
    const [upToIndex, setUpToIndex] = useState(25);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isChrome, setIsChrome] = useState(null);
    const wrapperRef = useRef(null);
    const { clickedOutside, setClickedOutside } = useClickOutside(wrapperRef);

    useEffect(() => {
        if(clickedOutside){
            setSelectedImageIndex(null);
        }
    }, [clickedOutside]);

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
      }, [upToIndex, isChrome]);

      const masonryItemsSliced = isChrome ? [...masonryItems] : [...masonryItems].slice(0,upToIndex);

    // const handleClick = (index) => {
    //     if(index !== null){
    //         const identifier = [...imagesOnly][index]?.id;
    //         navigate(`/#${identifier}`);
    //     } else {
    //         navigate(`/`);
    //     }
    // }

    // const identifier = [...imagesOnly][selectedImageIndex]?.id;

    // let disqusConfig = {
    //     url: `https://www.harriswittels.wiki/#${identifier}`,
    //     identifier,
    //     title: `Harris Image ${identifier}`,
    // }

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
                                                setClickedOutside(false);
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
                    <div className="modal" id="masonry-modal" ref={wrapperRef}>
                        <div className="modal-header">
                            <button id="exit-btn" type="button"
                            onClick={e => setSelectedImageIndex(null)}
                            >&times;</button>
                        </div>
                        <Img className="modal-image" fluid={selectedImage.image.asset.fluid} alt="From Instagram" />
                        <button className="masonry-chevron" type="button" disabled={!isPrevIndex} onClick={e => setSelectedImageIndex(selectedImageIndex - 1)}><FiChevronLeft className="chevron-left" /></button>
                        <button className="masonry-chevron" type="button" disabled={!isNextIndex} onClick={e => setSelectedImageIndex(selectedImageIndex + 1)}><FiChevronRight className="chevron-right" /></button>
                    </div>
                    <div id="background-tint"></div>
                </ImageModalWrapperStyles>
            )}
        </>
    )  
}
