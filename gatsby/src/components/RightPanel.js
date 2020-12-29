import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const RightPanelStyles = styled.div`
    height: 100%;
    width: auto;
    padding-top: 2rem;
    @media(max-width: 1080px){
        padding-top: 0;
        border: none;
    }
    .harris-img-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        border-bottom: 2px solid #e2e2e2;
        box-shadow: 1px 1px 3px #e2e2e2;
        background: #161616;
        border-radius: 4px 4px 0 4px;
         @media(max-width: 1080px){
            background: #f7f7f7;
            border-bottom: none;
        }
        @media(max-width: 414px) {
            background: #161616;
        }
        .wiki-avatar {
            width: 100%;
            max-width: 300px;
        }
    }
    .wiki-wrapper {
        background: #f7f7f7;
        border-left: 2px solid #e2e2e2;
        border-bottom: 2px solid #e2e2e2;
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1.5rem;
        @media(max-width: 1080px){
            padding: 1rem 1rem 2rem 1rem;
        }
        .wiki-item {
            display: grid;
            grid-template-columns: 130px 1fr;
            grid-gap: 1rem;
            @media(max-width: 1220px){
                grid-template-columns: 110px 1fr;
            }
            @media(max-width: 1170px){
                grid-template-columns: 95px 1fr;
            }
            @media(max-width: 1120px){
                grid-template-columns: 80px 1fr;
            }
            @media(max-width: 1080px){
                grid-template-columns: 70px 1fr;
                margin-top: 1rem;
            }
            @media(max-width: 414px){
                grid-template-columns: 90px 1fr;
            }
            p, a {
                font-size: 1.4rem;
                @media(max-width: 1080px){
                    font-size: 1.2rem;
                }
            }
            .descriptor {
                font-weight: 600;
            }
            .values-wrapper {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 0.5rem;
                .caret {
                    font-size: 1rem;
                    padding-top: 0.3rem;
                }
                .value {
                    word-break: break-word;
                    display: inline;
                }
                #not-link {
                    cursor: text;
                    &:hover {
                        text-decoration: none;
                    }
                }
                #link {
                    color: #0745ad;
                }
            }
        }
        #first-wiki {
            @media(max-width: 1080px){
                margin-top: -3.5rem;
            }
        }
    }
`;

export const RightPanel = () => {
    const { wikiItems, image } = useStaticQuery(graphql`
        query {
            wikiItems: allSanityWiki(sort: {fields: _createdAt, order: ASC}) {
                nodes {
                    id
                    descriptor
                    _createdAt
                    values {
                        id
                        value
                        link
                    }
                }
            }
            image: sanitySiteImage(name: {eq: "Wiki Avatar"}) {
                id
                name
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    `);
    const wikiAvatar = image;
    return (
        <RightPanelStyles>
            <div className="harris-img-wrapper">
                <Img className="wiki-avatar" fluid={wikiAvatar.image.asset.fluid} alt="Harris Wittels" />
            </div>
            <div className="wiki-wrapper">
                {wikiItems.nodes.map((item, index) => {
                    return (
                    <div className="wiki-item" key={item.id} id={index === 0 ? 'first-wiki' : ''}>
                        <p className="descriptor">{item.descriptor}</p>
                        <div className="values-wrapper">
                            {item.values.map(wikiValue => {
                                return (
                                    <a key={wikiValue.id} id={wikiValue.link ? 'link' : 'not-link'} href={wikiValue.link} target="_blank" className="value">{wikiValue.value}</a>
                                )
                            })}
                        </div>
                    </div>
                )})}
            </div>
        </RightPanelStyles>
    )
}