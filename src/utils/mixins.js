import { wrapUtility } from './theme-ui-wrap-utility'
import * as P from 'polished'
import convertCSSLength from 'convert-css-length'

const convert = convertCSSLength('16px')
const convertToPx = length => convert(length, 'px')

export const between = wrapUtility(
  P.between,
  ['space', 'space', { sizes: 'responsiveStart' }, { sizes: 'responsiveStop' }],
  convertToPx
)

export const constrain = wrapUtility(
  (fromSize, toSize, minScreen, maxScreen) => {
    const betweenVal = P.between(fromSize, toSize, minScreen, maxScreen)
    return `clamp(${fromSize}, ${betweenVal}, ${toSize})`
  },
  ['space', 'space', { sizes: 'responsiveStart' }, { sizes: 'responsiveStop' }],
  convertToPx
)
