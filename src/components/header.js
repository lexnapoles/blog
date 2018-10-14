import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'

const H1 = styled.h1`
  ${scale(1)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;

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

const rootPathRegex = new RegExp(
  `^${__PATH_PREFIX__}\/$|${__PATH_PREFIX__}\/+\\d$|\\d/\$`
)

const isRootPath = location => location.pathname.match(rootPathRegex)

const Header = ({ location }) => {
  console.log(location.pathname)
  console.log(isRootPath(location))
 return isRootPath(location) ? (
    <H1>Alejandro Napoles</H1>
  ) : (
    <H2>
      <StyledLink to={'/'}>Alejandro Napoles</StyledLink>
    </H2>
  )
}

export default Header
