import React from 'react';
import { VscCalendar } from 'react-icons/vsc';
import Img from 'gatsby-image';
import { TweetsWrapper } from './Twitter';
import { BodyStyles } from '../styles/BodyStyles';

export const About = ({ tylerAvatar }) => {
    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image" id="about-background"></div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={tylerAvatar.image.asset.fluid} alt="Avatar" />
                        <button className="phrase-btn" id="aboutin" type="button">About</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h2>Tyler Henry</h2>
                    </div>
                    <p id="handle">@tyler24henry</p>
                    <p id="description">Fav Foam: "Instead of trying to desalinize the ocean, they should just add pepper."</p>
                    <div id="joined-wrapper">
                        <VscCalendar className="calendar" />
                        <p>Created in December 2020</p>
                    </div>
                </div>
                <div className="mid-page-nav">
                    <div className="nav-header" id="about-nav-header">
                        <p>About</p>
                    </div>
                </div>
                <TweetsWrapper>
                    <div className="tweet-wrapper" id="first-tweet">
                        <Img className="avatar" fluid={tylerAvatar.image.asset.fluid} alt="Avatar" />
                        <div className="tweet">
                            <div className="tweet-details">
                                <p id="handle">Tyler Henry</p>
                                <p id="details">@tyler24henry <span id="bullet">&bull;</span> Dec 18, 2020</p>
                            </div>
                            <p id="content">Harris Wittels was and is a special guy who continues to inspire and bring joy to many people. I find myself coming back to his comedy every few months and I always have the same experience of feeling like I’m “snapping out of it.” Out of what? Probably the mundane, semi-autopilot existence that I have been leading. I don’t know if other people have had this experience but I suspect they might have. Regardless, Harris’s comedy is one of the best things this life has to offer and we were all lucky to have him for the 30 years he was here. So I created this website as my own tribute to him and hope that others can find it useful and enjoyable.</p>
                        </div>  
                    </div>
                </TweetsWrapper>
            </div>
        </BodyStyles>
    )
}
