module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Harris Wittels Wiki","short_name":"harris-wittels-wiki","description":"Tribute site for the great Harris Wittels. Browse his podcast appearances, tweets, instagram posts, youtube videos, and more. If you are a fan of Harris's Phone/Foam Corner, you can check out our master list of foam jokes.","lang":"en","icon":"static/favicon.png","start_url":"/","background_color":"#fefefe","theme_color":"#020202","display":"standalone","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"e9eb27c279e7806d6adddfef8efae788"},
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
