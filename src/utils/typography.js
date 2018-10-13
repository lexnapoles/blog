import Typography from 'typography'
import doelgerTheme from 'typography-theme-doelger'

doelgerTheme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

delete doelgerTheme.googleFonts

const typography = new Typography(doelgerTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
