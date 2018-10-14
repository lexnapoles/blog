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

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const StyledLink = styled(Link)`
  box-shadow: none;
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    const pageContext = get(this, 'props.pageContext')
    const { currentPage } = pageContext
    const isFirstPage = currentPage === 1

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${siteTitle} - Page ${currentPage}`}
        />
        {isFirstPage
          ? posts
            .slice(1)
            .map(({ node: { slug, title, publishDate, excerpt } }) => (
              <div key={slug}>
                <Title>
                  <StyledLink to={slug}>{title}</StyledLink>
                </Title>
                <small>{publishDate}</small>
                <div
                  dangerouslySetInnerHTML={{
                    __html: excerpt.childMarkdownRemark.html,
                  }}
                />
              </div>
            ))
          : posts.map(({ node: { slug, title, publishDate, excerpt } }) => {
            return (
              <div key={slug}>
                <Title>
                  <StyledLink to={slug}>{title}</StyledLink>
                </Title>
                <small>{publishDate}</small>
                <div
                  dangerouslySetInnerHTML={{
                    __html: excerpt.childMarkdownRemark.html,
                  }}
                />
              </div>
            )
          })}
        <Pagination context={pageContext} />
      </Layout>
    )
  }
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
