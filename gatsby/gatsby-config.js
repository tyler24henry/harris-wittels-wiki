import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    pathPrefix: '/',
    siteMetadata: {
      title: `Harris Wittels Tribute Site`,
      siteUrl: 'https://www.harriswittels.wiki/',
      description: `Tribute site for comedian Harris Wittels. Browse his podcast appearances, tweets, foam corner jokes, & more. Share how his story & comedy affected your life.`,
      image: '/favicon.png',
      twitter: '@ty24henry',
    },
    plugins: [
      'gatsby-plugin-styled-components',
      'gatsby-plugin-react-helmet',
      `gatsby-plugin-sitemap`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Harris Wittels Tribute Site`,
          short_name: `harris-wittels-wiki`,
          description: `Tribute site for comedian Harris Wittels. Browse his podcast appearances, tweets, foam corner jokes, & more. Share how his story & comedy affected your life.`,
          lang: `en`,
          icon: `static/favicon.png`,
          start_url: `/`,
          background_color: `#fefefe`,
          theme_color: `#020202`,
          display: `standalone`,
        },
      },
      `gatsby-plugin-offline`,
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
    ],
  };