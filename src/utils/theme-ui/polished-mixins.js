import { wrapUtility } from './wrap-utility'
import * as P from 'polished'
import convertCSSLength from 'convert-css-length'

const convert = convertCSSLength('16px')
const convertToPx = length => convert(length, 'px')

export const between = wrapUtility(
  P.between,
  [
    'space',
    'space',
    { sizes: theme => theme.breakpoints.start },
    { sizes: theme => theme.breakpoints.end }
  ],
  convertToPx
)

// 'tScale'
// {tScale: tKey}
// ['tScale', {tScale: tKey}, [tScale, tKey], ...]
// export const constrain = wrapUtility(P.between, 'space', convertToPx)
// export const constrain = wrapUtility(P.between, { space: 4 }, convertToPx)
// export const constrain = wrapUtility(P.between, ['space', 'space'], convertToPx)
// export const constrain = wrapUtility(
//   P.between,
//   ['space', { space: 1 }, ['sizes', 2], ['sizes']],
//   convertToPx
// )
export const constrain = wrapUtility(
  (fromSize, toSize, minScreen, maxScreen) => {
    const betweenVal = P.between(fromSize, toSize, minScreen, maxScreen)
    return `clamp(${fromSize}, ${betweenVal}, ${toSize})`
  },
  [
    { space: undefined },
    { space: undefined },
    { sizes: theme => theme.breakpoints.start },
    { sizes: theme => theme.breakpoints.end }
  ],
  convertToPx
)

// (themeVal, theme, fnArgIndex, fnArgs) => {
//   return fnArgIndex === 0 ? convertToPx(themeVal) : themeVal
// }

// const between = (...args) => {
//   const [xi, xf, vi, vf] = args.map(arg => parseFloat(arg))
//   const slope = (xf - xi) / (vf - vi)
//   const base = xi - slope * vi
//   return `clamp(${xi}px, ${slope} * 100vw + ${base}px, ${xf}px)`
// }
