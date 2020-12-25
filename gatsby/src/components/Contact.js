import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import emailjs from 'emailjs-com';
import { BodyStyles } from '../styles/BodyStyles';

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
        grid-gap: 1.5rem;
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
        }, 1000);
    }

    const formFilledOut = name && email && subject && message;
    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div   div className="background-image" id="contact-background"></div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid">
                        <Img className="avatar" fluid={contactAvatar.image.asset.fluid} alt="Avatar" />
                        <button className="phrase-btn" id="contactin" type="button">Contact</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h2>Contact</h2>
                    </div>
                    <p id="description">Hey, this is Tyler Henry. I'd love feedback on the website, I'm sure it's not working well on every browser and device out there. Also, if you have anything to add to the site (pictures, foam corner jokes, podcast appearances, etc.) let me know and I'll add it! Thanks, Tyler Henry.</p>
                    <p id="description"><span id="bold">*** Be sure to fill out the entire form</span> (if you're feeling lazy just put a period or number in there, doesn't matter...).</p>
                </div>
                <div className="mid-page-nav">
                    <div className="nav-header" id="contact-nav-header">
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
                                <p>Your message has been sent. Thanks for reaching out! I'll get back to you as soon as I can. - Tyler Henry</p>
                            </div>
                        </>
                    )}
                </ContactStyles>
            </div>
        </BodyStyles>
    )
}
