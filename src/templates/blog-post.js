import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { DiscussionEmbed } from 'disqus-react'

import Bio from '../components/bio'
import Layout from '../components/layout'
import PostLinks from '../components/postLinks'
import { rhythm, scale } from '../utils/typography'

const PublishDate = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-0.5)};
`

const HR = styled.hr`
  margin: ${rhythm(2)} 0;
`

const BlogPostTemplate = ({
  data,
  location,
  pageContext: { previous, next },
}) => {
  const post = get(data, 'contentfulBlogPost')
  const siteTitle = get(data, 'site.siteMetadata.title')
  const siteDescription = get(data, 'site.siteMetadata.description')
  const [author] = get(data, 'allContentfulPerson.edges')

  const disqusShortname = 'alejandronapoles'
  const disqusConfig = {
    identifier: post.contentul_id,
    title: post.title,
  }

  return (
    <Layout location={location}>
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
      <PostLinks previous={previous} next={next} />
      <Bio person={author} />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    previous: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    next: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
