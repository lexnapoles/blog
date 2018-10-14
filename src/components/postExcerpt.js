import React from 'react'
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

export default PostExcerpt
