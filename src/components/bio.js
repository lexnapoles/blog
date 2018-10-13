import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

// Import typefaces
import 'typeface-arvo'
import 'typeface-cabin'

import { rhythm } from '../utils/typography'

const Flex = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`

const Image = styled.img`
  margin-right: ${rhythm(1)};
  margin-bottom: 0;
  width: ${rhythm(3)};
  height: ${rhythm(3)};
  border-radius: ${rhythm(3)};
`

class Bio extends React.Component {
  render() {
    const {
      node: { name, bio, twitter, github, image },
    } = this.props.person

    return (
      <Flex>
        <Image
          src={image.file.url}
          alt={name}
        />
        <p>
          Written by <strong>{name}</strong>. {bio.bio}{' '}
          <a href={twitter}>Twitter</a>{' '}
          <a href={github}>Github</a>
        </p>
      </Flex>
    )
  }
}

export default Bio
