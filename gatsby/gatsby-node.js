import path from 'path';

async function turnFanPostsIntoPages({ graphql, actions }){
    const fanPostTemplate = path.resolve('./src/templates/FanPost.js');
    const { data } = await graphql(`
        query {
            fanPosts: allSanityFanPost {
                nodes {
                    id
                    title
                    slug {
                        current
                    }
                }
            }
        }
    `);
    data.fanPosts.nodes.forEach(fanPost => {
        actions.createPage({
            path: `fan-post/${fanPost.slug.current}`,
            component: fanPostTemplate,
            context: {
                slug: fanPost.slug.current,
            }
        })
    })
}

export async function createPages(params) {
    await Promise.all([
        turnFanPostsIntoPages(params),
    ])
}