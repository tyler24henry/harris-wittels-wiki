import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    pathPrefix: '/',
    siteMetadata: {
      title: `Harris Wittels`,
      siteUrl: 'https://www.harriswittels.wiki/',
      description: `Tribute site for the great Harris Wittels. Browse his podcast appearances, tweets, instagram posts, youtube videos, and more. If you are a fan of Harris's Phone/Foam Corner, you can check out our master list of foam jokes.`,
      image: '/favicon.png',
      twitter: '@tyler24henry',
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-styled-components',
      {
        resolve: 'gatsby-source-sanity',
        options: {
          projectId: '7iascstf',
          dataset: 'production',
          watchMode: true,
          token: process.env.SANITY_TOKEN,
        },
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: 'UA-142485528-10',
        },
      },
      {
        resolve: `gatsby-plugin-hotjar`,
        options: {
          includeInDevelopment: false, // optional parameter to include script in development
          id: 2165761,
          sv: 6,
        },
      },
      {
        resolve: `gatsby-plugin-disqus`,
        options: {
          shortname: `harris-wittels-wiki`
        }
      },
    ],
  };