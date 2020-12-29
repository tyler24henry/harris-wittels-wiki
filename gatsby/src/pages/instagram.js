import React from 'react';
import { Instagram } from '../components/Instagram';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function InstagramPage({ data }) {
    const instagramAvatar = data.image;
    const images = data.harrisImages.nodes;
    return (
        <>
            <SEO title="Instagram Posts" />
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
        image: sanitySiteImage(name: {eq: "Instagram Avatar"}) {
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