import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'


import { rhythm, scale } from '../utils/typography'

const H1 = styled.h1`
  ${scale(1.5)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
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

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <H1 style={{ ...scale }}>
          <StyledLink to={'/'}>Alejandro Napoles</StyledLink>
        </H1>
      )
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
      </Container>
    )
  }
}

export default Template
