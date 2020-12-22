import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import emailjs from 'emailjs-com';

const FoamCornerStyles = styled.div`
    .page-wrapper {
        margin: 0 auto 2rem auto;
        width: 600px;
        border: 1px solid #c4cfd7;
        @media (max-width: 414px) {
            width: 100%;
        }
        .background-image-wrapper {
            width: 100%;
            height: 200px;
            background-color: #25231d;
            @media (max-width: 414px) {
                height: 150px;
            }
        }
        .foam-corner-wrapper {
            padding: 0 1.5rem;
            .avatar-following-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                .foam-corner-avatar {
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
                #following-btn {
                    margin-top: 1rem;
                    justify-self: end;
                    height: 39px;
                    width: 102px;
                    background-color: #25231d;
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
            }
            #name-wrapper {
                width: auto;
                margin-top: 0.5rem;
                line-height: 1.3125;
                h2 {
                    font-size: 19px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    @media (max-width: 414px) {
                        font-size: 1.5rem;
                    }
                }
            }
            #bio {
                margin-top: 1rem;
                font-size: 1.5rem;
                @media (max-width: 414px) {
                    font-size: 1.3rem;
                }
            }
        }
        .foam-nav {
            margin-top: 2rem;
            border-bottom: 1px solid #c4cfd7;
            .foam {
                width: 138px;
                height: 45px;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                align-items: center;
                border-bottom: 2px solid #25231d;
                @media (max-width: 414px) {
                    width: 110px;
                    height: 34px;
                }
                p {
                    color: #25231d;
                    font-size: 1.6rem;
                    font-weight: 600;
                    @media (max-width: 414px) {
                        font-size: 1.3rem;
                    }
                }
            }
        }
    }
`;

const ContactStyles = styled.div`
    transition: opacity 0.4s;
    &[disabled]{
        opacity: 0.6;
        pointer-events: none;
        cursor: default;
    }
    .contact-form {
        padding: 1rem;
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        justify-items: start;
        border-radius: 8px;
        input[type="text"], input[type="email"], textarea {
            width: calc(100% - 10px);
            padding: 0.5rem;
            border: 1px solid #e2e2e2;
            background: #f7f7f7;
            color: var(--black);
        }
        textarea {
            height: 140px;
            resize: vertical;
        }
        button {
            padding: 1rem 2rem;
            background: var(--red);
            &:hover {
                filter: brightness(80%);
            }
            &[disabled]{
                opacity: 0.6;
                pointer-events: none;
                cursor: default;
            }
        }
    }
`;

export const Contact = ({ contactAvatar }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const serviceId = process.env.GATSBY_EMAILJS_SERVICE_ID;
    const templateId = process.env.GATSBY_EMAILJS_TEMPLATE_ID;
    const userId = process.env.GATSBY_EMAILJS_USER_ID;

    function sendEmail(e) {
        setLoading(true);
        e.preventDefault();
        emailjs.sendForm(serviceId, templateId, e.target, userId);
        setTimeout(() => {
            setLoading(false);
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setSuccess(true);
        }, 2000);
    }

    const formFilledOut = name && email && subject && message;
    return (
        <FoamCornerStyles>
            <div className="page-wrapper">
                <div className="background-image-wrapper"></div>
                <div className="foam-corner-wrapper">
                    <div className="avatar-following-grid">
                        <Img className="foam-corner-avatar" fluid={contactAvatar.image.asset.fluid} alt="Avatar" />
                        <button id="following-btn" type="button">Contact</button>
                    </div>
                    <div id="name-wrapper">
                        <h2>Contact</h2>
                    </div>
                    <p id="bio">Use the form below to send a message. Thanks, Tyler Henry.</p>
                </div>
                <div className="foam-nav">
                    <div className="foam">
                        <p>Contact</p>
                    </div>
                </div>
                <ContactStyles disabled={loading}>
                    {!success && (
                        <>
                            <form className="contact-form" onSubmit={sendEmail}>
                                <input type="text" name="name" autoComplete="off" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                <input type="email" name="email" autoComplete="off" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                                <input type="text" name="subject" autoComplete="off" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                                <textarea style={{ width: 'calc(100% - 10px)'}} name="message" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
                                <button type="submit" disabled={!formFilledOut}>Send</button>
                            </form>
                        </>
                    )}
                    {success && (
                        <>
                            <div className="contact-form">
                                <p>Your message has been sent.  Thanks for reaching out!  I'll get back to you as soon as I can. - Tyler Henry</p>
                            </div>
                        </>
                    )}
                </ContactStyles>
            </div>
        </FoamCornerStyles>
    )
}
