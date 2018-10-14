import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import 'typeface-arvo'
import 'typeface-cabin'

import { rhythm, scale } from '../utils/typography'
import License from './license'

const H1 = styled.h1`
  ${scale(1)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
  overflow-wrap: break-word;

  @media (min-width: 536px) {
    ${scale(1.5)};
  }
`

const H2 = styled.h2`
  margin-top: 0;
  margin-bottom: ${rhythm(-1)};
`

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: under;
  color: inherit;
`

const Container = styled.div`
  .gatsby-highlight {
    margin-bottom: ${rhythm(1)};
  }

  margin: 0 auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)};
`

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}\/`
    let header
    const rootPathRegex = new RegExp(`${rootPath}$|${rootPath}(.\d)\/$`, 'gi')
    

    console.log('rootPath', rootPath)
    console.log('pathname', location.pathname)
    console.log('match', location.pathname.match(rootPathRegex))
    if (location.pathname.match(rootPathRegex)) {
      header = <H1 style={{ ...scale }}>Alejandro Napoles</H1>
    } else {
      header = (
        <H2>
          <StyledLink to={'/'}>Alejandro Napoles</StyledLink>
        </H2>
      )
    }
    return (
      <Container>
        {header}
        {children}
        <License />
      </Container>
    )
  }
}

export default Layout
