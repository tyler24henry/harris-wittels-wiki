import React from 'react';
import { Youtube } from '../components/Youtube';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function YoutubePage({ data }) {
    const siteImages = data.images.nodes;
    const bits = data.bits.nodes;
    return (
        <>
            <SEO />
            <Youtube siteImages={siteImages} bits={bits} />
        </>
    )
}

export const query = graphql`
    query {
        bits: allSanityBit(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                title
                thumbnail {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                youtubeUrl
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