import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const HomeStyles = styled.div`
    .masonry-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
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

export const Home = ({ masonryItems }) => {
    return (
        <HomeStyles>
            <div className="masonry-wrapper">
                <div className="masonry">
                    {masonryItems.map(item => {
                        return (
                            <div className="masonry-item" key={item.id} id={item.quote ? 'text' : ''}>
                                {!item.quote && (
                                    <div className="masonry-content">
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
    )  
}
