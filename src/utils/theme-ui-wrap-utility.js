import { get } from 'theme-ui'

// adapted from @theme-ui/color package
// https://github.com/system-ui/theme-ui/blob/master/packages/color/src/index.ts
export const themeGet = (theme, scale, key) => {
  let themeVal = get(theme, `${scale}.${key}`, key)
  if (typeof themeVal === 'string') {
    themeVal = themeVal.replace(/^var\(--(\w+)(.*?), /, '').replace(/\)/, '')
  }
  return themeVal
}

export const wrapUtility = (fn, themeMap, callback) => {
  if (!Array.isArray(themeMap)) {
    themeMap = [themeMap]
  } else if (themeMap.length === 0 || themeMap[0] === undefined) {
    throw new Error('themeMap array must have at least one element defined.')
  }
  // convert themeMap into 2D array:
  // [[themeScale_0, defaultVal_0], ..., [themeScale_n, defaultVal_n]]
  themeMap = [...Array(fn.length)].reduce((accumulator, _, i) => {
    const currentVal = themeMap[i]
    let keyValuePair
    if (currentVal === undefined) {
      // use previous value
      keyValuePair = accumulator[i - 1]
    } else if (typeof currentVal === 'string') {
      keyValuePair = [currentVal, undefined]
    } else if (Array.isArray(currentVal)) {
      keyValuePair = currentVal
    } else if (typeof currentVal === 'object' && currentVal !== null) {
      keyValuePair = Object.entries(currentVal)[0]
    }

    return [...accumulator, keyValuePair]
  }, [])

  return (...args) => theme => {
    const fnArgs = themeMap.map(([themeScale, defaultVal], i) => {
      const themeKey = args[i] !== undefined ? args[i] : defaultVal
      const themeResult = themeGet(
        theme,
        themeScale,
        themeKey instanceof Function ? themeKey(theme) : themeKey
      )

      return callback ? callback(themeResult, theme, i, args) : themeResult
    })

    return fn(...fnArgs)
  }
}
