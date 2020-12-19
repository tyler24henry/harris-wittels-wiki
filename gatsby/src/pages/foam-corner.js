import React from 'react';
import { FoamCorner } from '../components/FoamCorner';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function FoamCornerPage({ data }) {
    const siteImages = data.images.nodes;
    const allFoam = data.allFoam.nodes;
    return (
        <>
            <SEO />
            <FoamCorner siteImages={siteImages} allFoam={allFoam} />
        </>
    )
}

export const query = graphql`
    query {
        allFoam: allSanityFoam(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                content
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