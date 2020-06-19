const { createProxyMiddleware: proxy } = require("http-proxy-middleware")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const target = "http://localhost:5001"
const { FIREBASE_PROJECT_ID, FIREBASE_APP_ZONE } = process.env

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `My typescript firebase site`,
    description: ``,
    author: ``,
  },
  plugins: [
    'gatsby-plugin-scss-typescript',
    `gatsby-plugin-typescript`,
  ],
  developMiddleware: app => {

    app.use(
      "/frontendFunctionsPath",
      proxy({
        target,
        pathRewrite: {
          "/auth": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE ||
            "us-central1"}/backendFunctionsPath`,
        },
      })
    )

  },
}
