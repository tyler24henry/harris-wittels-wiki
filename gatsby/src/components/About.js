import React from 'react';
import styled from 'styled-components';
import { VscCalendar } from 'react-icons/vsc';
import Img from 'gatsby-image';

const TwittelsStyles = styled.div`
    .twittels-wrapper {
        margin: 2rem auto 4rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        .background-image {
            background-color: #364259;
            width: 100%;
            height: 200px;
        }
        .twitter-bio-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .twitter-avatar {
                    margin-top: -72px;
                    height: 134px;
                    width: 134px;
                    border-radius: 50%;
                    border: 5px solid var(--white);
                }
                #following-btn {
                    margin-top: 1rem;
                    justify-self: end;
                    height: 39px;
                    width: 102px;
                    background-color: #364259;
                    color: var(--white);
                    border-radius: 9999px;
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    pointer-events: none;
                    cursor: default;
                }
            }
            #name-wrapper {
                width: 150px;
                margin-top: 0.5rem;
                line-height: 1.3125;
                display: grid;
                grid-template-columns: auto 1fr;
                justify-items: center;
                align-items: center;
                gap: 0.2rem;
                h2 {
                    font-size: 19px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }
            }
            #handle {
                color: #5B7083;
                font-size: 1.5rem;
                font-weight: 500;
                letter-spacing: 0;
            }
            #bio {
                margin-top: 1rem;
                font-size: 1.5rem;
            }
            #joined-wrapper {
                color: #5B7083;
                margin-top: 1rem;
                font-size: 1.5rem;
                font-weight: 500;
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .calendar {
                    font-size: 1.7rem;
                }
                p {
                    padding-top: 0.1rem;
                }
            }
        }
        .tweets-nav {
            margin-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            .tweets {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid #364259;
                p {
                    color: #364259;
                    font-size: 1.6rem;
                    font-weight: 600;
                }
            }
        }
        .tweet-wrapper {
            padding: 1.2rem 1.5rem;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1.5rem;
            .avatar {
                width: 49px;
                height: 49px;
                border-radius: 50%;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.09);
            }
            .tweet {
                .tweet-details {
                    display: flex;
                    font-size: 1.5rem;
                    #handle {
                        font-weight: 600;
                        color: var(--black);
                    }
                    #details {
                        color: #5B7083;
                        font-weight: 500;
                    }
                    #bullet {
                        font-weight: 300;
                        font-size: 1rem;
                        opacity: 0.6;
                    }
                }
                #content {
                    margin-top: 0.5rem;
                    color: var(--black);
                }
            }
        }
    }
`;

export const About = ({ tylerAvatar }) => {
    return (
        <TwittelsStyles>
            <div className="twittels-wrapper">
                <div className="background-image"></div>
                <div className="twitter-bio-wrapper">
                    <div className="avatar-following-grid">
                    <Img className="twitter-avatar" fluid={tylerAvatar.image.asset.fluid} alt="Avatar" />
                        <button id="following-btn" type="button">About</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Tyler Henry</h2>
                    </div>
                    <p id="handle">@tyler24henry</p>
                    <p id="bio">Fav Foam: "I’ve said, “I’ve said it before and I’ll say it again” before, but I’ll say, “I’ve said it before and I’ll say it again” again."</p>
                    <div id="joined-wrapper">
                        <VscCalendar className="calendar" />
                        <p>Created in December 2020</p>
                    </div>
                </div>
                <div className="tweets-nav">
                    <div className="tweets">
                        <p>About</p>
                    </div>
                </div>
                <div className="tweet-wrapper">
                    <Img className="avatar" fluid={tylerAvatar.image.asset.fluid} alt="Avatar" />
                    <div className="tweet">
                        <div className="tweet-details">
                            <p id="handle">Tyler Henry</p>
                            <p id="details">@tyler24henry <span id="bullet">&bull;</span> Dec 18, 2020</p>
                        </div>
                        <p id="content">Harris Wittels was and is a special guy who continues to inspire and bring joy to many people. I find myself coming back to his comedy every few months and I always have the same experience of feeling like I’m “snapping out of it.” Out of what? Probably the mundane, semi-autopilot existence that I have been leading. I don’t know if other people have had this experience but I suspect they might have. Regardless, Harris’s comedy is one of the best things this life has to offer and we were all lucky to have him for the 30 years he was here. So I created this website as my own tribute to him and hope that others can find it useful and enjoyable.</p>
                    </div>  
                </div>
            </div>
        </TwittelsStyles>
    )
}
