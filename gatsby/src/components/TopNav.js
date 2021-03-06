import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'gatsby';
import GeneralContext from './GeneralContext';
import { useNavigate } from "@reach/router";
import { GiHamburgerMenu } from 'react-icons/gi';
import { LeftPanel } from './LeftPanel';
import { slugify } from '../utils/slugify';
import { useClickOutside } from '../utils/useClickOutside';
import { useIsChrome } from '../utils/useIsChrome';

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
        width: calc(100% - 4rem);
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
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-gap: 1rem;
        align-items: center;
        @media (max-width: 414px) {
            grid-template-columns: auto auto 1fr;
            width: calc(100% - 1rem);
            margin: 0;
        }
    }
    #hamburger-btn {
        display: none;
        @media (max-width: 840px) {
            display: block;
            padding: 0;
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.8rem;
            padding-top: 0.7rem;
            padding-left: 0.3rem;
        }
        @media(max-width: 414px){
            padding:0;
            height:18px;
        }
    }
    .search-wrapper {
        position: relative;
        width: 120px;
        @media (max-width: 840px) {
            grid-column: 3 / span 1;
            justify-self: end;
            padding-right: 3rem;
        }
        @media(max-width: 414px){
            display: none;
        }
        .search-icon, .search-icon-safari {
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
            border-radius: none;
            overflow: none;
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
                width: 25vw;
            }
        }
    }
    #show-search {
        @media (max-width: 414px) {
            display: block;
            padding-right: 2.5rem;
            padding-bottom: 0.4rem;
            width: 25vw;
        }
    }
    .search-icon-safari {
        top: 3.5px;
    }
    .search-btn {
        display: none;
        @media(max-width: 414px){
            display: block;
            justify-self: end;
            padding: 0;
            padding-top: 0.35rem;
        }
        .search-icon-mobile {
            color: var(--white);
            font-size: 1.4rem;
        }
    }
    #hide-search-btn {
        display: none;
    }
    #harris-wittels {
        display: none;
        @media (max-width: 414px) {
            display: block;
            font-size: 1.7rem;
            letter-spacing: 1px;
            justify-self: center;
            text-decoration: none;
            padding-bottom: 0;
            &:hover {
                text-decoration: none;
                cursor: pointer;
            }
        }
    }
    #tour-guide {
        justify-self: center;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
        @media (max-width: 840px) {
            grid-row: 1 / span 1;
            grid-column: 2 / span 1;
        }
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
`;

const LeftPanelStyles = styled.div`

`;

export const TopNav = () => {
    const [search, setSearch, openLeftPanel, setOpenLeftPanel] = useContext(GeneralContext);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const hamburgerRef = useRef(null);
    const { clickedOutside, setClickedOutside } = useClickOutside(wrapperRef);
    const { isChrome } = useIsChrome();
    const [showSearchMobile, setShowSearchMobile] = useState(false);

    useEffect(() => {
        if(openLeftPanel && clickedOutside){
            setOpenLeftPanel(false);
        }
    }, [clickedOutside]);

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
                <button type="button" id="hamburger-btn" ref={hamburgerRef}
                    onClick={e => {
                        setClickedOutside(false);
                        setOpenLeftPanel(!openLeftPanel);
                    }}
                ><GiHamburgerMenu /></button>
                <Link to="/" id="harris-wittels">Harris Wittels</Link>
                <div className="search-wrapper" id={showSearchMobile ? 'show-search' : ''}>
                    <FaSearch className={isChrome ? 'search-icon' : 'search-icon-safari'} />
                    <input type="text" ref={searchRef} className="search" autoComplete="off" placeholder="Search" name="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => isEnterPressed(e)} />
                </div>
                <button type="button" className="search-btn" id={showSearchMobile ? 'hide-search-btn' : ''} onClick={e => setShowSearchMobile(true)}><FaSearch className="search-icon-mobile" /></button>
                <p id="tour-guide">"I’ll be your tour guide through the cosmos, sorry."</p>
                <div className="contact-about-wrapper">
                    <Link to="/about">About</Link>
                    <Link to="/contact" id="contact">Contact</Link>
                </div>
            </div>
        </NavStyles>
            {openLeftPanel && (
                <LeftPanelStyles ref={wrapperRef}>
                    <LeftPanel />
                </LeftPanelStyles>
            )}
        </>
    )
}
