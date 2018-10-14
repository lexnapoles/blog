import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 3rem;
  a {
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
  }
`

const PreviousLink = styled(Link)`
  margin-right: auto;
  order: 1;
`

const NextLink = styled(Link)`
  margin-left: auto;
  order: 2;
`

const PostLinks = ({ previous, next }) => (
  <Wrapper>
    {previous && (
      <PreviousLink to={`/${previous.slug}`}>&#8592; Prev Post</PreviousLink>
    )}
    {next && <NextLink to={`/${next.slug}`}>Next Post &#8594;</NextLink>}
  </Wrapper>
)

PostLinks.propTypes = {
  previous: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  next: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostLinks
