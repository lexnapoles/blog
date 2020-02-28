import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Pagination from '../components/pagination'
import PostExcerpt from '../components/postExcerpt'

const BlogIndex = ({ data, pageContext, location }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const siteDescription = get(data, 'site.siteMetadata.description')

  const posts = get(data, 'allContentfulBlogPost.edges')
  const { currentPage } = pageContext

  return (
    <Layout location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          {
            name: `description`,
            content: siteDescription,
          },
          {
            property: `og:title`,
            content: siteTitle,
          },
          {
            property: `og:description`,
            content: siteDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
        ]}
        title={`${siteTitle} - Page ${currentPage}`}
      />
      {posts.map(post => (
        <PostExcerpt key={post.node.slug} post={post} />
      ))}
      <Pagination context={pageContext} />
    </Layout>
  )
}

export default BlogIndex

BlogIndex.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          excerpt {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
