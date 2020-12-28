import styled from 'styled-components';

export const BodyStyles = styled.div`
    .page-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image-wrapper {
            width: calc(100% - 6rem);
            height: calc(200px - 6rem);
            padding: 3rem;
            background-color: #25231d;
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            text-align: center;
            @media (max-width: 414px) {
                height: calc(150px - 6rem);
            }
            p {
                font-size: 2rem;
                font-weight: 500;
                letter-spacing: 0.5px;
                color: var(--white);
                @media (max-width: 414px) {
                    font-size: 1.7rem;
                }
            }
        }
        .background-image {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            @media (max-width: 414px) {
                height: 150px;
            }
            img, .youtube-background {
                width: 100%;
                height: 200px;
                object-fit: cover;
                object-position: 0 100%;
                @media (max-width: 414px) {
                    object-position: 0 -50px;
                }
            }
            .search-wrapper {
                z-index: 10;
                position: relative;
                width: 80%;
                margin: 0 auto;
                padding-bottom: 3rem;
                .search-icon {
                    position: absolute;
                    left: 1px;
                    top: 4.5px;
                    font-size: 1.1rem;
                    color: var(--white);
                }
                .search {
                    padding: 0.1rem 0 0.2rem 2.5rem;
                    background: none;
                    border: none;
                    border-bottom: 1px solid var(--white);
                    width: calc(100% - 2.5rem);
                    font-size: 1.5rem;
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
                }
            }
        }
        .back-to-fan-posts {
            position: absolute;
            left: 4px;
            top: 6px;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 0.3rem;
            align-items: center;
            font-size: 1.4rem;
            color: var(--white);
            letter-spacing: 0.5px;
        }
        #twitter-background {
            background-color: rgb(29, 161, 242);
        }
        #instagram-background {
            background-color: #833AB4;
        }
        #about-background {
            background-color: #364259;
        }
        #contact-background {
            background-color: #25231d;
        }
        #tributes-background {
            object-position: 0 61%;
            @media (max-width: 414px) {
                object-position: 60% 61%;
                transform: translateY(-30px);
            }
        }
        .youtube-background {
            object-position: 50% 50%;
            @media (max-width: 414px) {
                object-position: 50% 50%;
            }
        }
        #search-background {
            background-color: var(--black);
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
        }
        #fan-posts-background {
            background-color: var(--black);
        }
        .page-details-wrapper {
            padding: 0 1.5rem;
            .avatar-search-phrase-grid {
                position: relative;
                display: grid;
                grid-template-columns: auto 1fr auto;
                grid-gap: 1rem;
                @media (max-width: 414px) {
                    grid-template-columns: auto 1fr;
                }
                .avatar {
                    margin-top: -72px;
                    height: 134px;
                    width: 134px;
                    border-radius: 50%;
                    border: 5px solid var(--white);
                    @media (max-width: 414px) {
                        margin-top: -55px;
                        height: 105px;
                        width: 105px;
                    }
                }
                .phrase-btn {
                    margin-top: 1rem;
                    justify-self: end;
                    height: 39px;
                    width: 102px;
                    background-color: rgb(29, 161, 242);
                    color: var(--white);
                    border-radius: 9999px;
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    pointer-events: none;
                    cursor: default;
                    @media (max-width: 414px) {
                        height: 32px;
                        width: 88px;
                        font-size: 1.3rem;
                    }
                }
                #foamin {
                    background-color: #25231d;
                }
                #grammin {
                    background-color: #833AB4;
                }
                #podcastin, #searchin {
                    background-color: var(--black);
                }
                #missin {
                    background-color: #000000;
                }
                #watchin {
                    background-color: #fb934c;
                }
                #aboutin {
                    background-color: #364259;
                }
                #contactin {
                    background-color: #25231d;
                }
                #sharin {
                    background-color: var(--black);
                }
            }
            #avatar-phrase-only {
                grid-template-columns: auto 1fr;
                .avatar {
                    background-color: var(--white);
                }
            }
            #page-title-wrapper {
                width: 100%;
                margin-top: 0.5rem;
                line-height: 1.3125;
                display: grid;
                grid-template-columns: auto 1fr;
                justify-items: center;
                align-items: center;
                grid-gap: 0.4rem;
                h1, h2 {
                    font-size: 19px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    @media (max-width: 414px) {
                        font-size: 1.5rem;
                    }
                }
                .verified {
                    justify-self: start;
                    font-size: 19px;
                    color: rgb(29, 161, 242);
                    @media (max-width: 414px) {
                        font-size: 1.5rem;
                    }
                }
            }
            #handle {
                color: #5B7083;
                font-size: 1.5rem;
                font-weight: 500;
                letter-spacing: 0;
                @media (max-width: 414px) {
                    font-size: 1.3rem;
                }
            }
            #description {
                margin-top: 1rem;
                font-size: 1.5rem;
                a {
                    font-weight: 600;
                }
                @media (max-width: 414px) {
                    font-size: 1.3rem;
                }
            }
            .details-wrapper {
                background: #fbfbfb;
                margin-top: 0.25rem;
                padding: 0.2rem 0.1rem;
                display: grid;
                grid-template-columns: auto auto 1fr;
                grid-gap: 0.5rem;
                font-size: 1.4rem;
                align-items: center;
                .calendar {
                    padding-bottom: 0.1rem;
                }
                .details {

                }
            }
            .connect-social-wrapper {
                justify-self: end;
                display: flex;
                grid-gap: 1rem;
                align-items: center;
                flex-wrap: wrap;
                font-size: 1.6rem;
                color: var(--black);
                #twitter {
                    font-size: 1.8rem;
                    padding-top: 0.2rem;
                }
                #facebook {
                    font-size: 1.7rem;
                }
            }
            #bold {
                font-weight: 600;
            }
            #joined-wrapper {
                color: #5B7083;
                margin-top: 1rem;
                font-size: 1.5rem;
                font-weight: 500;
                display: grid;
                grid-template-columns: auto 1fr;
                grid-gap: 1rem;
                @media (max-width: 414px) {
                    font-size: 1.3rem;
                }
                .calendar {
                    font-size: 1.7rem;
                    @media (max-width: 414px) {
                        font-size: 1.5rem;
                    }
                }
                p {
                    padding-top: 0.1rem;
                }
            }
            .followers-wrapper {
                margin-top: 1rem;
                display: flex;
                .item {
                    display: flex;
                    align-items: center;
                    margin-right: 1.5rem;
                    p {
                        color: #5B7083;
                        font-size: 1.5rem;
                        @media (max-width: 414px) {
                            font-size: 1.3rem;
                        }
                    }
                    #number {
                        font-weight: 600;
                        color: var(--black);
                        margin-right: 0.5rem;
                    }
                }
            }
            .soundcloud-embed-wrapper {
                margin-top: 2.5rem;
                width: 100%;
                height: 130px;
                @media (max-width: 414px) {
                    height: 115px;
                }
            }
        }
        #about-page {
            padding-bottom: 2rem;
        }
        #youtube-wrapper {
            padding: 0 1.5rem 4rem 1.5rem;
        }
        .mid-page-nav {
            width: 100%;
            padding-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            .nav-header {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid rgba(29,161,242,1.00);
                @media (max-width: 414px) {
                    width: 110px;
                    height: 34px;
                }
                p {
                    color: rgba(29,161,242,1.00);
                    font-size: 1.6rem;
                    font-weight: 600;
                    @media (max-width: 414px) {
                        font-size: 1.3rem;
                    }
                }
            }
            #link-wrapper {
                justify-self: end;
                padding-right: 0.5rem;
                display: grid;
                grid-template-columns: auto 1fr;
                grid-gap: 0.2rem;
                align-items: center;
                font-size: 1.3rem;
                font-weight: 600;
                text-align: center;
                @media (max-width: 414px) {
                    font-size: 1.2rem;
                }
                a {
                    width: 100%;
                }
                .link-icon {
                    font-size: 1.4rem;
                    @media (max-width: 414px) {
                        font-size: 1.3rem;
                    }
                }
            }
        }
        #foam-nav-header {
            border-bottom: 2px solid #25231d;
            p {
                color: #25231d;
            }
        }
        #instagram-nav-header {
            border-bottom: 2px solid #833AB4;
            p {
                color: #833AB4;
            }
        }
        #tributes-nav-header {
            border-bottom: 2px solid #000000;
            p {
                color: #000000;
            }
        }
        #about-nav-header {
            border-bottom: 2px solid #364259;
            p {
                color: #364259;
            }
        }
        #contact-nav-header {
            border-bottom: 2px solid #25231d;
            p {
                color: #25231d;
            }
        }
        #fan-posts-nav-header {
            border-bottom: 2px solid var(--black);
            p {
                color: var(--black);
            }
        }
    }
    #background {
        pointer-events: none;
        filter: blur(2px);
    }
`;