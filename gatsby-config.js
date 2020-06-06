// const IMMUTABLE_CACHING_HEADER = `Cache-Control: public, max-age=31536000, immutable`

module.exports = {
  siteMetadata: {
    title: `2020 Police Brutality`,
    description: `Documenting evidence of police brutality during the 2020 George Floyd protests`,
    author: `Andrew Suzuki`,
    siteUrl: `https://blah`, // TODO
    sourceUrl: `https://github.com/andrewsuzuki/police-brutality-site`,
  },
  plugins: [
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `2020pb`,
        path: `${__dirname}/data/2020pb`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `2020 Police Brutality`,
        short_name: `2020PB`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `browser`,
        icon: `src/images/2020pblogo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`, // (siteMetadata.siteURL required)
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#fa625f`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          // TODO
          // "/:blah.js": [IMMUTABLE_CACHING_HEADER],
          // "/styles.:blah.css": [IMMUTABLE_CACHING_HEADER],
          // "/favicon-:blah.png?v=*": [IMMUTABLE_CACHING_HEADER],
        },
      },
    },
  ],
}
