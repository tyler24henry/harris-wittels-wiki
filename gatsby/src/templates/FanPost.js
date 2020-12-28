import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Disqus } from 'gatsby-plugin-disqus';
import { BodyStyles } from '../styles/BodyStyles';
import { graphql, Link } from 'gatsby';
import { VscCalendar } from 'react-icons/vsc';
import { FiChevronLeft, FiExternalLink } from 'react-icons/fi';
import { AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import SEO from '../components/SEO';

export const FanPostStyles = styled.div`
    .post {
        padding: 1rem 1.5rem 2rem 1.5rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
        @media (max-width: 414px) {
            padding: 1rem 1.25rem;
        }
        p {
            color: var(--black);
            white-space: pre-wrap;
            font-size: 1.5rem;
            letter-spacing: 0.05rem;
            @media(max-width: 414px){
                font-size: 1.3rem;
            }
        }
    }
`;

export default function FanPost ({ data }) {
    const fanPost = data.fanPost;
    const fanPostAvatar = data.image;

    const date = `${fanPost.month} ${fanPost.day}, ${fanPost.year}`;
    let name = fanPost.firstName;
    if(fanPost.lastName){
        name = `${fanPost.firstName} ${fanPost.lastName}`;
    }

    let disqusConfig = {
        url: `https://www.harriswittels.wiki/fan-post/${fanPost.slug.current}`,
        identifier: fanPost.id,
        title: fanPost.title,
    }

    return (
        <BodyStyles>
            <SEO title={`${fanPost.title} - Fan Post`} />
            <div className="page-wrapper">
                <div className="background-image" id="fan-posts-background">
                    <Link to="/fan-posts" className="back-to-fan-posts">
                        <FiChevronLeft />
                        <span id="fan-posts">Fan posts</span>
                    </Link>
                </div>
                <div className="page-details-wrapper">
                    <div className="avatar-search-phrase-grid" id="avatar-phrase-only">
                        <Img className="avatar" fluid={fanPost.image ? fanPost.image.asset.fluid : fanPostAvatar.image.asset.fluid} alt="Avatar" />
                        <button className="phrase-btn" id="sharin" type="button">Fan post</button>
                    </div>
                    <div id="page-title-wrapper">
                        <h1>{fanPost.title}</h1>
                    </div>
                    <div className="details-wrapper">
                        <VscCalendar className="calendar" />
                        <p className="details">{date} by {name}</p>
                        <div className="connect-social-wrapper">
                            {fanPost.facebookUrl && (
                                <a href={fanPost.facebookUrl} target="_blank"><AiFillFacebook id="facebook" /></a>
                            )}
                            {fanPost.twitterUrl && (
                                <a href={fanPost.twitterUrl} target="_blank"><AiOutlineTwitter id="twitter" /></a>
                            )}
                            {fanPost.websiteUrl && (
                                <a href={fanPost.websiteUrl} target="_blank"><FiExternalLink id="website" /></a>
                            )}
                        </div>
                    </div>
                </div>
                <FanPostStyles>
                    <div className="post">
                        <p className="content">{fanPost.content}</p>
                    </div>
                </FanPostStyles>
            </div>
            <div className="disqus-wrapper">
                <Disqus config={disqusConfig} />
            </div>
        </BodyStyles>
    )
}

export const query = graphql`
  query($slug: String!) {
    fanPost: sanityFanPost(slug: { current: { eq: $slug }}) {
        id
        month
        day
        year
        title
        slug {
            current
        }
        content
        firstName
        lastName
        email
        image {
            asset {
                fluid {
                    ...GatsbySanityImageFluid
                }
            }
        }
        facebookUrl
        twitterUrl
        websiteUrl
        _createdAt
    }
    image: sanitySiteImage(name: {eq: "Fan Post Default Avatar"}) {
        id
        name
        image {
            asset {
                fluid {
                    ...GatsbySanityImageFluid
                }
            }
        }
    }
  }
`;