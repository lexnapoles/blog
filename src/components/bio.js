import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const Bio = ({
  person: {
    node: { name, bio, twitter, github, image },
  },
}) => (
  <Flex>
    <Image src={image.file.url} alt={name} />
    <p>
      Written by <strong>{name}</strong>. {bio.bio}{' '}
      <a href={twitter}>Twitter</a> <a href={github}>Github</a>
    </p>
  </Flex>
)

Bio.propTypes = {
  person: PropTypes.shape({
    node: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.shape({
        bio: PropTypes.string.isRequired,
      }),
      twitter: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired,
      image: PropTypes.shape({
        file: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }),
}

export default Bio
