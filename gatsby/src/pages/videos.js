import React from 'react';
import { Videos } from '../components/Videos';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function VideosPage({ data }) {
    const siteImages = data.images.nodes;
    const bits = data.bits.nodes;
    return (
        <>
            <SEO title="Videos" />
            <Videos siteImages={siteImages} bits={bits} />
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