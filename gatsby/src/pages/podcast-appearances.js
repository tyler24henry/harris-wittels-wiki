import React from 'react';
import { PodcastAppearances } from '../components/PodcastAppearances';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function PodcastAppearancesPage({ data }) {
    const podcastAvatar = data.image;
    const appearances = data.appearances.nodes;
    return (
        <>
            <SEO title="Podcast Appearances" />
            <PodcastAppearances podcastAvatar={podcastAvatar} appearances={appearances} />
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
        image: sanitySiteImage(name: {eq: "Harris Last Farts Ep"}) {
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