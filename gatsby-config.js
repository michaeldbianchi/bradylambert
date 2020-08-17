module.exports = {
  siteMetadata: {
    title: `Brady Lambert`,
    author: `Brady Lambert`,
    description: `Brady Lambert's personal website.`,
    siteUrl: `https://bradylambert.com`,
    social: {
      github: `https://github.com/lambertbrady`,
      email: `lambertbrady14@gmail.com`
    },
    navLinks: [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'About',
        path: '/about'
      },
      {
        name: 'Contact',
        path: '/contact'
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 600
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`
      }
    },
    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-ramda`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-theme-style-guide`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`
  ]
}
