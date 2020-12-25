import React from 'react';
import { Twitter } from '../components/Twitter';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function TwitterPage({ data }) {
    const tweets = data.tweets.nodes;
    const [harrisAvatar] = data.images.nodes.filter(image => image.name === 'Harris Twitter Avatar');
    return (
        <>
            <SEO title="Twitter" />
            <Twitter tweets={tweets} harrisAvatar={harrisAvatar} />
        </>
    )
}

export const query = graphql`
    query {
        tweets: allSanityTweet(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                month
                day
                year
                content
                link
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                youtubeUrl
                replyingTo
                isRetweet
                retweetAvatar {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                retweetName
                retweetHandle
                _createdAt
            }
        }
        images: allSanitySiteImage {
            nodes {
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
    }
`;