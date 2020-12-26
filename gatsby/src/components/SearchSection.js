import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import GeneralContext from './GeneralContext';
import { useViewportWidth } from '../utils/useViewportWidth';

const SearchSectionStyles = styled.div`
    position: relative;
    width: 90%;
    justify-self: center;
    margin-top: 2rem;
    @media(max-width: 414px){
        width: 30vw;
        position: absolute;
        right: 0;
        top: 41.5px;
    }
    .search-icon {
        position: absolute;
        left: 1px;
        top: 2.3px;
        font-size: 1.4rem;
        color: var(--black);
        @media(max-width: 414px){
            top: 4px;
            font-size: 1.1rem;
        }
    }
    .search {
        padding: 0.1rem 0 0.1rem 2.2rem;
        background: none;
        border: none;
        border-bottom: 1px solid var(--black);
        width: 90%;
        font-size: 1.5rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: var(--black);
        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: var(--black);
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: var(--black);
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color: var(--black);
        }
        @media(max-width: 414px){
            padding: 0.1rem 0 0.1rem 1.9rem;
            width: 80%;
            font-size: 1.2rem;
        }
    }
`;

export const SearchSection = ({ section }) => {
    const [search, setSearch, openLeftPanel, setOpenLeftPanel, searchSection, setSearchSection] = useContext(GeneralContext);
    const searchRef = useRef(null);
    const { viewportWidth } = useViewportWidth()

    const isEnterPressed = e => {
        if(e.keyCode === 13){
            searchRef.current.blur();
        }
    }

    useEffect(() => {
        setSearchSection('');
    }, [section]);

    return (
        <SearchSectionStyles>
            <AiOutlineSearch className="search-icon" />
            <input id="non-mobile" type="text" ref={searchRef} className="search" autoComplete="off" placeholder={viewportWidth > 414 ? `Filter ${section}...` : 'Filter results...'} name="search" value={searchSection} onChange={e => setSearchSection(e.target.value)} onKeyDown={e => isEnterPressed(e)} />
        </SearchSectionStyles>
    )
}
