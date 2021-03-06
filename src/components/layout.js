import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'typeface-arvo'
import 'typeface-cabin'

import { rhythm } from '../utils/typography'
import License from './license'
import Header from './header'

const Container = styled.div`
  .gatsby-highlight {
    margin-bottom: ${rhythm(1)};
  }

  margin: 0 auto;
  max-width: ${rhythm(28)};
  padding: ${rhythm(1.5)};
`

const Layout = ({ location, children }) => (
  <Container>
    <Header location={location} />
    {children}
    <License />
  </Container>
)

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
}

export default Layout
