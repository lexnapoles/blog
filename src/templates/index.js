import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import 'typeface-arvo'
import 'typeface-cabin'

import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import Pagination from '../components/pagination'
import PostExcerpt from '../components/postExcerpt'

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const StyledLink = styled(Link)`
  box-shadow: none;
`

const BlogIndex = ({ data, pageContext, location }) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const siteDescription = get(data, 'site.siteMetadata.description')
  const posts = get(data, 'allContentfulBlogPost.edges')
  const { currentPage } = pageContext

  const isFirstPage = currentPage === 1

  return (
    <Layout location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={`${siteTitle} - Page ${currentPage}`}
      />
      {isFirstPage
        ? posts.slice(1).map(post => <PostExcerpt post={post} />)
        : posts.map(post => <PostExcerpt post={post} />)}
      <Pagination context={pageContext} />
    </Layout>
  )
}

export default BlogIndex

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
