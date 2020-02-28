export function twitterCard(post, authorTwitter) {
  const {
    heroImage,
    excerpt: { excerpt },
  } = post

  const card = [
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: authorTwitter },
    ...twitterCardImage(heroImage),
    { name: 'twitter:description', content: excerpt },
  ]

  return card
}

function twitterCardImage(image) {
  return image
    ? [
        { name: 'twitter:image', content: image.fluid.srcWebp },
        { name: 'twitter:image:alt', content: image.title },
      ]
    : []
}
