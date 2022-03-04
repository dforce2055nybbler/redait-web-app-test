require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `RedAIT APP`,
    description: `App de la RedAIT.`,
    author: `REDIT`,
    dev: `Diego Pérez <dperez2055@gmail.com>`,
    siteUrl: `http://redargentinait.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-apollo`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include:  /images\/.*\.svg/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto:700,600,500,400,300'],
        },
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [
          `markets`,
          `companies`,
          `technologies`,
          `verticals`,
          `programming-langs`,
          `types-opportunites`,
          `experience-years`,
          `vacancies-types`,
          `services`,
          `products`,
          `talents`,
          `partnerships`,
          `opportunities`,
          `business-opportunities`,
          `events`,
          `types-opportunites`,
        ],
        // singleTypes: [`home-page`, `contact`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `red argentina it`,
        short_name: `redait`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'redait-test-frontend',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
