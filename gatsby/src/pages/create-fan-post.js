import React from 'react';
import { CreateFanPost } from '../components/CreateFanPost';
import SEO from '../components/SEO';
import { graphql } from 'gatsby';

export default function CreateFanPostPage({ data }) {
    console.log(data);
    const createFanPostAvatar = data.image;
    return (
        <>
            <SEO title="Create Fan Post" />
            <CreateFanPost createFanPostAvatar={createFanPostAvatar} />
        </>
    )
}

export const query = graphql`
    query {
        image: sanitySiteImage(name: {eq: "Create Fan Post Avatar"}) {
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