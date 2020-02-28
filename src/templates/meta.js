export function twitterCard(post, authorTwitter) {
  const {
    heroImage,
    excerpt: { excerpt },
    title,
  } = post

  const card = [
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:site', content: authorTwitter },
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
