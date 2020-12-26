import React from 'react';
import Img from 'gatsby-image';
import { BodyStyles } from '../styles/BodyStyles';
import { Link } from 'gatsby';
import styled from 'styled-components';

const SocialWrapperStyles = styled.div`
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #c4cfd7;
    a {
        position: relative;
        margin-right: 2rem;
        font-weight: 600;
        border-bottom: 1px solid var(--black);
        transition: all 0.2s;
        @media(max-width: 414px){
            font-size: 1.2rem;
        }
        @media(max-width: 350px){
            margin-right: 1.5rem;
        }
        &:hover {
            text-decoration: none;
            background: var(--black);
            color: var(--white);
        }
    }
    a:after {
        content: '';
        position: absolute;
        top: 10%;
        right: -1rem;
        height: 80%;
        width: 1px;
        background: var(--black);
        transform: skew(-20deg);
        @media(max-width: 350px){
            right: -0.75rem;
        }
    }
    a:last-child:after {
        display: none;
    }
    
`;

export const About = ({ tylerAvatar }) => {
    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image" id="about-background"></div>
                <div className="page-details-wrapper" id="about-page">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={tylerAvatar.image.asset.fluid} alt="Avatar" />
                        <button className="phrase-btn" id="aboutin" type="button">About</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h2>Tyler Henry</h2>
                    </div>
                    <p id="description">This is a website for people who connected with Harris's story and comedy. Or for people to discover him for the first time. I hope you enjoy it!</p>
                    <p id="description">If there's something that could be added (foam corner joke, video, article, etc.) send me a message on the <Link to="/contact">contact page</Link>.</p>
                    <SocialWrapperStyles>
                        <a href="mailto:tyler.henry2442@gmail.com" target="_blank" title="Email">Email</a>
                        <a href="https://www.twitter.com/ty24henry" target="_blank" title="Twitter">Twitter</a>
                        <a href="https://www.instagram.com/tyler24henry" target="_blank" title="Instagram">Instagram</a>
                        <a href="https://www.buymeacoffee.com/tyler24henry" target="_blank" title="Buy Me A Coffee">Buy me a coffee</a>
                    </SocialWrapperStyles>
                </div>
            </div>
        </BodyStyles>
    )
}
