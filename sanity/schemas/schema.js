// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
// Then we give our schema to the builder and provide the result to Sanity

import tweet from './tweet';
import siteImage from './siteImage';
import podcastAppearance from './podcastAppearance';
import harrisImage from './harrisImage';
import foam from './foam';
import bit from './bit';
import tribute from './tribute';
import wiki from './wiki';
import wikiValue from './wikiValue';
import masonry from './masonry';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([tweet, siteImage, podcastAppearance, harrisImage, foam, bit, tribute, wiki, wikiValue, masonry]),
});
