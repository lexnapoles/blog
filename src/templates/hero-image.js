import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

export default function HeroImage({ post }) {
  const { heroImage } = post

  return heroImage ? (
    <Hero fluid={heroImage.fluid} alt={heroImage.title} />
  ) : null
}

HeroImage.propTypes = {
  post: PropTypes.shape({
    heroImage: PropTypes.shape({
      fluid: PropTypes.objectOf(PropTypes.any).isRequired,
      title: PropTypes.string.isRequired,
    }),
  }),
}

const Hero = styled(Img)`
  margin-bottom: ${rhythm(2)};
`
