import React from 'react';
import { FanPosts } from '../components/FanPosts';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function FanPostsPage({ data }) {
    const fanPostsAvatar = data.image;
    const fanPosts = data.fanPosts.nodes;
    return (
        <>
            <SEO title="Fan Posts" />
            <FanPosts fanPostsAvatar={fanPostsAvatar} fanPosts={fanPosts} />
        </>
    )
}

export const query = graphql`
    query {
        image: sanitySiteImage(name: {eq: "Fan Posts Avatar"}) {
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
        fanPosts: allSanityFanPost {
            nodes {
                id
                title
                slug {
                    current
                }
                month
                day
                year
                firstName
                lastName
            }
        }
    }
`;