import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { DiscussionEmbed } from 'disqus-react'

import Bio from '../components/bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const PublishDate = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-0.5)};
`

const HR = styled.hr`
  margin: ${rhythm(2)} 0;
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = get(
      this.props,
      'data.site.siteMetadata.description'
    )
    
    const disqusShortname = 'alejandronapoles'
    const disqusConfig = {
      identifier: post.contentul_id,
      title: post.title,
    }

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
        <PublishDate>{post.publishDate}</PublishDate>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
        <HR />
        <Bio person={author} />
        <ListContainer>
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
        </ListContainer>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
      contentful_id
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "798aKfwJQQy2cym4ogygGo" } }
    ) {
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
