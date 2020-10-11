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
        { name: 'twitter:image', content: `https:${image.fluid.srcWebp}` },
        { name: 'twitter:image:alt', content: image.title },
      ]
    : []
}

export function openGraphCard(post, url) {
  const {
    heroImage,
    excerpt: { excerpt },
    title,
    author: { name: author },
  } = post

  const card = [
    { name: 'og:title', content: title },
    { name: 'og:description', content: excerpt },
    { name: 'og:url', content: url },
    { name: 'og:author', content: author },
    ...linkedInCardImage(heroImage),
  ]

  return card
}

function linkedInCardImage(image) {
  return image
    ? [{ name: 'og:image', content: `https:${image.fluid.srcWebp}` }]
    : []
}
