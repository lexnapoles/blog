import React from 'react'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'

const Image = styled.img`
  border-width: 0;
`

const Wrapper = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-flow: column;
  text-align: center;
  font-size: ${rhythm(0.5)};
`

const Link = styled.a`
  background-image: none;
`

const License = () => (
  <Wrapper>
    <Link rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
      <Image
        alt="Creative Commons Licence"
        src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"
      />
    </Link>
    <br />
    <span xmlnsdct="http://purl.org/dc/terms/" property="dct:title">
      alejandro napoles dot com by
    </span>
    <span
      xmlnscc="http://creativecommons.org/ns#"
      property="cc:attributionName"
    >
      Alejandro Napoles is licensed under a
    </span>
    <Link rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
      Creative Commons Attribution - ShareAlike 4.0 International License
    </Link>
  </Wrapper>
)

export default License
