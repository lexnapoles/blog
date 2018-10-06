require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = require('./siteConfig')

module.exports = {
  siteMetadata: {
    title: config.title,
    author: config.author,
    description: config.description,
    siteUrl: config.siteUrl,
    rssMetadata: {
      site_url: config.siteUrl,
      feed_url: `${config.siteUrl}/rss.xml`,
      title: config.title,
      description: config.description,
      // image_url: `${config.siteUrl}${config.siteLogo}`,
      author: config.author,
      copyright: config.copyright,
    },
  },
  pathPrefix: '/blog',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-127080234-1`,
        respectDNT: true,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = 'GatsbyJS GCN Starter'
          return ret
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allContentfulBlogPost.edges.map(edge => ({
                date: edge.node.publishDate,
                title: edge.node.title,
                description:
                  edge.node.excerpt.childMarkdownRemark.internal.content,
                url: rssMetadata.site_url + '/' + edge.node.slug,
                guid: rssMetadata.site_url + '/' + edge.node.slug,
                custom_elements: [
                  {
                    'content:encoded': edge.node.body.childMarkdownRemark.html,
                  },
                ],
              }))
            },
            query: `
              {
                allContentfulBlogPost(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
                  edges {
                    node {
                      title
                      slug
                      publishDate(formatString: "DD MMMM, YYYY")
                      body {
                        childMarkdownRemark {
                          html
                        }
                      }
                      excerpt {
                        childMarkdownRemark {
                          internal {
                            content
                          }
                        }
                      }
                    }
                  }
                }
          }`,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alejandro Napoles Blog`,
        short_name: `Alejandro Napoles`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
