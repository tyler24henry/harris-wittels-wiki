var plugins = [{
      plugin: require('/Users/tylerhenry/Desktop/harris-wittels-wiki/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/tylerhenry/Desktop/harris-wittels-wiki/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/tylerhenry/Desktop/harris-wittels-wiki/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"7iascstf","dataset":"production","watchMode":true,"token":"skjHNE6YIVgfTQWO170lAGejl8Rd1cj90Q06CSaOfbvBuXlJTk3Hy1IH1DHZMznpg0ug2WCPzYz5Hbk16TgLSxAXJ9EGVV6Fq7WnmzrILcNZLJ9IGuaqrnUxP2v0RyG9OQ5Po6atixniZYdPiJEPVLgDfDglKXmuSpWzDh1QJHtVEoiDSf6S"},
    },{
      plugin: require('/Users/tylerhenry/Desktop/harris-wittels-wiki/gatsby/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-142485528-10","head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0},
    },{
      plugin: require('/Users/tylerhenry/Desktop/harris-wittels-wiki/gatsby/node_modules/gatsby-plugin-hotjar/gatsby-ssr'),
      options: {"plugins":[],"includeInDevelopment":true,"id":2165761,"sv":6},
    },{
      plugin: require('/Users/tylerhenry/Desktop/harris-wittels-wiki/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
