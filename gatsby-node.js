const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const config = require('./siteConfig')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const homePage = path.resolve(`./src/templates/index.js`)

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(
              sort: { fields: [publishDate], order: DESC }
              limit: 10000
            ) {
              edges {
                node {
                  title
                  slug
                  publishDate
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allContentfulBlogPost.edges
        const postsPerPage = config.postsPerPage
        const numPages = Math.ceil(posts.length / postsPerPage)

        // Create additional pagination on home page if needed
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/' : `/${i + 1}`,
            component: homePage,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })

        posts.forEach((post, i) => {
          const previous = i === 0 ? null : posts[i - 1].node
          const next = i === posts.length - 1 ? null : posts[i + 1].node

          createPage({
            path: `/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}
