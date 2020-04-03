module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ["Catamaran"]
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FormulaD Companion App`,
        short_name: `FormulaD`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-offline`
  ]
}