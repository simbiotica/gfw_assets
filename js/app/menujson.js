// https://cdn.rawgit.com/simbiotica/gfw_assets/0612702e5ec4cc8e1cc75c4a4a63c8274f7ea870/js/build/production.js
window.GFW = window.GFW || {};
window.GFW.NavBar = window.GFW.NavBar || {};

(function(gfw) {

  gfw.menujsonGFW = {
    'default' : [{
        name: 'Explore',
        link: '/explore',
        submenu: [{
          name: 'GFW Interactive Map',
          link: '/map',
        },{
          name: 'Country Profiles &amp; Rankings',
          link: '/countries',
        },{
          name: 'Commodities',
          link: 'http://commodities.globalforestwatch.org/',
          classname: 'mobile-friendly', 
        },{
          name: 'Fires',
          link: 'http://fires.globalforestwatch.org/',
          classname: 'mobile-friendly', 
        },{
          name: 'Climate',
          link: 'http://climate.globalforestwatch.org/',
          classname: 'mobile-friendly', 
        },{
          name: 'All applications',
          link: '/explore',
        },{
          name: 'Open Data Portal',
          link: 'http://data.globalforestwatch.org/',
          classname: 'mobile-friendly', 
        }]
      },{
        name: 'Stay informed',
        link: '/stayinformed',
        submenu: [{
          name: 'Blog',
          link: 'http://blog.globalforestwatch.org/',
        },{
          name: 'Crowdsourced stories',
          link: '/stayinformed/crowdsourced-stories',
        },{
          name: 'Newsletter',
          link: 'http://www.wri.org/global-forest-watch-stay-informed',
          target: '_blank',
        },{
          name: 'Publications',
          link: '/stayinformed/publications',
        }]
      },{
        name: 'Get Involved',
        link: '/getinvolved',
        submenu: [{
          name: 'Develop your own app',
          link: '/getinvolved/develop-your-own-app',
        },{
          name: 'Submit a story',
          link: '/stories/new',
        },{
          name: 'Share data',
          link: '/getinvolved/share-data',
        },{
          name: 'Help improve data',
          link: '/getinvolved/help-improve-data',
        },{
          name: 'Join the discussion',
          link: 'https://groups.google.com/forum/#!forum/globalforestwatch',
          target: '_blank',
        },{
          name: 'Apply to the Small Grants Fund',
          link: '/getinvolved/apply-to-the-small-grants-fund',
        },{
          name: 'Provide feedback',
          link: '/getinvolved/provide-feedback',
          classname: 'feedback-link',
        },{
          name: 'Help improve translations',
          link: '/getinvolved/help-improve-translations',
        }]
      },{
        name: 'How to',
        link: '/howto',
        submenu: [{
          name: 'Visualize data',
          link: '/howto/view-data',
        },{
          name: 'View statistics',
          link: '/howto/view-statistics',
        },{
          name: 'Analyze forest change',
          link: '/howto/analyze-forest-change',
        },{
          name: 'Subscribe to alerts and user stories',
          link: '/howto/subscribe-to-alerts-and-user-stories',
        },{
          name: 'Submit a story',
          link: '/howto/submit-a-story',
        },{
          name: 'Open Data Portal',
          link: '/howto/odp',
        },{
          name: 'FAQs',
          link: '/howto/faqs',
        },{
          name: 'Training modules',
          link: '/howto/training-modules',
        }]
      },{
        name: 'About',
        link: '/about',
        submenu: [{
          name: 'About GFW',
          link: '/about/about-gfw',
        },{
          name: 'The GFW partnership',
          link: '/about/the-gfw-partnership',
        },{
          name: 'Videos',
          link: '/about/videos',
        },{
          name: 'Awards &amp; testimonials',
          link: '/about/awards_and_testimonials',
        },{
          name: 'Data policy',
          link: '/about/data_policy',
        },{
          name: 'Contact us',
          link: '/about/contact-us',
        }]
      }
    ],

    'climate' : [{
        name: 'Map',
        link: '/map',
      },{
        name: 'Country profiles',
        link: '/countries',
      },{
        name: 'Country comparisons',
        link: '/compare-countries',
      },{
        name: 'Pantropical overview',
        link: '/pantropical',
      },{
        name: 'About',
        link: '/about',
      }
    ],

    'howto' : [
      {
        name: 'Search by theme',
        link: '',
        submenu: [
          {
            name: "Visualize data",
            link: "/gfw-howto/themes/visualize-data"
          },
          {
            name: "View statistics",
            link: "/gfw-howto/themes/view-statistics"
          },
          {
            name: "Analyze data",
            link: "/gfw-howto/themes/analyze-data"
          },
          {
            name: "Suscribe to alerts",
            link: "/gfw-howto/themes/suscribe-to-alerts"
          },
          {
            name: "Submit a story",
            link: "/gfw-howto/themes/submit-a-story"
          },
          {
            name: "Tutorial videos",
            link: "/gfw-howto/themes/tutorial-videos"
          },
          {
            name: "Webinars",
            link: "/gfw-howto/themes/webinars"
          },
          {
            name: "Training modules",
            link: "/gfw-howto/themes/training-modules"
          },
          {
            name: "FAQ's",
            link: "/gfw-howto/faqs"
          }
        ]
      },
      {
        name: 'Search by app',
        link: '',
        submenu: [
          {
            name: "Gfw",
            link: "/gfw-howto/apps/gfw"
          },
          {
            name: "Climate",
            link: "/gfw-howto/apps/climate"
          },
          {
            name: "Fires",
            link: "/gfw-howto/apps/fires"
          },
          {
            name: "Commodities",
            link: "/gfw-howto/apps/commodities"
          }
        ]
      }

    ]

  };

})(window.GFW.NavBar);

