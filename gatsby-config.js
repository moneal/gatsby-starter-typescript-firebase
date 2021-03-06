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
const proxyFunctions = [
  ['frontendFunctionsPath', 'backendFunctionsPath']
]
let developMiddleware = () => {};

if (FIREBASE_PROJECT_ID && proxyFunctions) {
  developMiddleware = app => {
    proxyFunctions.forEach(([frontendPath, backendPath]) => {
      app.use(
        `/${frontendPath}`,
        proxy({
          target,
          pathRewrite: {
            "/auth": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE ||
              "us-central1"}/${backendPath || frontendPath}`,
          },
        })
      )
    })
  }
} else {
  console.warn('FIREBASE_PROJECT_ID env variable not found, skipping proxy setup');
}
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
  developMiddleware,
}
