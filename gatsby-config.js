module.exports = {
  siteMetadata: {
    title: `2020 Police Brutality`,
    description: `Documenting evidence of police brutality during the 2020 George Floyd protests`,
    author: `Andrew Suzuki`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
  ],
}
