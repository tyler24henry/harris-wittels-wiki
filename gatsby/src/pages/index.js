import React from 'react';
import { Home } from '../components/Home';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function HomePage({ data }) {
    const masonryItems = data.masonryItems.nodes;
    return (
        <>
            <SEO title="Tribute Site" />
            <Home masonryItems={masonryItems} />
        </>
    )
}

export const query = graphql`
    query {
        masonryItems: allSanityMasonry(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                quote
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