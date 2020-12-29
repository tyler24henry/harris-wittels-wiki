import React from 'react';
import { About } from '../components/About';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function AboutPage({ data }) {
    const tylerAvatar = data.image;
    return (
        <>
            <SEO title="About" />
            <About tylerAvatar={tylerAvatar} />
        </>
    )
}

export const query = graphql`
    query {
        image: sanitySiteImage(name: {eq: "Tyler Avatar"}) {
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