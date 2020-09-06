import {
  colors as tailwindColors,
  shadows as tailwindShadows
} from '@theme-ui/preset-tailwind'
import { polaris as theme } from '@theme-ui/presets'

export const space = {
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

export const sizes = {
  ...space,
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  full: '100%',
  screenH: '100vh',
  screenW: '100vw',
  screenMin: 'vmin',
  screenMax: 'vmax',
  responsiveStart: '320px',
  responsiveStop: '1200px',
  article: '80ch'
}

export const breakpoints = [
  sizes.responsiveStart,
  '768px',
  sizes.responsiveStop
]
breakpoints.start = breakpoints[0]
breakpoints.stop = breakpoints[breakpoints.length - 1]

export const componentVariants = {
  // Grid (no default)
  grids: {
    // ...theme.grids
  },

  text: {
    // ...theme.text
    // Text
    // default: {},
    // Heading
    // heading: {}
  },

  // Image (no default)
  images: {
    // ...theme.images
    // Avatar
    // avatar: {}
  },

  forms: {
    // ...theme.forms
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
    // ...theme.badges
    // primary: {}
  },
  // Alert
  alerts: {
    // ...theme.alerts
    // primary: {}
  },
  // Message (no default)
  messages: {
    // ...theme.messages
  }
}

// export const scales = {
//   borders,
//   borderStyles,
//   borderWidths,
//   colors: {
//     text,
//     background,
//     primary,
//     secondary,
//     accent,
//     highlight,
//     muted,
//     modes: {}
//   }
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
// }

const sxButtons = {
  cursor: 'pointer',
  placeItems: 'center',
  px: 4,
  py: 3,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition: '.3s all',
  '&:hover': {
    bg: 'teal.6'
  }
}

export default {
  ...theme,
  shadows: {
    ...tailwindShadows
  },
  breakpoints: breakpoints,
  space: {
    ...space
  },
  sizes: {
    ...sizes
  },
  // TODO: hover w/ saturate or darken
  colors: {
    ...tailwindColors,
    primary: tailwindColors.teal['5'],
    secondary: tailwindColors.purple['7']
    // primaryHover: ,
    // secondaryHover:
  },
  buttons: {
    // Button
    primary: {
      ...sxButtons
    },
    outline: {
      ...sxButtons,
      bg: 'background',
      border: '1px solid',
      borderColor: 'primary',
      color: 'primary',
      '&:hover': {
        bg: 'teal.1'
      }
    }
    // Close
    // close: {},
    // IconButton
    // icon: {},
    // MenuButton
    // menu: {}
  },
  links: {
    // NavLink
    nav: {
      ...theme.styles.h4,
      position: 'relative',
      color: 'secondary',
      transition: 'all .25s ease-in-out',
      '::after': {
        content: `""`,
        position: 'absolute',
        height: '2px',
        width: 0,
        left: '50%',
        bottom: -2,
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
  cards: {
    // Card
    primary: {
      px: 6,
      py: 4,
      borderRadius: 4,
      border: '2px solid',
      borderColor: 'purple.2',
      boxShadow: 'md',
      transition: 'all .2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-3px)'
      }
    }
  },
  text: {
    // Text
    default: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    }
  },
  layout: {
    // Container
    container: {
      maxWidth: 'responsiveStop'
    },
    article: {
      maxWidth: 'article'
    }
  },
  styles: {
    ...theme.styles,
    // Link
    a: {
      color: 'secondary'
      // textDecoration: 'none'
    }
    // Progress
    // progress: {},
    // Divider
    // hr: {}
  }
}
