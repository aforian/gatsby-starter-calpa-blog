const tailwindcss = require('tailwindcss');
const { config } = require('./data');

require('dotenv').config();

const algoliaQueries = require('./src/utils/algolia-queries');

const {
  url, title, author, gaTrackId,
} = config;

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title,
    description: title,
    siteUrl: url,
    author,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          gaTrackId, // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          tailwindcss,
        ],
      },
    },
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-webpack-bundle-analyser-v2',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['webp'],
          placeholder: 'blurred',
          quality: 50,
          breakpoints: [350, 750, 1080, 1366],
          backgroundColor: 'transparent',
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'staticImages',
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'staticImages',
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              wrapperStyle: () => 'width: 100%',
              srcSetBreakpoints: [350, 750, 1000],
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout/layout.js'),
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://8a4706349eb5491a84671b2dd55f3dfa@sentry.io/1878116',
        environment: process.env.NODE_ENV,
        enabled: (() => ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: title,
        short_name: author,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#14B8A6',
        display: 'standalone',
        icons: [
          {
            src: '/favicons/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/favicons/favicon-310x310.png',
            sizes: '310x310',
            type: 'image/png',
          },
        ],
      },
    },
    // 'gatsby-plugin-offline', // put this after gatsby-plugin-manifest
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: algoliaQueries,
        enablePartialUpdates: true,
        matchFields: ['modified'],
      },
    },
    'gatsby-plugin-netlify', // make sure to put last in the array
  ],
};
