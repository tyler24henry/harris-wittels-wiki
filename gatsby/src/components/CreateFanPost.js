import React, { useState } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import emailjs from 'emailjs-com';
import { BodyStyles } from '../styles/BodyStyles';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'gatsby';

const CreateFanPostStyles = styled.div`
    margin-top: 2rem;
    transition: opacity 0.4s;
    &[disabled]{
        opacity: 0.6;
        pointer-events: none;
        cursor: default;
    }
    .create-fan-post-form {
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1.5rem;
        justify-items: start;
        border-radius: 8px;
        .two-columns-grid {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1rem;
            align-items: center;
        }
        input[type="text"], input[type="email"], input[type="file"], textarea {
            width: calc(100% - 10px);
            padding: 0.5rem;
            border: 1px solid #e2e2e2;
            background: #f7f7f7;
            color: var(--black);
        }
        .bold {
            font-weight: 600;
        }
        .avatar-upload-wrapper {
            position: relative;
            &:hover {
                cursor: pointer;
                filter: brightness(80%);
            }
            #avatar-btn {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: calc(100% + 5px);
                border: 1px solid #e2e2e2;
                background: #f7f7f7;
                color: #858585;
                text-align: left;
                padding: 0.5rem;
                z-index: -2;
            }
            #upload-avatar-input {
                z-index: 2;
                opacity: 0;
            }
        }
        .avatar-preview-wrapper {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            img {
                width: 130px;
                height: 130px;
                object-fit: cover;
                border-radius: 50%;
                @media(max-width: 414px){
                    width: 25vw;
                    height: 25vw;
                }
            }
        }
        textarea {
            height: 220px;
            resize: vertical;
        }
        button {
            padding: 1rem 2rem;
            background: var(--red);
            font-weight: 500;
            &:hover {
                filter: brightness(80%);
            }
            &[disabled]{
                opacity: 0.6;
                pointer-events: none;
                cursor: default;
            }
        }
        h2 {
            font-size: 1.6rem;
            font-weight: 600;
            padding: 1rem 0 0 0;
        }
        #success {
            margin: 0 0.5rem;
            padding: 1rem;
            border: 1px solid #e2e2e2;
            background: var(--red);
            color: var(--black);
            font-weight: 600;
        }
    }
`;

export const CreateFanPost = ({ createFanPostAvatar }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [facebookHandle, setFacebookHandle] = useState('');
    const [twitterHandle, setTwitterHandle] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const serviceId = process.env.GATSBY_EMAILJS_SERVICE_ID;
    const templateId = process.env.GATSBY_EMAILJS_TEMPLATE_ID;
    const userId = process.env.GATSBY_EMAILJS_USER_ID;

    const uploadAvatar = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'eleventy-six');

        const res = await fetch('https://api.cloudinary.com/v1_1/tyler24henry/image/upload', {
            method: 'POST',
            body: data,
        });
        const file = await res.json();
        setAvatar(file.secure_url);
    }

    function sendEmail(e) {
        setLoading(true);
        e.preventDefault();
        emailjs.sendForm(serviceId, templateId, e.target, userId);
        setTimeout(() => {
            setLoading(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setAvatar('');
            setTitle('');
            setContent('');
            setFacebookHandle('');
            setTwitterHandle('');
            setWebsiteUrl('');
            setSuccess(true);
        }, 1000);
    }

    const formFilledOut = title && content;
    return (
        <BodyStyles>
            <div className="page-wrapper">
                <div className="background-image" id="fan-posts-background"></div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid" id="avatar-phrase-only">
                        <Img className="avatar" fluid={createFanPostAvatar.image.asset.fluid} alt="Avatar" />
                        <button className="phrase-btn" id="sharin" type="button">Create</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h1 style={{ marginTop: '0.5rem'}}>Create Post</h1>
                    </div>
                    <p id="description">Share your favorite Harris joke, story, what Harris meant to you, etc. Anything Harris related, feel free to post it.</p>
                    <p id="description"><b>The only required fields are the title and content fields.</b></p>
                    <p id="description">The other fields are meant to give your post a blog-like feel that gives proper credit to the author.</p>
                    <p id="description">If you want email notification when someone comments on your post, be sure to enter your email address.</p>
                    <p id="description">You can link your Twitter/Facebook and/or website by entering your social media handles and/or website URL.</p>
                </div>
                <CreateFanPostStyles disabled={loading}>
                    {!success && (
                        <>
                            <form className="create-fan-post-form" onSubmit={sendEmail}>
                                <h2>Optional fields</h2>
                                <div className="two-columns-grid">
                                    <input type="text" name="firstName" autoComplete="off" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    <input type="text" name="lastName" autoComplete="off" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                </div>
                                <input type="email" name="email" autoComplete="off" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                                <div className="two-columns-grid">
                                    <div className="avatar-upload-wrapper">
                                        <button type="button" id="avatar-btn">Choose avatar</button>
                                        <input 
                                            id="upload-avatar-input"
                                            type="file"
                                            name="avatar"
                                            onChange={uploadAvatar}
                                        />
                                    </div>
                                    <div className="avatar-preview-wrapper">
                                        <img src={avatar ? avatar : 'https://res.cloudinary.com/tyler24henry/image/upload/v1609112328/usercircle_ohfis4.png'} alt="Avatar preview" />
                                    </div>
                                </div>
                                <div className="two-columns-grid">
                                    <input type="text" name="facebookHandle" autoComplete="off" placeholder="Facebook handle" value={facebookHandle} onChange={e => setFacebookHandle(e.target.value)} />
                                    <input type="text" name="twitterHandle" autoComplete="off" placeholder="Twitter handle" value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)} />
                                </div>
                                <input type="text" name="websiteUrl" autoComplete="off" placeholder="Website Url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} />
                                <h2>Required fields</h2>
                                <input type="text" name="title" autoComplete="off" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                                <textarea style={{ width: 'calc(100% - 10px)'}} name="content" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                                <button type="submit" disabled={!formFilledOut}>Submit</button>
                            </form>
                        </>
                    )}
                    {success && (
                        <>
                            <div className="create-fan-post-form">
                                <p id="success">Successfully submitted your post. I'll get back to you when it's added to the site! - Tyler Henry</p>
                            </div>
                        </>
                    )}
                </CreateFanPostStyles>
            </div>
        </BodyStyles>
    )
}
