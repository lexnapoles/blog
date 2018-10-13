import React from 'react'
import get from 'lodash/get'

// Import typefaces
import 'typeface-arvo'
import 'typeface-cabin'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    const {
      node: { name, bio, twitter, github, image },
    } = this.props.person

    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={image.file.url}
          alt={name}
          style={{
            marginRight: rhythm(1),
            marginBottom: 0,
            width: rhythm(3),
            height: rhythm(3),
            borderRadius: rhythm(3),
          }}
        />
        <p>
          Written by <strong>{name}</strong>. {bio.bio}{' '}
          <a href={twitter}>Twitter</a>{' '}
          <a href={github}>Github</a>
        </p>
      </div>
    )
  }
}

export default Bio
