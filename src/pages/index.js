import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

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

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {posts.map(({ node }) => {
          const title = node.title
          return (
            <div key={node.slug}>
              <Title>
                <StyledLink to={node.slug}>{title}</StyledLink>
              </Title>
              <small>{node.publishDate}</small>
              <div
                dangerouslySetInnerHTML={{
                  __html: node.excerpt.childMarkdownRemark.html,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
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
