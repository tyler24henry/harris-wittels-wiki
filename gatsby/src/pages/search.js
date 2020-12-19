import React from 'react';
import { Search } from '../components/Search';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function SearchPage({ data, location }) {
    const siteImages = data.images.nodes;
    let appearances = data.appearances.nodes;
    let tweets = data.tweets.nodes;
    let harrisImages = data.harrisImages.nodes;
    let bits = data.bits.nodes;
    let allFoam = data.allFoam.nodes;
    let tributes = data.tributes.nodes;

    let searchTerm = location ? location.search : null;
    if(searchTerm.length > 3 && searchTerm.charAt(2) === '='){
        searchTerm = searchTerm.slice(3);
    } else {
        searchTerm = null;
    }

    if(searchTerm){
        const regex = new RegExp(searchTerm.toLowerCase());
        appearances = appearances.filter(appearance => {
            const match = regex.test(appearance.podcastTitle.toLowerCase()) || regex.test(appearance.episodeTitle.toLowerCase());
            return match;
        });
        tweets = tweets.filter(tweet => {
            const match = regex.test(tweet.content.toLowerCase());
            return match;
        });
        harrisImages = harrisImages.filter(harrisImage => {
            const match = regex.test(harrisImage.caption.toLowerCase());
            return match;
        });
        bits = bits.filter(bit => {
            const match = regex.test(bit.title.toLowerCase());
            return match;
        });
        allFoam = allFoam.filter(foam => {
            const match = regex.test(foam.content.toLowerCase());
            return match;
        });
        tributes = tributes.filter(tribute => {
            const match = regex.test(tribute.title.toLowerCase());
            return match;
        });
    }

    return (
        <>
            <SEO />
            <Search siteImages={siteImages} appearances={appearances} tweets={tweets} harrisImages={harrisImages} bits={bits} allFoam={allFoam} tributes={tributes} searchTerm={searchTerm} />
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
        tweets: allSanityTweet(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                month
                day
                year
                content
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                youtubeUrl
                replyingTo
                isRetweet
                retweetAvatar {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                retweetName
                retweetHandle
                _createdAt
            }
        }
        harrisImages: allSanityHarrisImage(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                month
                day
                year
                image {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                caption
                link
                _createdAt
            }
        }
        bits: allSanityBit(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                title
                thumbnail {
                    asset {
                        fluid {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                youtubeUrl
                _createdAt
            }
        }
        allFoam: allSanityFoam(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                content
                _createdAt
            }
        }
        tributes: allSanityTribute(sort: {fields: _createdAt, order: ASC}) {
            nodes {
                id
                title
                link
                _createdAt
            }
        }
    }
`;