import styled from 'styled-components';

export const ImageModalWrapperStyles = styled.div`
    z-index: 700;
    position: fixed;
    top: 15vh;
    left: 0;
    width: 100%;
    height: 620px;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    @media(max-height: 700px){
        top: 0;
        height: 100vh;
    }
    @media (max-width: 414px) {
        width: 100vw;
    }
    &.instagram-wrapper {
        height: 670px;
        @media (min-width: 1000px) and (min-height: 1200px){
            height: 690px;
        }
        @media (max-width: 600px) and (max-height: 750px){
            top: 2.5vh;
            height: 95vh;
        }
        @media(max-height: 700px){
            top: 0;
            height: 100vh;
        }
        .modal {
            @media (max-width: 600px) and (max-height: 750px) {
                width: calc(100vw - 4rem);
                overflow-y: scroll;
            } 
            @media (max-width: 414px) {
                height: calc(100vw + 5rem);
            }   
        }
    }
    .modal {
        position: relative;
        width: 600px;
        height: calc(100% - 2rem);
        background: #f8f7f8;
        padding: 0 2rem 2rem 2rem;
        @media (max-width: 414px) {
            width: calc(100vw - 4rem);
            height: calc(100vw + 4rem);
            overflow-y: scroll;
        }   
        .modal-header {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-gap: 1rem;
            align-items: center;
            width: calc(600px - 10rem);
            padding: 1rem;
            margin: 0 auto;
            @media (max-width: 414px) {
                width: calc(100vw - 5.5rem);
            } 
            #exit-btn {
                justify-self: end;
                width: 25px;
                background: none;
                border: none;
                color: #919191;
                font-size: 4rem;
                @media(max-height: 700px){
                    font-size: 3rem;
                }
            }
            .instagram-avatar {
                height: 35px;
                width: 35px;
                border-radius: 50%;
            }
            p {
                font-size: 1.4rem;
                font-weight: 600;
                color: var(--black);
            }
        }
        .modal-image {
            margin: 0 auto;
            width: 500px;
            height: 500px;
            object-fit: cover;
            filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
            @media (max-width: 414px) {
                width: calc(100vw - 4rem);
                height: calc(100vw - 10rem);
            } 
        }
        .modal-image-wrapper {
            position: relative;
            height: 500px;
            width: 500px;
            margin: 0 auto;
            overflow: hidden;
            @media (max-width: 414px) {
                width: calc(100vw - 4rem);
                height: calc(100vw - 10rem);
            } 
            .modal-image {
                max-height: 100%;
                max-width: 100%;
                width: auto;
                height: auto;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                object-fit: contain;
                filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, .3));
            }
        }
        .sub-image-wrapper {
            #caption {
                font-size: 1.4rem;
                color: var(--black);
                width: calc(500px - 1rem);
                margin: 0 auto;
                margin-top: 1rem;
                @media (max-width: 414px) {
                    width: calc(90vw - 1rem);
                    margin: 1rem 0 0 0;
                }
                span {
                    padding-right: 0.3rem;
                    font-weight: 600;
                }
            }
            .date-link-wrapper {
                display: grid;
                grid-template-columns: auto 1fr;
                grid-gap: 0.5rem;
                align-items: center;
                width: calc(500px - 1rem);
                margin: 0 auto;
                margin-top: 1rem;
                @media (max-width: 414px) {
                    width: calc(90vw - 1rem);
                    margin: 1rem 0 0 0;
                }
            }
            #date {
                font-size: 1.2rem;
                font-weight: 500;
                color: #919191;
            }
            #link-wrapper {
                justify-self: end;
                display: grid;
                grid-template-columns: auto 1fr;
                grid-gap: 0.2rem;
                align-items: center;
                font-size: 1.3rem;
                font-weight: 600;
                @media (max-width: 414px) {
                    font-size: 1.2rem;
                }
                .link-icon {
                    font-size: 1.4rem;
                    @media (max-width: 414px) {
                        font-size: 1.3rem;
                        padding-bottom: 0.2rem;
                    }
                }
            }
        }
        button {
            background: none;
            border: none;
            &[disabled]{
                pointer-events: none;
                opacity: 0;
            }
        }
        .chevron-left, .chevron-right {
            position: absolute;
            top: 270px;
            color: #919191;
            font-size: 4rem;
            @media (max-width: 414px) {
                top: 52vw;
                border-radius: 50%;
                background: #b5b5b6;
                color: #050608;
                font-size: 1rem;
                height: 25px;
                width: 25px;
                opacity: 0.8;
            } 
        }
        .chevron-left {
            left: 15px;
            @media (max-width: 414px) {
                left: 22px;
                padding-right: 0.2rem;
            }
        }
        .chevron-right {
            right: 15px;
            @media (max-width: 414px) {
                right: 22px;
                padding-left: 0.2rem;
            }
        }
        .masonry-chevron {
            .chevron-left, .chevron-right {
                @media (max-width: 414px) {
                    top: auto;
                    bottom: 10px;
                    font-size: 3rem;
                    border-radius: 100%;
                    background: none;
                    color: #919191;
                    height: auto;
                    width: auto;
                    opacity: 1;
                    padding: 0;
                } 
            }
            .chevron-left {
                left: 15px;
            }
            .chevron-right {
                right: 15px;
            }
        }
    }
    &#safari {
        .modal {
            .modal-image-wrapper {
                @media(max-width: 414px){
                    max-width: calc(90vw - 2rem);
                }
            }
        }
    }
    #masonry-modal {
        @media (max-width: 414px) {
            width: calc(100vw - 4rem);
            height: calc(100vw - 2.5rem);
        }  
        .modal-header {
            grid-template-columns: 1fr;
            width: calc(600px - 2rem);
            padding: 0 1rem 1rem 1rem;
            grid-gap: 0;
            align-items: start;
            @media (max-width: 414px) {
                width: auto;
                padding: 0 0.5rem;
            }  
        }
    }
    #background-tint {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: -1;
        opacity: 0.5;
    }
`;