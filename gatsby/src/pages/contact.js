import React from 'react';
import { Contact } from '../components/Contact';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function ContactPage({ data }) {
    const contactAvatar = data.image;
    return (
        <>
            <SEO title="Contact" />
            <Contact contactAvatar={contactAvatar} />
        </>
    )
}

export const query = graphql`
    query {
        image: sanitySiteImage(name: {eq: "Contact Avatar"}) {
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