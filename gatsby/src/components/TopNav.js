import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'gatsby';
import GeneralContext from './GeneralContext';
import { useNavigate } from "@reach/router";
import { GiHamburgerMenu } from 'react-icons/gi';
import { LeftPanel } from './LeftPanel';
import { slugify } from '../utils/slugify';

const NavStyles = styled.nav`
    position: relative;
    width: auto;
    height: 60px;
    background: #161616;
    color: var(--white);
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 0 3rem;
    @media (max-width: 414px) {
        padding: 0 2rem;
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100vw - 4rem);
        z-index: 500;
        overflow: hidden;
    }
    a {
        color: var(--white);
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
    }
    .nav-wrapper {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
        align-items: center;
        @media(max-width: 850px){
            grid-template-columns: auto 1fr;
        }
        @media (max-width: 414px) {
            grid-template-columns: auto 1fr;
            gap: 2rem;
        }
    }
    #hamburger-btn {
        display: none;
        @media (max-width: 414px) {
            display: block;
            padding: 0;
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.8rem;
            padding-top: 0.7rem;
            padding-left: 0.3rem;
        }
    }
    .search-wrapper {
        position: relative;
        width: 120px;
        @media (max-width: 414px) {
            display: none;
        }
        .search-icon {
            position: absolute;
            left: 1px;
            top: 4px;
            font-size: 1rem;
        }
        .search {
            padding: 0.1rem 0 0.2rem 2.5rem;
            background: none;
            border: none;
            border-bottom: 1px solid var(--white);
            width: 120px;
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: 0.1rem;
            color: var(--white);
            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: var(--white);
                opacity: 1; /* Firefox */
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: var(--white);
            }

            ::-ms-input-placeholder { /* Microsoft Edge */
                color: var(--white);
            }
            @media (max-width: 414px) {
                width: 90px;
            }
        }
    }
    #tour-guide {
        justify-self: center;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
        @media (max-width: 414px) {
            display: none;
        }
    }
    .contact-about-wrapper {
        display: flex;
        @media(max-width: 850px){
            display: none;
        }
    }
    #contact {
        margin-left: 2rem;
    }
    .mobile-links-wrapper {
        display: none;
        @media(max-width: 414px){
            display: grid;
            grid-template-columns: repeat(4, auto);
            gap: 1rem;
            justify-items: center;
            align-items: center;
            text-align: center;
        }
    }
`;

const LeftPanelStyles = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    height: 100%;
    width: 300px;
    overflow-y: scroll;
    border-right: 2px solid #e2e2e2;
`;

export const TopNav = () => {
    const [search, setSearch, openLeftPanel, setOpenLeftPanel] = useContext(GeneralContext);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const isEnterPressed = e => {
        if(e.keyCode === 13){
            navigate(`/search/?s=${slugify(search)}`);
            setSearch('');
            searchRef.current.blur();
        }
    }
    return (
        <>
        <NavStyles>
            <div className="nav-wrapper">
                <button type="button" id="hamburger-btn" onClick={e => setOpenLeftPanel(!openLeftPanel)}><GiHamburgerMenu /></button>
                <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input type="text" ref={searchRef} className="search" autoComplete="off" placeholder="Search" name="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => isEnterPressed(e)} />
                </div>
                <p id="tour-guide">"I’ll be your tour guide through the cosmos, sorry."</p>
                <div className="contact-about-wrapper">
                    <Link to="/about">About</Link>
                    <Link to="/contact" id="contact">Contact</Link>
                </div>
                <div className="mobile-links-wrapper">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/podcast-appearances">Podcasts</Link>
                    <Link className="link" to="/twitter">Tweets</Link>
                    <Link className="link" to="/instagram">Instagram</Link>
                    <Link className="link" to="/youtube">Youtube</Link>
                    <Link className="link" to="/foam-corner">Foam</Link>
                    <Link className="link" to="/tributes">Tributes</Link>
                    <Link className="link" to="/search">Search</Link>
                </div>
            </div>
        </NavStyles>
            {openLeftPanel && (
                <LeftPanelStyles>
                    <LeftPanel />
                </LeftPanelStyles>
            )}
        </>
    )
}
