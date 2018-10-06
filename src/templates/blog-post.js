import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = get(this.props, 'data.site.siteMetadata.description')
    const [author] = get(this.props, 'data.allContentfulPerson.edges')
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.title} | ${siteTitle}`}
        />
        <h1>{post.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.publishDate}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio person={author} />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
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