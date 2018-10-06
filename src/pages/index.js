import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')

    console.log(this.props)

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio person={author} />
        {posts.map(({ node }) => {
          const title = node.title
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.publishDate}</small>
              <p
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
    allContentfulPerson(filter: { contentful_id: { eq: "798aKfwJQQy2cym4ogygGo" } }) {
      edges {
        node {
          name
          bio {
            bio
          }
          image {
            file {
              url
            }
          }
          twitter
          github
        }
      }
    }
  }

`
