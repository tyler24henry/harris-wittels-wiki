import React from 'react';
import { PodcastAppearances } from '../components/PodcastAppearances';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function PodcastAppearancesPage({ data }) {
    const siteImages = data.images.nodes;
    const appearances = data.appearances.nodes;
    return (
        <>
            <SEO />
            <PodcastAppearances siteImages={siteImages} appearances={appearances} />
        </>
    )
}

export const query = graphql`
    query {
        appearances: allSanityPodcastAppearance(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                month
                day
                year
                podcastTitle
                episodeTitle
                host
                link
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