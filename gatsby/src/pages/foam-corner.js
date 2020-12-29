import React from 'react';
import { FoamCorner } from '../components/FoamCorner';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function FoamCornerPage({ data }) {
    const foamAvatar = data.image;
    const allFoam = data.allFoam.nodes;
    return (
        <>
            <SEO title="Foam Corner" />
            <FoamCorner foamAvatar={foamAvatar} allFoam={allFoam} />
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
        image: sanitySiteImage(name: {eq: "Foam Corner Avatar"}) {
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