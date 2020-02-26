import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { rhythm } from '../utils/typography'

const Flex = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1)};
`

const BioText = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const Image = styled(Img)`
  margin-right: ${rhythm(0.5)};
  margin-bottom: 0;
  border-radius: 50%;
`

const BioLinks = styled.span`
  margin-top: -${rhythm(0.5)};
`

const Bio = ({
  person: {
    node: { name, bio, twitter, github, image },
  },
}) => (
  <Flex>
    <Image fixed={image.fixed} alt={name} />
    <BioText>
      <p>
        Written by <strong>{name}</strong>. {bio.bio}{' '}
      </p>
      <BioLinks>
        <a href={twitter}>Twitter</a> <a href={github}>Github</a>
      </BioLinks>
    </BioText>
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
        id: PropTypes.string.isRequired,
        fixed: PropTypes.shape({ srcWebp: PropTypes.string.isRequired }),
      }).isRequired,
    }),
  }),
}

export default Bio
