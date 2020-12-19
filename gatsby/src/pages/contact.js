import React from 'react';
import { Contact } from '../components/Contact';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function ContactPage({ data }) {
    const [contactAvatar] = data.images.nodes.filter(image => image.name === 'Contact Avatar');
    return (
        <>
            <SEO />
            <Contact contactAvatar={contactAvatar} />
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