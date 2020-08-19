import theme from '@theme-ui/preset-tailwind'

export const breakpoints = ['480px', '768px', '1024px', '1200px']
breakpoints.start = '320px'
breakpoints.end = breakpoints[breakpoints.length - 1]
breakpoints.mobile = breakpoints[0]
breakpoints.tablet = breakpoints[1]
breakpoints.laptop = breakpoints[2]
breakpoints.desktop = breakpoints[3]

export const tailwindSpacing = {
  px: '1px',
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
  '80': '20rem',
  '96': '24rem',
  '112': '28rem',
  '128': '32rem',
  '144': '36rem',
  '168': '42rem',
  '192': '48rem',
  '224': '56rem',
  '256': '64rem',
  '288': '72rem'
}

export const tailwindMaxWidth = {
  xs: tailwindSpacing['80'],
  sm: tailwindSpacing['96'],
  md: tailwindSpacing['112'],
  lg: tailwindSpacing['128'],
  xl: tailwindSpacing['144'],
  '2xl': tailwindSpacing['168'],
  '3xl': tailwindSpacing['192'],
  '4xl': tailwindSpacing['224'],
  '5xl': tailwindSpacing['256'],
  '6xl': tailwindSpacing['288']
}

export const tailwindWidth = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%'
}

export const sizes = {
  ...tailwindSpacing,
  ...tailwindMaxWidth,
  ...tailwindWidth,
  full: '100%',
  screenH: '100vh',
  screenW: '100vw',
  screenMin: 'vmin',
  screenMax: 'vmax'
}

export const componentVariants = {
  // Grid (no default)
  grids: { ...theme.grids },
  buttons: {
    ...theme.buttons
    // Button
    // primary: {},
    // Close
    // close: {},
    // IconButton
    // icon: {},
    // MenuButton
    // menu: {}
  },
  text: {
    ...theme.text
    // Text
    // default: {},
    // Heading
    // heading: {}
  },
  links: {
    ...theme.links,
    // NavLink
    nav: {
      position: 'relative',
      color: 'white',
      transition: 'all .25s ease-in-out',
      '::after': {
        content: `""`,
        position: 'absolute',
        height: '2px',
        width: 0,
        left: '50%',
        bottom: -1,
        transition: 'all .25s ease-in-out'
      },
      '&:hover': {
        color: 'secondary',
        '&::after': {
          width: '100%',
          left: '0',
          backgroundColor: 'secondary'
        }
      }
    }
  },
  // Image (no default)
  images: {
    ...theme.images
    // Avatar
    // avatar: {}
  },
  cards: {
    ...theme.cards,
    // Card
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
    }
  },
  layout: {
    ...theme.layout,
    // Container
    container: {
      maxWidth: '80ch'
    }
  },
  forms: {
    ...theme.forms
    // Label
    // label: {},
    // Input
    // input: {},
    // Select
    // select: {},
    // Textarea
    // textarea: {},
    // Radio
    // radio: {},
    // Checkbox
    // checkbox: {},
    // Slider
    // slider: {}
  },
  // Badge
  badges: {
    ...theme.badges
    // primary: {}
  },
  // Alert
  alerts: {
    ...theme.alerts
    // primary: {}
  },
  // Message (no default)
  messages: { ...theme.messages },
  styles: {
    ...theme.styles,
    // Link
    a: { color: 'secondary', textDecoration: 'none' }
    // Progress
    // progress: {},
    // Divider
    // hr: {}
  }
}

export const scales = {
  //   borders,
  //   borderStyles,
  //   borderWidths,
  colors: {
    // text,
    //     background,
    primary: theme.colors.teal['3'],
    secondary: theme.colors.purple['5']
    //     accent,
    //     highlight,
    //     muted,
    //     modes: {}
  }
  //   fonts: {
  //     body,
  //     heading,
  //     monospace
  //   },
  //   fontSizes,
  //   fontWeights: {
  //     body,
  //     heading,
  //     bold
  //   },
  //   letterSpacings,
  //   lineHeights: {
  //     body,
  //     heading
  //   },
  //   opacities,
  //   radii,
  //   shadows,
  //   sizes,
  //   space,
  //   zIndices
}

export default {
  ...theme,
  breakpoints: breakpoints,
  space: tailwindSpacing,
  sizes: sizes,
  colors: {
    ...theme.colors,
    ...scales.colors
  },
  ...componentVariants
}
