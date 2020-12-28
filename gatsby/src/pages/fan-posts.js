import React from 'react';
import { FanPosts } from '../components/FanPosts';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function FanPostsPage({ data }) {
    const siteImages = data.images.nodes;
    const fanPosts = data.fanPosts.nodes;
    return (
        <>
            <SEO title="Fan Posts" />
            <FanPosts siteImages={siteImages} fanPosts={fanPosts} />
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