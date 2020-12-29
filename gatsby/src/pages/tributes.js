import React from 'react';
import { Tributes } from '../components/Tributes';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function TributesPage({ data }) {
    const tributesAvatar = data.image;
    const tributes = data.tributes.nodes;
    return (
        <>
            <SEO title="Tributes" />
            <Tributes tributesAvatar={tributesAvatar} tributes={tributes} />
        </>
    )
}

export const query = graphql`
    query {
        tributes: allSanityTribute(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                title
                link
                _createdAt
            }
        }
        image: sanitySiteImage(name: {eq: "Tribute Avatar"}) {
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