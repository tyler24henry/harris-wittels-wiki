import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    pathPrefix: '/discover-comedy',
    siteMetadata: {
      title: `Discover comedy`,
      siteUrl: 'http://www.discover-comedy.com',
      description: `Find your next favorite comedian.`,
      image: '/favicon.png',
      twitter: '@ty24henry',
    },
    // plugins: [
    //   'gatsby-plugin-react-helmet',
    //   'gatsby-plugin-styled-components',
    //   {
    //     resolve: 'gatsby-source-sanity',
    //     options: {
    //       projectId: 'baqa90qc',
    //       dataset: 'production',
    //       watchMode: true,
    //       token: process.env.SANITY_TOKEN,
    //     },
    //   },
    // ],
  };