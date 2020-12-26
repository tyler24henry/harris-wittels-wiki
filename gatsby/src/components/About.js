import React from 'react';
import Img from 'gatsby-image';
import { BodyStyles } from '../styles/BodyStyles';
import { Link } from 'gatsby';

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
                    <p id="handle">@tyler24henry</p>
                    <p id="description">This is a website for people who connected with Harris's story and comedy. Or for people to discover him for the first time. I hope you enjoy it!</p>
                    <p id="description">If there's something that could be added (foam corner joke, video, article, etc.) send me a message on the <Link to="/contact">contact page</Link>.</p>
                </div>
            </div>
        </BodyStyles>
    )
}
