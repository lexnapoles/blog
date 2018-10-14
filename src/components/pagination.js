import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  padding-top: 2rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  a {
    border-radius: 2px;
    transition: 0.2s;
  }
`

const PreviousLink = styled(Link)`
  margin-right: auto;
  order: 1;
`

const NextLink = styled(Link)`
  margin-left: auto;
  order: 3;
`

const PageIndicator = styled.span`
  color: gray;
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: -1;
  opacity: 0.7;
`

const Pagination = ({ context: { numPages, currentPage, slug } }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const isNotPaginated = isFirst & isLast

  const prevPageNum = currentPage - 1 === 1 ? `` : currentPage - 1
  const nextPageNum = currentPage + 1

  const pathPrefix = typeof slug === 'string' ? `/tag/${slug}` : ''
  const prevPageLink = isFirst ? null : `${pathPrefix}/${prevPageNum}/`
  const nextPageLink = isLast ? null : `${pathPrefix}/${nextPageNum}/`

  return (
    <Wrapper>
      {!isFirst && (
        <PreviousLink to={prevPageLink}>&#8592; Prev Page</PreviousLink>
      )}
      {!isNotPaginated && (
        <PageIndicator>
          {currentPage} / {numPages}
        </PageIndicator>
      )}
      {!isLast && <NextLink to={nextPageLink}>Next Page &#8594;</NextLink>}
    </Wrapper>
  )
}

Pagination.propTypes = {
  context: PropTypes.shape({
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    slug: PropTypes.string,
  }).isRequired,
}

export default Pagination
