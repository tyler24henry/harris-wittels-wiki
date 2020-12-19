import React from 'react';
import { About } from '../components/About';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function AboutPage({ data }) {
    const [tylerAvatar] = data.images.nodes.filter(image => image.name === 'Tyler Avatar');
    return (
        <>
            <SEO />
            <About tylerAvatar={tylerAvatar} />
        </>
    )
}

export const query = graphql`
    query {
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