module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Harris Wittels Tribute Site","short_name":"harris-wittels-wiki","description":"Tribute site for comedian Harris Wittels. Browse his podcast appearances, tweets, foam corner jokes, & more. Share how his story & comedy affected your life.","lang":"en","icon":"static/favicon.png","start_url":"/","background_color":"#fefefe","theme_color":"#020202","display":"standalone","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"e9eb27c279e7806d6adddfef8efae788"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-142485528-10","head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
