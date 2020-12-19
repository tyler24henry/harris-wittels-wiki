import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const HomeStyles = styled.div`
    .home-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        .background-image {
            position: relative;
            width: 100%;
            height: 120px;
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            transition: all 0.3s;
            font-size: 2.5rem;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--white);
            &:hover {
                text-decoration: none;
                filter: brightness(80%);
            }
        }
        #podcast-appearances {
            background-color: #275807;
        }
        #twitter {
            background-color: rgb(29, 161, 242);
        }
        #instagram {
            background-color: #833AB4;
        }
        #youtube {
            background-color: #f91100;
        }
        #foam-corner {
            background-color: #25231d;
        }
        #tributes {
            background-color: #000000;
        }
        #about {
            background-color: #364259;
        }
        #contact {
            background-color: #25231d;
        }
    }
`;

export const Home = () => {
    return (
        <HomeStyles>
            <div className="home-wrapper">
                <Link to="/podcast-appearances" className="background-image" id="podcast-appearances">Podcast appearances</Link>
                <Link to="/twitter" className="background-image" id="twitter">Twitter</Link>
                <Link to="/instagram" className="background-image" id="instagram">Instagram</Link>
                <Link to="/youtube" className="background-image" id="youtube">Youtube</Link>
                <Link to="/foam-corner" className="background-image" id="foam-corner">Foam Corner</Link>
                <Link to="/tributes" className="background-image" id="tributes">Tributes</Link>
                <Link to="/about" className="background-image" id="about">About</Link>
                <Link to="/contact" className="background-image" id="contact">Contact</Link>
            </div>
        </HomeStyles>
    )  
}
