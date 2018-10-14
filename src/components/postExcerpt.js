import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { rhythm } from '../utils/typography'

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const StyledLink = styled(Link)`
  box-shadow: none;
`

const PostExcerpt = ({
  post: {
    node: { slug, title, publishDate, excerpt },
  },
}) => (
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

PostExcerpt.propTypes = {
  post: PropTypes.shape({
    node: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      excerpt: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }),
}

export default PostExcerpt
