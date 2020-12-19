import React from 'react';
import { Instagram } from '../components/Instagram';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function InstagramPage({ data }) {
    const [instagramAvatar] = data.images.nodes.filter(image => image.name === 'Instagram Avatar');
    const images = data.harrisImages.nodes;
    return (
        <>
            <SEO />
            <Instagram instagramAvatar={instagramAvatar} images={images} />
        </>
    )
}

export const query = graphql`
    query {
        harrisImages: allSanityHarrisImage(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                month
                day
                year
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                caption
                link
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