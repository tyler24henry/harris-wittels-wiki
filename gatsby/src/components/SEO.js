import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitter
        }
      }
    }
  `);

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" href="/favicon.png" />
      {/* Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      <link rel="canonical" href={site.siteMetadata.siteUrl} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.twitter} />
      <meta name="twitter:title" content={title || site.siteMetadata.title} />
      <meta name="twitter:description" content={description || site.siteMetadata.description} />
      <meta name="twitter:image" content={image || '/favicon.png'} />
      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/favicon.png'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        propery="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description || site.siteMetadata.description} key="ogdesc" />
      <script type="text/javascript" src="https://t.mentioned.app/track/track.js" id="mentioned-by-script" token="rcDxWM3pI-TwONBCwqvneTf2rfMNo3__YsOByFq3175VjOearNg4BV9x3druO3C4mmU" host="www.harriswittels.wiki"></script>
      {children}
    </Helmet>
  );
}