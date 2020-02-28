import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { DiscussionEmbed } from 'disqus-react'
import Img from 'gatsby-image'
import {
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import { LinkedinIcon, RedditIcon, TwitterIcon } from 'react-share'

import Bio from '../components/bio'
import Layout from '../components/layout'
import PostLinks from '../components/postLinks'
import { rhythm, scale } from '../utils/typography'

const SOCIAL_ICON_SIZE = 30
const DISQUS_SHORTNAME = 'alejandronapoles'

const PublishDate = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-top: ${rhythm(-0.5)};
`

const HR = styled.hr`
  margin: ${rhythm(2)} 0;
`

const HeroImage = styled(Img)`
  margin-bottom: ${rhythm(2)};
`

const SocialLinks = styled.section`
  display: flex;
  justify-content: space-between;
  max-width: 100px;
  margin-bottom: ${rhythm(0.5)};
`

const BlogPostTemplate = ({
  data,
  location,
  pageContext: { previous, next },
}) => {
  const post = get(data, 'contentfulBlogPost')
  const { title: postTitle, heroImage } = post
  const siteTitle = get(data, 'site.siteMetadata.title')
  const siteDescription = get(data, 'site.siteMetadata.description')
  const authorTwitter = get(data, 'site.siteMetadata.userTwitter')

  const [author] = get(data, 'allContentfulPerson.edges')
  const url = location.href
  const disqusConfig = {
    identifier: post.contentul_id,
    title: postTitle,
  }

  const twitterCard = [
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: authorTwitter },
    { name: 'twitter:image', content: heroImage.fluid.srcWebp },
    { name: 'twitter:image:alt', content: heroImage.title },
    { name: 'twitter:description', content: post.excerpt.excerpt },
  ]

  const meta = [
    { name: 'description', content: siteDescription },
    ...twitterCard,
  ]

  return (
    <Layout location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={meta}
        title={`${postTitle} | ${siteTitle}`}
      />
      <h1>{postTitle}</h1>
      <PublishDate>{post.publishDate}</PublishDate>
      <SocialLinks>
        <TwitterShareButton url={url} title={postTitle}>
          <TwitterIcon size={SOCIAL_ICON_SIZE} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={postTitle}>
          <LinkedinIcon size={SOCIAL_ICON_SIZE} round />
        </LinkedinShareButton>
        <RedditShareButton url={url} title={postTitle}>
          <RedditIcon size={SOCIAL_ICON_SIZE} round />
        </RedditShareButton>
      </SocialLinks>
      {post.heroImage && (
        <HeroImage fluid={heroImage.fluid} alt={heroImage.title} />
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: post.body.childMarkdownRemark.html,
        }}
      />
      <HR />
      <PostLinks previous={previous} next={next} />
      <Bio person={author} />
      <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    previous: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
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
      heroImage {
        id
        title
        fluid(maxWidth: 500) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      excerpt {
        excerpt
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
            id
            fixed(width: 65) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
          twitter
          github
        }
      }
    }
  }
`
